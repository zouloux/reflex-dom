import { h, render } from "../../src";
import { StateChangedDemo } from "./StateChangedDemo";
import { setReflexDebug, trackPerformances } from "../../src/debug";

// -----------------------------------------------------------------------------

setReflexDebug( true )

let renderIndex = 0
export function init () {
	const p = trackPerformances("Root rendering")
	render( <StateChangedDemo render={ init } renderIndex={ renderIndex ++ } /> , document.body );
	p();
}

init();
