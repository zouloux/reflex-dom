import { createStateObservable, IStateObservable, TInitialValue } from "./observable";
import { diffNode, getHookedComponent } from "./diff";
import { ComponentInstance } from "./index";
import { cloneVNode, createVNode } from "./jsx";



let invalidateTimeout;

let componentsToUpdate:ComponentInstance[] = []

function updateDirtyComponents () {
	invalidateTimeout = null
	componentsToUpdate.map( component => {
		// Clone old to a new virtual node
		const newVNode = cloneVNode( component.vnode )
		console.log( newVNode );
		diffNode( component.vnode.dom.parentElement as Element, newVNode, component.vnode )
	})
	componentsToUpdate = []
}

export function invalidateComponent ( component:ComponentInstance ) {
	if ( component.isDirty )
		return;
	component.isDirty = true
	componentsToUpdate.push( component )
	if ( !invalidateTimeout )
		invalidateTimeout = window.setTimeout( updateDirtyComponents, 0 )
}


export function createState<GType> ( initialValue?:TInitialValue<GType> ):IStateObservable<GType> {
	const componentInstance = getHookedComponent()
	const observable = createStateObservable( initialValue, () => invalidateComponent( componentInstance ) )
	// TODO
	// componentInstance.__observables.push( observable )
	return observable
}
