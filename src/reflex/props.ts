import { ReflexError } from "./index";

// ----------------------------------------------------------------------------- PROPS PROXY
// Props proxy exists because we need a way to get updated props in a factory
// component. Because factory function is executed once, props object passed
// as first argument cannot be updated. Proxy helps us here because it will
// allow us to mock props but with every props updated.
// A caveat is that props is not iterable because proxy is a dynamic key / value
// object. Not really concerning because it makes no sense to iterate over
// a props object.

export interface IPropsProxy <GType> {
	readonly value:GType
	set ( newValue:GType ) : void
}

export function createPropsProxy <GProps> ( props:GProps ) : IPropsProxy<GProps> {
	const proxy = new Proxy({}, {
		// When request a prop, check on props object if it exists
		get ( target:{}, propName:string|symbol ):any {
			return ( propName in props ? props[ propName ] : undefined )
		},
		// Disallow set on props
		set () {
			throw new ReflexError(`PropsProxy.set // Setting values to props manually is not allowed.`)
		}
	})
	return {
		// Get the proxy object typed as a GProps object
		get value () { return proxy as GProps },
		// This method will set new props object (we override first argument of createPropsProxy)
		set ( newProps:GProps ) { props = newProps }
	}
}