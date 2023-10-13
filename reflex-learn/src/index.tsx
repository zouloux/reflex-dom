import { $, onReady } from "yadl";
import { h, render } from "reflex-dom";
import { App } from "./components/App";
import "./index.less"

onReady().then( () => {
	render(<App />, $('#App'))
})