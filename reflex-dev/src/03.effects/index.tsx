import { h, render } from "../../../src";
import { drawReflexDebug, MemoryUsage } from "../../../src/debug";
import { Effects } from "./Effects";

// -----------------------------------------------------------------------------

export function startEffects () {
	drawReflexDebug();
	render( <MemoryUsage />, document.getElementById("MemoryUsage") )
	render( <Effects />, document.getElementById("App") );
}
