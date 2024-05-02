
/**
 * TODO : Finish this when needed.
 * 		Basic hook-like implementation for functional components
 * 		atomic() is an effect-like function to optimize updates on dom nodes
 */

// interface IHookableComponent extends ComponentInstance {
// 	_hooks		:any[]
// 	_hookIndex	:number
// }
//
// export function createHook ( hookFactory, hookUpdate? ) {
// 	const component = getCurrentComponent() as IHookableComponent
// 	if ( component._hooks == null ) {
// 		component._hooks = []
// 		component._hookIndex = 0
// 	}
// 	else {
// 		++component._hookIndex
// 	}
// 	// Reset hook index after each render
// 	component._nextRenderHandlers.push( () => component._hookIndex = -1 )
// 	// Check if we already have a hook at this index
// 	let hook = component._hooks[ component._hookIndex ]
// 	if ( hook ) {
// 		hookUpdate?.( hook )
// 		return hook
// 	}
// 	hook = hookFactory()
// 	component._hooks.push( hook )
// 	return hook
// }
//
//
// export function atomic ( getter ) {
// 	function createAtomicHook () {
// 		let _firstTime = true
// 		return {
// 			_disposeEffect: null,
// 			_oldValue: null,
// 			getter,
// 			dispose() { this._disposeEffect?.() },
// 			type: 3/*STATE*/, // Will be converted to 2/*ARGUMENT*/ by diff algorithm if used as argument
// 			get value () {
// 				// Each time it's used, remove the previous effect listener
// 				this.dispose()
// 				// Target current used node for atomic diffing
// 				let node = getCurrentDiffingNode()
// 				// Call the getter in an effect to catch states and computes
// 				// Keep its dispose function. Also, this effect will be disposed along the component.
// 				let newValue
// 				this._disposeEffect = effect(() => {
// 					// Call the getter value with the dependency tracking
// 					newValue = this.getter()
// 					// First, save value for next update
// 					if ( _firstTime )
// 						this._oldValue = newValue
// 						// In effect updates ( not the first one ),
// 					// update the node only if the output of the getter changed
// 					else if ( newValue !== this._oldValue ) {
// 						// Save new value and update the dom node
// 						this._oldValue = newValue
// 						console.log("Update", newValue)
// 						updateDomFromState( node, newValue )
// 					}
// 				})
// 				_firstTime = false
// 				return newValue
// 			},
// 			// For the diffing
// 			toString () { return this.value + '' },
// 		}
// 	}
// 	return createHook( createAtomicHook, hook => hook.getter = getter )
// }
