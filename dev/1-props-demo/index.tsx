import { h, render } from "../../src";
import { trackPerformances } from "../../src/debug";
import { PropsDemoApp } from "./PropsDemoApp";

// -----------------------------------------------------------------------------

export function init () {
	const p = trackPerformances("Root rendering")
	render( <PropsDemoApp />, document.body )
	p();
}

// injectCodeViewer([
// 	"demos/1-props-demo/index.tsx",
// 	"demos/1-props-demo/PropsDemoApp.tsx",
// 	"demos/1-props-demo/UserComponent.tsx"
// ], 1);
init();