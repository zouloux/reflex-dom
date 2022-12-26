
/**
 * Filter all functions from a module and call a handler with name and function.
 */
function getFunctionsFromModule ( module, handler ) {
	Object.keys( module ).map( entityName => {
		const entity = module[entityName];
		if ( typeof entity !== "function" )
			return;
		handler( entityName, entity );
	});
}

/**
 * Get dom path from a current mounted coponent.
 * Will concat all child index beetween body and component
 * Ex : 0/2/1/0$
 */
function getComponentDOMPath ( target ) {
	const vnode = target.vnode
	let dom = vnode.dom
	let id = "$"
	while ( true ) {
		if ( !dom || !dom.parentElement || dom === document.body )
			break;
		const index = Array.prototype.indexOf.call(dom.parentElement.children, dom);
		id = index + "/" + id
		dom = dom.parentElement
	}
	return id
}

// Wasted some time here :
// Components register needs to be global and not scoped to enableReflexRefresh
// Otherwise every time it will be emptied !
// We use meta.url for keys to not override functions with same name which are
// into different modules
const _allReflexComponents = {};

/**
 * Enable reflex refresh
 * @param meta import.meta
 * @param cloneVNode imported from "@zouloux/reflex
 * @param diffNode imported from "@zouloux/reflex
 * @param recursivelyUpdateMountState imported from "@zouloux/reflex
 */
export function enableReflexRefresh(meta, cloneVNode, diffNode, recursivelyUpdateMountState) {
	// Compute component key with module url
	// Do not take cache busters with ?t= into account otherwise this will be useless
	const getFunctionKey = name => `${meta.url.split("?")[0]}/${name}`;
	// Will hook render on every functions into this module
	// If a Reflex component is detected, this component will be registered for fast refresh
	function registerReflexComponents (module) {
		getFunctionsFromModule(module, (name, fn) => {
			fn["renderFilter"] = (componentInstance, rendered) => {
				// FIXME : Do it better please
				window.setTimeout(() => {
					// Get current function + module path
					const functionPath = getFunctionKey( name )
					// Create registry of instances
					if ( !(functionPath in _allReflexComponents) )
						_allReflexComponents[functionPath] = {}
					if ( !componentInstance || !componentInstance.vnode ) {
						console.error(`Reflex.hmrRuntime // Invalid component instance`, name, componentInstance);
						return;
					}
					// Get instance dom path for this instance
					const componentDomPath = getComponentDOMPath( componentInstance )
					// Register this module instance
					_allReflexComponents[ functionPath ][ componentDomPath ] = componentInstance;
				}, 0)
				return rendered;
			};
		});
	}
	// Register Reflex components into this module
	// Once by module here, because we will re-register on hot replacement later
	const moduleKey = getFunctionKey('$module$');
	if ( !(moduleKey in _allReflexComponents) ) {
		_allReflexComponents[moduleKey] = true;
		import(meta.url).then(registerReflexComponents);
	}
	// Accept hot module reloading for this module
	return (module) => {
		// We need to re-register reflex modules with the new module
		registerReflexComponents(module);
		// Get all functions from this new module
		let hadAtLeastOneComponent = false;
		getFunctionsFromModule(module, (name, fn) => {
			// Target component in global register with its key
			const componentKey = getFunctionKey(name);
			// If this function is not a registered and running reflex component
			if ( !(componentKey in _allReflexComponents) )
				return;
			const componentInstances = _allReflexComponents[ componentKey ]
			Object.keys( componentInstances ).map( instancePath => {
				// Target old and new functions
				const oldFunction = componentInstances[ instancePath ];
				const newFunction = module[ name ];
				hadAtLeastOneComponent = true;
				// Target and clone old node
				// We replace the component's function with the new module
				const oldNode = oldFunction.vnode;
				// FIXME : Check old node, sometime not valid
				if (!oldNode) {
					console.error(`Reflex.hmrRuntime // Invalid old node`, name, newFunction, oldFunction)
					return;
				}
				const newNode = cloneVNode( oldNode );
				newNode.value = newFunction;
				// Mount new node and replace old node dom
				const parent = oldNode.dom.parentElement;
				diffNode(newNode, null, oldNode._nodeEnv);
				parent.insertBefore(newNode.dom, oldNode.dom);
				recursivelyUpdateMountState(newNode, true);
				// Unmount old node and remove its dom
				recursivelyUpdateMountState(oldNode, false);
				parent.removeChild(oldNode.dom);
			})
		});
		// Do not fast-refresh if no reflex components where in this file
		if (!hadAtLeastOneComponent)
			meta.hot.invalidate();
	};
}
