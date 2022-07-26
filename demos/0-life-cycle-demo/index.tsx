import { h, render } from "../../src/reflex";
import { trackPerformances, setReflexDebug } from "../../src/reflex-more/debug";
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
