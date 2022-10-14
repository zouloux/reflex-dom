import { _dispatch, ComponentFunction, LifecycleHandler, MountHandler, RenderFunction, VNode } from "./common";
import { getCurrentComponent } from "./diff";

// ----------------------------------------------------------------------------- TYPES

type TShouldUpdate <GProps extends object = object> = (newProps:GProps, oldProps:GProps) => boolean

export interface ComponentInstance <GProps extends object = object> { // FIXME : Generics ?
	// FIXME : How to type component method's ?
	vnode				:VNode<GProps, ComponentFunction>
	name				:string
	isMounted			:boolean;
	children			?:VNode
	shouldUpdate		?:TShouldUpdate<GProps>
	// Private members, will be mangled
	_isDirty			?:boolean
	_props				?:GProps
	_render				:RenderFunction
	_mountHandlers		:MountHandler[]
	_renderHandlers		:LifecycleHandler[]
	_unmountHandlers	:LifecycleHandler[]
	_isRendering			:boolean
	_afterRenderHandlers	:any[]
	_defaultProps		?:Partial<GProps>
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
		name: (vnode.value as RenderFunction).name,
		isMounted: false,
		// Private members, will be mangled
		_props: {},
		_isDirty: false,
		_render: vnode.value as RenderFunction,
		_mountHandlers: [],
		_renderHandlers: [],
		_unmountHandlers: [],
		_afterRenderHandlers: [],
		_isRendering: false,
	}
}

/**
 * Should update extension
 * TODO : Add to doc
 */
export function shouldUpdate <GProps extends object = object> ( handler:TShouldUpdate<GProps> ) {
	getCurrentComponent().shouldUpdate = handler
}

// ----------------------------------------------------------------------------- MOUNT / UNMOUNT

export function _mountComponent ( component:ComponentInstance ) {
	// Call every mount handler and store returned unmount handlers
	const total = component._mountHandlers.length
	for ( let i = 0; i < total; ++i ) {
		const mountedReturn = component._mountHandlers[ i ].apply( component );
		if ( typeof mountedReturn === "function" )
			component._unmountHandlers.push( mountedReturn )
	}
	// Reset mount handlers, no need to keep them
	component._mountHandlers = []
	component.isMounted = true;
}

export function _unmountComponent ( component:ComponentInstance ) {
	_dispatch(component._unmountHandlers, component)
	component.isMounted = false;
	// Cut component branch from virtual node to allow GC to destroy component
	delete component.vnode.component
	delete component.vnode
	// FIXME : Do we need to do this ? Is it efficient or is it just noise ?
	// delete component.vnode
	// delete component._mountHandlers;
	// delete component._renderHandlers;
	// delete component._unmountHandlers;
	// delete component._afterRenderHandlers;
	// delete component.methods
	// delete component._observables
	// TODO : Remove all listeners ?
}

/**
 * TODO : There is a bug on mounted( () => { this.vnode.dom })
 * Dom is not ready, sometimes parent is not there (orphan child) ?
 * Need to check and test this !
 */

export function recursivelyUpdateMountState ( node:VNode, doMount:boolean ) {
	if ( node.type === 7/*COMPONENTS*/ ) {
		recursivelyUpdateMountState( node.component.children, doMount )
		doMount ? _mountComponent( node.component ) : _unmountComponent( node.component )
	}
	else if ( node.type > 4/*CONTAINERS*/ ) {
		const total = node.props.children.length
		for ( let i = 0; i < total; ++i )
			recursivelyUpdateMountState( node.props.children[ i ], doMount )
	}
}