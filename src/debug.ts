import { h } from "./jsx";
import { mounted } from "./component";
import { compute } from "./states";
import { clearInterval } from "timers";

// ----------------------------------------------------------------------------- TRACK PERFORMANCES

export function trackPerformances ( subject:string ) {
	// if ( process.env.NODE_ENV === "production" )
	// 	return () => {};
	const start = performance.now()
	return () => {
		const delta = ~~(( performance.now() - start ) / 10)
		console.info( subject, delta < 1000 ? `${delta*10}ms` : `${delta/100}s`)
	}
}

// ----------------------------------------------------------------------------- MEMORY USAGE

export function MemoryUsage () {
	const memory = compute(() => {
		// @ts-ignore
		let total = window.performance.memory.totalJSHeapSize
		total = Math.round(total / 10000) / 100
		return `Memory usage : ${total}mb`
	})
	mounted(() => {
		const interval = setInterval( memory.update, 1000 )
		return () => clearInterval( interval )
	})
	return () => h('div', {}, memory)
}
