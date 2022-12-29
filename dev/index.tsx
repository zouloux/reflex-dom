import { h, ref, render, state, compute, track } from "../src";
import { drawReflexChanges, MemoryUsage, trackPerformances } from "../src/debug";
import { clearInterval } from "timers";

// -----------------------------------------------------------------------------

function DevApp () {

	const testStateA1 = state( 1 )
	const testStateA2 = compute( () => testStateA1.value * 2 )
	const increment = e => testStateA1.value ++

	const testStateB = state( false )
	const toggle = e => testStateB.value = !testStateB.value

	const $a1 = ref<HTMLDivElement>()
	const $a2 = ref<HTMLDivElement>()

	// effect( async () => {
	// 	await delay( .5 )
	// 	console.log('A1, Before dom update', testStateA1.value, $a1.dom?.innerHTML)
	// })
	// effect( async () => {
	// 	await delay( .5 )
	// 	console.log('A2, Before dom update', testStateA2.value, $a2.dom?.innerHTML)
	// })
	// FIXME -> We need to revert props as a proxy ...
	// 		Changed can use effect with props and states
	//		No more custom function in changed
	//		effect need to work on props also
	// changed([testStateA1, testStateA2], () => {
	// 	console.log("A1, After dom update", testStateA1.value, $a1.dom.innerHTML );
	// 	console.log("A2, After dom update", testStateA2.value, $a2.dom.innerHTML );
	// })

	// effect(() => {
	// 	console.log(`Any effect ? ${testStateA1}`)
	// })

	// changed(() => {
	// 	console.log("1: A1, After dom update", testStateA1.value, $a1.dom?.innerHTML );
	// 	console.log("1: A2, After dom update", testStateA2.value, $a2.dom?.innerHTML );
	// })
	// changed(() => {
	// 	console.log("2: A1, After dom update", testStateA1.value, $a1.dom?.innerHTML );
	// })
	// changed(() => {
	// 	console.log("3: A2, After dom update", testStateA2.value, $a2.dom?.innerHTML );
	// })
	//
	// changed(() => {
	// 	console.log(`B -> ${testStateB}`)
	// })

	return () => <div>
		<h1>Atomic rendering test</h1>
		<button onClick={ increment }>Increment state A</button>
		<button onClick={ toggle }>Toggle state B</button>
		<div>Seed : { Math.random() }</div>
		<hr/>
		<div ref={ $a1 }>State A-1: { testStateA1 }</div>
		<div ref={ $a2 }>State A-2: { testStateA2 }</div>
		<div>
			<div>State B : { testStateB.value && <span>Enabled</span> }</div>
		</div>
		<PropsTest valueA={ testStateA2 } valueB={ testStateB } />
	</div>
}

function PropsTest ( props ) {
	// shouldUpdate(() => false)
	const testBooleanState = compute( () => props.valueB.value ? "enabled" : "disabled" )
	return () => <div>
		<h2>PropsTest</h2>
		<div>Seed : { Math.random() }</div>
		{/*<h3>{ props.valueA } / { props.valueB.value && "enabled" }</h3>*/}
		<h3>{ props.valueA } / { testBooleanState }</h3>
	</div>
}

// -----------------------------------------------------------------------------

export function init () {
	drawReflexChanges();
	render( <MemoryUsage />, document.getElementById('MemoryUsage') )
	render( <DevApp />, document.getElementById('App') )
	// const string = renderToString( a )
	// console.log( string );
	// render( a, document.getElementById('App') )
}
init();
