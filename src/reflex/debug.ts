
// ----------------------------------------------------------------------------- ENABLE / DISABLE

let _enableReflexDebug = false;

export function getReflexDebug () { return _enableReflexDebug }
export function setReflexDebug (value:boolean) {
	_enableReflexDebug = value
}

// ----------------------------------------------------------------------------- TRACK PERFORMANCES

export function trackPerformances ( subject:string ) {
	if ( process.env.NODE_ENV === "production" || !_enableReflexDebug )
		return () => {};
	const start = performance.now()
	return () => {
		const delta = ~~( performance.now() - start )
		console.info( subject, delta < 1000 ? `${delta}ms` : `${delta/1000}s`)
	}
}