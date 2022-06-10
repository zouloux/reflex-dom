import { createStateObservable, IStateObservable, TInitialValue } from "./observable";
import { diffNode, getHookedComponent } from "./diff";
import { ComponentInstance } from "./index";
import { trackPerformances } from "./debug";


let componentsToUpdate:ComponentInstance[] = []


const microtask = ( window.queueMicrotask ?? (h => window.setTimeout( h, 0 )) )

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


export function createState<GType> ( initialValue?:TInitialValue<GType> ):IStateObservable<GType> {
	const componentInstance = getHookedComponent()
	const observable = createStateObservable( initialValue, () => invalidateComponent( componentInstance ) )
	// TODO : Register all observables so the component can be cleaned
	// componentInstance.__observables.push( observable )
	return observable
}
