import { compute, effect, IAtom, IState, updateDomFromState } from "./states";
import type { ReflexIntrinsicElements } from "./jsx-types";
import type { VNode } from "./common";
import { getCurrentComponent, getCurrentDiffingNode } from "./diff";
import { hh } from "./jsx";

// ----------------------------------------------------------------------------- FOR LOOP

export type IForProps<GItem = any, GAs extends keyof ReflexIntrinsicElements = keyof ReflexIntrinsicElements> = {
	each: IState<GItem[]> | GItem[];
	as?: GAs;
	children?: (item: GItem) => VNode;
} & ReflexIntrinsicElements[GAs];

/**
 * This component can be attached to an array or a state with array as value to improve performances on changes.
 * This will add a dom element. Default is "div", can be changed with <For as="ul"> for example.
 * For will prevent rendering outside the loop and optimize list diffing.
 * @param props All other props are passed to container.
 * @constructor
 */
export function For ( props:IForProps ) {
	const _eachState = compute( () =>
		Array.isArray( props.each ) ? props.each : ( props.each as IState ).value
	)
	return (props) => {
		// Clone props object to remove the "as" and "each" props,
		// without mutating the original props object
		const cleanProps = { ...props }
		delete cleanProps.as
		delete cleanProps.each
		// Set children from state
		const children = _eachState.value.map( props.children[0] )
		cleanProps.children = [ hh(8, null, { children }) ]
		//
		return hh(6, props.as ?? "div", cleanProps)
	}
}

// ----------------------------------------------------------------------------- ADVANCED SHALLOW PROPS COMPARE

/**
 * Advanced check between objects A and B.
 * Warning, can be very CPU intensive on big objects !
 * But it's not a recursive check, only the first layers with "children" special case.
 * Can be used with "shouldUpdate" extension -> "shouldUpdate( advancedPropsCompare )"
 */
export const advancedPropsCompare = ( a:object, b:object ) => (
	// Same amount of properties ?
	Object.keys( a ).length === Object.keys( b ).length
	// Every property exists in other object ?
	&& Object.keys( a ).every( key =>
		( key === "children" ) ? (
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

// ----------------------------------------------------------------------------- ATOMS

// todo : doc
// TLDR : A very small state with no effects and compute compatibility.
// 				It can be tied to only 1 dom node
// 				Use atom.value = ... to change value on node
export function atom <GType> ( value:GType ):IAtom<GType> {
	let _trackedNode:VNode
	return {
		type: 3/*VALUE STATE*/,
		toString () { return this.value + '' },
		get value () {
			const node = getCurrentDiffingNode()
			if ( node )
				_trackedNode = node
			return value
		},
		set value ( newValue ) {
			value = newValue
			if ( _trackedNode )
				updateDomFromState( _trackedNode, value )
		}
	}
}

// todo : doc
// TLDR : A very small state with no effects and compute compatibility.
// 				It can be tied to multiple dom nodes
// 				Use atom.value = ... to change value and all nodes
export function atoms <GType> ( value:GType ):IAtom<GType> {
	const _trackedNodes = new Set<VNode>()
	return {
		type: 3/*VALUE STATE*/,
		toString () { return this.value + '' },
		get value () {
			const node = getCurrentDiffingNode()
			if ( node )
				_trackedNodes.add( node )
			return value
		},
		set value ( newValue ) {
			value = newValue
			for ( const node of _trackedNodes )
				updateDomFromState( node, value )
		}
	}
}

export function particle <GType> ( getter:() => GType ):IAtom<GType> {
	let _isFirst = true
	let _value:GType
	let _disposeEffect:() => void
	let _trackedNode:VNode
	// const component = getCurrentComponent()
	// if ( component )
	// 	component._beforeNextRenderHandlers.push( () => _disposeEffect?.() )
	getCurrentComponent()?._beforeNextRenderHandlers.push( () => _disposeEffect?.() )
	return {
		type: 3/*VALUE STATE*/,
		toString () { return this.value + '' },
		get value ():GType {
			let newValue:GType
			_trackedNode = getCurrentDiffingNode()
			_disposeEffect = effect(() => {
				newValue = getter()
				if ( _isFirst ) {
					_value = newValue
				}
				else if ( newValue !== _value ) {
					this.value = newValue
				}
			})
			_value = newValue
			_isFirst = false
			return newValue
		},
		set value ( newValue:GType ) {
			// console.log('Particle effect', newValue)
			_value = newValue
			if ( _trackedNode )
				updateDomFromState( _trackedNode, _value )
		}
	}
}
