import { IVirtualDocument, VNode, VNodeTypes } from "./common";

// Empty properties to add to every VNode created outside of h() ( after type, value, props )
const _n = { _isSVG: null, _document: null, _id: null, component: null, dom: null }

/**
 * Helper to create monomorphic VNode objects that are inline cached for V8.
 */
export const hh = (
	type:VNodeTypes, value:any = null, props:any = null,
	_isSVG:boolean = null, _document:IVirtualDocument = null,
):VNode => ({
	type, value, props,
	_isSVG, _document,
	_id: null, component: null, dom: null
})

// If / else implementation : https://esbench.com/bench/652a62287ff73700a4deba7f
// Speed hh fix : https://esbench.com/bench/65f970f47ff73700a4dec15a
export function h ( value:any, props:any, ...children:any[] ):VNode {
	// IMPORTANT : Always set { type, value, props } to avoid megamorphic classes
	//				Properties order is important !
	//				Check "npm run deopt" to see them.
	// Init props as empty object here and not in signature
	// Because jsx may pass null as argument
	if ( props == null )
		props = {}
	// Target children, do not merge, we do not allow usage of both children arrays
	// props.children = props.children ? props.children : children
	// esbench : Faster than if version
	// esbench : Faster than quering props.children everywhere
	const c = (props.children ??= children)
	// Browse children to patch types
	// esbench : Faster than naming it value and dropping it in object like { value } instead of { value: child }
	// esbench : faster than for const of
	// esbench : Faster than i++
	// esbench : Faster than "for const of" + increment
	let total = c.length
	for ( let i = 0; i < total; ++i ) {
		const child = c[ i ]
		// esbench : typeof child repeated is faster than `const typeofChild = typeof child`
		// esbench : Faster than switch / case
		// Detect text nodes
		if ( typeof child === "string" || typeof child === "number" )
			c[ i ] = hh(1/*TEXT*/, child)
		// Detect array nodes
		// esbench : faster than `child instanceof Array`
		else if ( Array.isArray(child) ) {
			// Lists can only be the only child
			if ( total === 1 )
				c[ i ] = hh(8/*LIST*/, null, { children: child })
			// If an array is not the only child, merge this array in the parent
			else {
				c.splice(i, 0, ...child);
				const listSize = child.length
				total += listSize;
				i += listSize;
			}
		}
		// Detect states ( object, non-null, with type 3 )
		// Using bigger "child !== null" and not "child" -> https://esbench.com/bench/63f48b796c89f600a570216e
		// Using !== and not != because it cannot be undefined here
		else if ( typeof child === "object" && child !== null && child.type === 3 )
			c[ i ] = hh(3/*STATE*/, child )
		// Detect null / undefined and boolean nodes (it means we have a condition )
		// Using bigger "child == null" -> https://esbench.com/bench/63f48b796c89f600a570216e
		// Using == and not === to catch undefined here
		else if ( typeof child === "boolean" || child == null )
			c[ i ] = hh(0/*NULL*/)
	}
	// Virtual node type here can be only component or element
	// Other types are created elsewhere
	// esbench : Faster than dropping it directly without variable into object
	const type = ( typeof value === "function" ? 7/*COMPONENTS*/ : 6/*ELEMENT*/ )
	// Create and return the virtual node
	return hh( type, value, props )
}
