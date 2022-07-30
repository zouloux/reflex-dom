import {
	_VNodeTypes_CONTAINERS, ComponentFunction, INodeEnv, LifecycleHandler, MountHandler,
	RenderFunction, VNode
} from "./common";
import { _createPropsProxy, IPropsProxy } from "./props";

// ----------------------------------------------------------------------------- TYPES

export interface ComponentInstance <GProps extends object = object> { // FIXME : Generics ?
	vnode				:VNode<GProps, ComponentFunction>
	name				:string
	isMounted			:boolean;
	methods				:Record<string, Function>
	_isDirty			?:boolean
	_propsProxy			:IPropsProxy<GProps>
	_render				:RenderFunction
	_mountHandlers		:MountHandler[]
	_renderHandlers		:LifecycleHandler[]
	_unmountHandlers	:LifecycleHandler[]
	_affectedNodesByStates	:VNode[][]
	_isRendering			:boolean
	_afterRenderHandlers	:any[]
	_defaultProps			?:Partial<GProps>
	_componentAPI 		:IComponentAPI<GProps>
}

export interface IComponentAPI <GProps extends object = object> {
	defaultProps		?:Partial<GProps>
	shouldUpdate		?: (newProps:GProps, oldProps:GProps) => boolean
}

// ----------------------------------------------------------------------------- CREATE COMPONENT INSTANCE

// Optimize it in a function @see jsx.ts/createVNode()
export function _createComponentInstance
	<GProps extends object = object>
	( vnode:VNode<GProps, ComponentFunction> )
	:ComponentInstance
{
	const component = {
		vnode,
		_propsProxy: (
			( vnode.value.isFactory || vnode.value.isFactory === undefined )
			? _createPropsProxy( vnode.props ) : null
		),
		name: (vnode.value as RenderFunction).name,
		isMounted: false,
		methods: {},
		_isDirty: false,
		_render: vnode.value as RenderFunction,
		_mountHandlers: [],
		_renderHandlers: [],
		_unmountHandlers: [],
		_afterRenderHandlers: [],
		_affectedNodesByStates: [],
		_isRendering: false,
		_defaultProps: {},
		// Component API is given to every functional or factory component
		_componentAPI: {
			get defaultProps () { return component._defaultProps },
			// FIXME : Move to props.ts ?
			set defaultProps ( value:Partial<GProps> ) {
				// Register default props for the getter
				component._defaultProps = value
				// If we have a proxy
				if ( component._propsProxy ) {
					// Get current props from proxy as plain browsable object
					// Override props on proxy with defaults on a new object
					component._propsProxy.set(
						Object.assign({}, value as GProps, component._propsProxy.get())
					)
				}
				// Otherwise, we are on a plain object that we'll have to mutate
				else {
					// Get props object instance from current virtual node
					const { props } = component.vnode
					// Browse default, and inject them if it does not exist on props
					for ( let i in value )
						if ( !props.hasOwnProperty(i) || props[ i ] == null )
							// @ts-ignore - FIXME : Type error
							props[ i ] = value[ i ]
				}
			}
		}
	}
	return component;
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
	component.isMounted = false;
	// Cut component branch from virtual node to allow GC to destroy component
	delete component.vnode._component
	delete component.vnode
	// FIXME : Do we need to do this ? Is it efficient or is it just noise ?
	// delete component.vnode
	// delete component.propsProxy
	// delete component._mountHandlers;
	// delete component._renderHandlers;
	// delete component._unmountHandlers;
	// delete component._afterRenderHandlers;
	// delete component.methods
	// delete component._componentAPI
	// delete component._observables
	// TODO : Remove all listeners ?
}

export function _recursivelyUpdateMountState ( node:VNode, doMount:boolean ) {
	if ( node.type > _VNodeTypes_CONTAINERS ) {
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