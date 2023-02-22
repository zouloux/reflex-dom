
// ----------------------------------------------------------------------------- UTILS

/**
 * Browse every functions that are exported from a module object
 */
function browseModuleFunctions ( module, handler ) {
	Object.keys( module ).map( memberName => {
		const member = module[ memberName ]
		if ( typeof member === "function" )
			handler( memberName, member )
	})
}

const _reflexIDKey = "__reflexID"

const _domPathKey = "__domPath"

/**
 * Compute unique component Reflex ID
 * Remove cache busters ( ?t= ) otherwise this will be useless
 */
const computeComponentID = ( url:string, name:string ) => `${url.split("?")[0]}::${name}`;

/**
 * Get dom path from a current mounted component.
 * Will concat all child index between body and component
 * Ex : 0/2/1/0$
 */
function getComponentDOMPath ( target ) {
	if ( target[_domPathKey] )
		return target[_domPathKey]
	const vnode = target.vnode;
	let dom = vnode.dom;
	let id = "$";
	while (true) {
		if (!dom || !dom.parentElement || dom === document.body)
			break;
		const index = Array.prototype.indexOf.call(dom.parentElement.children, dom);
		id = index + "/" + id;
		dom = dom.parentElement;
	}
	target[_domPathKey] = id
	return id;
}

// ----------------------------------------------------------------------------- REGISTER COMPONENTS

// All hot swappable components, by Reflex ID and dom path
// [ reflexID ][ domPath ]
const _allReflexComponents = {};

let _hooksReady = false
function initHooks ( featureHook, getCurrentComponent ) {
	if ( _hooksReady ) return
	_hooksReady = true
	// Hook every component mount
	featureHook( (hookType, component, mounted ) => {
		if ( hookType !== 1 ) return;
		const componentID = component?.vnode?.value?.[ _reflexIDKey ]
		if ( !componentID ) return;
		// Register
		if ( mounted ) {
			// Register this instance as "hot swappable"
			if ( !( componentID in _allReflexComponents ) )
				_allReflexComponents[ componentID ] = {};
			// FIXME : Should be already added to the body !
			queueMicrotask(() => {
				// Get instance dom path for this instance
				const componentDomPath = getComponentDOMPath( component );
				// console.log("mounted", mounted, componentID, componentDomPath );
				// Register this module instance
				_allReflexComponents[ componentID ][ componentDomPath ] = component;
			})
		}
		// Unregister
		else {
			// FIXME : Is it really useful ? It seems to cause more problems than solutions.
			// const componentDomPath = getComponentDOMPath( component )
			// if (
			// 	!(componentID in _allReflexComponents)
			// 	|| !(componentDomPath in _allReflexComponents[ componentID ])
			// )
			// 	return // FIXME : Verbose : Component moved in DOM tree
			// delete _allReflexComponents[ componentID ][ componentDomPath ]
		}
	})
	// Hook every state created
	/*
	featureHook( (hookType, state, stateOptions) => {
		if ( hookType !== 5 ) return
		// If this is a state for props, do not manage it
		if ( stateOptions._p ) return
		// Get associated component, we keep states only for swapped component.
		const component = getCurrentComponent();
		if ( !component ) {
			console.warn("State outside of a component", state)
			return;
		}
		// Register this state for this component
		component.__states ??= []
		component.__states.push( state )
		// function transferState () {
		// queueMicrotask(() => {
			// Get states from previous components of the same path
			// const componentDomPath = getComponentDOMPath( component );
			// const componentID = component?.vnode?.value?.[ _reflexIDKey ]
			// const previousComponent = _allReflexComponents[ componentID ]?.[ componentDomPath ]
		const previousComponent = component.vnode.__oldComponent
		console.log('previous', previousComponent)
		return;
			// if (previousComponent) {
			// 	console.log( componentDomPath,previousComponent.__states.length)
			// }
			// Continue only on valid components
			if ( !previousComponent || !previousComponent.__states ) return
			// Try to get equivalent state
			// FIXME : If a state is pushed from the top here, it will fail
			const fromState = previousComponent.__states.shift();
			// Inject old state to new state
			if ( !fromState ) return;
			console.log('>', fromState.peek())
			state.sneak( fromState.peek() )
		// }
		// component._mountHandlers = [ transferState, ...component._mountHandlers ];

	})*/
}
// ----------------------------------------------------------------------------- HOT SWAP A COMPONENT

function swapComponent ( node, newFunction, cloneVNode, diffNode, recursivelyUpdateMountState ) {
	// Clone old node to keep props and stuff
	const newNode = cloneVNode(node);
	// Transfer id for refs
	if ( node._id )
		newNode._id = node._id
	// Override new function from new module
	newNode.value = newFunction;
	// Reset component instance so diffNode will re-create it
	newNode.component = null
	// Mount new node and replace old node dom
	const parent = node.dom.parentElement;
	diffNode( newNode, null, node._nodeEnv );
	parent.insertBefore( newNode.dom, node.dom );
	newNode.__oldComponent = node.component
	recursivelyUpdateMountState(newNode, true)
	// Unmount old node and remove its dom
	recursivelyUpdateMountState(node, false);
	parent.removeChild(node.dom);
	node.dom = null
}


/**
 * Enable reflex refresh
 * @param moduleURL import.meta.url
 * @param module Imported module object
 * @param cloneVNode imported from "reflex-dom"
 * @param diffNode imported from "reflex-dom"
 * @param recursivelyUpdateMountState imported from "reflex-dom"
 * @param featureHook imported from "reflex-dom"
 * @param getCurrentComponent imported from "reflex-dom"
 */
export function enableReflexRefresh ( moduleURL, module, cloneVNode, diffNode, recursivelyUpdateMountState, featureHook, getCurrentComponent ) {
	// Inject a unique ID into each exported functions.
	// This ID contain module URL and function name to be unique.
	browseModuleFunctions( module, (name, member) => {
		member[ _reflexIDKey ] = computeComponentID( moduleURL, name )
	})
	// Hook reflex and register every new components
	initHooks( featureHook, getCurrentComponent )
	// Return an HMR accept function, scoped for this module
	return ( newModule ) => {
		// Browse all new module functions
		let hadAtLeastOneComponent = false;
		browseModuleFunctions( newModule, (name, newFunction) => {
			// Check if function source-code changed
			if ( module[name].toString() === newFunction.toString() ) return
			// Check if this function is a registered reflex component
			const componentID = computeComponentID( moduleURL, name )
			// If this function is not a registered and running reflex component
			if ( !(componentID in _allReflexComponents) )
				return;
			// Brows all component instances
			const componentInstances = _allReflexComponents[ componentID ] ;
			Object.keys( componentInstances ).map( domPath => {
				// Target old and new functions
				const oldComponent = componentInstances[ domPath ];
				if ( !oldComponent?.vnode )
					return; // FIXME : Verbose here
				// FIXME : Try catch ?
				// Hot swap this component
				swapComponent( oldComponent.vnode, newFunction, cloneVNode, diffNode, recursivelyUpdateMountState )
				hadAtLeastOneComponent = true;
			})
		})
		if ( !hadAtLeastOneComponent ) {
			// FIXME : Refresh ?
			console.warn("HMR module changed but not candidate.")
		}
	}
}