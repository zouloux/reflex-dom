import { changed, defaultProps, h, ref } from "../../src";

export interface IUser {
	firstname	:string
	lastname	:string
	isAdmin		?:boolean
	id			:string
}


// -----------------------------------------------------------------------------

interface IStatelessWithDefaultProps {
	defaultTitle	?:string
	name			:string
}

// This component will only be rendered when props changes.
function StatelessWithDefaultProps ( props:IStatelessWithDefaultProps ) {
	// Default props works also on stateless components
	defaultProps( props, {
		defaultTitle: "Name is "
	})
	// Stateless components functions are executed at each render like in React
	console.log("Stateless render", props)
	// No factory pattern here because we do not have internal state for this component
	return <h4>{ props.defaultTitle } { props.name }</h4>
}

// -----------------------------------------------------------------------------

interface IUserComponentProps {
	user			:IUser
	optionalProp	?:number
}

export function UserComponent ( props:IUserComponentProps ) {
	// Props cannot be destructured here because it will capture values from the
	// first render. Use a getter()

	// This is how we set default props
	// optionalProp is given one on two props updates (undefined or 42) from parent
	defaultProps(props, {
		optionalProp: 42
	})

	// Log new props
	changed(() => { console.log('Props changed', props) })

	// PATTERN #1 - Detect prop changes
	// Will show a log if isAdmin is changing on props.user
	changed(
		// To detect changes, we simply use an anonymous function which return
		// the state to check after each render.
		() => [props.user.isAdmin],
		// Result of test function is given as first argument
		( isAdmin, wereAdmin ) => {
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
	const root = ref<HTMLDivElement>()
	const image = ref<HTMLImageElement>()
	changed(() => {
		// FIXME : root.component should be this component instance
		console.log("REFS - UserComponent just rendered", /*root.component,*/ image.dom.getAttribute('src'))
	})

	// With factory pattern, we have to return a render function.
	return () => <div ref={ root } class="UserComponent">
		<h2>Hello { props.user.firstname } { props.user.lastname }</h2>
		<h4>Optional prop : { props.optionalProp }</h4>
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
		<br />
		<StatelessWithDefaultProps name={ props.user.firstname } />
	</div>
}
