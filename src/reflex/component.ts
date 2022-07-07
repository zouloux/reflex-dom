import {
	ComponentFunction, _flattenChildren, LifecycleHandler,
	MountHandler, RenderFunction,
	_TEXT_NODE_TYPE_NAME, VNode, _typeof
} from "./common";
import { IStateObservable } from "@zouloux/signal";

// ----------------------------------------------------------------------------- TYPES

export interface ComponentInstance { // FIXME : Generics ?
	vnode				:VNode<null, ComponentFunction>
	name				:string
	isFactory			?:boolean
	isMounted			:boolean;
	_isDirty			?:boolean
	_render				?:RenderFunction
	_propsProxy			?:IPropsProxy<any>
	_mountHandlers		:MountHandler[]
	_renderHandlers		:LifecycleHandler[]
	_unmountHandlers	:LifecycleHandler[]
	_observables		:IStateObservable<any>[]
	// TODO : Imperative handlers ?
}

// ----------------------------------------------------------------------------- CREATE COMPONENT INSTANCE

// Optimize it in a function @see jsx.ts/createVNode()
export function createComponentInstance ( vnode:VNode<null, ComponentFunction> ):ComponentInstance {
	return {
		vnode,
		_propsProxy: createPropsProxy( vnode.props ),
		_isDirty: false,
		isMounted: false,
		name: vnode.type.name,
		_mountHandlers: [],
		_renderHandlers: [],
		_unmountHandlers: [],
		_observables: [],
	}
}

// ----------------------------------------------------------------------------- PROPS PROXY
// Props proxy exists because we need a way to get updated props in a factory
// component. Because factory function is executed once, props object passed
// as first argument cannot be updated. Proxy helps us here because it will
// allow us to mock props but with every props updated.
// A caveat is that props is not iterable because proxy is a dynamic key / value
// object. Not really concerning because it makes no sense to iterate over
// a props object.

export interface IPropsProxy <GType> {
	readonly value:GType
	set ( newValue:GType ) : void
}

function createPropsProxy <GProps> ( props:GProps ) : IPropsProxy<GProps> {
	const proxy = new Proxy({}, {
		// When request a prop, check on props object if it exists
		get ( target:{}, propName:string|symbol ):any {
			return ( propName in props ? props[ propName ] : void 0 )
		},
		// Disallow set on props
		set () {
			if ( process.env.NODE_ENV == "production" ) return false
			throw new Error(`Reflex - PropsProxy.set // Setting values to props manually is not allowed.`)
		}
	})
	return {
		// Get the proxy object typed as a GProps object
		get value () { return proxy as GProps },
		// This method will set new props object (we override first argument of createPropsProxy)
		set ( newProps:GProps ) { props = newProps }
	}
}

// ----------------------------------------------------------------------------- MOUNT / UNMOUNT

export function mountComponent ( component:ComponentInstance ) {
	// Call every mount handler and store returned unmount handlers
	component._mountHandlers.map( handler => {
		const mountedReturn = handler.apply( component, [] );
		if ( _typeof(mountedReturn, "f") )
			component._unmountHandlers.push( mountedReturn )
	})
	// Reset mount handlers, no need to keep them
	component._mountHandlers = []
	component.isMounted = true;
}

export function unmountComponent ( component:ComponentInstance ) {
	component._unmountHandlers.map( h => h.apply( component, [] ) )
	component._observables.map( o => o.dispose() )
	// FIXME : Do we need to do this ? Is it efficient or is it just noise ?
	//delete component.vnode
	// delete component.propsProxy
	delete component._mountHandlers;
	delete component._renderHandlers;
	delete component._unmountHandlers;
	delete component._observables
	component.isMounted = false;
}

export function recursivelyUpdateMountState ( node:VNode, doMount:boolean ) {
	if ( node.type == _TEXT_NODE_TYPE_NAME ) return
	_flattenChildren( node ).map( c => c && recursivelyUpdateMountState(c, doMount) )
	if ( node._component )
		doMount ? mountComponent( node._component ) : unmountComponent( node._component )
}