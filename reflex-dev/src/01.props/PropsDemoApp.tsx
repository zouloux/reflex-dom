import { h, state } from "../../../reflex-dom/src";
import { createUID, firstnameList, lastnameList, pickRandom, randBoolean } from "../demoHelpers";
import { IUser, UserComponent } from "./UserComponent";

/**
 * In this demo we will see how
 */
function getRandomUser ():IUser {
	return {
		firstname	: pickRandom( firstnameList ),
		lastname	: pickRandom( lastnameList ),
		isAdmin		: randBoolean(),
		id			: createUID()
	}
}

export function PropsDemoApp () {
	// Create a state attached to "PropsDemoApp".
	// Initial state is gathered at init from "getRandomUser" function.
	const currentUser = state<IUser>( getRandomUser )

	// This will toggle some existing props to check how defaultProps works inside UserComponent
	let inverter = false
	function toggleExistingProps () {
		inverter = !inverter
		return inverter ? {} : { optionalProp: 10 }
	}

	// With factory pattern, we have to return a render function.
	return () => <div>
		{/* Update state with a new random user */}
		<button onClick={ e => currentUser.set( getRandomUser ) }>Change user</button>
		<br />
		{/* Render current random user into a component */}
		<UserComponent user={ currentUser.value } {...toggleExistingProps()} />
	</div>
}
