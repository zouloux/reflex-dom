import { _dispatch } from "./common";

const _microtask = self.queueMicrotask ?? ( h => self.setTimeout( h, 0 ) )

type TTaskHandler <GType> = ( bucket:Set<GType> ) => void

export function createBatchedTask <GType> ( task:TTaskHandler<GType> ) {
	const bucket = new Set<GType>()
	const resolves = []
	return ( element:GType, resolve?:() => any ) => {
		!bucket.size && _microtask( () => {
			task( bucket )
			bucket.clear()
			_dispatch( resolves )
		});
		bucket.add( element )
		resolve && resolves.push( resolve )
	}
}
