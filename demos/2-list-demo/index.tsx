import { h, render } from "../../src/reflex";
import { trackPerformances, setReflexDebug } from "../../src/reflex/debug";
import { ListDemoApp } from "./ListDemoApp";

// -----------------------------------------------------------------------------

setReflexDebug( true )

let renderIndex = 0
export function init () {
	const p = trackPerformances("Root rendering")
	render( <ListDemoApp render={ init } renderIndex={ renderIndex ++ } />, document.body );
	p();
}

init();
