import { h, render, state } from "../src";
import { trackPerformances, setReflexDebug } from "../src/debug";

// -----------------------------------------------------------------------------

function DevApp () {

	const testStateA = state(0)
	const increment = e => testStateA.value ++

	const testStateB = state( false )
	const toggle = e => testStateB.value = !testStateB.value

	const arrayFromStateA = () => {
		const items = []
		for ( let i = 0; i < testStateA.value; i++ )
			items.push( i )
		return items;
	}

	return () => <div>
		<h1>Hello</h1>
		<button onClick={ increment }>Increment</button>
		<br class="1" />
		<label>Test state : {testStateA.value}</label>
		<div>Nope</div>
		<div class={"test" + testStateA.value}>OK A</div>
		<div>
			<button onClick={ toggle }>Toggle</button>
			<br class="2" />
			{ testStateB.value && <span>OK B</span>}
			<br class="3" />
		</div>
	</div>
}

// -----------------------------------------------------------------------------

setReflexDebug( true )

export function init () {
	const p = trackPerformances("Root rendering")
	const a = <DevApp />
	render( a, document.getElementById('App') )
	// const string = renderToString( a )
	// console.log( string );
	// render( a, document.getElementById('App') )
	p();
}
init();
