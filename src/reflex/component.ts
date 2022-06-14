import {
	ComponentFunction, LifecycleHandler, MountHandler, RenderFunction,
	TEXT_NODE_TYPE_NAME, VNode
} from "./index";
import { createPropsProxy, IPropsProxy } from "./props";
import { flattenChildren } from "./diff";
import { IStateObservable } from "./observable";

// ----------------------------------------------------------------------------- TYPES

export interface ComponentInstance { // FIXME : Generics ?
	vnode			:VNode<null, ComponentFunction>
	name			:string
	isFactory		?:boolean
	render			?:RenderFunction
	propsProxy		?:IPropsProxy<any>
	isDirty			?:boolean
	isMounted		:boolean;
	mountHandlers	:MountHandler[]
	renderHandlers	:LifecycleHandler[]
	unmountHandlers	:LifecycleHandler[]
	observables		:IStateObservable<any>[]
	// TODO : Imperative handlers ?
}

// ----------------------------------------------------------------------------- CREATE COMPONENT INSTANCE

// Optimize it in a function @see jsx.ts/createVNode()
export function createComponentInstance ( vnode:VNode<null, ComponentFunction> ):ComponentInstance {
	return {
		vnode,
		propsProxy: createPropsProxy( vnode.props ),
		isDirty: false,
		isMounted: false,
		name: vnode.type.name,
		mountHandlers: [],
		renderHandlers: [],
		unmountHandlers: [],
		observables: [],
	}
}

// ----------------------------------------------------------------------------- MOUNT / UNMOUNT

export function mountComponent ( component:ComponentInstance ) {
	// Call every mount handler and store returned unmount handlers
	component.mountHandlers.map( handler => {
		const mountedReturn = handler.apply( component, [] );
		if ( typeof mountedReturn === "function" )
			component.unmountHandlers.push( mountedReturn )
	})
	// Reset mount handlers, no need to keep them
	component.mountHandlers = []
	component.isMounted = true;
}

export function unmountComponent ( component:ComponentInstance ) {
	component.unmountHandlers.map( h => h.apply( component, [] ) )
	component.observables.map( o => o.dispose() )
	// FIXME : Do we need to do this ? Is it efficient or is it just noise ?
	//delete component.vnode
	// delete component.propsProxy
	delete component.mountHandlers;
	delete component.renderHandlers;
	delete component.unmountHandlers;
	delete component.observables
	component.isMounted = false;
}

export function recursivelyUpdateMountState ( node:VNode, doMount:boolean ) {
	if ( node.type == TEXT_NODE_TYPE_NAME ) return
	flattenChildren( node ).map( c => c && recursivelyUpdateMountState(c, doMount) )
	if ( node.component )
		doMount ? mountComponent( node.component ) : unmountComponent( node.component )
}