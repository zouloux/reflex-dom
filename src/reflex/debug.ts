
// ----------------------------------------------------------------------------- ENABLE / DISABLE

let _enableReflexDebug = false;

export function getReflexDebug () { return _enableReflexDebug }
export function setReflexDebug (value:boolean) {
	_enableReflexDebug = value
}


// ----------------------------------------------------------------------------- TRACK PERFORMANCES

function noop () {}

export function trackPerformances ( subject:string ) {
	if ( !_enableReflexDebug && process.env.NODE_ENV !== "production" )
		return noop;
	const start = performance.now()
	return () => {
		const r = ~~( performance.now() - start )
		console.info( subject, r < 1000 ? `${r}ms` : `${r/1000}s`)
	}
}