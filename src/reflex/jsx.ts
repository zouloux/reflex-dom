import { VNode } from "./common";


// let _currentNode:VNode
//
// export function getCurrentNode():VNode {
// 	return _currentNode
// }

// FIXME : Is it an array ? Maybe its working as single prop
let _dataListenersForNextNode = []

export function addDataListenerForNextNode ( listener ) {
	_dataListenersForNextNode.push( listener )
}

// NOTE : Keep it in a function and do not inline this
// It seems to be V8 optimized. @see Preact source code
export function _createVNode ( type, props, key?, _ref? ):VNode {
	if ( process.env.NODE_ENV != "production" ) {
		delete props.__source
		delete props.__self
	}
	const node:VNode = { type, props, key, _ref }
	_dataListenersForNextNode.forEach( handler => handler( node ) )
	_dataListenersForNextNode = []
	return node;
}

export function _cloneVNode ( vnode:VNode ) {
	const newNode = Object.assign({}, vnode)
	// IMPORTANT : also clone props object
	newNode.props = Object.assign({}, vnode.props)
	return newNode
}

export function h ( type, props:any = {}, ...children ) {
	props.children = props.children ? props.children : children
	return _createVNode( type, props, props.key, props.ref )
}

