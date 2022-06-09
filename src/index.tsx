import { h, render } from "./vdom";
import { ListDemoApp } from "./demos/ListDemoApp";
import { StatefulDemoApp } from "./demos/StatefulListDemoApp";

/**
 * FEATURES :
 *
 * - Basic v-dom
 * 	 ✔ Create / remove elements
 * 	 ✔ Set / remove attributes
 * 	 ✔ Set / remove event listeners
 * 	 ✔ Reuse previous components, do not trash everything everytime
 * 	 ✔ innerHTML
 *   ✔ class as string or array filtered with booleans
 *   	- Optimize style when does not changes, is it possible ?
 *   ✔ style as object only
 *   	- Optimize style when does not changes, is it possible ?
 *
 * - Advanced v-dom
 *   ✔ Move elements and keep track of dom elements with keyed virtual nodes
 *   	✔ Add to top
 *   	✔ Add to bottom
 *   	✔ Remove from top
 *   	✔ Remove from bottom
 *   	✔ Insert in the middle
 *      ✔ Remove from the middle
 *  	X✔ Swap
 *  		- Do 2 operations, should do only one
 *   - Keep track of component instances
 *   - Remove subtrees recursively
 *   - Sub tree rendering
 *   ✔ Rendering optimization (like memo and skip)
 *
 * - Reactive
 *   - Dom refs
 *   - Factory helpers (like hooks), find name and prefix
 *   - Var as let
 *   - States / observers
 *   - Async states
 *   - Stores
 *
 * - Types
 * 	 - Basic JSX Type
 * 	 - Render and component return JSX Types
 * 	 - Props types
 *
 * - Release
 * 	 - Optimize
 * 	 - Benchmark
 * 	 - Docs
 * 	 - Release
 *
 * V2 :
 * - Advanced Hot Module reloading with state keeping automagically
 */

// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------

let renderIndex = 0
function init () {
	const start = performance.now();
	// render( <ListDemoApp render={ init } renderIndex={ renderIndex ++ } />, document.body );
	render( <StatefulDemoApp render={ init } renderIndex={ renderIndex ++ } />, document.body );
	console.log(~~(performance.now() - start))
}

init();
