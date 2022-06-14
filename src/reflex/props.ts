import { createBit, IPublicBit, TInitialValue } from "../signal/observable";


export interface IPropsProxy <GType> extends IPublicBit <GType> {
	readonly value:GType
	// readonly proxy:GType
	set ( newValue:TInitialValue<GType> ) : void
}

export function createPropsProxy <GProps> ( props:GProps ) :IPropsProxy<GProps> {
	// Create the bit and extract private dispatch and setter
	const { get, set, dispatch, ...bit } = createBit<GProps>( props );

	const proxy = new Proxy({}, {
		get ( target:{}, propName:string | symbol, receiver:any ):any {
			const props = get();
			return ( propName in props ? props[ propName ] : undefined )
		},
		set () { return false }
	})

	return {
		...bit,
		//proxy: proxy as GProps,
		get value () { return proxy as GProps },
		set ( newValue:GProps) {
			const oldValue = get();
			set( newValue );
			dispatch( newValue, oldValue )
		}
	}
}