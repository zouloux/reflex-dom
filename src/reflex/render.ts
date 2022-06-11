import { ROOT_NODE_TYPE_NAME, forceArray, VNodeOrVNodes, ComponentInstance, microtask } from "./index";
import { diffChildren, diffNode, DOM_PRIVATE_VIRTUAL_NODE_KEY } from "./diff";
import { createVNode } from "./jsx";
import { trackPerformances } from "./debug";

// ----------------------------------------------------------------------------- RENDER

export function render ( rootNode:VNodeOrVNodes, parentElement:HTMLElement ) {
	// When using render, we create a new root node to detect new renders
	// This node is never rendered, we just attach it to the parentElement and render its children
	const root = createVNode( ROOT_NODE_TYPE_NAME, { children: forceArray( rootNode ) })
	root.dom = parentElement
	diffChildren( root, parentElement[ DOM_PRIVATE_VIRTUAL_NODE_KEY ] )
	parentElement[ DOM_PRIVATE_VIRTUAL_NODE_KEY ] = root
}

// ----------------------------------------------------------------------------- INVALIDATION

let componentsToUpdate:ComponentInstance[] = []
function updateDirtyComponents () {
	const p = trackPerformances("Update dirty components")
	// TODO : Update with depth ! Deepest first ? Or last ?
	componentsToUpdate.map( component => {
		diffNode( component.vnode, component.vnode )
	})
	componentsToUpdate = []
	p();
}

export function invalidateComponent ( component:ComponentInstance ) {
	// Queue rendering before end of frame
	if ( componentsToUpdate.length === 0 )
		microtask( updateDirtyComponents );
	// Invalidate this component once
	if ( component.isDirty ) return;
	component.isDirty = true
	// Store it into the list of dirty components
	componentsToUpdate.push( component )
}

// ----------------------------------------------------------------------------- REGISTER WEB-COMPONENTS



// ----------------------------------------------------------------------------- HYDRATE




// TODO : Hydrate
// TODO : Web components ! Check how lit and preact webcomponents works
// TODO : Render to string or render to web components to avoid expensive hydratation !

