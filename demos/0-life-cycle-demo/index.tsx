import { h, render } from "../../src/reflex";
import { trackPerformances, setReflexDebug } from "../../src/reflex/debug";
import { LifecycleDemoApp } from "./LifecycleDemoApp";

// -----------------------------------------------------------------------------

setReflexDebug( true )

export function init () {
	const p = trackPerformances("Root rendering")

	console.log( <div>
		<ul>
			<li></li>
			<li></li>
		</ul>
	</div>)
	// render( <LifecycleDemoApp />, document.body )
	p();
}

init();
