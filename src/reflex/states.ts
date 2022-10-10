import { diffNode, getCurrentComponent } from "./diff";
import { invalidateComponent } from "./render";
import { _VNodeTypes_STATE, VNode, VNodeTypes } from "./common";

// ----------------------------------------------------------------------------- INITIAL VALUE

export type TInitialValue<GType> = GType | ((oldValue?:GType) => GType)

export const _prepareInitialValue = <GType> ( initialValue:TInitialValue<GType>, oldValue?:GType ) => (
	typeof initialValue == "function" ? ( initialValue as (oldValue?:GType) => GType )(oldValue) : initialValue as GType
)

// ----------------------------------------------------------------------------- STATE TYPES

export type IState<GType> = {
	value:GType
	set ( newValue:TInitialValue<GType> ):Promise<void>
	readonly type:VNodeTypes
	pushInvalidatedNode ( node:VNode ):void
	toString():string
}

interface IStateOptions<GType> {
	filter				?:(newValue:GType, oldValue:GType) => GType,
	directInvalidation	?:boolean
	// atomic				?:boolean
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

	let invalidatedNodes:VNode[] = []

	// const affectedNodesIndex = component._affectedNodesByStates.push([]) - 1

	// Set value and invalidate or render component
	function _setAndInvalidate ( newValue:GType, resolve?:Function ) {
		initialValue = stateOptions.filter ? stateOptions.filter( newValue, initialValue as GType ) : newValue

/*		if ( stateOptions.atomic ) {
			console.log('Invalidated nodes:')
			invalidatedNodes.forEach( n => console.log(n))
			invalidatedNodes.map( node => {
				//diffNode( node,  )
			})
			invalidatedNodes = []
			resolve?.();
		}*/

		if ( stateOptions.directInvalidation ) {
			diffNode( component.vnode, component.vnode )
			resolve?.();
		}
		else {
			resolve && component._afterRenderHandlers.push( resolve )
			invalidateComponent( component )
		}
	}

	// Return public API with value get/set and set function
	const stateObject:IState<GType> = {
		get value () {
			// if ( component._isRendering && stateOptions.atomic ) {
			// 	_trackNextNode( stateObject )
				// const nodes = _getTrackedNode()
				// console.log( nodes )
				// invalidatedNodes.push( _getCurrentNode() )
				// _trackNode( node => {
				// 	invalidatedNodes.push( node )
				// console.log("Affected node", node)
				// console.log('>', component._affectedNodesByStates[affectedNodesIndex].length, node)
				// component._affectedNodesByStates[affectedNodesIndex].push( node )
				// })
			// }
			return initialValue as GType
		},
		pushInvalidatedNode ( node:VNode ) {
			invalidatedNodes.push( node )
		},
		set value ( newValue:GType ) { _setAndInvalidate( newValue ) },
		set: ( newValue:TInitialValue<GType> ) => new Promise(
			resolve => _setAndInvalidate( _prepareInitialValue<GType>( newValue, initialValue as GType ), resolve )
		),
		// changed() knows if it's a state
		get type () { return _VNodeTypes_STATE as VNodeTypes },
		// Use signal as a getter without .value
		toString () { return stateObject.value + '' }
	}
	return stateObject
}