import { getCurrentComponent } from "./diff";

// Props proxy exists because we need a way to get updated props in a factory
// component. Because factory function is executed once, props object passed
// as first argument cannot be updated. Proxy helps us here because it will
// allow us to mock props but with every props updated.
// A caveat is that props is not iterable because proxy is a dynamic key / value
// object. Not really concerning because it makes no sense to iterate over
// a props object.

export let propsProxy = new Proxy({}, {
	get ( target:{}, propName:string|symbol ):any {
		// TODO : Track dependencies like for state
		const component = getCurrentComponent()
		const { props } = component.vnode
		return propName in props ? props[ propName ] : void 0
	},
	set ():boolean {
		if ( process.env.NODE_ENV == "production" ) return false
		throw new Error(`Reflex - PropsProxy.set // Setting values to props manually is not allowed.`)
	}
})
