import { VNode, VNodeTypes } from "./common";

// NOTE : Keep it in a function and do not inline this
// It seems to be V8 optimized. @see Preact source code
export function createVNode ( type:VNodeTypes, value = null, props:any = {}, key?, _ref? ):VNode {
	return { type, value, props, key, _ref }
}

export function cloneVNode ( vnode:VNode ) {
	const newNode = Object.assign({}, vnode)
	// IMPORTANT : also clone props object
	newNode.props = Object.assign({}, vnode.props)
	return newNode
}

export function h ( value:any, props:any, ...children:any[] ) {
	// Init props as empty object here and not in signature
	// Because jsx may pass null as argument
	if ( props == null ) props = {}
	// Remove __source and __self in debug mode
	// if ( process.env.NODE_ENV !== "production" ) {
	// 	delete props.__source
	// 	delete props.__self
	// }
	// Target children, do not merge, we do not allow usage of both children arrays
	props.children = props.children ? props.children : children
	// Browse children to patch types
	const total = props.children.length
	for ( let i = 0; i < total; ++i ) {
		const child = props.children[ i ]
		const typeofChild = typeof child
		// Detect text nodes
		if ( typeofChild === "string" || typeofChild === "number" )
			props.children[ i ] = createVNode( 1/*TEXT*/, child )
		// Detect states ( object, non-null, with type 3 )
		else if ( typeofChild === "object" && child && child.type === 3 )
			props.children[ i ] = createVNode( 3/*STATE*/, child )
		// Detect array nodes
		else if ( Array.isArray(child) )
			props.children[ i ] = createVNode( 8/*LIST*/, null, { children: child } )
		// Detect null / undefined and boolean nodes (it means we have a condition )
		else if ( typeofChild === "boolean" || !child )
			props.children[ i ] = createVNode( 0/*NULL*/ )
	}
	// Virtual node type here can be only component or element
	// Other types are created elsewhere
	const type = ( typeof value === "function" ? 7/*COMPONENTS*/ : 6/*ELEMENT*/ )
	// Create and return the virtual node
	return createVNode( type, value, props, props.key, props.ref )
}