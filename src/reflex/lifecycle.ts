import { getHookedComponent } from "./diff";
import { LifecycleHandler, MountHandler } from "./index";
import { IBasicObservable } from "../signal/observable";

// ----------------------------------------------------------------------------- MOUNT / UNMOUNT

export function mounted ( handler:MountHandler ) {
	const component = getHookedComponent()
	component.mountHandlers.push( handler )
}

export function unmounted ( handler:LifecycleHandler ) {
	const component = getHookedComponent()
	component.unmountHandlers.push( handler )
}

// ----------------------------------------------------------------------------- TRACK CHANGE AFTER RENDER

// export function beforeRender ( observables:IBasicObservable<any>[], handler:MountHandler ) {
//
// }

export function afterRender ( observables:IBasicObservable<any>[], handler:MountHandler ) {}

type UnmountTrackHandler <GState> = (oldState:GState) => void
type TrackHandler <GState> = (newState:GState, oldState:GState) => UnmountTrackHandler<GState>|void

export function trackChange <GState> ( detectChanges:() => GState, executeHandler:TrackHandler<GState> ) {
	const component = getHookedComponent()

	let state = detectChanges()
	let previousUnmountHandler:LifecycleHandler

	function updateState ( oldState:GState ) {
		previousUnmountHandler && previousUnmountHandler( oldState );
		const executeResult = executeHandler( state, oldState )
		previousUnmountHandler = (
			( typeof executeResult === "function" ) ? executeResult : null
		)
	}

	let firstRender = true
	component.renderHandlers.push( () => {
		if ( firstRender ) {
			updateState( null );
			firstRender = false;
			return;
		}
		const oldState = state;
		state = detectChanges()
		if ( oldState != state )
			updateState( oldState )
	})
}
