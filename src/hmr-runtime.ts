import { hookComponentMount } from "./component";

/**
 * Filter all functions from a module and call a handler with name and function.
 */
function getFunctionsFromModule(module, handler) {
	Object.keys(module).map(entityName => {
		const entity = module[entityName];
		if (typeof entity !== "function")
			return;
		handler(entityName, entity);
	});
}
/**
 * Get dom path from a current mounted coponent.
 * Will concat all child index beetween body and component
 * Ex : 0/2/1/0$
 */
function getComponentDOMPath(target) {
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
	return id;
}


// Compute component key with module url
// Do not take cache busters with ?t= into account otherwise this will be useless
const getFunctionKeyPath = (meta, name) => `${meta.url.split("?")[0]}/${name}`;

// Wasted some time here :
// Components register needs to be global and not scoped to enableReflexRefresh
// Otherwise every time it will be emptied !
// We use meta.url for keys to not override functions with same name which are
// into different modules
const _allReflexComponents = {};


function registerComponentFromRender ( component, tries ) {
	// Get function path
	const functionPath = component.vnode.value.__functionPath
	// Module not ready yet, wait a bit more
	if ( !functionPath )
		return tryRegisterComponentFromRender( component, tries + 1 )
	// Create registry of instances
	if ( !( functionPath in _allReflexComponents ) )
		_allReflexComponents[ functionPath ] = {};
	// Get instance dom path for this instance
	const componentDomPath = getComponentDOMPath( component );
	// console.log('Register', name, componentDomPath)
	// Register this module instance
	_allReflexComponents[ functionPath ][ componentDomPath ] = component;
}

function tryRegisterComponentFromRender ( component, tries = 0 ) {
	if ( tries > 2 )
		console.warn('Component not ready yet', component)
	else if ( tries > 5 )
		return
	setTimeout( () => registerComponentFromRender( component, tries ), 100 )
}

let _renderHookEnabled = false
function initRenderHook ( hookComponentMount ) {
	if ( _renderHookEnabled ) return
	_renderHookEnabled = true
	hookComponentMount( (component, mounted) => {
		console.info('hookComponentMount', component, mounted)
		if ( mounted ) {
			// Component just rendered, its not added to the dom yet.
			// Because its all in sync, we can just wait end of tick
			self.queueMicrotask(() => {
				tryRegisterComponentFromRender( component );
			})
		}
		else {
			const functionPath = component.vnode.value.__functionPath
			const componentDomPath = getComponentDOMPath( component );
			delete _allReflexComponents[ functionPath ][ componentDomPath ];
		}
	})
}

/**
 * Enable reflex refresh
 * @param meta import.meta
 * @param cloneVNode imported from "@zouloux/reflex
 * @param diffNode imported from "@zouloux/reflex
 * @param recursivelyUpdateMountState imported from "@zouloux/reflex
 * @param hookComponentMount imported from "@zouloux/reflex
 */
export function enableReflexRefresh( meta, cloneVNode, diffNode, recursivelyUpdateMountState, hookComponentMount ) {

	// Every reflex render will register its component instance to be replacable by HMR
	initRenderHook( hookComponentMount )

	// Here we are getting module path.
	// Because we can have 2 differents components with the same function name, we need to differenciate them.
	// But to tell on each component on which module they are from,
	// we need to import the current module to have all exported members available.
	// I didn't find a way to have them directly here. this / self / exports / import.* does not work
	// Because it's async, we sometime have renderHook happening before the import.then.
	// This is why we have tryRegisterComponentFromRender which will retry until its ready
	import( meta.url ).then( module => {
		getFunctionsFromModule(module, (name, fn) => {
			fn.__functionPath = getFunctionKeyPath( meta, name )
		})
	})

	// Accept hot module reloading for this module
	return ( module ) => {
		// We need to re-register reflex modules with the new module
		//registerReflexComponents(module);
		// Get all functions from this new module
		let hadAtLeastOneComponent = false;
		getFunctionsFromModule(module, (name, fn) => {
			// Target component in global register with its key
			const componentKey = getFunctionKeyPath(meta, name);
			// If this function is not a registered and running reflex component
			if (!(componentKey in _allReflexComponents))
				return;
			const componentInstances = _allReflexComponents[componentKey];
			Object.keys(componentInstances).map(instancePath => {
				// Target old and new functions
				const oldFunction = componentInstances[instancePath];
				const newFunction = module[name];
				hadAtLeastOneComponent = true;
				// Target and clone old node
				// We replace the component's function with the new module
				const oldNode = oldFunction.vnode;
				// FIXME : Check old node, sometime not valid
				if ( !oldNode ) {
					console.error(`Reflex.hmrRuntime // Invalid old node`, name, newFunction, oldFunction);
					return;
				}
				const newNode = cloneVNode(oldNode);
				// Transfer id for refs
				if ( oldNode._id )
					newNode._id = oldNode._id
				newNode.value = newFunction;
				// Mount new node and replace old node dom
				const parent = oldNode.dom.parentElement;
				diffNode(newNode, null, oldNode._nodeEnv);
				parent.insertBefore(newNode.dom, oldNode.dom);
				recursivelyUpdateMountState(newNode, true);
				// Unmount old node and remove its dom
				recursivelyUpdateMountState(oldNode, false);
				oldNode.dom = null
				if ( oldNode._ref )
					oldNode._ref._setFromVNode( oldNode )
				parent.removeChild(oldNode.dom);
			});
		});
		// Do not fast-refresh if no reflex components where in this file
		if (!hadAtLeastOneComponent) {
			// FIXME ?
			// window.location.reload();
			// meta.hot.invalidate();
		}
	};
}
