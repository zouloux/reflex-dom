import { getCurrentComponent, getCurrentDiffingNode, _setDomAttribute, _diffAndMount } from "./diff";
import { _dispatch, _featureHooks, VNode, VNodeTypes, createBatch } from "./common";
import { ComponentInstance, unmounted } from "./component";

// ----------------------------------------------------------------------------- PREPARE INITIAL VALUE

export type TInitialValue <GType> = GType | ((oldValue?:GType) => GType)

export const _prepareInitialValue = <GType> ( initialValue:TInitialValue<GType>, oldValue?:GType ) => (
	typeof initialValue == "function"
	? ( initialValue as (oldValue?:GType) => GType )(oldValue)
	: initialValue as GType
)

// ----------------------------------------------------------------------------- STATE TYPES

export type IAtom <GType> = {
	readonly type:VNodeTypes
	toString ():string
	// valueOf ():GType
	value:GType
}

export type IState<GType = any> = IAtom <GType> & {
	set ( newValue:TInitialValue<GType> ):Promise<void>
	peek ():GType
	sneak (value:GType):void
	// valueOf ():GType
	dispose ():void
}

export interface IComputeState<GType> extends IState<GType> {
	update ():void
}


export type TDisposeHandler = () => void

// It looks like PHPStorm does not like this one
export type TEffectHandler <
	GCheck extends any[] = [],
	// GArguments extends any[] = [ ...GCheck, ...GCheck ],
	GArguments extends any[] = GCheck,
> = ( ...rest:GArguments ) => TDisposeHandler|void|Promise<void>

type TCheckEffect<GCheck extends any[] = []> = () => GCheck


export type TComputed <GType> = () => GType

type TEffect<GCheck extends any[] = any[]> = {
	_check		:TCheckEffect<GCheck>|null
	_handler	:TEffectHandler<GCheck>
	_dom		:boolean
	_values		:GCheck
	_dispose	:TDisposeHandler
}

// ----------------------------------------------------------------------------- INVALIDATE EFFECT

const _invalidateEffect = createBatch( _callEffect )

// ----------------------------------------------------------------------------- INVALIDATE COMPONENT

/**
 * Invalidate a component instance.
 * Will batch components in a microtask to avoid unnecessary renders.
 */
export const invalidateComponent = createBatch<ComponentInstance>(
	component => _diffAndMount( component.vnode, component.vnode, null, true )
);

// ----------------------------------------------------------------------------- DOM

export function updateDomFromState ( node:VNode, value ) {
	// Do direct dom update
	let propertyName:string
	if ( node.type === 3/*VALUE STATE*/ )
		node.dom.nodeValue = value as string
	else {
		propertyName = node._propertyName
		// Reset attribute for "src", allow empty images when changing src
		// if ( node.dom instanceof HTMLImageElement && propertyName === "src" )
		if ( propertyName === "src" )
			_setDomAttribute( node.dom as Element, propertyName, "" )
		_setDomAttribute( node.dom as Element, propertyName, value )
	}
	_dispatch( _featureHooks, 3/* MUTATING NODE */, node, propertyName )
}

// ----------------------------------------------------------------------------- STATE

// TODO : DOC
let _currentEffect:TEffect

// TODO : DOC
let _currentStates = new Set<IState>()

// FIXME : We may have a memory leak !
// 			What happens to Node added to state without parent component attached to the state
//			It seems they will be kept for ever into the _nodes Set ...

/**
 * TODO : DOC
 * @param initialValue
 */
