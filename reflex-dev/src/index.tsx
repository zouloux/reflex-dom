import { startProps } from "./01.props";
import { onReady } from "yadl";
import { startStateHMR } from "./02.state-hmr";
import { startEffects } from "./03.effects";
import { startV20 } from "./00.v20/v20";

onReady().then( () => {
	// startProps()
	// startStateHMR()
	// startEffects();
	startV20();
})