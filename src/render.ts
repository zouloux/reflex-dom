import { _dispatch, _VNodeTypes_ROOT, IAbstractDocument, IAbstractElement, VNode } from "./common";
import { diffNode, _DOM_PRIVATE_VIRTUAL_NODE_KEY } from "./diff";
import { createVNode } from "./jsx";
import { ComponentInstance } from "./component";

// ----------------------------------------------------------------------------- RENDER

export function render ( rootNode:VNode, parentElement:HTMLElement|IAbstractElement, documentInterface:Document|IAbstractDocument = document ) {
	// When using render, we create a new root node to detect new renders
	// This node is never rendered, we just attach it to the parentElement and render its children
	const root = createVNode( _VNodeTypes_ROOT, null, { children: [rootNode] } )
	root.dom = parentElement as HTMLElement
	diffNode( root, parentElement[ _DOM_PRIVATE_VIRTUAL_NODE_KEY ], {
		isSVG: false,
		document: documentInterface
	})
	parentElement[ _DOM_PRIVATE_VIRTUAL_NODE_KEY ] = root
}

// ----------------------------------------------------------------------------- INVALIDATION

let componentsToUpdate:ComponentInstance[] = []
function updateDirtyComponents () {
	let p
	if ( process.env.NODE_ENV !== "production" )
		p = require("./debug").trackPerformances("Update dirty components")
	// TODO : Update with depth ! Deepest first ? Or last ?
	const total = componentsToUpdate.length
	for ( let i = 0; i < total; ++i ) {
		const component = componentsToUpdate[ i ]
		diffNode( component.vnode, component.vnode )
		_dispatch( component._afterRenderHandlers, component )
		component._afterRenderHandlers = []
		component._isDirty = false
		// if ( component._affectedNodesByStates.length == 0 )
		// 	_diffNode( component.vnode, component.vnode )
		// else for ( let i = 0; i < component._affectedNodesByStates.length; ++i ) {
		// 	const oldNodes = component._affectedNodesByStates[ i ]
		// 	component._affectedNodesByStates[i] = []
		// 	renderComponentNode( component.vnode, component )
		// 	const newNodes = component._affectedNodesByStates[ i ]
		// 	for ( let j = 0; j < newNodes.length; ++j )
		// 		_diffNode( newNodes[j], oldNodes[j] )
		// }
	}
	componentsToUpdate = []
	p?.();
}

// Internal fast microtask polyfill
const microtask = self.queueMicrotask ? self.queueMicrotask : h => self.setTimeout( h, 0 )

export function invalidateComponent ( component:ComponentInstance ) {
	// Queue rendering before end of frame
	if ( !componentsToUpdate.length )
		microtask( updateDirtyComponents );
	// Invalidate this component once
	if ( !component._isDirty ) {
		component._isDirty = true
		// Store it into the list of dirty components
		componentsToUpdate.push( component )
	}
}

// ----------------------------------------------------------------------------- REGISTER WEB-COMPONENTS

// TODO : Web components ! Check how lit and preact webcomponents works
//			- Register web-components with ComponentName to <component-name />
//  		- Update properties when changed in DOM
//  			- Need translation (detect numbers, maybe json for array and objects ?)
//				- Maybe an API to set props with JS and with advanced type (like functions)
//			- Children
//			- DOM Find
//			- Mount / Unmount

// ----------------------------------------------------------------------------- HYDRATE

// TODO : Hydrate
// TODO : Render to string or render to web components to avoid expensive hydratation ?

