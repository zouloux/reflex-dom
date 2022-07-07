import { h, state, changed, ref } from "../../src/reflex";
import { createUID, firstnameList, lastnameList, pickRandom, randBoolean } from "../demoHelpers";

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

	// Here props are a proxy, so it's values can be updated dynamically

	// PATTERN #1 - Detect prop changes
	// Will show a log if isAdmin is changing on props.user
	changed( () => props.user.isAdmin, isAdmin => {
		console.log(`PATTERN #1 - User ${props.user.firstname} ${isAdmin ? 'is' : 'is not'} admin`)
	})

	// PATTERN #2 - Attach and detach from prop changes
	// Will disconnect previous user from chat, and connect new user
	changed( () => props.user.id, newId => {
		console.log(`PATTERN #2 - Connect user ${newId} to chat panel`)
		return oldId => {
			console.log(`PATTERN #2 - Disconnect user ${oldId} from chat`)
		}
	})

	// REFS - Refs are updated just after dom has been updated.
	// This proves that after render, refs are updated correctly and available right after
	const root = ref()
	const image = ref()
	changed(() => {
		console.log("REFS - UserComponent just rendered", root.component, image.dom.getAttribute('src'))
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
