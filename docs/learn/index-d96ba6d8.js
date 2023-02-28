const e=`import * as CurrentStep from './steps/00.render'
import { h, render } from "reflex-dom";

// import * as CurrentStep from './steps/00.render'
console.log(">", CurrentStep['App'])
if ( CurrentStep['App'] ) {
	const App = CurrentStep['App']
	render(<App />, document.body);
}`;export{e as default};
