import { changed, effect, h, render, state } from "../../../src";
import { App } from "./main"
import { drawReflexDebug, MemoryUsage } from "../../../src/debug";


drawReflexDebug();

export function startV20 () {
	render( <V20App />, document.getElementById("App") );
	// hydrate( <V20App />, document.getElementById("App2") );
	// const html = renderToString( <V20App /> )
	// console.log( html )
}

function Component ( props ) {
	return () => <div>
		<div>Parent 1</div>
		{ props.children }
		<div>Parent 2</div>
	</div>
}

function V20App2 () {
	const c1 = <Component>
		<div>Children</div>
	</Component>
	const c2 = <Component children={ <div>Children</div> }/>
	const elements = ["a", "b", "c"].map( e => <span>{ e }</span>)
	return <div>
		<h1>Title</h1>
		<div>{ c1 }</div>
		<hr />
		<div>{ c2 }</div>
		<div>{ elements }</div>
		<h2>OK</h2>
	</div>
}

function V20App () {
	return () => <div>
		<MemoryUsage />
		<h1>Hello Reflex</h1>
		<div>Test 1</div>
		<SVGComponent />
		<div>Test 2</div>
		<StatefulComponent />
		<StatelessComponent />
		<hr />
		<App />
	</div>
}


function StatefulComponent () {
	const $s1 = state(0)
	const $s2 = state(0)
	const $s3 = state(0)
	effect(() => {
		console.log("Effect 1", $s1.value)
	})
	changed(() => {
		console.log("Changed 1", $s1.value)
	})
	changed(() => {
		console.log("Changed both", $s1.value, $s2.value)
	})
	effect(() => {
		console.log("-", $s3.value % 2 === 1, $s3.value % 5 === 3)
	})
	// rendered(() => {
	// 	console.log("Rendered")
	// })
	// console.log("COMPONENT CREATED")
	function incrementBoth () {
		// console.log("CLICKED")
		$s1.value ++
		$s2.value ++
	}
	return () => <div>
		<h2 style={{ color: "red", fontSize: 12 }}>Stateful</h2>
		<button onClick={ e => $s1.value ++ }>Increment 1</button>
		<button onClick={ e => $s2.value ++ }>Increment 2</button>
		<button onClick={ incrementBoth }>Increment both</button>
		<button onClick={ e => $s3.value ++ }>Increment 3</button>
		<div>
			<h4>Values</h4>
			<div>Seed : {Math.random()}</div>
			<div>S1 : { $s1 }</div>
			<div key="S2">S2 : { $s2 }</div>
			{ $s3.value % 2 === 1 && <h3 key="test">Test</h3> }
			{ $s3.value % 5 === 3 && <h4>OK</h4> }
			<div key="TS">Test strings { $s2 } again <span /> autre</div>
			<div key="TS2">AH</div>
		</div>
	</div>
}

function StatelessComponent () {
	return <div>
		Stateless
	</div>
}

function SVGComponent () {
	return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50px" height="50px">
		<g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M5 12h14M12 5l7 7-7 7" />
		</g>
	</svg>
}