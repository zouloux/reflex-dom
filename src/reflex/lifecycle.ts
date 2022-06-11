import { getHookedComponent } from "./diff";
import { LifecycleHandler, MountHandler } from "./index";


export function mounted ( handler:MountHandler ) {
	const component = getHookedComponent()
	component.mountHandlers.push( handler )
}

export function unmounted ( handler:LifecycleHandler ) {
	const component = getHookedComponent()
	component.unmountHandlers.push( handler )
}

// TODO : Updated / observe / props as proxy / etc ...
