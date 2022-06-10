import { createStateObservable, IStateObservable, TInitialValue } from "./observable";
import { diffNode, getHookedComponent } from "./diff";
import { ComponentInstance, microtask, ReflexError } from "./index";
import { trackPerformances } from "./debug";

// ----------------------------------------------------------------------------- INVALIDATION

let componentsToUpdate:ComponentInstance[] = []
function updateDirtyComponents () {
	const p = trackPerformances("Update dirty components")
	// TODO : Update with depth ! Deepest first ? Or last ?
	componentsToUpdate.map( component => {
		diffNode( component.vnode, component.vnode )
	})
	componentsToUpdate = []
	p();
}

export function invalidateComponent ( component:ComponentInstance ) {
	if ( componentsToUpdate.length === 0 )
		microtask( updateDirtyComponents );
	// Invalidate this component once
	if ( component.isDirty )
		return;
	component.isDirty = true
	// Store it into the list of dirty components
	componentsToUpdate.push( component )
	// TODO : Add queue task
}

// ----------------------------------------------------------------------------- REF & REFS

export function ref () {

}
export function refs () {

}

// ----------------------------------------------------------------------------- STATE

export function state <GType> ( initialValue?:TInitialValue<GType> ):IStateObservable<GType> {
	const componentInstance = getHookedComponent()
	const observable = createStateObservable( initialValue, () => invalidateComponent( componentInstance ) )
	// TODO : Register all observables so the component can be cleaned
	// componentInstance.__observables.push( observable )
	return observable
}

// ----------------------------------------------------------------------------- STORE

interface IBasicStore <GStore extends object, GReducers> {
	value		:GStore
	dispatch	:(reducerName:GReducers, ...rest) => any|void
}

type Reducer = (...rest) => void

export function createBasicStore
	<GStore extends object, GReducers extends Record<string, Reducer>>
	( initialValue:GStore, reducers:GReducers )
{
	// const componentInstance = getHookedComponent()
	// const observable = createStateObservable( initialValue, () => invalidateComponent( componentInstance ) )
	// return observable
	return {

	}
}

export function store ( storeObject ) {

}