export function state <GType> ( initialValue?:TInitialValue<GType> ):IState<GType> {
	// Prepare initial value if it's a function
	initialValue = _prepareInitialValue( initialValue )
	// List of side effects / node / components to update
	let _effects = new Set<TEffect>()
	let _nodes = new Set<VNode>()
	let _components = new Set<ComponentInstance>()
	// Listen effects that create states
	if ( _currentEffect )
		_effects.add( _currentEffect )
	// Update the state value and dispatch changes
	async function updateValue ( newValue:GType, forceUpdate = false ) {
		if ( !_effects )
			return
		// FIXME : Throw error in dev mode
		// Halt update if not forced and if new value is same as previous
		if ( newValue === initialValue && !forceUpdate )
			return
		// Call dispose on all associated effects.
		// effect and changed
		for ( const effect of _effects )
			effect._dispose?.()
		// Store new value in
		// to the argument variable
		initialValue = newValue
		// Call all associated effect handlers ( not "changed()" handlers )
		// Do not attach effects ( false by default as second argument of _callEffect )
		for ( const effect of _effects )
			if ( !effect._dom )
				_callEffect( effect )
		// Then dispatch direct dom updates
		for ( const node of _nodes )
			// Skip this node if the whole component needs to be refreshed
			if ( !_components.has( node.component ) )
				updateDomFromState( node, initialValue )
		// Dispatch all component refresh at the same time and wait for all to be updated
		const _promises = []
		for ( const component of _components )
			_promises.push(
				new Promise<void>( r => invalidateComponent( component, r ) )
			)
		_components.clear();
		await Promise.all( _promises )
		// Call all associated "changed()" handlers ( effects associated to a component render )
		// Do not attach effects ( false by default as second argument of _callEffect as task of _invalidateEffect )
		if ( _effects )
			for ( const effect of _effects )
				if ( effect._dom )
					_invalidateEffect( effect )
	}

	// if this state is created into a factory phase of a component,
	// auto-dispose it on component unmount
	const dispose = unmounted(() => {
		// console.log("dispose state")
		// FIXME : For HMR, maybe delay it ? Maybe disable =null when hmr enabled ?
		// initialValue = null;
		if ( _effects ) {
			_effects.clear()
			_nodes.clear()
			_components.clear()
			_effects = null
			_nodes = null
			_components = null
		}
	})

	const _localState:IState<GType> = {
		// --- PUBLIC API ---
		// Get current value and register effects
		get value () {
			// Get current node and component
			const currentNode = getCurrentDiffingNode()
			const currentComponent = getCurrentComponent()
			// Register current before effect handler
			if ( _currentEffect ) {
				_effects.add( _currentEffect )
				_currentStates.add( this )
			}
			// Register current text node
			else if (
				currentNode
				&& (currentNode.type === 3/*TEXT*/ || currentNode.type === 2 /*ARGUMENT*/)
				&& currentNode.value === this // <- FIXME Explain
			) {
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
			updateValue( _prepareInitialValue( newValue, initialValue as GType ), forceUpdate ),
		// Get value without registering effects
		peek () { return initialValue as GType },
		// Set value without calling effects
		sneak ( value:GType ) { initialValue = value },
		// Get type of this object
		get type () { return 3/*STATE*/ as VNodeTypes },
		// Use state as a getter without .value
		toString () { return this.value + '' },
		// valueOf () { return this.value },
		// Remove and clean this state
		dispose,
		// --- PRIVATE API ---
		// @ts-ignore Private method for effect
		// Remove an effect handler
		_removeEffect ( effect:TEffect ) {
			_effects?.delete( effect )
		},
	}
	// Call hook for new state created
	_dispatch(_featureHooks, 4/* NEW STATE */, _localState)
	return _localState;
}

// ----------------------------------------------------------------------------- EFFECTS / CHANGED

function _detachEffectFromStates ( associatedStates:IState[], effect:TEffect ) {
	// TODO : Dispose + register in component for later disposal
	const total = associatedStates.length
	for ( let i = 0; i < total; ++i )
		// @ts-ignore
		associatedStates[i]._removeEffect( effect )
}

function _captureAssociatedStates () {
	const associatedStates = Array.from( _currentStates )
	// Clear current states list
	_currentStates.clear()
	return associatedStates
}

function _callEffectHandler ( effect:TEffect, values?:any[] ) {
	// Call handler with old values
	const effectDispose = effect._handler( ...effect._values )
	// Register value as previous values after effect has been called
	effect._values = values
	// Save dispose function, override it if a function is not returned after
	effect._dispose = ( typeof effectDispose === "function" ? effectDispose : null )
}

function _callEffect ( effect:TEffect, attach = false ) {
	// Attach before check and handler
	if ( attach )
		_currentEffect = effect
	// If we have a check function, check values and attach on this function
	if ( effect._check ) {
		// Convert states to their values
		const values = effect._check().map( v => v && v.type === 3/* STATE */ ? v.value : v )
		// Detach after check so effect handler will not attach to states
		if ( attach )
			_currentEffect = null
		// Check if values changed. Never skip if those are the first values we have.
	 	if ( !effect._values.length || values.find((v, i) => effect._values[i] !== v) != null )
			 _callEffectHandler( effect, values )
	}
	else {
		// Run the handler once,
		_callEffectHandler( effect, [false] )
		// Detach after and handler
		if ( attach )
			_currentEffect = null
	}
}

// TODO : DOC
function _prepareEffect <GCheck extends any[]> ( _handler:TEffectHandler<GCheck>, _dom:boolean, _check?:TCheckEffect<GCheck> ) {
	// Register this effect as running so all states can catch the handler
	const _effect:TEffect = {
		_handler,
		_check,
		_dom,
		// @ts-ignore
		_values: _check ? [] : [true],
		_dispose: null,
	}
	let _associatedStates:IState[]
	function _run () {
		// Call effect now and attach to states
		_callEffect( _effect, true )
		// Clone associated states list to be able to detach later
		_associatedStates = _captureAssociatedStates()
	}
	_dom ? getCurrentComponent()._afterNextRenderHandlers.push( _run ) : _run()
	return unmounted( () => _detachEffectFromStates(_associatedStates, _effect) )
}

export function effect <GCheck extends any[]> ( handler:TEffectHandler<GCheck>, check?:TCheckEffect<GCheck> ):TDisposeHandler {
	return _prepareEffect( handler, false, check )
}

export function changed <GCheck extends any[]> ( handler:TEffectHandler<GCheck>, check?:TCheckEffect<GCheck> ):TDisposeHandler {
	return _prepareEffect( handler, true, check )
}

// ----------------------------------------------------------------------------- COMPUTE

// TODO : DOC
export function compute <GType> ( handler:TComputed<GType> ):IComputeState<GType> {
	// FIXME : Can't we optimize state initialisation here ?
	const internalState:IComputeState<GType> = state<GType>() as IComputeState<GType>
	// FIXME : Async effect should work here
	internalState.update = () => internalState.set( handler() )
	const effectDispose = effect( internalState.update )
	const { dispose } = internalState
	internalState.dispose = unmounted(() => {
		effectDispose()
		dispose()
	})
	return internalState
}