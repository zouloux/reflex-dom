import { diffNode, getCurrentComponent, _getCurrentDiffingNode, _setDomAttribute } from "./diff";
import { _dispatch, track, VNode, VNodeTypes } from "./common";
import { afterNextRender, ComponentInstance, unmounted } from "./component";

/**
 * TODO / A TESTER
 * 	- Si on accède a un state dans un effect après un if, il faut vérifier que ça fonctionne bien
 * 	- Vérifier que les disposes fonctionnent bien
 */

// ----------------------------------------------------------------------------- BATCHED TASK

// Micro task polyfill
const _microtask = self.queueMicrotask ?? ( h => self.setTimeout( h, 0 ) )

type TTaskHandler <GType> = ( bucket:Set<GType> ) => void

// TODO : Doc
export function _createBatchedTask <GType> ( task:TTaskHandler<GType> ) {
	const bucket = new Set<GType>()
	const resolves = []
	return ( element:GType, resolve?:() => any ) => {
		!bucket.size && _microtask( () => {
			task( bucket )
			bucket.clear()
			_dispatch( resolves )
		});
		bucket.add( element )
		resolve && resolves.push( resolve )
	}
}

// ----------------------------------------------------------------------------- PREPARE INITIAL VALUE

export type TInitialValue <GType> = GType | ((oldValue?:GType) => GType)

export const _prepareInitialValue = <GType> ( initialValue:TInitialValue<GType>, oldValue?:GType ) => (
	typeof initialValue == "function"
	? ( initialValue as (oldValue?:GType) => GType )(oldValue)
	: initialValue as GType
)

// ----------------------------------------------------------------------------- STATE TYPES

export type IState<GType> = {
	value:GType
	set ( newValue:TInitialValue<GType> ):Promise<void>

	peek ():GType
	sneak (value:GType):void

	readonly type:VNodeTypes

	toString ():string
	valueOf ():GType

	dispose ():void
}

export interface IComputeState<GType> extends IState<GType> {
	update ():void
}

type TDisposeHandler = () => void

export type TEffect = () => (void|TDisposeHandler|Promise<any>)

export type TComputed <GType> = () => GType

export interface IStateOptions<GType> {
	// filter				?:(newValue:GType, oldValue:GType) => GType,
	directInvalidation	?:boolean
}


// ----------------------------------------------------------------------------- INVALIDATE EFFECT

const _invalidateEffect = _createBatchedTask<TEffect>( effects => {
	// FIXME : Which one is better ?
	// _dispatch( Array.from( effects ) )
	for ( const effect of effects )
		effect()
});

// ----------------------------------------------------------------------------- INVALIDATE COMPONENT

/**
 * Invalidate a component instance.
 * Will batch components to validated in a microtask to avoid unnecessary renders.
 */
export const invalidateComponent = _createBatchedTask<ComponentInstance>( components => {
	for ( const component of components ) {
		const r = track.diff?.( component.vnode )
		diffNode( component.vnode, component.vnode, undefined, true )
		r?.()
	}
});

// ----------------------------------------------------------------------------- STATE

// TODO : DOC
let _currentEffect:TEffect
let _currentChanged:TEffect

// TODO : DOC
let _currentStates = new Set<IState<any>>()

/**
 * TODO : DOC
 * @param initialValue
 * @param stateOptions
 */
