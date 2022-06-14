import { h } from "../reflex";
import { state } from "../reflex/state";
import { createUID, firstnameList, lastnameList, pickRandom, randBoolean } from "./demoHelpers";
import { changed } from "../reflex/lifecycle";
import { ref } from "../reflex/ref";

interface IUser {
	firstname	:string
	lastname	:string
	isAdmin		?:boolean
	id			:string
}

function getRandomUser ():IUser {
	return {
		firstname	: pickRandom( firstnameList ),
		lastname	: pickRandom( lastnameList ),
		isAdmin		: randBoolean(),
		id			: createUID()
	}
}

// -----------------------------------------------------------------------------

interface IUserComponentProps {
	user		:IUser
}

function UserComponent ( props:IUserComponentProps ) {

	// Will disconnect previous user from chat, and connect new user
	changed( () => props.user.id, newId => {
		console.log(`Connect user ${newId} to chat panel`)
		return oldId => {
			console.log(`Disconnect user ${oldId} from chat`)
		}
	})

	// Will show a log if isAdmin is changing on props.user
	changed( () => props.user.isAdmin, isAdmin => {
		console.log(`User ${props.user.firstname} ${isAdmin ? 'is' : 'is not'} admin`)
	})

	// This proves that after render, refs are updated correctly and available right after
	const root = ref()
	const image = ref()
	changed(() => {
		console.log("UserComponent just rendered", root.dom, image.dom.getAttribute('src'))
	})

	return () => <div ref={ root } class="UserComponent">
		Hello { props.user.firstname } { props.user.lastname }
		<img src={`https://i.pravatar.cc/150?u=${props.user.id}`} ref={ image } />
	</div>
}

export function PropsDemoApp () {
	const currentUser = state<IUser>( getRandomUser )
	return () => <div>
		<button onClick={ e => currentUser.set( getRandomUser ) }>Change user</button>
		<UserComponent user={ currentUser.value } />
	</div>
}
