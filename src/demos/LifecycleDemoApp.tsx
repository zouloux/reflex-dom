import { h } from "../reflex";
import { mounted, unmounted } from "../reflex/lifecycle";
import { state } from "../reflex/state";
import { colorList, createUID, foodList, pickRandom } from "./demoHelpers";
import { ref, refs } from "../reflex/ref";

function SubChild ( props ) {
	const titleRef = ref()
	// Local stateless variable without ref 👀
	let clicked = 0
	mounted(() => {
		console.log(`SubChild mounted ${titleRef.dom.innerHTML}`)
		return () => {
			console.log(`SubChild unmounted ${clicked}`)
		}
	})
	function onClick () {
		console.log(`Clicked ${++clicked}`)
	}
	return () => <div onClick={ onClick }>
		<table>
			<tr>
				<td>Id :</td>
				<td>{ props.item.id }</td>
			</tr>
			<tr>
				<td>Name :</td>
				<td ref={ titleRef }>{ props.item.title }</td>
			</tr>
		</table>
	</div>
}

function ListItem ( props ) {
	mounted(() => {
		console.log("List item mounted")
	})
	unmounted(() => {
		console.log("List item unmounted")
	});
	return () => <div style={{ border: `1px solid white` }}>
		<span>ListItem</span>
		<SubChild item={ props.item }/>
		<button onClick={ e => props.removeClicked( props.item ) }>Remove</button>
	</div>
}

export function LifecycleDemoApp () {

	const isListVisible = state( true )
	const toggleListVisibility = () => isListVisible.set( !isListVisible.value )

	const list = state([])

	const itemRefs = refs()

	function addListItem () {
		const item = {
			id: createUID(),
			title: `${pickRandom(colorList)} ${pickRandom(foodList)}`,
		}
		list.set( [...list.value, item ] );
	}

	function removeListItem ( item ) {
		list.set( list.value.filter( c => c != item ) )
	}

	function List () {
		return <div>
			<button onClick={ e => addListItem() }>Add list item</button>
			<h3>Items :</h3>
			<div>
				{ list.value.map( item =>
					<ListItem
						ref={ itemRefs } key={ item.id }
						item={ item }
						removeClicked={ removeListItem }
					/>
				)}
			</div>
		</div>
	}

	return () => <div>

		<button onClick={ e => toggleListVisibility() }>
			{ isListVisible.value ? "Hide list" : "Show list" }
		</button>
		<br/><br/>

		{ isListVisible.value && <List pure={ false } /> }

	</div>
}