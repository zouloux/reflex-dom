import {
	_dispatch, _VNodeTypes_CONTAINERS, ComponentFunction, LifecycleHandler,
	MountHandler, RenderFunction, VNode
} from "./common";

// ----------------------------------------------------------------------------- TYPES

export interface ComponentInstance <GProps extends object = object> { // FIXME : Generics ?
	vnode				:VNode<GProps, ComponentFunction>
	name				:string
	isMounted			:boolean;
	children			?:VNode
	shouldUpdate		?: (newProps:GProps, oldProps:GProps) => boolean

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

export interface IComponentAPI <GProps extends object = object> {
	// defaultProps		?:Partial<GProps>
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

export function recursivelyUpdateMountState ( node:VNode, doMount:boolean ) {
	if ( node.type > _VNodeTypes_CONTAINERS ) {
		const total = node.props.children.length
		for ( let i = 0; i < total; ++i ) {
			const child = node.props.children[ i ]
			recursivelyUpdateMountState( child, doMount )
			// FIXME : Is it necessary ?
			// Remove all event listeners
			// if ( child.type === VNodeTypes.ELEMENT ) {
			// 	const listeners = child.dom[ _DOM_PRIVATE_LISTENERS_KEY ]
			// 	Object.keys( listeners ).forEach( event => {
			// 		console.log( event )
			// 		child.dom.removeEventListener
			// 	})
			// }
		}
		if ( node.component )
			doMount ? _mountComponent( node.component ) : _unmountComponent( node.component )
	}
}