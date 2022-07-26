


// Shallow compare two objects, applied only for props between new and old virtual nodes.
// Will not compare "children" which is always different
// https://esbench.com/bench/62a138846c89f600a5701904
// TODO : Bench against with for i in loop (test small and huge props)
export const shallowPropsCompare = ( a:object, b:object, skipChildren = true ) => (
	// Same amount of properties ?
	Object.keys( a ).length === Object.keys( b ).length
	// Every property exists in other object ?
	// Never test "children" property which is always different
	&& Object.keys( a ).every( key =>
		( skipChildren && key === "children" )
		|| (b.hasOwnProperty(key) && a[key] === b[key])
	)
)


// Props proxy exists because we need a way to get updated props in a factory
// component. Because factory function is executed once, props object passed
// as first argument cannot be updated. Proxy helps us here because it will
// allow us to mock props but with every props updated.
// A caveat is that props is not iterable because proxy is a dynamic key / value
// object. Not really concerning because it makes no sense to iterate over
// a props object.
export type IPropsProxy <GProps extends object> = {
	proxy: GProps,
	set: ( newData:GProps ) => void
}

export const _proxyPrivateAccess = '_$'

export function _getPropsFromProxy <GProps extends object = object> ( propsOrProxy:GProps ) {
	return (
		// ( propsOrProxy instanceof Proxy )
		typeof propsOrProxy[ _proxyPrivateAccess ] === "object"
		? propsOrProxy[ _proxyPrivateAccess ] as GProps
		: propsOrProxy
	)
}

export function _createPropsProxy <GProps extends object = object> ( props:GProps ) : IPropsProxy<GProps> {
	return {
		proxy: new Proxy(props, {
			get ( target:{}, propName:string|symbol ):any {
				if ( propName === _proxyPrivateAccess )
					return props
				// TODO : Track dependencies like for state
				return propName in props ? props[ propName ] : void 0
			},
			set ():boolean {
				if ( process.env.NODE_ENV == "production" ) return false
				throw new Error(`Reflex - PropsProxy.set // Setting values to props manually is not allowed.`)
			}
		}) as GProps,
		// This method will set new props object (we override first argument of createPropsProxy)
		set: ( newProps:GProps ) => props = newProps
	}
}