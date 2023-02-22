import { h, render } from "../../../reflex-dom/src";
import { drawReflexDebug, MemoryUsage } from "../../../reflex-dom/src/debug";
import { StateHMR } from "./StateHMR";

// -----------------------------------------------------------------------------

export function startStateHMR () {
	drawReflexDebug();
	render( <MemoryUsage />, document.getElementById("MemoryUsage") )
	render( <StateHMR />, document.getElementById("App") );
}