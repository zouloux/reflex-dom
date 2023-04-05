import { startProps } from "./01.props";
import { onReady } from "yadl";
import { startStateHMR } from "./02.state-hmr";
import { startEffects } from "./03.effects";

onReady().then( () => {
	// startProps()
	// startStateHMR()
	startEffects();
})