import { h, render } from "../../src/reflex";
import { trackPerformances, setReflexDebug } from "../../src/reflex/debug";
import { PropsDemoApp } from "./PropsDemoApp";

// -----------------------------------------------------------------------------

setReflexDebug( true )

export function init () {
	const p = trackPerformances("Root rendering")
	render( <PropsDemoApp />, document.body )
	p();
}

init();
