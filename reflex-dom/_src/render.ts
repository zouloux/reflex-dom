import { IAbstractDocument, IAbstractElement, VNode, _featureHooks, _dispatch } from "./common";
import { _diffAndMount } from "./diff";
import { createVNode } from "./jsx";

// ----------------------------------------------------------------------------- CONSTANTS

// Virtual node object is injected into associated dom elements with this name
export const _DOM_PRIVATE_VIRTUAL_NODE_KEY = "__v"

// ----------------------------------------------------------------------------- RENDER

export function render ( rootNode:VNode, parentElement:HTMLElement|IAbstractElement, documentInterface:Document|IAbstractDocument = document ) {
	// When using render, we create a new root node to detect new renders
	// This node is never rendered, we just attach it to the parentElement and render its children
	const root = createVNode( 5/*ROOT*/, null, { children: [rootNode] } )
	root.dom = parentElement as HTMLElement
	const oldNode = parentElement[ _DOM_PRIVATE_VIRTUAL_NODE_KEY ]
	_diffAndMount(root, oldNode, {
		isSVG: false,
		document: documentInterface
	})
	_dispatch( _featureHooks, null, 0/* NEW ROOT */, oldNode, root );
	parentElement[ _DOM_PRIVATE_VIRTUAL_NODE_KEY ] = root
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

