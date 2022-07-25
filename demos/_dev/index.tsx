import { h, render, state } from "../../src/reflex";
import { trackPerformances, setReflexDebug } from "../../src/reflex/debug";
import { colorList, createUID, foodList, pickRandom } from "../common/demoHelpers";

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
		<span>Length: {list.value.length}</span>
		<div>
			Has children :&nbsp;
			{
				list.value.length > 0
				? <span>YES</span>
				: null
			}
		</div>
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
	// console.log(<div><h1>Test</h1></div>)
	const a = <DevApp />
	console.log('A', a );
	render( a, document.getElementById('App') )
	// render( a, document.getElementById('App') )
	p();
}
init();
