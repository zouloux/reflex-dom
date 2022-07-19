
import { addDataListenerForNextNode } from "./jsx";
import { invalidateComponent } from "./render";
import { getHookedComponent } from "./diff";

export type IAtomicBitProxy <GProps> = [GProps, ( p:GProps) => void]

export type TInitialValue<GType> = GType | (() => GType)

type IState<GType> = { value:GType }

const prepareInitialValue = <GType> ( initialValue:TInitialValue<GType> ) => (
	// _typeof(initialValue, "f") ? ( initialValue as () => GType )() : initialValue as GType
	typeof initialValue == "function" ? ( initialValue as () => GType )() : initialValue as GType
)


// TODO : Getter setter types with generics


function createAtomicBitProxy <GData> ( data:GData, getter, setter ) : IAtomicBitProxy<GData> {
	const proxy = new Proxy({}, {
		get ( target:{}, propName:string|symbol ):any {
			return getter( data, propName )
		},
		set ( target:{}, propName:string|symbol, value:any, receiver:any ):boolean {
			return setter( data, propName, value )
		}
	})
	return [
		// Get the proxy object typed as a GData object
		proxy as GData,
		// This method will set new data object (we override first argument of createAtomicBitProxy)
		( newData:GData ) => data = newData
	]

}

export function createPropsProxy <GProps> ( props:GProps ) : IAtomicBitProxy<GProps> {
	return createAtomicBitProxy(
		props,
		( data, propName ) => propName in data ? data[ propName ] : void 0,
		( data, propName, value ) => {
			if ( process.env.NODE_ENV == "production" ) return false
			throw new Error(`Reflex - PropsProxy.set // Setting values to props manually is not allowed.`)
		}
	)
}



export function state <GType> ( initialValue?:TInitialValue<GType> ):IState<GType> {
	initialValue = prepareInitialValue( initialValue )
	const component = getHookedComponent()
	const affectedNodesIndex = component._affectedNodesByStates.push([]) - 1
	return createAtomicBitProxy<IState<GType>>(
		{ value: initialValue },
		( data, propName ) => {
			if ( component._isRendering ) {
				addDataListenerForNextNode( node => {
					console.log('>', component._affectedNodesByStates[affectedNodesIndex].length, node)
					component._affectedNodesByStates[affectedNodesIndex].push( node )
				})
			}
			return propName in data ? data[ propName ] : void 0
		},
		( data, propName, value ) => {
			if ( propName != "value" )
				return false
			data.value = value
			invalidateComponent( component )
		}
	)[0]
}