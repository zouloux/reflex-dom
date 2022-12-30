import { h } from "../../src";
import { createUID } from "../common/demoHelpers";
import { createListStore, IListItem, IListStore } from "./ListStore";

// ----------------------------------------------------------------------------- LIST ITEM

const listItemStyle = {
	border: `1px solid black`
}

interface IListItemProps {
	item			: IListItem
	key				?:string
	store			: IListStore
}

ListItem.isFactory = false
function ListItem ( props:IListItemProps ) {
	const removeClicked = e => props.store.removeItem( props.item )
	const moveUpClicked = e => props.store.moveItem( props.item, -1 )
	const moveDownClicked = e => props.store.moveItem( props.item, +1 )
	return <tr class="ListItem" data-id={ props.item.id } style={ listItemStyle }>
		<td>{ props.item.name }</td>
		<td><button onClick={ moveUpClicked }>⬆</button></td>
		<td><button onClick={ moveDownClicked }>⬇</button></td>
		<td><button onClick={ removeClicked }>Remove</button></td>
	</tr>
}

// ----------------------------------------------------------------------------- LIST APP

export function StatefulDemoApp () {

	const store = createListStore()

	/**
	 * Handlers
	 */
	function controlSubmitted ( event:Event ) {
		event.preventDefault()
		// TODO : Implement refs
		const nameInput = document.getElementById("StatefulDemoApp_nameInput") as HTMLInputElement
		if ( !nameInput.value ) return;
		store.addItem("top", {
			name: nameInput.value,
			id: createUID()
		})
		nameInput.value = ""
	}

	/**
	 * Controls buttons as a pure functional component.
	 */
	function Controls () {
		console.log("Controls rendered. ( should run once )")
		return <div className="StatefulDemoApp_controls">
			<table>
				<button onClick={ e => store.addRandomItems() }>Add random items to bottom</button>
				<button onClick={ e => store.addRandomItems( 1_000 ) }>Add 1_000 items to bottom</button>
				<button onClick={ e => store.addRandomItems( 10_000 ) }>Add 10_000 items to bottom</button>
				<button onClick={ e => store.removeRandomItems() }>Remove random items</button>
				<button onClick={ e => store.removeLastItem() }>Remove last items</button>
				<button onClick={ e => store.clearList() }>Clear list</button>
			</table>
			<form onSubmit={ controlSubmitted }>
				<table>
					<input
						id="StatefulDemoApp_nameInput"
						type="text" name="name" placeholder="Name ..."
					/>
					<button type="submit">Add to top</button>
				</table>
			</form>
		</div>
	}

	/**
	 * Render
	 */
	return () => <div class="StatefulDemoApp">
		<Controls />
		<h3>{ store.list.value.length } element{ store.list.value.length > 1 ? 's' : '' }</h3>
		<table>
			{ store.list.value.map( item =>
				<ListItem item={ item } key={ item.id } store={ store } />
			)}
		</table>
	</div>
}