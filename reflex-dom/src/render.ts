import { IAbstractDocument, IAbstractElement, VNode, _featureHooks, _dispatch } from "./common";
import { _diffAndMount } from "./diff";

// ----------------------------------------------------------------------------- CONSTANTS

// Virtual node object is injected into associated dom elements with this name
export const _DOM_PRIVATE_VIRTUAL_NODE_KEY = "__v"

// ----------------------------------------------------------------------------- RENDER

function _render ( rootNode:VNode, parentElement:HTMLElement|IAbstractElement, documentInterface:Document|IAbstractDocument = document, hydrateRoot:Element = null ) {
	// When using render, we create a new root node to detect new renders
	// This node is never rendered, we just attach it to the parentElement and render its children
	const root:VNode = {
		type: 5 /*ROOT*/,
		value: null,
		props: { children: [rootNode] },
		env: {
			isSVG: false,
			document: documentInterface,
		}
	}
	root.dom = parentElement as HTMLElement
	const oldNode = parentElement[ _DOM_PRIVATE_VIRTUAL_NODE_KEY ]
	_diffAndMount(root, oldNode, hydrateRoot)
	_dispatch( _featureHooks, 0/* NEW ROOT */, oldNode, root );
	parentElement[ _DOM_PRIVATE_VIRTUAL_NODE_KEY ] = root
}

export function render ( rootNode:VNode, parentElement:HTMLElement|IAbstractElement, documentInterface:Document|IAbstractDocument = document ) {
	_render( rootNode, parentElement, documentInterface )
}

export function hydrate ( rootNode:VNode, parentElement:HTMLElement ) {
	_render( rootNode, parentElement, document, parentElement as Element )
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

