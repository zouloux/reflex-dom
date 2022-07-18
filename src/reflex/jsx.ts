import { VNode } from "./common";

// NOTE : Keep it in a function and do not inline this
// It seems to be V8 optimized. @see Preact source code
export function _createVNode ( type, props, key?, _ref? ):VNode {
	if ( process.env.NODE_ENV != "production" ) {
		delete props.__source
		delete props.__self
		delete props.key
		delete props.ref
	}
	return { type, props, key, _ref }
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