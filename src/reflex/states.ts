import { _diffNode, getCurrentComponent } from "./diff";
import { invalidateComponent } from "./render";

// ----------------------------------------------------------------------------- INITIAL VALUE

export type TInitialValue<GType> = GType | ((oldValue?:GType) => GType)

export const _prepareInitialValue = <GType> ( initialValue:TInitialValue<GType>, oldValue?:GType ) => (
	typeof initialValue == "function" ? ( initialValue as (oldValue?:GType) => GType )(oldValue) : initialValue as GType
)

// ----------------------------------------------------------------------------- STATE TYPES

export type IState<GType> = {
	value:GType
	set ( newValue:TInitialValue<GType> ):Promise<void>
}

interface IStateOptions<GType> {
	filter				?:(newValue:GType, oldValue:GType) => GType,
	directInvalidation	?:boolean
}

// ----------------------------------------------------------------------------- STATE

export function state <GType> (
	initialValue	?:TInitialValue<GType>,
	stateOptions	:Partial<IStateOptions<GType>> = {}
):IState<GType> {
	// Prepare initial value if it's a function
	initialValue = _prepareInitialValue( initialValue )
	// Get current extended component
	const component = getCurrentComponent()

	// const affectedNodesIndex = component._affectedNodesByStates.push([]) - 1

	// Set value and invalidate or render component
	function _setAndInvalidate ( newValue:GType, resolve?:Function ) {
		initialValue = stateOptions.filter ? stateOptions.filter( newValue, initialValue as GType ) : newValue
		if ( stateOptions.directInvalidation ) {
			_diffNode( component.vnode, component.vnode )
			resolve?.();
		}
		else {
			resolve && component._afterRenderHandlers.push( resolve )
			invalidateComponent( component )
		}
	}

	// Return public API with value get/set and set function
	return {
		get value () {
			// if ( component._isRendering ) {
			// 	addDataListenerForNextNode( node => {
			// 		console.log('>', component._affectedNodesByStates[affectedNodesIndex].length, node)
			// 		component._affectedNodesByStates[affectedNodesIndex].push( node )
			// 	})
			// }
			return initialValue as GType
		},
		set value ( newValue:GType ) { _setAndInvalidate( newValue ) },
		set: ( newValue:TInitialValue<GType> ) => new Promise(
			resolve => _setAndInvalidate( _prepareInitialValue<GType>( newValue, initialValue as GType ), resolve )
		)
	}
}