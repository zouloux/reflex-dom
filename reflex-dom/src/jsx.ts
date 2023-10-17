import type { VNode } from "./common";

// https://esbench.com/bench/652a62287ff73700a4deba7f
export function h ( value:any, props:any, ...children:any[] ):VNode {
	// Init props as empty object here and not in signature
	// Because jsx may pass null as argument
	if ( props == null )
		props = {}
	// Target children, do not merge, we do not allow usage of both children arrays
	// props.children = props.children ? props.children : children
	// esbench : Faster than if version
	props.children ??= children
	// esbench : Faster than quering props.children everywhere
	const c = props.children
	// Browse children to patch types
	// esbench : Faster than naming it value and dropping it in object like { value } instead of { value: child }
	// esbench : faster than for const of
	const total = c.length
	for ( let i = 0; i < total; ++i ) {
		const child = c[ i ]
		// esbench : typeof child repeated is faster than `const typeofChild = typeof child`
		// esbench : Faster than switch / case
		// Detect text nodes
		if ( typeof child === "string" || typeof child === "number" )
			c[ i ] = { type: 1/*TEXT*/, value: child }
		// Detect array nodes
		// esbench : faster than `child instanceof Array`
		else if ( Array.isArray(child) )
			c[ i ] = { type: 8/*LIST*/, props: { children: child } }
		// Detect states ( object, non-null, with type 3 )
		// Using bigger "child !== null" and not "child" -> https://esbench.com/bench/63f48b796c89f600a570216e
		// Using !== and not != because it cannot be undefined here
		else if ( typeof child === "object" && child !== null && child.type === 3 )
			c[ i ] = { type: 3/*STATE*/, value: child }
		// Detect null / undefined and boolean nodes (it means we have a condition )
		// Using bigger "child == null" -> https://esbench.com/bench/63f48b796c89f600a570216e
		// Using == and not === to catch undefined here
		else if ( typeof child === "boolean" || child == null )
			c[ i ] = { type: 0/*NULL*/ }
		// esbench : Faster than i++
		++i
	}
	// Virtual node type here can be only component or element
	// Other types are created elsewhere
	// esbench : Faster than dropping it directly without variable into object
	const type = ( typeof value === "function" ? 7/*COMPONENTS*/ : 6/*ELEMENT*/ )
	// Create and return the virtual node
	// esbench : faster than { type: type, value: value, props: props }
	return { type, value, props }
}
