
// TODO v1.0 RC
// -> Better generic types that can leak from dispatch, without generic set at init
// -> Better generic types which respect type order for GHP
// TODO v1.0 RC
// -> Quick doc in github readme
// TODO v1.0.X
// -> Full doc from old doc on docsify

// ----------------------------------------------------------------------------- STRUCT

// GHP is Generic Type for Handler Parameters
// GHR is Generic Type for Handler Return

// Type of a signal handler
export type TSignalHandler <GHP extends any[], GHR = void|any> = ( ...rest:GHP) => GHR

export interface ISignal <GHP extends any[] = any[], GHR = void|any>
{
	add: ( handler:TSignalHandler<GHP, GHR>, once?:boolean, callAtInit?:boolean|GHP ) => () => void
	remove: ( handler:TSignalHandler<GHP, GHR> ) => void
	dispatch: ( ...rest:GHP ) => GHR[]
	clear: () => void
	readonly listeners: TSignalHandler<GHP, GHR>[]
}

export interface IStateSignal <GHP extends any = any, GHR = void|any> extends ISignal<[GHP], GHR>
{
	dispatch: ( state:GHP ) => GHR[]
	readonly state:GHP
}

// ----------------------------------------------------------------------------- CLASSIC SIGNAL

export function Signal
	<GHP extends any[] = any[], GHR = void|any>		// Generics
	()												// Parameters
	:ISignal<GHP, GHR>								// Return
{
	let _listeners = []
	const remove = ( handler ) => _listeners = _listeners.filter( l => l[0] !== handler )
	return {
		add ( handler, once = false, callAtInit:boolean|GHP = false ) {
			// Add listener with once parameter
			_listeners.push([ handler, once ])
			// Call at init with parameters if callAtInit is an array of parameters
			// Just call without parameters if callAtInit is true
			callAtInit && handler.apply( null, Array.isArray(callAtInit) ? callAtInit : null );
			// Return a handler which will remove this listener
			// Very handy with React hooks like useLayoutEffect
			return () => remove( handler )
		},
		remove,
		dispatch: ( ...rest ) => _listeners.map( listener => {
			// Remove listener if this is a once
			listener[1] && remove( listener[0] );
			// Execute with parameters
			return listener[0]( ...rest );
		}),
		clear () { _listeners = [] },
		get listeners () { return _listeners.map( l => l[0] ) }
	}
}

// ----------------------------------------------------------------------------- STATE SIGNAL

export function StateSignal
	<GHP extends any = any[], GHR = void|any>				// Generics
	( _state:GHP = null, _signal = Signal<[GHP], GHR>() )	// Parameters
	:IStateSignal<GHP, GHR>									// Return
{
	return {
		..._signal,
		dispatch ( state ) {
			_state = state;
			return _signal.dispatch( state )
		},
		get state () { return _state }
	}
}