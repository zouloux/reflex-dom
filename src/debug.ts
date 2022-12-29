import { h } from "./jsx";
import { mounted } from "./component";
import { compute } from "./states";
import { clearInterval } from "timers";
import { track } from "./common";

// ----------------------------------------------------------------------------- TRACK PERFORMANCES

/**
 * Track time performance of a function.
 * Call trackPerformances() to start time tracking.
 * Then call the returned function to stop time tracking and output delta in console.
 * @param subject Name of tracked function.
 */
export function trackPerformances ( subject:string ) {
	const start = performance.now()
	return () => {
		let delta:any = performance.now() - start
		if ( delta < 1 )
			delta = ~~(delta * 1000) + 'µs'
		else if ( delta < 1000 )
			delta = ~~( delta / 100 ) * 100 + 'ms'
		else
			delta = ~~( delta / 1000 / 100 ) * 100 + 's'
		console.info( subject, delta )
	}
}

// ----------------------------------------------------------------------------- MEMORY USAGE

/**
 * Memory usage Reflex Component.
 */
export function MemoryUsage ( props ) {
	const memory = compute(() => {
		// @ts-ignore
		let total = window.performance.memory.totalJSHeapSize
		total = Math.round(total / 10000) / 100
		return `Memory usage : ${total}mb`
	})
	mounted(() => {
		const interval = setInterval( memory.update, props.interval ?? 500 )
		return () => clearInterval( interval )
	})
	return () => h('div', {}, memory)
}

// ----------------------------------------------------------------------------- TRACK CHANGES

export function drawReflexChanges () {

	/**
	 * Track and draw components rendering.
	 */
	track.diff = ( node => {
		// @ts-ignore
		const p = trackPerformances(`Rendering ${node.value?.name ?? node.type}`);
		// FIXME : ??? Why sometimes no dom here ?
		if ( node.dom ) {
			const { classList } = (node.dom as HTMLElement)
			// @ts-ignore
			clearTimeout( node.dom._renderingTimeout )
			classList.add("_rendering")
			// @ts-ignore
			node.dom._renderingTimeout = setTimeout(() => classList.remove("_rendering"), 600)
		}
		return p
	})

	/**
	 * Track and draw direct text mutations.
	 * FIXME : How to track arguments, change color ?
	 */
	track.mutation = (node, type?:string) => {
		// FIXME : Arguments debug
		if ( type ) return
		// Get text node position with text selection because we cannot use getClientBoundingRect
		const range = document.createRange();
		range.selectNode(node.dom);
		const rect = range.getBoundingClientRect();
		range.detach();

		// Draw a div at this position and size for some ms
		const div = document.createElement("div")
		div.style.border = "2px dotted green"
		div.style.width = rect.width + 'px'
		div.style.height = rect.height + 'px'
		div.style.position = "fixed"
		div.style.top = rect.top + 'px'
		div.style.left = rect.left + 'px'
		document.body.append( div )
		setTimeout(() => div.parentElement.removeChild( div ), 300)
	}
}
