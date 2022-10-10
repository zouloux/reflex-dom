import { h, render } from "../../src";
import { trackPerformances, setReflexDebug } from "../../src/debug";
import { LifecycleDemoApp } from "./LifecycleDemoApp";
import { injectCodeViewer } from "../common/codeViewerHelpers";

// -----------------------------------------------------------------------------

setReflexDebug( true )

export function init () {
	const p = trackPerformances("Root rendering")
	const a = <LifecycleDemoApp />
	render( a, document.getElementById('App') )
	p();
}

injectCodeViewer([
	"demos/0-life-cycle-demo/index.tsx",
	"demos/0-life-cycle-demo/LifecycleDemoApp.tsx",
], 1);
init();
