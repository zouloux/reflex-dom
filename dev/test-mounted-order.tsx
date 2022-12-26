import { changed, h, mounted, render, state } from "../src";
import { trackPerformances } from "../src/debug";

// -----------------------------------------------------------------------------

function Child ( props ) {
	let children = state([])
	function addChild () {
		children.set([ ...children.value, {} ])
	}
	async function removeChild () {
		await children.set(
			children.value.filter( (c, i) =>
				i !== children.value.length - 1
			)
		)
	}
	mounted(() => {
		console.log("mounted", props, this.vnode.dom, this.vnode.dom.parentElement)
		return () => { console.log("unmounted", props) }
	})
	return () => {
		// console.log("RENDER", children.value)
		return <div style={{paddingLeft: '20px'}}>
			<div>Level: { props.level }</div>
			<div>Index : { props.index }</div>
			<button onClick={ addChild }>Add child</button>
			<button onClick={ removeChild }>Remove child</button>
			<div>
				{ children.value.map( (item, i) =>
					<Child
						level={ props.level + 1 }
						index={ i }
						key={ i }
					/>
				) }
			</div>
		</div>
	}
}

function DevApp () {

	return () => <div>
		<Child level={ 0 } index={ 0 } />
	</div>
}

// -----------------------------------------------------------------------------

export function init () {
	const p = trackPerformances("Root rendering")
	const a = <DevApp />
	render( a, document.getElementById('App') )
	// const string = renderToString( a )
	// console.log( string );
	// render( a, document.getElementById('App') )
	p();
}
init();
