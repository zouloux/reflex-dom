import { compute, IState, updateDomFromState } from "./states";
import type { ReflexIntrinsicElements } from "./jsx-types";
import type { VNode } from "./common";
import { getCurrentDiffingNode } from "./diff";

// ----------------------------------------------------------------------------- FOR LOOP

export type IForProps<GItem = any, GAs extends keyof ReflexIntrinsicElements = keyof ReflexIntrinsicElements> = {
	each: IState<GItem[]> | GItem[];
	children?: (item: GItem) => VNode;
	as?: GAs;
} & ReflexIntrinsicElements[GAs];

/**
 * This component can be attached to an array or a state with array as value to improve performances on changes.
 * This will add a dom element. Default is "div", can be changed with <For as="ul"> for example.
 * @param props
 * @constructor
 */
export function For ( props:IForProps ) {
	const _eachState = compute( () =>
		Array.isArray( props.each ) ? props.each : ( props.each as IState ).value
	)
	return () => {
		const children = _eachState.value.map( props.children[0] )
		return {
			type: 6,
			value: props.as ?? "div",
			props: {
				children: [
					{
						type: 8,
						props: { children }
					}
				]
			}
		}
	}
}

// ----------------------------------------------------------------------------- DOM SELECTOR

interface IDomSelector <GPath extends string|number> {
	connect ( path:GPath ):IState<GPath>
	update ( path:GPath ):void
	remove ( path:GPath ):void
	clear ():void
}

/**
 * Create a DOM mutation selector, like states but with a manual control over changes.
 * Can have better performances than a list of states, and use less memory.
 * Can have one DOM node associated for 1 path only.
 * @param getter Return value corresponding to the path. Will be called at each update and at connection.
 */
export function createDomSelector <GPath extends string|number> ( getter:( path:GPath ) => any ):IDomSelector<GPath> {
	let _domNodes:Record<GPath, VNode> = {} as Record<GPath, VNode>
	return {
		/**
		 * Connect data to a DOM Node.
		 * Will return a partial state to get value from getter with path, and will capture dom node.
		 * @param path
		 */
		connect ( path:GPath ) {
			return {
				type: 3,
				get value () {
					_domNodes[ path ] = getCurrentDiffingNode()
					return getter( path )
				},
				toString () { return this.value + '' },
			} as IState
		},
		/**
		 * Update node connected to a path
		 */
		update ( path:GPath ) {
			const node = _domNodes[ path ]
			node && updateDomFromState( node, getter( path ) )
		},
		/**
		 * Remove node connected to a path.
		 * Important to call when DOM node is removed, otherwise it can create a memory leak.
		 */
		remove ( path:GPath ) {
			delete _domNodes[ path as any ]
		},
		/**
		 * Remove all node connections.
		 */
		clear () {
			_domNodes = {} as Record<GPath, VNode>
		}
	}
}

// ----------------------------------------------------------------------------- ADVANCED SHALLOW PROPS COMPARE

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