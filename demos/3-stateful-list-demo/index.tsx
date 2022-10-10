import { h, render } from "../../src";
import { trackPerformances, setReflexDebug } from "../../src/debug";
import { StatefulDemoApp } from "./StatefulListDemoApp";


// -----------------------------------------------------------------------------

setReflexDebug( true )

let renderIndex = 0
export function init () {
	const p = trackPerformances("Root rendering")
	render( <StatefulDemoApp render={ init } renderIndex={ renderIndex ++ } /> , document.body );
	p();
}

init();
