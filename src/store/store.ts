import { ISignal, Signal } from "@zouloux/signal";

/**
 * TODO :
 * - ASK ONLINE : Refactor arguments types generics
 * 		TODO : Clean types ! Reducers do not throw if wrong props are used in state !
 * - YEP : Able to connect it simply to cookey !
 *     - cookeyStore( store:IStore, name:string, propsToStore:{keyof Store}[] )
 * - NOPE : Separate classic and await code ?
 * - Create CancellablePromise ? Should help a lot.
 *
 * Goals :
 * - Base of next router 🥰
 * - Keep size ultra low
 * - Reflex / React / Preact compatibility.
 * - Find nice name.
 */


// ----------------------------------------------------------------------------- STRUCT

// Return types for before and after signals. Before are asynchronous, after are synchronous.
type TOnBeforeReturnType = Promise<any>
type TOnAfterReturnType = Exclude< any, Promise<any> >
type THandlerParameters<GState> = [ nextState:GState, oldState?:GState ]

// Argument for setState, can be a state object or a function which returns a state
type TStateSetter <GState extends object, GArguments extends any[]> = GState | ( (state:GState) => GState )

// Describes a reducer function
// Returning state is optional
type TReducer <GState extends object, GArguments extends any[]> = ( state:GState, ...rest:GArguments ) => GState//|void//GState|Promise<GState>|void

// List of reducers, with reducer as key, and reducer function as value
// export type TReducers <GState extends object, GReducerActions extends string, GArguments extends any[]> = {
export type TReducers <GState extends object, GReducers extends object, GArguments extends any[]> = {
	[ reducer in keyof GReducers ] ?: TReducer <GState, GArguments>
}

// TODO : DOC
type TActions = { [key:string]:(...rest) => any }

export interface IStore <GState extends object, GReducers extends object = object, GArguments extends string[] = any[], GActions extends TActions = TActions>
{
	/**
	 * Retrieve current store state object
	 */
	getState	: () => GState

	/**
	 * Update store state and call all listeners.
	 * Can be a function which take current state as argument and returns new state.
	 */
	setState	: ( newState: TStateSetter<GState, GArguments> ) => void

	/**
	 * Call a reducer.
	 * ex : dispatch('reducerKey', 'parameter after state')
	 * With reducers = {
	 *     reducerKey: (s, p) => { p == 'parameter after state' }
	 * }
	 * @param reducer Reducer name, key of reducers.
	 * @param rest Parameters given to reducer functions, after state argument.
	 */
	dispatch	: ( reducer:(keyof GReducers), ...rest:GArguments ) => Promise<void>
	// dispatch	: ( ...rest:GArguments ) => void

	/**
	 * Listen when state is about to be updated with setState or dispatch.
	 * Attach only asynchronous listeners.
	 * Listener can prevent state changes :
	 * Any listener rejection will cause state to be not updated
	 * Actual state change and all after listeners will be called after all before listeners.
	 * @param listener Called when state will be updated
	 * @returns Returns a function to remove this handler.
	 */
	onBefore	:ISignal<[GState, GState], Promise<any>>

	/**
	 * Listen when state is updated with setState or dispatch.
	 * Attach only synchronous listeners.
	 * Called after all before listeners, if none of them rejected state change.
	 * @param listener Called when state has been changed.
	 * @returns Returns a function to remove this handler.
	 */
	onAfter		:ISignal<[GState, GState], Exclude<any, Promise<any>>>

	/**
	 * When any on before signal handler prevented state change.
	 */
	onCanceled	:ISignal<[any]>

	// FIXME : Kill and override current updating state ?
	// onKilled	:ISignal
	// kill : () => void

	/**
	 * Lock or unlock state updates dispatches.
	 * If lock(true) is called, any state updated through setState or dispatch
	 * will not notify attached before or after event listeners.
	 * When calling lock(false), all listener will be notified if state has changed.
	 * It allows to optimize listeners notifications with this pattern :
	 * s.lock( true )
	 * s.dispatch(...)
	 * s.dispatch(...)
	 * s.setState(...)
	 * s.lock( false ) // will notify and update components state only once here
	 */
	lock		: ( locked:boolean ) => Promise<void>

	/**
	 * If store is currently manually locked
	 */
	readonly locked : boolean

	/**
	 * If store is currently dispatching an reducer asynchronously
	 */
	// readonly isDispatching : boolean

	/**
	 * If store is currently updating state asynchronously
	 */
	readonly isUpdating : boolean

	// TODO DOC
	actions:GActions
}


