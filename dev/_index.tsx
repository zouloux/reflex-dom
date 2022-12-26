import { changed, h, mounted, ref, render, state } from "../../src";
import { trackPerformances } from "../../src/debug";
import { colorList, createUID, foodList, pickRandom } from "../common/demoHelpers";
import { renderToString } from "../../src/renderToString";

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


function TestSVG () {
	//return <div class={["test"]} nope onClick={e => {}}> {"ok"}</div>
	return <svg height="210" width="500">
		<polygon points="200,10 250,190 160,210" style="fill:lime;stroke:purple;stroke-width:1" />
	</svg>
}

function DevApp () {
	const r = ref<HTMLDivElement>();

	mounted(() => {
		console.log( "DOM", r.dom );
	})

	return () => <div ref={ r }>
		<h1 class={["test", ["test2", false && "ok"]]}>Hello</h1>
		<TestComponent />
		<TestSVG />
		<div>After SVG {12}</div>
	</div>
}

// -----------------------------------------------------------------------------

export function init () {
	const p = trackPerformances("Root rendering")
	// console.log(<div><h1>Test</h1></div>)
	const a = <DevApp />
	console.log('A', a );
	render( a, document.getElementById('App') )
	const string = renderToString( a )
	console.log( string );
	// render( a, document.getElementById('App') )
	p();
}
init();
