import { h, render } from "../../../reflex-dom/src";
import { drawReflexDebug, MemoryUsage } from "../../../reflex-dom/src/debug";
import { PropsDemoApp } from "./PropsDemoApp";

// -----------------------------------------------------------------------------

export function startProps () {
	drawReflexDebug();
	render( <MemoryUsage />, document.getElementById("MemoryUsage") )
	render( <PropsDemoApp />, document.getElementById("App") );
}