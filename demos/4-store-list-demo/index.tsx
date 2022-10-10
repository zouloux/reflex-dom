import { h, render } from "../../src";
import { StoreListDemoApp } from "./StoreListDemoApp";
import { setReflexDebug, trackPerformances } from "../../src/debug";

// -----------------------------------------------------------------------------

setReflexDebug( true )

let renderIndex = 0
export function init () {
	const p = trackPerformances("Root rendering")
	render( <StoreListDemoApp render={ init } renderIndex={ renderIndex ++ } /> , document.body );
	p();
}

init();
