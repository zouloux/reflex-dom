import { getHookedComponent } from "./diff";
import { invalidateComponent } from "./render";
import {
	createAsyncObservable, createStateObservable, IAsyncObservable,
	IStateObservable, TInitialValue
} from "./observable";

// ----------------------------------------------------------------------------- STATE

export function state <GType> ( initialValue?:TInitialValue<GType> ):IStateObservable<GType> {
	const component = getHookedComponent()
	const observable = createStateObservable( initialValue, () => invalidateComponent( component ) )
	component.observables.push( observable )
	return observable
}

// ----------------------------------------------------------------------------- ASTNC STATE

export function asyncState <GType> ( initialValue?:TInitialValue<GType> ):IAsyncObservable<GType> {
	const component = getHookedComponent()
	// TODO : Implement this
	const observable = createAsyncObservable( initialValue, () => invalidateComponent( component ) )
	// TODO : We may need cancellable Promises. Maybe just use reject ? And throw errors in legacy mode.
	component.observables.push( observable )
	return observable
}