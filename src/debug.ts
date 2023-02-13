import { h } from "./jsx";
import { mounted } from "./component";
import { compute } from "./states";
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

export function drawReflexDebug () {

	const style = document.createElement("style")
	style.innerHTML = `
        @keyframes _ReflexDebugFadeOut {
          50% { outline-color: var(--color) }
          100% { outline-color: rgba(0, 0, 0, 0) }
        }
        ._reflexDebugRendering {
          --color: pink;
          outline: 2px dotted var(--color);
          animation: _ReflexDebugFadeOut .6s;
        }
		._reflexDebugMutation {
		  --color: green;
		  position: fixed;
		  outline: 2px dotted var(--color);
          animation: _ReflexDebugFadeOut .3s;
		}
	`
	document.head.append( style )

	/**
	 * Track and draw components rendering.
	 */
	track.diff = ( node => {
		// Target component name
		// @ts-ignore
		let name = node.value?.name
		if ( !name && node.type === 5 ) {
			// @ts-ignore
			name = node.props.children[0].value.name
		}
		const p = trackPerformances(`Rendering ${name}`);

		// Target dom from vnode or children,
		let { dom } = node
		if ( !dom && node.component?.children?.dom )
			dom = node.component?.children?.dom

		if ( dom ) {
			const { classList } = (dom as HTMLElement)
			// @ts-ignore
			clearTimeout( dom._renderingTimeout )
			classList.add("_reflexDebugRendering")
			// @ts-ignore
			dom._renderingTimeout = setTimeout(() => classList.remove("_reflexDebugRendering"), 600)
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
		div.classList.add("_reflexDebugMutation");
		['top', 'left', 'width', 'height'].forEach(
			p => div.style[p] = rect[p] + 'px'
		)
		// div.style.width = rect.width + 'px'
		// div.style.height = rect.height + 'px'
		// div.style.top = rect.top + 'px'
		// div.style.left = rect.left + 'px'
		document.body.append( div )
		setTimeout(() => div.parentElement.removeChild( div ), 300)
	}

	return () => {
		document.head.removeChild( style )
		delete track.diff
		delete track.mutation
	}
}
