import * as CurrentStep from './steps/00.render'
import { h, render } from "reflex-dom";

console.log("INDEX TSX")

// import * as CurrentStep from './steps/00.render'
// console.log(">", CurrentStep['App'])
if ( CurrentStep['App'] ) {
	const App = CurrentStep['App']
	let AppContainer = document.getElementById("App")
	AppContainer.remove()
	AppContainer = document.createElement("div")
	AppContainer.setAttribute("id", "App")
	render(<App />, AppContainer);
}