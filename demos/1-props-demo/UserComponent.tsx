import { changed, h, ref } from "../../src/reflex";

export interface IUser {
	firstname	:string
	lastname	:string
	isAdmin		?:boolean
	id			:string
}

interface IUserComponentProps {
	user		:IUser
}

// -----------------------------------------------------------------------------

export function UserComponent ( props:IUserComponentProps ) {

	// Here "props" is a proxy, so it's values can be updated dynamically
	// The main tradeoff is that destructuring props is not possible

	// PATTERN #1 - Detect prop changes
	// Will show a log if isAdmin is changing on props.user
	changed(
		// To detect changes, we simply use an anonymous function which return
		// the state to check after each render.
		() => [props.user.isAdmin],
		// Result of test function is given as first argument
		isAdmin => {
			console.log(`PATTERN #1 - User ${props.user.firstname} ${isAdmin ? 'is' : 'is not'} admin`)
		}
	)

	// PATTERN #2 - Attach and detach from prop changes
	// Will disconnect previous user from chat, and connect new user
	changed( () => [props.user.id], newId => {
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

	// With factory pattern, we have to return a render function.
	return () => <div ref={ root } class="UserComponent">
		Hello { props.user.firstname } { props.user.lastname }
		<br />
		<img
			src={`https://i.pravatar.cc/150?u=${props.user.id}`}
			ref={ image }
			style={{
				width: 150,
				height: 150,
				backgroundColor: '#333',
				borderRadius: 10
			}}
		/>
	</div>
}
