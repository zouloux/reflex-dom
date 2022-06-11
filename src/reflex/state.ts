import { createStateObservable, IStateObservable, TInitialValue } from "../signal/observable";
import { getHookedComponent } from "./diff";
import { invalidateComponent } from "./render";

// ----------------------------------------------------------------------------- STATE

export function state <GType> ( initialValue?:TInitialValue<GType> ):IStateObservable<GType> {
	const componentInstance = getHookedComponent()
	const observable = createStateObservable( initialValue, () => invalidateComponent( componentInstance ) )
	// TODO : Register all observables so the component can be cleaned
	// componentInstance.__observables.push( observable )
	return observable
}