// ----------------------------------------------------------------------------- CREATE STORE

export function createStore
	<
		GState extends object,
		GReducers extends TReducers<GState, GReducers, GArguments>,
		GArguments extends any[] = any[],
		GActions extends TActions = TActions
		// TODO : Typed GArguments if possible with Typescript
		// GArguments extends any[] = Partial<[
		// 	Parameters<GReducers[keyof GReducers]>[1],
		// 	Parameters<GReducers[keyof GReducers]>[2],
		// 	Parameters<GReducers[keyof GReducers]>[3],
		// 	Parameters<GReducers[keyof GReducers]>[4],
		// 	Parameters<GReducers[keyof GReducers]>[5],
		// 	Parameters<GReducers[keyof GReducers]>[6],
		// 	Parameters<GReducers[keyof GReducers]>[7],
		// 	Parameters<GReducers[keyof GReducers]>[8],
		// 	Parameters<GReducers[keyof GReducers]>[9],
		// ]>,
		// GReducerActions extends string = keyof GReducers,
		// GReducers extends TReducers<GState, GReducers, GArguments>,
		// GArguments extends any[] = Partial<[
		// 	// FIXME : Refactor this, is it possible in current TS State ?
		// ]>
		// GArguments extends any[] = [
		// 	keyof GReducers,
		// 	// ...Parameters<GReducers[keyof GReducers]>
		// ]
	>
	( state:GState = null, reducers:GReducers = null, actions ?: GActions )
	: IStore<GState, GReducers, GArguments, GActions>
{
	// Init signals
	const onBefore = Signal<THandlerParameters<GState>, TOnBeforeReturnType>()
	const onAfter = Signal<THandlerParameters<GState>, TOnAfterReturnType>()
	const onCanceled = Signal<[any]>()
	// Init properties
	let isLocked = false
	// let _isDispatching = false
	let isUpdating = false
	let lockUpdated = false
	// Update state and call listeners
	// Will be synchronous if there are no asynchronous before listeners
	const update = async ( newState = state ) => {
		// Dispatch are locked, just save new state
		// without dispatching before or after listeners
		if ( isLocked ) {
			// Remember that state has been updated while locked
			// To dispatch new state when unlocking
			lockUpdated = true
			// Save new state
			state = newState
			return
		}
		// Prevent dispatches
		isUpdating = true
		// Dispatch all asynchronous before listeners
		let oldState = state
		// Only if we have some listeners, otherwise keep it synchronous
		if ( onBefore.listeners.length > 0 ) {
			// Start all promises in parallel
			try {
				await Promise.all( onBefore.listeners.map(
					async l => await l( newState, oldState )
				))
				// FIXME : Add sequential option ?
				// for ( const listener of _beforeListeners )
				// 	await listener( newState, oldState )
			}
			// Stop update if any of those middlewares trows rejection
			catch ( e ) {
				onCanceled.dispatch( e )
				isUpdating = false
				return
			}
		}
		// All listeners validated state change, save new state
		state = newState
		// Unlock right before after listeners so they can dispatch if needed
		isUpdating = false
		// Notify all after listeners that state changed
		onAfter.dispatch( newState, oldState )
	}
	// Expose public API
	return {
		// Get and set state
		getState : () => state,
		setState : ( newState:TStateSetter<GState, GArguments> ) => update(
			// Call state updater if it's a function
			( typeof newState === 'function' ? (newState as Function)( state ) : newState )
		),
		// Dispatch reducer
		dispatch : ( reducerName:(keyof GReducers), ...rest:GArguments ) => new Promise<void>( async (resolve, reject) => {
			// FIXME -> Dispatch should be able to override updating state
			// FIXME -> And kill current onBefore listeners
			// Already updating state asynchronously
			if ( isUpdating )
				return reject('updating')
			// Call reducer synchronously and update reduced data
			await update( reducers[ reducerName ]( state, ...rest) as GState )
			// Everything has been dispatched successfully
			resolve()
		}),
		// Expose signals
		onBefore,
		onAfter,
		onCanceled,
		// Lock or unlock updates
		async lock ( locked:boolean ) {
			isLocked = locked
			// If unlocking and state has changed while locked
			if ( !isLocked && lockUpdated ) {
				// Dispatch new state
				lockUpdated = false
				await update( state )
			}
		},
		// Get locked states
		get locked () { return isLocked },
		// get isDispatching () { return _isDispatching },
		get isUpdating () { return isUpdating },
		// Expose actions
		actions
	}
}