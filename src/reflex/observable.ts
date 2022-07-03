import { Signal, ISignal } from "@zouloux/signal";

// ----------------------------------------------------------------------------- COMMON TYPES

export type TChangedHandler<GType, GReturnType = void> = ( newValue:GType, oldValue:GType) => GReturnType|Promise<GReturnType>

export type TSignalWithoutDispatch <GSignalArguments extends any[]> = Omit<ISignal<GSignalArguments>, "dispatch">

// ----------------------------------------------------------------------------- PREPARE INITIAL VALUE

export type TInitialValue<GType> = GType | (() => GType)

function prepareInitialValue <GType> ( initialValue:TInitialValue<GType> ) {
	return (
		(typeof initialValue)[0] == "f"
		? ( initialValue as () => GType )()
		: initialValue as GType
	)
}

// ----------------------------------------------------------------------------- BIT

export interface IPublicBit <GType> {
	onChanged		:TSignalWithoutDispatch<[GType, GType]>
	dispose 		() : void
}

export interface IBit <GType> extends IPublicBit <GType> {
	get () : GType
	set ( newValue:GType ) : void
	dispatch ( newValue:GType, oldValue:GType ) : any|void
}

/**
 * A bit is a piece of data associated to a signal, a getter and a setter.
 * A raw bit does not dispatch the signal when set on purpose. It's meant to be
 * used by an upper function which holds dispatch as a private member.
 * @param initialValue Initial value or initial value generator.
 */
export function createBit <GType> ( initialValue?:TInitialValue<GType> ):IBit<GType> {
	// Init and store the value in this scope
	let value:GType = prepareInitialValue( initialValue )
	// Create signal and extract dispatch method from it
	// So code accessing signal externally would not be able to dispatch and mess
	const onChanged = Signal<[GType, GType]>()
	const { dispatch } = onChanged
	delete onChanged.dispatch;
	// Return bit API
	return {
		onChanged,
		dispatch,
		get () { return value },
		set ( newValue:GType ) { value = newValue; },
		dispose () {
			onChanged.clear();
			value = null;
		}
	}
}

// ----------------------------------------------------------------------------- BASIC OBSERVABLE

export interface IBasicObservable <GType> extends IPublicBit <GType> {
	readonly value:GType
	set ( newValue:TInitialValue<GType> ) : void
}

/**
 * The simplest observable, holds a value a	and dispatch when mutated.
 * No shallow check, no invalidation step, not cancellable.
 * Everything is synchronous.
 * Has a private _dispose method to destroy it from memory.
 * @param initialValue Initial value or initial value generator.
 */
export function createBasicObservable <GType> ( initialValue?:TInitialValue<GType> ):IBasicObservable<GType> {
	// Create the bit and extract private dispatch and setter
	// const { get, set, dispatch, ...bit } = createBit<GType>( initialValue );
	const bit = createBit<GType>( initialValue );
	return {
		// ...bit,
		onChanged: bit.onChanged,
		dispose: bit.dispose,
		get value () { return bit.get() },
		set ( newValue:GType) {
			const oldValue = bit.get();
			bit.set( newValue );
			bit.dispatch( newValue, oldValue )
		}
	}
}

// ----------------------------------------------------------------------------- STATE OBSERVABLE

export interface IStateObservable <GType> extends IBasicObservable <GType> {
	set ( newValue:TInitialValue<GType> ) : Promise<void>
}

export function createStateObservable <GType> (
	initialValue	?:TInitialValue<GType>,
	beforeChanged	?:TChangedHandler<GType, boolean|void>
):IStateObservable<GType> {
	// Create the bit and extract private dispatch and setter
	// TODO : IMPORTANT : Weirdly, we can destruct like this with tsc
	// 	get value () { return get() } will not work and always return initial value
	// const { get, set, dispatch, ...bit } = createBit<GType>( initialValue );
	const bit = createBit<GType>( initialValue );
	return {
		// ...bit,
		onChanged: bit.onChanged,
		dispose: bit.dispose,
		get value () { return bit.get() },
		async set ( newValue:GType ) {
			const oldValue = bit.get();
			bit.set( newValue );
			if ( beforeChanged ) {
				// isLocked = true;
				const haltChange = await beforeChanged( newValue, oldValue )
				if ( haltChange === true ) {
					bit.set( oldValue );
					// isLocked = false;
					return;
				}
			}
			// isLocked = false;
			bit.dispatch( newValue, oldValue );
		}
	}
}

// ----------------------------------------------------------------------------- ASYNC OBSERVABLE

export interface IAsyncObservable <GType> extends IStateObservable <GType> {
	readonly isChanging			:boolean
	readonly wasAlreadyChanging	:boolean
}

export function createAsyncObservable <GType> (
	initialValue	?:TInitialValue<GType>,
	beforeChanged	?:TChangedHandler<GType, boolean|void>
):IAsyncObservable<GType> {
	// Create the bit and extract private dispatch and setter
	// const { get, set, dispatch, ...bit } = createBit<GType>( initialValue );
	const bit = createBit<GType>( initialValue );
	let isChanging = false
	let wasAlreadyChanging = false
	return {
		// ...bit,
		onChanged: bit.onChanged,
		dispose: bit.dispose,
		get value () { return bit.get() },
		get isChanging () { return isChanging },
		get wasAlreadyChanging () { return wasAlreadyChanging },
		async set ( newValue:GType ) {
			// Keep old to check changes
			const oldValue = bit.get();
			bit.set( newValue )
			// Call private changed as async (may change state asynchronously)
			if ( beforeChanged ) {
				if ( isChanging )
					wasAlreadyChanging = true
				isChanging = true;
				const haltChange = await beforeChanged( newValue, oldValue )
				if ( haltChange === true ) {
					bit.set( oldValue )
					isChanging = false
					wasAlreadyChanging = false
					return;
				}
				isChanging = false
				if ( wasAlreadyChanging ) {
					wasAlreadyChanging = false
					return
				}
			}
			// Call public onChange signal with new and old values
			bit.dispatch( newValue, oldValue )
		}
	}
}
