import { h, render } from "./reflex";
import { ListDemoApp } from "./demos/ListDemoApp";
import { StoreListDemoApp } from "./demos/StoreListDemoApp";
import { setReflexDebug, trackPerformances } from "./reflex/debug";
import { LifecycleDemoApp } from "./demos/LifecycleDemoApp";


/**
 * REFLEX JS
 *
 * - Reflex Core
 * 		- Core
 * 		- Polyfills
 * 		- Signal + Observer
 * 		- YADL
 * 		- Utils
 * - Reflex Components
 * 		- Reflex View (vdom + web components)
 * 		- Reflex Store
 * 			- Regular store / Async store or one big store well-made
 * 		- Reflex Router
 * 			- Based on Reflex Store
 * 		- Reflex Tween ?
 *		- Reflex Toolkit
 *			- Hooks
 *			- Responsive
 *			- Inputs
 *			- Cursor
 *			- Sound
 *			- Viewport
 *		- Reflex UI Kit
 *			- mixins
 *			- UI Kit
 *			- Components ( Slideshow / Menu / Player ... )
 * - Reflex Server
 *
 */

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
 *      ✔ Basic swap
 *  	X Optimized Swap
 *  		- Do 2 operations, should do only one
 *   ✔ Keep track of component instances
 *   ✔ Remove subtrees recursively
 *   ✔ Sub tree rendering
 *   ✔ Rendering optimization (like memo and skip)
 *
 * - Reactive
 *   ✔ Dom refs / component ref
 *   - Factory helpers (like hooks), find name and prefix
 *   - Factory Errors / Component errors ( try catch on instance + render etc )
 *   ✔ Var in ref as let ! Yeah
 *   ✔ States / observers
 *   - Async states
 *   ✔ Stores
 *   ✔ Mount / Unmount
 *   - Updated + Props
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

setReflexDebug( true )

let renderIndex = 0
export function init () {
	const p = trackPerformances("Root rendering")
	// render( <ListDemoApp render={ init } renderIndex={ renderIndex ++ } />, document.body );
	// render( <StoreListDemoApp render={ init } renderIndex={ renderIndex ++ } /> , document.body );
	render( <LifecycleDemoApp />, document.body )
	p();
}

init();
