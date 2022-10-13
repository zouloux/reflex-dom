
type AnyFunction = (...rest) => any
type ModuleFunctionHandler = (name:string, fn:AnyFunction ) => any

// List all functions from a module
function getFunctionsFromModule( module, handler:ModuleFunctionHandler ) {
	Object.keys(module).map(entityName => {
		const entity = module[entityName];
		if ( typeof entity !== "function" ) return;
		handler(entityName, entity);
	});
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
	const getComponentKey = name => `${meta.url.split("?")[0]}/${name}`

	// Will hook render on every functions into this module
	// If a Reflex component is detected, this component will be registered for fast refresh
	function registerReflexComponents ( module ) {
		getFunctionsFromModule(module, (name, fn) => {
			fn["renderFilter"] = (componentInstance, rendered) => {
				_allReflexComponents[ getComponentKey(name) ] = componentInstance;
				return rendered;
			};
		});
	}

	// Register Reflex components into this module
	// Once by module here, because we will re-register on hot replacement later
	const moduleKey = getComponentKey('$module$')
	if (!(moduleKey in _allReflexComponents)) {
		_allReflexComponents[ moduleKey ] = true;
		import(meta.url).then( registerReflexComponents );
	}

	// Accept hot module reloading for this module
	return (module) => {
		// We need to re-register reflex modules with the new module
		registerReflexComponents( module );
		// Get all functions from this new module
		let hadAtLeastOneComponent = false;
		getFunctionsFromModule(module, (name, fn) => {
			// Target component in global register with its key
			const componentKey = getComponentKey(name)
			// If this function is not a registered and running reflex component
			if (!(componentKey in _allReflexComponents))
				return;
			// Target old and new functions
			const oldFunction = _allReflexComponents[componentKey];
			const newFunction = module[name];
			hadAtLeastOneComponent = true;
			// Target and clone old node
			// We remplace the component's function with the new module
			const oldNode = oldFunction.vnode;
			const newNode = cloneVNode(oldNode);
			newNode.value = newFunction;
			// Mount new node and replace old node dom
			const parent = oldNode.dom.parentElement;
			diffNode(newNode, null, oldNode._nodeEnv);
			parent.insertBefore(newNode.dom, oldNode.dom);
			recursivelyUpdateMountState(newNode, true);
			// Unmount old node and remove its dom
			recursivelyUpdateMountState(oldNode, false);
			parent.removeChild(oldNode.dom);
		});
		// Do not fast-refresh if no reflex components where in this file
		if ( !hadAtLeastOneComponent )
			meta.hot.invalidate();
	};
}
