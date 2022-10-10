import {
	_VNodeTypes_COMPONENT,
	_VNodeTypes_ELEMENT,
	_VNodeTypes_LIST,
	_VNodeTypes_NULL,
	_VNodeTypes_TEXT,
	VNode,
	VNodeTypes
} from "./common";
// import { IState } from "./states";


// let _trackedNodesBySignals:IState<any>[] = []
//
// export function _trackNextNode ( stateObject:IState<any> ) {
// 	_trackedNodesBySignals.push( stateObject )
// }
//
// export function _resetTrackedNode ( stateID:number ) {
//
// }
//
// function afterNode (node:VNode) {
// 	if ( _trackedNodesBySignals.length > 0 ) {
// 		_trackedNodesBySignals.forEach( s => s.pushInvalidatedNode(node) )
// 		_trackedNodesBySignals = []
// 	}
// }

// NOTE : Keep it in a function and do not inline this
// It seems to be V8 optimized. @see Preact source code
export function _createVNode ( type:VNodeTypes, value = null, props:any = {}, key?, _ref? ):VNode {
	return { type, value, props, key, _ref }
	// const node:VNode = { type, value, props, key, _ref }
	// return node;
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
	if ( process.env.NODE_ENV !== "production" ) {
		delete props.__source
		delete props.__self
	}
	// Target children, do not merge, we do not allow usage of both children arrays
	props.children = props.children ? props.children : children
	// Browse children to patch types
	const total = props.children.length
	for ( let i = 0; i < total; ++i ) {
		const child = props.children[ i ]
		const typeofChild = typeof child
		// Detect text nodes
		if ( typeofChild === "string" || typeofChild === "number" )
			props.children[ i ] = _createVNode( _VNodeTypes_TEXT, child )
		// Detect array nodes
		else if ( Array.isArray(child) )
			props.children[ i ] = _createVNode( _VNodeTypes_LIST, null, { children: child } )
		// Detect null and boolean nodes (it means we have a condition )
		else if ( child === null || typeofChild === "boolean" )
			props.children[ i ] = _createVNode( _VNodeTypes_NULL )
	}
	// Virtual node type here can be only component or element
	// Other types are created elsewhere
	const type = ( typeof value === "function" ? _VNodeTypes_COMPONENT : _VNodeTypes_ELEMENT )
	// Create and return the virtual node
	return _createVNode( type, value, props, props.key, props.ref )
}

// TRACKING TEST
/*
let $ = []
let a = 0
let st = state()

h('div', {}, [
	h('h1', {className: $}, [ 	// -> h1
		"Content ", st			// -> text[1]
	]),
	h('ul', {}, $.map( a => a )),// -> ul
	h('p', {}, [$]),			// -> p
	a ? $ : null				// -> div
])
*/
