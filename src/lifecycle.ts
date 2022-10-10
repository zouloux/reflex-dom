import { getCurrentComponent } from "./diff";
import { _VNodeTypes_STATE, LifecycleHandler, MountHandler } from "./common";
import { IState } from "./states";

// ----------------------------------------------------------------------------- MOUNT / UNMOUNT

export function mounted ( handler:MountHandler ) {
	// FIXME : In dev mode, maybe check if component is mounted ?
	getCurrentComponent()._mountHandlers.push( handler )
}

export function unmounted ( handler:LifecycleHandler ) {
	// FIXME : In dev mode, maybe check if component is mounted ?
	getCurrentComponent()._unmountHandlers.push( handler )
}

// ----------------------------------------------------------------------------- TRACK CHANGE AFTER RENDER

type TChangeDetector = any[]

type UnmountTrackHandler 	<GState extends TChangeDetector> 	= (...oldState:GState) => void
type TrackHandler 			<GState extends TChangeDetector>	= (...newState:GState) => UnmountTrackHandler<GState>|void
type DetectChanges 			<GState extends TChangeDetector>	= () => GState
type ArrayOfDependencies	<GState extends TChangeDetector>	= (IState<any>|(() => any))[]

export function changed <GState extends TChangeDetector> ( detectChanges:DetectChanges<GState>|ArrayOfDependencies<GState>|TrackHandler<GState>, executeHandler?:TrackHandler<GState> ) {
	const component = getCurrentComponent()
	// Do not continue if we use changed into a functional component
	// Because changed() is called at each render, it would cause handler to be
	// added at each render. Here we have only one listener
	// if ( component.vnode.value.isFactory === false )
	// 	return

	// No executeHandler function means detectChanges has been omitted.
	// Do not check any change, just call executeHandler after every render.
	if ( !executeHandler ) {
		component._renderHandlers.push( detectChanges as TrackHandler<GState> );
		return;
	}
	// Get first state
	if ( Array.isArray(detectChanges) ) {
		let _detectChanges = detectChanges;
		detectChanges = () => _detectChanges.map( dependency => {
			// Custom change function
			if ( typeof dependency === "function" )
				return dependency()
			// State
			else if ( typeof dependency === "object" && (dependency as IState<any>).type === _VNodeTypes_STATE )
				return ( dependency as IState<any> ).value
			if ( process.env.NODE_ENV !== "production" )
				throw new Error("Reflex - Changed can track states or functions only. changed([state, () => prop.value], ...)")
		}) as never as DetectChanges<GState>
	}
	let state = (detectChanges as DetectChanges<GState>)()
	// Stored previous unmount handler
	let previousUnmountHandler:LifecycleHandler
	// Update new state and call handlers
	function updateState ( oldState:GState ) {
		// Call previous handler with old state if it exists
		previousUnmountHandler && previousUnmountHandler.apply( null, oldState );
		// previousUnmountHandler && previousUnmountHandler( oldState );
		// Call executeHandler with new and old state
		const executeResult = executeHandler.apply( null, state.concat( oldState ) )
		// const executeResult = executeHandler( state, oldState )
		// Get previous unmount handler from return or cancel it
		previousUnmountHandler = (
			typeof executeResult == "function"
			? executeResult as UnmountTrackHandler<GState>
			: null
		)
	}
	// After component just rendered
	let firstRender = true
	component._renderHandlers.push( () => {
		// Always execute handler at first render
		if ( firstRender ) {
			updateState( null );
			firstRender = false;
		} else {
			// Otherwise, detect changes
			const oldState = state;
			state = ( detectChanges as DetectChanges<GState> )();
			// Check if any part of state changed
			if ( state.filter( (e, i) => oldState[i] != e ).length )
				updateState( oldState )
		}
	})
}
