import { _dispatch, ComponentFunction, LifecycleHandler, MountHandler, RenderFunction, VNode } from "./common";
import { IState } from "./states";
import { getCurrentComponent } from "./diff";

// ----------------------------------------------------------------------------- TYPES

export type TShouldUpdate <GProps extends object = object> = (newProps:GProps, oldProps:GProps) => boolean

export interface ComponentInstance <GProps extends object = object> { // FIXME : Other generics ?
	// --- Public members, not mangled
	vnode					:VNode<GProps, ComponentFunction>
	name					:string
	isMounted				:boolean;
	children				?:VNode
	shouldUpdate			?:TShouldUpdate<GProps>
	// --- Private members, will be mangled
	// _shouldUpdate			?:TShouldUpdate<GProps>
	_proxy					?:object
	_propState				?:IState<GProps>
	_render					:RenderFunction
	_mountHandlers			:MountHandler[]
	_renderHandlers			:LifecycleHandler[]	// Called after each render
	_nextRenderHandlers		:(() => any)[] 		// Called after next render only, then removed
	_unmountHandlers		:LifecycleHandler[]
	_defaultProps			?:Partial<GProps>

	// FIXME :
	// _hmrStates				?:any[]
	// _hmrStateIndex			?:number
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
		_render: vnode.value as RenderFunction,
		_mountHandlers: [],
		_renderHandlers: [],
		_nextRenderHandlers: [],
		_unmountHandlers: [],
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
		else if ( Array.isArray( mountedReturn ) )
			mountedReturn.filter( v => v ).map( h => component._unmountHandlers.push( h ) )
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
 * 	Dom is not ready, sometimes parent is not there (orphan child) ?
 * 	Need to check and test this !
 */

export function recursivelyUpdateMountState ( node:VNode, doMount:boolean ) {
	if ( node.type === 7/*COMPONENTS*/ ) {
		if ( node.component )
			recursivelyUpdateMountState( node.component.children, doMount )
		doMount ? _mountComponent( node.component ) : _unmountComponent( node.component )
	}
	else if ( node.type > 4/*CONTAINERS*/ ) {
		const total = node.props.children.length
		for ( let i = 0; i < total; ++i )
			recursivelyUpdateMountState( node.props.children[ i ], doMount )
	}
}

// ----------------------------------------------------------------------------- EXTENSIONS

export function mounted ( handler:MountHandler ) {
	// FIXME : In dev mode, maybe check if component is mounted ?
	getCurrentComponent()?._mountHandlers.push( handler )
}

export function unmounted ( handler:LifecycleHandler ) {
	// FIXME : In dev mode, maybe check if component is mounted ?
	getCurrentComponent()?._unmountHandlers.push( handler )
	return handler
}

export function rendered ( handler:LifecycleHandler ) {
	// FIXME : In dev mode, maybe check if component is mounted ?
	// FIXME : transform to async MountHandler ?
	getCurrentComponent()?._renderHandlers.push( handler )
}

export function afterNextRender ( handler:LifecycleHandler ) {
	// FIXME : In dev mode, maybe check if component is mounted ?
	getCurrentComponent()?._nextRenderHandlers.push( handler )
}

// ----------------------------------------------------------------------------- DEFAULT PROPS

export function defaultProps <
	GProps extends object,
	GDefaults extends Partial<GProps>,
> ( props:GProps, defaults:GDefaults ) {
	const c = getCurrentComponent()
	c._defaultProps = defaults
	if ( c._propState )
		props = c._propState.peek() as GProps
	for ( let i in defaults )
		if ( !(i in props) )
			// @ts-ignore
			props[ i ] = defaults[ i ]
}


const _noUpdate:TShouldUpdate = (a, b) => false

export const shouldUpdate = ( handler:TShouldUpdate|boolean ) =>
	getCurrentComponent().shouldUpdate = handler === false ? _noUpdate : handler as TShouldUpdate


// Shallow compare two objects, applied only for props between new and old virtual nodes.
// Will not compare "children" which is always different
// https://esbench.com/bench/62a138846c89f600a5701904
// TODO : re-bench against with for i in loop (test small and huge props)

/**
 * TODO : DOC
 */

export const shallowPropsCompare = ( a:object, b:object, childrenCheck = true ) => (
	// Same amount of properties ?
	Object.keys( a ).length === Object.keys( b ).length
	// Every property exists in other object ?
	&& Object.keys( a ).every( key =>
		( childrenCheck && key === "children" ) ? (
			// Same array instances -> we validate directly without browsing children
			a[ key ] === b[ key ]
			// Two empty arrays -> we validate directly without browsing children
			|| ( (a as any[]).length === 0 && (b as any[]).length === 0 )
			// We need to check deeper
			|| (
				// check if children props exists on props b
				b[ key ]
				// Both children array must have the same length
				&& a[ key ].length === b[ key ].length
				// Browse children and check types on every child
				// If any child does not have the same type
				// We halt the search
				&& !a[ key ].find( (c, i) => {
					const d = b[ key ][ i ]
					// Here we inverted condition to match diff.ts checks
					// Condition is -> check if same nodes types
					// Find is -> halt when any node type differs (so, the inverse)
					return !(
						c.type === d.type
						&& (
							c.type !== 6/*ELEMENT*/
							|| c.value === d.value
						)
					)
				})
			)
		)
		// Prop check between a and b objects
		: b.hasOwnProperty(key) && a[key] === b[key]
	)
)