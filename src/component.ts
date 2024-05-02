import { _browseKeys, LifecycleHandler, MountHandler, RenderFunction, VNode } from "./common";
import { IState } from "./states";
import { getCurrentComponent } from "./diff";

// ----------------------------------------------------------------------------- TYPES

export type TShouldUpdate <GProps extends object = object> = (newProps:GProps, oldProps:GProps) => boolean

export interface ComponentInstance <GProps extends object = object> {
	// --- Public members, not mangled
	vnode						:VNode
	isMounted					:boolean;
	children					:VNode
	// --- Private members, will be mangled
	_shouldUpdate				:TShouldUpdate
	_defaultProps				?:Partial<GProps>
	//
	_proxy						:object
	_propState					:IState<GProps>
	//
	_render						:RenderFunction
	//
	_mountHandlers				:MountHandler[]
	// _renderHandlers				:LifecycleHandler[]	// Called after each render
	_beforeNextRenderHandlers	:(() => any)[] 		// Called before next render only, then removed
	_afterNextRenderHandlers	:(() => any)[] 		// Called after next render only, then removed
	_unmountHandlers			:LifecycleHandler[]
}

// ----------------------------------------------------------------------------- EXTENSIONS

/**
 * FACTORY COMPONENTS ONLY EXTENSION
 * Handler is called when component is mounted, rendered, and added to the DOM.
 * Can return an unmount handler, or a list of unmount handler.
 * Can be asynchronous but without return.
 * @param handler
 */
export function mounted ( handler:MountHandler ) {
	getCurrentComponent()?._mountHandlers.push( handler )
}

/**
 * FACTORY COMPONENTS ONLY EXTENSION
 * Handler is called when component is unmounted, just before removed from the DOM.
 * Can be asynchronous.
 */
export function unmounted ( handler:LifecycleHandler ) {
	getCurrentComponent()?._unmountHandlers.push( handler )
	return handler
}

/**
 * FACTORY COMPONENTS ONLY EXTENSION
 * Handler is called just after component is rendered.
 * Can be asynchronous.
 */
// export function rendered ( handler:LifecycleHandler ) {
// 	getCurrentComponent()?._renderHandlers.push( handler )
// }

// ----------------------------------------------------------------------------- DEFAULT PROPS

/**
 * UNIVERSAL EXTENSION
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
	// Set it only once to be compatible with factory and functional components
	if ( !component._defaultProps ) {
		component._defaultProps = defaults
		if ( component._propState )
			props = component._propState.peek() as GProps
		_browseKeys( defaults, name => {
			if ( !(name in props) )
				// @ts-ignore
				props[ name ] = defaults[ name ]
		})
	}
}

/**
 * UNIVERSAL EXTENSION
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
	// Can assign it only once to be compatible with factory and functional components
	return getCurrentComponent()._shouldUpdate ??= (
		typeof handler === "boolean"
		? () => handler
		: handler as TShouldUpdate
	)
}

/**
 * Default compare props function.
 * Will only check for first level strict equality between objects A and B.
 * @see performances-helpers.ts advancedPropsCompare() to compare deeply
 */
export const shallowPropsCompare = ( a:object, b:object ) => (
	// Same amount of properties ?
	Object.keys( a ).length === Object.keys( b ).length
	// Every property exists in other object ?
	&& Object.keys( a ).every( key => b.hasOwnProperty(key) && a[key] === b[key] )
)