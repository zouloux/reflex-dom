import { _VNodeTypes_ELEMENT } from "./common";

// Shallow compare two objects, applied only for props between new and old virtual nodes.
// Will not compare "children" which is always different
// https://esbench.com/bench/62a138846c89f600a5701904
// TODO : re-bench against with for i in loop (test small and huge props)

/**
 * TODO : DOC
 * @param a
 * @param b
 * @param childrenCheck
 */
export const shallowPropsCompare = ( a:object, b:object, childrenCheck = true ) => (
	// Same amount of properties ?
	Object.keys( a ).length === Object.keys( b ).length
	// Every property exists in other object ?
	&& Object.keys( a ).every( key =>
		// Check children
		(key === "children" && childrenCheck) ? (
			// Same array instances -> we validate directly without browsing children
			a[ key ] === b[ key ]
			// Or, we need to check all children
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
						// FIXME : Create a function for this peace of code ?
						// FIXME : Less bytes into bundle but maybe less performant
						&& (
							c.type === _VNodeTypes_ELEMENT
							? c.value === d.value
							: true
						)
					)
				})
			)
		)
		// Class prop check between a and b objects
		: (b.hasOwnProperty(key) && a[key] === b[key])
	)
)


// Props proxy exists because we need a way to get updated props in a factory
// component. Because factory function is executed once, props object passed
// as first argument cannot be updated. Proxy helps us here because it will
// allow us to mock props but with every props updated.
// A caveat is that props is not iterable because proxy is a dynamic key / value
// object. Not really concerning because it makes no sense to iterate over
// a props object.
export type IPropsProxy <GProps extends object> = {
	proxy	: GProps,
	set		: ( newData:GProps ) => void
	get		: () => GProps
}

export function _createPropsProxy <GProps extends object = object> ( props:GProps ) : IPropsProxy<GProps> {
	// console.log("_createPropsProxy", props)
	return {
		proxy: new Proxy(props, {
			get ( target:{}, propName:string|symbol ):any {
				// if ( propName === _proxyPrivateAccess )
				// 	return props
				// TODO : Track dependencies like for state
				return propName in props ? props[ propName ] : void 0
			},
			set ():boolean {
				if ( process.env.NODE_ENV == "production" ) return false
				throw new Error(`Reflex - PropsProxy.set // Setting values to props manually is not allowed.`)
			}
		}) as GProps,
		// This method will set new props object (we override first argument of createPropsProxy)
		set ( newProps:GProps ) { props = newProps },
		get () { return props }
	}
}