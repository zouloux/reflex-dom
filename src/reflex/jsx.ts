import { VNode, VNodeTypes } from "./common";

// FIXME : Is it an array ? Maybe its working as single prop
let _dataListenersForNextNode = []

export function addDataListenerForNextNode ( listener ) {
	_dataListenersForNextNode.push( listener )
}

function triggerDataListenerForNode ( node:VNode ) {
	_dataListenersForNextNode.forEach( handler => handler( node ) )
	_dataListenersForNextNode = []
}

// NOTE : Keep it in a function and do not inline this
// It seems to be V8 optimized. @see Preact source code
export function _createVNode ( type:VNodeTypes, value = null, props:any = {}, key?, _ref? ):VNode {
	const node:VNode = { type, value, props, key, _ref }
	// triggerDataListenerForNode( node )
	return node;
}

export function _cloneVNode ( vnode:VNode ) {
	const newNode = Object.assign({}, vnode)
	// IMPORTANT : also clone props object
	newNode.props = Object.assign({}, vnode.props)
	// triggerDataListenerForNode( newNode )
	return newNode
}

export function h ( value:any, props:any, ...children:any[] ) {
	// Init props as empty object here and not in signature
	// Because jsx may pass null as argument
	if ( props == null ) props = {}
	// Remove __source and __self in debug mode
	if ( process.env.NODE_ENV != "production" ) {
		delete props.__source
		delete props.__self
	}
	// Target children, do not merge, we do not allow usage of both children arrays
	props.children = props.children ? props.children : children
	// Browse children to patch types
	let childIndex = props.children.length
	while ( childIndex-- ) {
		const child = props.children[ childIndex ]
		const typeofChild = typeof child
		// Detect text nodes
		if ( typeofChild === "string" || typeofChild === "number" )
			props.children[ childIndex ] = _createVNode( VNodeTypes.TEXT, child )
		// Detect array nodes
		else if ( Array.isArray(child) )
			props.children[ childIndex ] = _createVNode( VNodeTypes.LIST, null, { children: child } )
		// Detect null nodes (it means we have a condition )
		else if ( child === null )
			props.children[ childIndex ] = _createVNode( VNodeTypes.NULL )
	}
	// Virtual node type here can be only component or element
	// Other types are created elsewhere
	const type = (
		typeof value === "function"
		? VNodeTypes.COMPONENT
		: VNodeTypes.ELEMENT
	)
	// Create and return the virtual node
	return _createVNode( type, value, props, props.key, props.ref )
}

// TRACKING TEST
/*
let $ = []
let a = 0

h('div', {}, [
	h('h1', {className: $}, [ 	// -> h1
		"Content ", $			// -> h1
	]),
	h('ul', {}, $.map( a => a )),// -> ul
	h('p', {}, [$]),			// -> p
	a ? $ : null				// -> div
])
*/
