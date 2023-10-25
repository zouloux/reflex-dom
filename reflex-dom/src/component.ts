import { LifecycleHandler, MountHandler, RenderFunction, VNode } from "./common";
import { IState } from "./states";
import { getCurrentComponent } from "./diff";

// ----------------------------------------------------------------------------- TYPES

export type TShouldUpdate <GProps extends object = object> = (newProps:GProps, oldProps:GProps) => boolean

export interface ComponentInstance <GProps extends object = object> {
	// --- Public members, not mangled
	vnode					:VNode
	isMounted				:boolean;
	children				?:VNode
	// --- Private members, will be mangled
	_shouldUpdate			?:TShouldUpdate
	_proxy					?:object
	_propState				?:IState<GProps>
	_render					:RenderFunction
	_mountHandlers			:MountHandler[]
	_renderHandlers			:LifecycleHandler[]	// Called after each render
	_nextRenderHandlers		:(() => any)[] 		// Called after next render only, then removed
	_unmountHandlers		:LifecycleHandler[]
	_defaultProps			?:Partial<GProps>
}

// ----------------------------------------------------------------------------- EXTENSIONS

/**
 * FACTORY COMPONENTS ONLY
 * Handler is called when component is mounted, rendered, and added to the DOM.
 * Can return an unmount handler, or a list of unmount handler.
 * Can be asynchronous but without return.
 * @param handler
 */
export function mounted ( handler:MountHandler ) {
	getCurrentComponent()?._mountHandlers.push( handler )
}

/**
 * FACTORY COMPONENTS ONLY
 * Handler is called when component is unmounted, just before removed from the DOM.
 * Can be asynchronous.
 */
export function unmounted ( handler:LifecycleHandler ) {
	getCurrentComponent()?._unmountHandlers.push( handler )
	return handler
}

/**
 * FACTORY COMPONENTS ONLY
 * Handler is called just after component is rendered.
 * Can be asynchronous.
 */
export function rendered ( handler:LifecycleHandler ) {
	getCurrentComponent()?._renderHandlers.push( handler )
}

// ----------------------------------------------------------------------------- DEFAULT PROPS

/**
 * Set default props
 * TODO : OPTIMIZE - 0%
 * @param props Props object from first argument.
 * @param defaults Defaults to inject into props.
 */
export function defaultProps <
	GProps extends object,
	GDefaults extends Partial<GProps>,
> ( props:GProps, defaults:GDefaults ) {
	const component = getCurrentComponent()
	//component.vnode.value.defaultProps = defaults
	component._defaultProps = defaults
	if ( component._propState )
		props = component._propState.peek() as GProps
	for ( let i in defaults )
		if ( !(i in props) )
			// @ts-ignore
			props[ i ] = defaults[ i ]
}

/**
 * Optimize rendering by providing a shouldUpdate handler.
 * This handler will have old and new props as argument, and should return :
 * - false to keep current step and skip next rendering
 * - true to re-render the component with the new props.
 * Set handler to false as a shorthand to never update this component again when props changes.
 * @param handler
 */
export function shouldUpdate
	<GProps extends object = any>
	( handler:TShouldUpdate<GProps>|boolean )
{
	// Assign the shouldUpdate to the function, and not the component
	// Can assign it only once
	return getCurrentComponent()._shouldUpdate ??= (
		typeof handler === "boolean"
		? () => handler
		: handler as TShouldUpdate
	)
}


export const shallowPropsCompare = ( a:object, b:object ) => (
	// Same amount of properties ?
	Object.keys( a ).length === Object.keys( b ).length
	// Every property exists in other object ?
	&& Object.keys( a ).every( key => b.hasOwnProperty(key) && a[key] === b[key] )
)

// Shallow compare two objects, applied only for props between new and old virtual nodes.
// Will not compare "children" which is always different
// https://esbench.com/bench/62a138846c89f600a5701904
// TODO : re-bench against with for i in loop (test small and huge props)
// TODO : Keep in lib ? Delete ? Keep as optional but remove as default behavior ?
/*

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
							c.type !== 6/!*ELEMENT*!/
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
*/
