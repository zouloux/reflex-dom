import { changed, h, mounted, render, state } from "../src";
import { trackPerformances, setReflexDebug } from "../src/debug";

/**
 * TODO ...
 * Le fait d'ajouter des children direct dans le state ça à l'air de foutre la merde
 * Si on met des objets dans le state et qu'on map dans le render ça marche
 */

// -----------------------------------------------------------------------------

function Child ( props ) {
	let children = state([])
	function addChild () {
		children.set([
			...children.value,
			<Child
				level={ props.level + 1 }
				index={ children.value.length }
				key={ children.value.length }
			/>
		])
	}
	async function removeChild () {
		//console.log(children.value.length)
		await children.set(
			children.value.filter( (c, i) =>
				i !== children.value.length - 1
			)
		)
		console.log( children.value );
	}
	mounted(() => {
		console.log("mounted", props, this.vnode.dom, this.vnode.dom.parentElement)
		return () => { console.log("unmounted", props) }
	})
	return () => {
		console.log("RENDER", children.value)
		return <div style={{paddingLeft: '20px'}}>
			<div>Level: { props.level }</div>
			<div>Index : { props.index }</div>
			<button onClick={ addChild }>Add child</button>
			<button onClick={ removeChild }>Remove child</button>
			<div>
				{ children.value }
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

setReflexDebug( true )

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
