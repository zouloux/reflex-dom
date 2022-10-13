
function getFunctionsFromModule ( module, handler ) {
	// const functions = {}
	Object.keys( module ).map( entityName => {
		const entity = module[ entityName ]
		if ( typeof entity !== "function" ) return;
		handler(entityName, entity)
	})
}


export function enableReflexRefresh ( meta, cloneVNode, diffNode, recursivelyUpdateMountState ) {

	// Get current module and register every Reflex component in it
	const reflexComponents = {}
	import( meta.url ).then( currentModule => {
		getFunctionsFromModule( currentModule, (name, fn) => {
			fn.renderFilter = ( componentInstance, rendered ) => {
				reflexComponents[ name ] = componentInstance
				return rendered
			}
		})
	})

	// Accept hot module reloading for this module
	return ( module ) => {
		// Browse functions for this received module
		let hadAtLeastOneComponent = false
		getFunctionsFromModule( module, ( name, fn ) => {
			// If this function is not a registered and running reflex component
			if ( !( name in reflexComponents ) ) return;
			// Target old and new functions
			const oldFunction = reflexComponents[ name ]
			const newFunction = module[ name ]
			hadAtLeastOneComponent = true;
			// Target and clone old node
			// We remplace the component's function with the new module
			const oldNode = oldFunction.vnode
			const newNode = cloneVNode( oldNode )
			newNode.value = newFunction
			// Mount new node and replace old node dom
			const parent = oldNode.dom.parentElement
			diffNode( newNode, null, oldNode._nodeEnv )
			parent.insertBefore( newNode.dom, oldNode.dom )
			recursivelyUpdateMountState( newNode, true )
			// Unmount old node and remove its dom
			recursivelyUpdateMountState( oldNode, false )
			parent.removeChild( oldNode.dom )
		} )

		// FIXME : Or do window.reload ?
		if ( !hadAtLeastOneComponent )
			meta.hot.invalidate()
	}
}
