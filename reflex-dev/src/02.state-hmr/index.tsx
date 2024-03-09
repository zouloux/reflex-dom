import { h, render } from "../../../src";
import { drawReflexDebug, MemoryUsage } from "../../../src/debug";
import { StateHMR } from "./StateHMR";

// -----------------------------------------------------------------------------

export function startStateHMR () {
	drawReflexDebug();
	render( <MemoryUsage />, document.getElementById("MemoryUsage") )
	render( <StateHMR />, document.getElementById("App") );
}
