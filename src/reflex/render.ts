import { _ROOT_NODE_TYPE_NAME, _forceArray, VNodeOrVNodes, _microtask } from "./common";
import { _diffChildren, _diffNode, _DOM_PRIVATE_VIRTUAL_NODE_KEY } from "./diff";
import { _createVNode } from "./jsx";
import { ComponentInstance } from "./component";

// ----------------------------------------------------------------------------- RENDER

export function render ( rootNode:VNodeOrVNodes, parentElement:HTMLElement ) {
	// When using render, we create a new root node to detect new renders
	// This node is never rendered, we just attach it to the parentElement and render its children
	const root = _createVNode( _ROOT_NODE_TYPE_NAME, { children: _forceArray( rootNode ) })
	root.dom = parentElement
	_diffChildren( root, parentElement[ _DOM_PRIVATE_VIRTUAL_NODE_KEY ] )
	parentElement[ _DOM_PRIVATE_VIRTUAL_NODE_KEY ] = root
}

// ----------------------------------------------------------------------------- INVALIDATION

let componentsToUpdate:ComponentInstance[] = []
function updateDirtyComponents () {
	let p
	if ( process.env.NODE_ENV !== "production" )
		p = require("./debug").trackPerformances("Update dirty components")
	// TODO : Update with depth ! Deepest first ? Or last ?
	componentsToUpdate.map( component => {
		_diffNode( component.vnode, component.vnode )
	})
	componentsToUpdate = []
	p && p();
}

export function invalidateComponent ( component:ComponentInstance ) {
	// Queue rendering before end of frame
	if ( componentsToUpdate.length === 0 )
		_microtask( updateDirtyComponents );
	// Invalidate this component once
	if ( component._isDirty ) return;
	component._isDirty = true
	// Store it into the list of dirty components
	componentsToUpdate.push( component )
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

