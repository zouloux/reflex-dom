import { h, render, state, changed, ref, mounted, compute, ComponentInstance, rendered, afterNextRender } from "../src";
import { drawReflexDebug } from "../src/debug";

// Reflex components can be pure functions or factory functions
function ReflexApp( props, component:ComponentInstance ) {
	// Basic state implementation. States are signal.
	const counter = state(0);
	const increment = () => counter.value++;
	const reset = () => (counter.value = 0);

	// No need to use ref for locally scoped variables
	let firstUpdate = true;
	// Detect changes of states or props
	// No need for dependency array !
	// Props and states are tracked and batched automatically.
	changed(() => {
	 console.log(`Counter just updated to ${counter}, emoji is ${props.emoji}`, firstUpdate);
	 firstUpdate = false;
	});

	// How refs of dom elements works
	const title = ref<HTMLDivElement>();
	mounted( () => console.log(title.dom.innerHTML) );

	// This state is derived from other states
	const styleState = compute(() => {
		return {
			color: counter.value % 2 === 0 ? "red" : "yellow",
			transition: "200ms color"
		}
	})

	// Returns a render function
	// Classes can be arrays ! Falsy elements of the array will be discarded
	return () => <div class={[ "ReflexApp", props.modifier, false ]}>
		<h1 ref={ title }>Hello from Reflex { props.emoji }</h1>
		{/* This value is updated each time the component renders*/}
		<p>Render seed: { Math.random() }</p>
		<button onClick={ increment }>Increment</button>&nbsp;
		<button onClick={ reset }>Reset</button>&nbsp;
		{/* Using state directly and not .value here, we optimize rendering */}
		<span>Counter : { counter }</span>
		{/* Attributes here will be also optimized ! */}
		<div style={ styleState }>Class changes without render</div>
		<hr/>
		<button onClick={ renderApp }>Refresh app and by changing Emoji prop.</button>
	</div>
}

// Render it like any other v-dom library
function renderApp () {
	const emojis = ["👋", "✌️", "🔥", "✊", "🖖"]
	const emoji = emojis[ Math.floor(Math.random() * emojis.length) ]
	render(
		<ReflexApp modifier="ReflexApp-lightMode" emoji={ emoji } />,
		document.getElementById("App")
	);
}
renderApp()

drawReflexDebug();