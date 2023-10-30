import { changed, effect, h, render, state } from "../../../reflex-dom/src";
import { App } from "./main"
import { drawReflexDebug } from "../../../reflex-dom/src/debug";


drawReflexDebug();

export function startV20 () {
	render( <V20App />, document.getElementById("App") );
}

function V20App () {
	return () => <div>
		<h1>Hello Reflex</h1>
		<StatefulComponent />
		{/*<StatelessComponent />*/}
		{/*<SVGComponent />*/}
		{/*<App />*/}
	</div>
}


function StatefulComponent () {
	const $s1 = state(0)
	const $s2 = state(0)
	effect(() => {
		console.log("Effect 1", $s1.value)
	})
	changed(() => {
		console.log("Changed 1", $s1.value)
	})
	changed(() => {
		console.log("Changed both", $s1.value, $s2.value)
	})
	function incrementBoth () {
		$s1.value ++
		$s2.value ++
	}
	return () => <div>
		<h2>Stateful</h2>
		<button onClick={ e => $s1.value ++ }>Increment 1</button>
		<button onClick={ e => $s2.value ++ }>Increment 2</button>
		<button onClick={ incrementBoth }>Increment both</button>
		<div>
			<h4>Values</h4>
			<div>Seed : {Math.random()}</div>
			<div>S1 : { $s1 }</div>
			<div>S2 : { $s2 }</div>
		</div>
	</div>
}

function StatelessComponent () {
	return <div>
		Stateless
	</div>
}

function SVGComponent () {
	return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M5 12h14M12 5l7 7-7 7" />
		</g>
	</svg>
}

