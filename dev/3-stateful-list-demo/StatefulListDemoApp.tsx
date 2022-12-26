import { h, state } from "../../src";
import { colorList, createUID, foodList, pickRandom, rand } from "../common/demoHelpers";

// ----------------------------------------------------------------------------- HELPERS

interface IListItem {
	name	:string
	id		:string
}

// ----------------------------------------------------------------------------- LIST ITEM

const listItemStyle = {
	border: `1px solid black`
}

interface IListItemProps {
	item			: IListItem
	key				?
	removeClicked	?:	(e) => void
	moveUpClicked	?:	(e) => void
	moveDownClicked	?:	(e) => void
}

function ListItem ( props:IListItemProps ) {
	// shouldUpdate( p => true )
	// console.log( "ListItem" );
	return <tr class="ListItem" data-id={ props.item.id } style={ listItemStyle }>
		<td>{ props.item.name }</td>
		<td><button onClick={ props.moveUpClicked }>⬆</button></td>
		<td><button onClick={ props.moveDownClicked }>⬇</button></td>
		<td><button onClick={ props.removeClicked }>Remove</button></td>
	</tr>
}

// ----------------------------------------------------------------------------- LIST APP

export function StatefulDemoApp () {

	/**
	 * List state and reducers
	 */

	const list = state<IListItem[]>([])

	const clearList = () => {
		list.value = []
	}
	const addItem = ( position:"top"|"bottom", item:IListItem ) => {
		if ( position === "bottom" )
			list.value = [...list.value, item]
		else
			list.value = [item, ...list.value]
	}
	const removeItem = ( item:IListItem ) => {
		list.value = list.value.filter( currentItem => currentItem != item )
	}
	const moveItem = ( item:IListItem, offset:number ) => {
		const index = list.value.indexOf( item ) + offset
		if ( index < 0 || index >= list.value.length ) return;
		removeItem( item )
		list.value.splice( index, 0, item )
	}

	function addRandomItems ( total:number = 0 ) {
		total ||= rand( 5 + list.value.length ) + 1
		for ( let i = 0; i < total; i++ ) {
			addItem("bottom", {
				id: createUID(),
				name: pickRandom(colorList) + " " + pickRandom(foodList)
			})
		}
	}

	function removeRandomItems () {
		const total = rand( list.value.length ) + 1
		for ( let i = 0; i < total; i++ ) {
			const item = pickRandom( list.value )
			removeItem( item as any )
		}
	}

	function removeLastItem () {
		if (list.value.length === 0) return
		removeItem( list.value[ list.value.length - 1] )
	}

	/**
	 * Handlers
	 */

	function controlSubmitted ( event:Event ) {
		event.preventDefault()
		// TODO : Implement refs
		const nameInput = document.getElementById("StatefulDemoApp_nameInput") as HTMLInputElement
		if ( !nameInput.value ) return;
		addItem("top", {
			name: nameInput.value,
			id: createUID()
		})
		nameInput.value = ""
	}

	/**
	 * Sub-components
	 */

	function Controls () {
		console.log("Controls rendered")
		return <div className="StatefulDemoApp_controls">
			<table>
				<button onClick={ e => addRandomItems() }>Add random items to bottom</button>
				<button onClick={ e => addRandomItems( 1_000 ) }>Add 1_000 items to bottom</button>
				<button onClick={ e => addRandomItems( 10_000 ) }>Add 10_000 items to bottom</button>
				<button onClick={ e => removeRandomItems() }>Remove random items</button>
				<button onClick={ e => removeLastItem() }>Remove last items</button>
				<button onClick={ e => clearList() }>Clear list</button>
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
		{/* Optimized node, should render once */}
		<Controls />
		<h3>{ list.value.length } element{ list.value.length > 1 ? 's' : '' }</h3>
		<table>
			{ list.value.map( item =>
				/* Each item will be re-rendered, even with the same key */
				/* Because handlers are recreated each time list.value is mapped */
				<ListItem
					item={ item } key={ item.id }
					removeClicked={ e => removeItem( item ) }
					moveUpClicked={ e => moveItem( item, -1 ) }
					moveDownClicked={ e => moveItem( item, +1 ) }
				/>
			)}
		</table>
	</div>
}