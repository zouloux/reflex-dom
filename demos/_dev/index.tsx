import { h, render } from "../../src/reflex";
import { trackPerformances, setReflexDebug } from "../../src/reflex/debug";
import { colorList, createUID, foodList, pickRandom } from "../common/demoHelpers";
import { state } from "../../src/reflex/atomic-bit"

// -----------------------------------------------------------------------------

interface IItem {
	id:string
	name:string
}

function ListItem (props) {
	const item:IItem = props.item
	return <li>{ item.id } : { item.name }</li>
}

function TestComponent () {
	const list = state<IItem[]>([])
	function addItems () {
		const items = []
		for ( let i = 0; i < 10; i++ ) {
			items.push({
				id: createUID(),
				name: pickRandom( colorList ) + ' ' + pickRandom( foodList )
			})
		}
		list.value = [ ...list.value, ...items ]
	}
	// addItems();
	// FIXME : Does not target correct node (it target first child)
	// return () => <div class={["TestComponent", list.value.length]}>
	return () => <div class={["TestComponent"]}>
		<button onClick={ addItems }>Add Items</button>
		<ul>
			{list.value.map( item =>
				<ListItem
					key={ item.id }
					item={ item }
				/>
			)}
		</ul>
		<span>{list.value.length}</span>
		{
			list.value.length > 0
			? <span>YES</span>
			: null
		}
	</div>
}

function DevApp () {
	return <div class="Coucou">
		<h1>Hello</h1>
		<TestComponent />
	</div>
}

// -----------------------------------------------------------------------------

setReflexDebug( true )

export function init () {
	const p = trackPerformances("Root rendering")
	const a = <DevApp />
	// console.log('A', a );
	render( a, document.getElementById('App') )
	// render( a, document.getElementById('App') )
	p();
}
init();