export function state <GType> (
	initialValue	?:TInitialValue<GType>,
	stateOptions	:Partial<IStateOptions<GType>> = {}
):IState<GType> {

	// FIXME : HMR, this code need to be enabled only when HMR plugin is enabled
	// const c = getCurrentComponent()
	// if ( c ) {
	// 	// Retrieve HMR state
	// 	if ( c._hmrStates && c._hmrStateIndex in c._hmrStates )
	// 		initialValue = c._hmrStates[ c._hmrStateIndex ++ ]
	// 	// Prepare HMR State
	// 	if ( !c._hmrStates ) {
	// 		c._hmrStates = []
	// 		c._hmrStateIndex = 0;
	// 	}
	// 	// Save HMR State
	// 	c._hmrStates.push( () => initialValue )
	// 	console.log('S', c.name, initialValue, c._hmrStateIndex)
	// }
	// FIXME -----

	// Prepare initial value if it's a function
	initialValue = _prepareInitialValue( initialValue )

	// List of side effects / node / components to update
	const _effects = new Set<TEffect>()
	const _effectDisposes = new Set<TDisposeHandler>()
	const _changeds = new Set<TEffect>()
	const _nodes = new Set<VNode>()
	const _components = new Set<ComponentInstance>()

	// Listen effects that create states
	if ( _currentEffect )
		_effects.add( _currentEffect )

	function _addEffectDispose ( handler:TEffect|void|Promise<any> ) {
		typeof handler === "function" && _effectDisposes?.add( handler )
	}

	// Update the state value and dispatch changes
	async function updateValue ( newValue:GType, forceUpdate = false ) {
		// FIXME : Throw error in dev mode
		if ( !_effects ) return
		// Halt update if not forced and if new value is same as previous
		if ( newValue === initialValue && !forceUpdate ) return

		// TODO : DOC
		for ( const unmountEffect of _effectDisposes )
			unmountEffect()
		_effectDisposes.clear();

		// Store new value into the argument variable
		initialValue = newValue

		// TODO : Effects should be promisable
		// 		But for now it bugs and changed handlers cannot be batched
		//		We need a custom handler for the batch clear handler
		// TODO : DOC
		for ( const effect of _effects )
			_addEffectDispose( effect() )

		// Then dispatch direct dom updates
		for ( const node of _nodes )
			// Skip this node if the whole component needs to be refreshed
			if ( !_components.has( node.component ) ) {
				// Do direct dom update
				if ( node.type === 3 )
					node.dom.nodeValue = initialValue as string
				else {
					// Reset attribute for "src", allow empty images when changing src
					if ( node.dom instanceof HTMLImageElement && node.key === "src" )
						_setDomAttribute( node.dom as Element, node.key, "" )
					_setDomAttribute( node.dom as Element, node.key, initialValue )
				}
				track.mutation?.( node, node.key )
			}

		// Dispatch all component refresh at the same time and wait for all to be updated
		const promises = []
		for ( const component of _components ) {
			// Refresh component synchronously
			stateOptions.directInvalidation
			? diffNode( component.vnode, component.vnode )
			// Invalidate component asynchronously
			// FIXME : Resolve counter way to avoid Promise constructor here ? #perfs
			: promises.push( new Promise<void>(
				r => invalidateComponent( component, r )
			))
		}
		_components.clear();
		await Promise.all( promises )

		// Call changed handler after dom mutations
		_changeds.forEach( e => _invalidateEffect( e ) )
	}

	function dispose () {
		initialValue = null;
		// _effects.clear()
		// _effectDisposes.clear()
		// _changeds.clear()
		// _nodes.clear()
		// _components.clear()
		[_effects, _effectDisposes, _changeds, _nodes, _components].map( e => e.clear() )
	}

	// if this state is created into a factory phase of a component,
	// auto-dispose it on component unmount
	unmounted( dispose )

	return {
		// --- PUBLIC API ---
		// Get current value and register effects
		get value () {
			// FIXME : Throw error in dev mode
			if ( !_effects ) return
			// Get current node and component
			const currentNode = _getCurrentDiffingNode()
			const currentComponent = getCurrentComponent()
			// Register current before effect handler
			if ( _currentEffect ) {
				_effects.add( _currentEffect )
				_currentStates.add( this )
			}
			// Register current after changed handler
			else if ( _currentChanged ) {
				_changeds.add( _currentChanged )
				_currentStates.add( this )
			}
			// Register current text node
			else if ( currentNode && (currentNode.type === 3 || currentNode.type === 2) && currentNode.value === this ) {
				// Save component to current text node to optimize later
				currentNode.component = currentComponent
				_nodes.add( currentNode )
			}
			// Register current component
			else if ( currentComponent )
				_components.add( currentComponent )
			return initialValue as GType
		},
		// Set value with .value and update dependencies
		set value ( newValue:GType ) { updateValue( newValue ) },
		// Set value with a set() method and update dependencies
		// Asynchronous function
		set: ( newValue:TInitialValue<GType>, forceUpdate = false ) =>
			updateValue( _prepareInitialValue( newValue ), forceUpdate ),
		// Get value without registering effects
		peek () { return initialValue as GType },
		// Set value without calling effects
		sneak ( value:GType ) { initialValue = value },
		// Get type of this object
		get type () { return 3/*STATE*/ as VNodeTypes },
		// Use state as a getter without .value
		toString () { return this.value + '' },
		valueOf () { return this.value },
		// Remove and clean this state
		dispose,
		// --- PRIVATE API ---
		// @ts-ignore --- Private method for effect
		// Add an effect dispose handler
		_addEffectDispose,
		// @ts-ignore Private method for effect
		// Remove an effect handler
		_removeEffect ( handler:TEffect ) {
			_effects?.delete( handler )
			_changeds?.delete( handler )
		},
	}
}

