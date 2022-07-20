import {
	ComponentFunction, LifecycleHandler, MountHandler, RenderFunction,
	_TEXT_NODE_TYPE_NAME, VNode
} from "./common";
import { createPropsProxy, IPropsProxy } from "./props";

// ----------------------------------------------------------------------------- TYPES

export interface ComponentInstance <GProps extends object = object> { // FIXME : Generics ?
	vnode				:VNode<null, ComponentFunction>
	name				:string
	isFactory			?:boolean
	isMounted			:boolean;
	_isDirty			?:boolean
	_render				?:RenderFunction
	_propsProxy			?:IPropsProxy<GProps>
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
export function _createComponentInstance ( vnode:VNode<null, ComponentFunction> ):ComponentInstance {
	return {
		vnode,
		_propsProxy: createPropsProxy( vnode.props ),
		_isDirty: false,
		isMounted: false,
		name: vnode.type.name,
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
		// if ( _typeof(mountedReturn, "f") )
		if ( typeof mountedReturn == "function" )
			component._unmountHandlers.push( mountedReturn )
	})
	// Reset mount handlers, no need to keep them
	component._mountHandlers = []
	component.isMounted = true;
}

export function _unmountComponent ( component:ComponentInstance ) {
	component._unmountHandlers.map( h => h.apply( component, [] ) )
	// component._observables.map( o => o.dispose() )
	// FIXME : Do we need to do this ? Is it efficient or is it just noise ?
	//delete component.vnode
	// delete component.propsProxy
	delete component._mountHandlers;
	delete component._renderHandlers;
	delete component._unmountHandlers;
	delete component._afterRenderHandlers;
	// delete component._observables
	component.isMounted = false;
}

export function _recursivelyUpdateMountState ( node:VNode, doMount:boolean ) {
	if ( node.type != _TEXT_NODE_TYPE_NAME ) {
		node.props.children.forEach( c => {
			if ( c )
				_recursivelyUpdateMountState(c, doMount)
		})
		if ( node._component )
			doMount ? _mountComponent( node._component ) : _unmountComponent( node._component )
	}
}