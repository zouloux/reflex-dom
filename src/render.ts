import { IVirtualDocument, IVirtualElement, VNode, _featureHooks, _dispatch } from "./common";
import { _diffAndMount } from "./diff";
import { hh } from "./jsx";

// ----------------------------------------------------------------------------- CONSTANTS

// Virtual node object is injected into associated dom elements with this name
export const _DOM_PRIVATE_VIRTUAL_NODE_KEY = "__v"

// ----------------------------------------------------------------------------- RENDER

function _render ( rootNode:VNode, parentElement:HTMLElement|IVirtualElement, documentInterface:Document|IVirtualDocument = document, hydrateRoot:Element = null ) {
	// When using render, we create a new root node to detect new renders
	// This node is never rendered, we just attach it to the parentElement and render its children
	const root = hh(5, null, { children: [rootNode] }, false, documentInterface)
	root.dom = parentElement as HTMLElement
	const oldNode = parentElement[ _DOM_PRIVATE_VIRTUAL_NODE_KEY ]
	_diffAndMount(root, oldNode, hydrateRoot)
	_dispatch( _featureHooks, 0/* NEW ROOT */, oldNode, root );
	parentElement[ _DOM_PRIVATE_VIRTUAL_NODE_KEY ] = root
}

export function render ( rootNode:VNode, parentElement:HTMLElement|IVirtualElement, documentInterface:Document|IVirtualDocument = document ) {
	_render( rootNode, parentElement, documentInterface )
}

export function hydrate ( rootNode:VNode, parentElement:HTMLElement ) {
	_render( rootNode, parentElement, document, parentElement as Element )
}
