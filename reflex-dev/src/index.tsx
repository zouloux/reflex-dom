import { startProps } from "./01.props";
import { onReady } from "yadl";
import { startStateHMR } from "./02.state-hmr";

onReady().then( () => {
	// startProps()
	startStateHMR()
})