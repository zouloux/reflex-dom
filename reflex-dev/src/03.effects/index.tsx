import { h, render } from "../../../reflex-dom/src";
import { drawReflexDebug, MemoryUsage } from "../../../reflex-dom/src/debug";
import { Effects } from "./Effects";

// -----------------------------------------------------------------------------

export function startEffects () {
	drawReflexDebug();
	render( <MemoryUsage />, document.getElementById("MemoryUsage") )
	render( <Effects />, document.getElementById("App") );
}
