import { h, render } from "../../../src";
import { drawReflexDebug, MemoryUsage } from "../../../src/debug";
import { PropsDemoApp } from "./PropsDemoApp";

// -----------------------------------------------------------------------------

export function startProps () {
	drawReflexDebug();
	render( <MemoryUsage />, document.getElementById("MemoryUsage") )
	render( <PropsDemoApp />, document.getElementById("App") );
}