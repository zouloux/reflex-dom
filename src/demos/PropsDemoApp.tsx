import { h } from "../reflex";
import { state } from "../reflex/state";
import { createUID, firstnameList, lastnameList, pickRandom, randBoolean } from "./demoHelpers";
import { trackChange } from "../reflex/lifecycle";

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

interface ISubComponentProps {
	user		:IUser
}

function SubComponent ( props:ISubComponentProps ) {
	/**
	 * PRO :
	 * - Will be typed
	 * CON :
	 * - Tied to something greater than the proxy. Maybe add a prop getter on the proxy itself ?
	 * - Unable to track sub-prop (like props.user.isAdmin)
	 * 		- Or maybe with a super-type with dot compatibility !
	 */
	/*props.onUpdate(() => {
		// Props has been updated
	})
	props.onUpdate(["user", "user.isAdmin"], () => { // can we type that ?
		// Props has been updated
	})*/

	/**
	 * PRO :
	 * - Typed
	 * - Can track anything, not only props
	 * - Using raw objects and not strings, so can be compiled
	 * CON :
	 * - Need to create a function which detect changes
	 */

	trackChange( () => props.user.id, newId => {
		console.log(`Connect user ${newId} to chat panel`)
		return oldId => {
			console.log(`Disconnect user ${oldId} from chat`)
		}
	})


	trackChange( () => props.user.isAdmin, isAdmin => {
		console.log(`User ${props.user.firstname} ${isAdmin ? 'is' : 'is not'} admin`)
	})

	return () => <div>
		Hello { props.user.firstname } { props.user.lastname }
		<img src={`https://i.pravatar.cc/150?u=${props.user.id}`} />
	</div>
}

export function PropsDemoApp () {
	const currentUser = state<IUser>( getRandomUser )
	return () => <div>
		<button onClick={ e => currentUser.set( getRandomUser ) }>Change user</button>
		<SubComponent user={ currentUser.value } />
	</div>
}
