import { h, render } from "../../src/reflex";
import { trackPerformances, setReflexDebug } from "../../src/reflex-more/debug";
import { PropsDemoApp } from "./PropsDemoApp";
import { injectCodeViewer } from "../common/codeViewerHelpers";

// -----------------------------------------------------------------------------

setReflexDebug( true )

export function init () {
	const p = trackPerformances("Root rendering")
	render( <PropsDemoApp />, document.body )
	p();
}

injectCodeViewer([
	"demos/1-props-demo/index.tsx",
	"demos/1-props-demo/PropsDemoApp.tsx",
	"demos/1-props-demo/UserComponent.tsx"
], 1);
init();