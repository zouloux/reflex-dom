import { ComponentFunction, LifecycleHandler, MountHandler, RenderFunction, VNode, VNodeTypes } from "./common";
import { createPropsProxy, IPropsProxy } from "./props";
import { _DOM_PRIVATE_LISTENERS_KEY } from "./diff";

// ----------------------------------------------------------------------------- TYPES

export interface ComponentInstance <GProps extends object = object> { // FIXME : Generics ?
	vnode				:VNode<GProps, ComponentFunction>
	name				:string
	isFactory			?:boolean
	isMounted			:boolean;
	_isDirty			?:boolean
	_propsProxy			:IPropsProxy<GProps>
	_render				:RenderFunction
	_mountHandlers		:MountHandler[]
	_renderHandlers		:LifecycleHandler[]
	_unmountHandlers	:LifecycleHandler[]
	//_observables		:IStateObservable<any>[]
	_affectedNodesByStates	:VNode[][]
	_isRendering			:boolean
	_afterRenderHandlers	:any[]
	// TODO : Imperative handlers ?
}

// ----------------------------------------------------------------------------- CREATE COMPONENT INSTANCE

// Optimize it in a function @see jsx.ts/createVNode()
export function _createComponentInstance
	<GProps extends object = object>
	( vnode:VNode<GProps, ComponentFunction> )
	:ComponentInstance
{
	return {
		vnode,
		_propsProxy: createPropsProxy( vnode.props ),
		name: (vnode.value as RenderFunction).name,
		isMounted: false,
		_isDirty: false,
		_render: vnode.value as RenderFunction,
		_mountHandlers: [],
		_renderHandlers: [],
		_unmountHandlers: [],
		// _observables: [],
		_affectedNodesByStates: [],
		_isRendering: false,
		_afterRenderHandlers: []
	}
}
// ----------------------------------------------------------------------------- MOUNT / UNMOUNT

export function _mountComponent ( component:ComponentInstance ) {
	// Call every mount handler and store returned unmount handlers
	component._mountHandlers.map( handler => {
		const mountedReturn = handler.apply( component, [] );
		if ( typeof mountedReturn == "function" )
			component._unmountHandlers.push( mountedReturn )
	})
	// Reset mount handlers, no need to keep them
	component._mountHandlers = []
	component.isMounted = true;
}

export function _unmountComponent ( component:ComponentInstance ) {
	// TODO : While optim ? Do bench !
	component._unmountHandlers.forEach( h => h.apply( component, [] ) )
	// component._observables.map( o => o.dispose() )
	// FIXME : Do we need to do this ? Is it efficient or is it just noise ?
	// delete component.vnode
	// delete component.propsProxy
	delete component._mountHandlers;
	delete component._renderHandlers;
	delete component._unmountHandlers;
	delete component._afterRenderHandlers;
	// delete component._observables
	component.isMounted = false;
	// TODO : Remove all listeners
}

export function _recursivelyUpdateMountState ( node:VNode, doMount:boolean ) {
	if ( node.type > VNodeTypes._NEXT_ARE_CONTAINERS ) {
		// TODO : While optim ? Do bench !
		node.props.children.forEach( child => {
			// FIXME : Is it necessary ?
			// Remove all event listeners
			// if ( child.type === VNodeTypes.ELEMENT ) {
			// 	const listeners = child.dom[ _DOM_PRIVATE_LISTENERS_KEY ]
			// 	Object.keys( listeners ).forEach( event => {
			// 		console.log( event )
			// 		child.dom.removeEventListener
			// 	})
			// }
			_recursivelyUpdateMountState( child, doMount )
		})
		if ( node._component )
			doMount ? _mountComponent( node._component ) : _unmountComponent( node._component )
	}
}