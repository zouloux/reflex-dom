import { h, render } from "../../../reflex-dom/src";
import { App } from "./main"
import { drawReflexDebug } from "../../../reflex-dom/src/debug";


// drawReflexDebug();

export function startV20 () {
	render( <V20App />, document.getElementById("App") );
}

function V20App () {
	return () => <div>
		{/*<h1>Hello Reflex</h1>*/}
		{/*<StatefulComponent />*/}
		{/*<StatelessComponent />*/}
		{/*<SVGComponent />*/}
		<App />
	</div>
}


function StatefulComponent () {
	return () => <div>
		Stateful
	</div>
}

function StatelessComponent () {
	return <div>
		Stateless
	</div>
}

function SVGComponent () {
	return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M5 12h14M12 5l7 7-7 7" />
		</g>
	</svg>
}

