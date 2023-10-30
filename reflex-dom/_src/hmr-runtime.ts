/**
 * TODO : Children state keep
 */

// -----------------------------------------------------------------------------

const _reflexIDKey = "__reflexID"

// Untied reflex lib module imported from plugin.
let _reflexLib

// ----------------------------------------------------------------------------- UTILS

/**
 * Browse every functions that are exported from a module object
 */
function browseModuleFunctions ( module, handler ) {
	if ( !module || typeof module !== "object" ) return
	// FIXME : Register error for full refresh ?
	Object.keys( module ).map( memberName => {
		const member = module[ memberName ]
		if ( typeof member === "function" )
			handler( memberName, member )
	})
}

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
	const vnode = target.vnode;
	let dom = vnode.dom;
	let id = "$";
	while (true) {
		if (!dom || !dom.parentElement)
			break;
		if (dom === document.body) {
			id = "#" + id
			break;
		}
		const index = Array.prototype.indexOf.call(dom.parentElement.children, dom);
		id = index + "/" + id;
		dom = dom.parentElement;
	}
	return id;
}

// ----------------------------------------------------------------------------- REGISTER COMPONENTS

let _errorOccured = false

// All hot swappable components, by Reflex ID and dom path
// [ reflexID ][ domPath ]
const _allReflexComponents = {};

const _allRoots = []

let _hooksReady = false
function initHooks () {
	if ( _hooksReady ) return
	_hooksReady = true
	// Hook every root render
	_reflexLib.featureHook( (hookType, previousNode, root ) => {
		if ( hookType !== 0 ) return;
		if ( previousNode ) return;
		_allRoots.push( root )
	})
	// Hook every component mount
	_reflexLib.featureHook( (hookType, component, mounted ) => {
		if ( hookType !== 1 ) return;
		const componentID = component?.vnode?.value?.[ _reflexIDKey ]
		if ( !componentID ) return;
		// Register
		if ( mounted ) {
			// Register this instance as "hot swappable"
			if ( !( componentID in _allReflexComponents ) )
				_allReflexComponents[ componentID ] = {};
			// Get instance dom path for this instance
			const componentDomPath = getComponentDOMPath( component );
			component.vnode._domPath = componentDomPath
			// Register this module instance
			_allReflexComponents[ componentID ][ componentDomPath ] = component;
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
	_reflexLib.featureHook( (hookType, state, stateOptions) => {
		if ( hookType !== 4 ) return
		// If this is a state for props, do not manage it
		if ( stateOptions._p ) return
		// Get associated component, we keep states only for swapped component.
		const component = _reflexLib.getCurrentComponent();
		if ( !component ) {
			// FIXME : Verbose
			// FIXME : Do we need to keep state on those ?
			// console.warn("State outside of a component", state)
			return;
		}
		// Register this state for this component
		component.__states ??= []
		component.__states.push( state )
		// Get previous component at the dom path
		// FIXME : This is where we cannot keep state for children
		//			If a component is swapped, and it children have state
		//			When re-rendering the parent component, all children are not added to body yet
		//			We cannot wait mounted because its too late, state is already computed for render
		const componentDomPath = component.vnode._domPath ?? getComponentDOMPath( component )
		const componentID = component?.vnode?.value?.[ _reflexIDKey ]
		const previousComponent = _allReflexComponents[ componentID ]?.[ componentDomPath ]
		if ( !previousComponent )
			return;
		// Retrieve states with the same order
		const fromState = previousComponent.__states.shift();
		if ( !fromState )
			return;
		// Get copied and overridden value
		const copiedValue = fromState.peek()
		const overriddenValue = state.peek()
		// Check if type is the same. Otherwise we may have a new state in between
		if ( typeof copiedValue !== typeof overriddenValue ) {
			// Cancel state copy
			previousComponent.__states = []
			return;
		}
		// Inject previous state into new one, while we still are in factory phase, without dispatching
		state.sneak( copiedValue )
	})
}
// ----------------------------------------------------------------------------- HOT SWAP A COMPONENT

function swapComponent ( node, newFunction ) {
	// Clone old node to keep props and stuff
	const newNode = _reflexLib.cloneVNode(node);
	// Do not replace unmounted components
	if ( !node.component.isMounted ) {
		// FIXME
		// console.warn(`HMR Runtime // Cannot swap an unmounted component`, node)
		return;
	}
	// Transfer id for refs
	if ( node._id )
		newNode._id = node._id
	// Override new function from new module
	newNode.value = newFunction;
	// Reset component instance so diffNode will re-create it with the new function
	newNode.component = null
	let parent
	// Try here to avoid duplicating the node if an error occurred
	try {
		// Mount new node and replace old node dom
		parent = node.dom.parentElement;
		_reflexLib.diffNode( newNode, null, node._nodeEnv, true );
		parent.insertBefore( newNode.dom, node.dom );
		// FIXME : This is also where children states can't be kept.
		//			Because we update a children which may be overridden by parent swap later
		_reflexLib.recursivelyUpdateMountState(newNode, true)
	}
	catch (e) {
		console.error(`HMR mount error`, e)
		_errorOccured = true;
	}
	try {
		// Unmount old node and remove its dom
		_reflexLib.recursivelyUpdateMountState(node, false);
		parent.removeChild(node.dom);
		node.dom = null
	}
	catch (e) {
		console.error(`HMR unmount error`, e)
		_errorOccured = true;
	}
	return newNode
}

// ----------------------------------------------------------------------------- ENABLE REFLEX REFRESH

/**
 * Enable reflex refresh
 * @param moduleURL import.meta.url
 * @param module Imported module object
 * @param reflexLib imported from "reflex-dom"
 */
export function enableReflexRefresh ( moduleURL, module, reflexLib ) {
	// Register imported reflex lib
	_reflexLib = reflexLib
	// Inject a unique ID into each exported functions.
	// This ID contain module URL and function name to be unique.
	browseModuleFunctions( module, (name, member) => {
		member[ _reflexIDKey ] = computeComponentID( moduleURL, name )
	})
	// Hook reflex and register every new components
	initHooks()
	// Return an HMR accept function, scoped for this module
	return ( newModule ) => {
		// Reload app if an error occurred while HMR
		if ( _errorOccured ) {
			window.location.reload()
			return;
		}
		// Browse all new module functions
		browseModuleFunctions( newModule, (name, newFunction) => {
			// Check if function source-code changed
			// FIXME : Strict is not that useful, other members updates are cancelled
			// if ( module[name].toString() === newFunction.toString() ) return
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
				const newNode = swapComponent( oldComponent.vnode, newFunction )
			})
		})
		// TODO : Reload whole app if no component matches ?
	}
}