// ----------------------------------------------------------------------------- EFFECTS / CHANGED

function _disposeEffect ( associatedStates:IState<any>[], handler ) {
	// TODO : Dispose + register in component for later disposal
	// TODO : TEST + OPTIM
	if ( associatedStates )
		for ( const state of associatedStates )
			// @ts-ignore
			state._removeEffect( handler )
}

function _captureAssociatedStates () {
	const associatedStates = Array.from( _currentStates )
	// Clear current states list
	_currentStates.clear()
	return associatedStates
}

/**
 * TODO : DOC + TEST
 * @param handler
 */
export function effect ( handler:TEffect ):TDisposeHandler {
	// Register this effect as running so all states can catch the handler
	_currentEffect = handler
	// Run the handler once,
	// all states acceded from this effect will caught the effect handler
	// FIXME : How about async effect ? Can it stop rendering of component ?
	const effectDispose = handler()
	// Clone associated states list to be able to
	// FIXME 	How about a state listened in a condition ?
	//  		It will not be into associatedStates ...
	const associatedStates = _captureAssociatedStates()
	// If we had a handler returned by the effect
	// Attach it to all associated states
	if ( effectDispose )
		for ( const state of associatedStates )
			// @ts-ignore
			state._addEffectDispose( effectDispose )
	_currentEffect = null
	// Return a dispose function
	// This function will remove the handler from all associated states
	// If this effect is ran into a factory component, it will be automatically
	// dispose when the component is unmounted.
	return unmounted( () => _disposeEffect(associatedStates, handler) )
}

/**
 * TODO : DOC + TEST
 * @param handler
 */
export function changed ( handler:TEffect ):TDisposeHandler {
	let associatedStates
	afterNextRender(() => {
		_currentChanged = handler
		handler()
		associatedStates = _captureAssociatedStates()
		_currentChanged = null
	})
	return unmounted( () => _disposeEffect(associatedStates, handler) )
}

// ----------------------------------------------------------------------------- COMPUTE

/**
 * TODO : DOC + TEST
 * @param handler
 */
export function compute <GType> ( handler:TComputed<GType> ):IComputeState<GType> {
	// FIXME : Can't we optimize state initialisation here ?
	const s:IComputeState<GType> = state<GType>() as IComputeState<GType>
	// FIXME : Async effect should work here
	s.update = () => s.set( handler() )
	const effectDispose = effect( s.update )
	const { dispose } = s
	s.dispose = unmounted(() => {
		effectDispose()
		dispose()
	})
	return s
}

// TODO : No need for batch if renders are batched ? Effect will not be batched.
// TODO : @see Preact signals API
//export function batch () {}
