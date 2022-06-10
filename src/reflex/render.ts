import { ROOT_NODE_TYPE_NAME, forceArray, VNodeOrVNodes } from "./index";
import { diffChildren, DOM_PRIVATE_VIRTUAL_NODE_KEY } from "./diff";
import { createVNode } from "./jsx";

// ----------------------------------------------------------------------------- RENDER

export function render ( rootNode:VNodeOrVNodes, parentElement:HTMLElement ) {
	// When using render, we create a new root node to detect new renders
	// This node is never rendered, we just attach it to the parentElement and render its children
	const root = createVNode( ROOT_NODE_TYPE_NAME, { children: forceArray( rootNode ) })
	root.dom = parentElement
	diffChildren( root, parentElement[ DOM_PRIVATE_VIRTUAL_NODE_KEY ] )
	parentElement[ DOM_PRIVATE_VIRTUAL_NODE_KEY ] = root
}

// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------

// TODO : Hydrate
// TODO : Web components ! Check how lit and preact webcomponents works
// TODO : Render to string or render to web components to avoid expensive hydratation !

