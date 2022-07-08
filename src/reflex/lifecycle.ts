import { getHookedComponent } from "./diff";
import { _typeof, LifecycleHandler, MountHandler } from "./common";

// ----------------------------------------------------------------------------- MOUNT / UNMOUNT

export function mounted ( handler:MountHandler ) {
	// FIXME : In dev mode, maybe check if component is mounted ?
	getHookedComponent()._mountHandlers.push( handler )
}

export function unmounted ( handler:LifecycleHandler ) {
	// FIXME : In dev mode, maybe check if component is mounted ?
	getHookedComponent()._unmountHandlers.push( handler )
}

// ----------------------------------------------------------------------------- TRACK CHANGE AFTER RENDER

type UnmountTrackHandler <GState> = (oldState:GState) => void
type TrackHandler <GState> = (newState:GState, oldState:GState) => UnmountTrackHandler<GState>|void
type DetectChanges <GState> = () => GState

export function changed <GState extends any[]> ( detectChanges:DetectChanges<GState>|TrackHandler<GState>, executeHandler?:TrackHandler<GState> ) {
	const component = getHookedComponent()
	// No executeHandler function means detectChanges has been omitted.
	// Do not check any change, just call executeHandler after every render.
	if ( !executeHandler ) {
		component._renderHandlers.push( detectChanges );
		return;
	}
	// Get first state
	let state = (detectChanges as DetectChanges<GState>)()
	// Stored previous unmount handler
	let previousUnmountHandler:LifecycleHandler
	// Update new state and call handlers
	function updateState ( oldState:GState ) {
		// Call previous handler with old state if it exists
		previousUnmountHandler && previousUnmountHandler( oldState );
		// Call executeHandler with new and old state
		const executeResult = executeHandler( state, oldState )
		// Get previous unmount handler from return or cancel it
		previousUnmountHandler = (
			_typeof(executeResult, "f")
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
