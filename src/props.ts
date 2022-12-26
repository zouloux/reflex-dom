// import { getCurrentComponent } from "./diff";
//
// export function injectDefaults <GProps> ( props:GProps, defaults:Partial<GProps> ) {
// 	for ( let i in defaults )
// 		if ( !(i in props) )
// 			props[ i ] = defaults[ i ]
// }
//
// export function defaultProps <
// 	GProps extends object,
// 	GDefaults extends Partial<GProps>,
// 	// FIXME : Narrow type here
// 	GReturn = GProps & GDefaults
// > ( props:GProps, defaults:GDefaults ):GReturn {
// 	getCurrentComponent()._defaultProps = defaults
// 	injectDefaults( props, defaults )
// 	return props as never as GReturn
// }

// Shallow compare two objects, applied only for props between new and old virtual nodes.
// Will not compare "children" which is always different
// https://esbench.com/bench/62a138846c89f600a5701904
// TODO : re-bench against with for i in loop (test small and huge props)

/**
 * TODO : DOC
 */
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
)*/
