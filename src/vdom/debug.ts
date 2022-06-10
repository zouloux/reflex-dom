

export let ENABLE_REFLEX_DEBUG = false


export function trackPerformances ( subject:string ) {
	if ( !ENABLE_REFLEX_DEBUG && process.env.NODE_ENV !== "production" ) return;
	const start = performance.now()
	return () => {
		const r = ~~( performance.now() - start )
		console.info( subject, r < 1000 ? `${r}ms` : `${r/1000}s`)
	}
}