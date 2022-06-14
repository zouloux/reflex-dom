import { h } from "../reflex";
import { colorList, createUID, foodList, pickRandom, rand } from "./demoHelpers";

// ----------------------------------------------------------------------------- DATA MODEL
// TODO : Convert to state then store

let _listItems:IListItem[] = []

interface IListItem {
	name	:string
	id		:string
}

const clearList = () => { _listItems = [] }
const addItem = ( position:"top"|"bottom", item:IListItem ) => {
	if ( position === "bottom" )
		_listItems.push( item )
	else
		_listItems.unshift( item )
}
const removeItem = ( item:IListItem ) => {
	_listItems = _listItems.filter( currentItem => currentItem != item )
}
const moveItem = ( item:IListItem, offset:number ) => {
	const index = _listItems.indexOf( item ) + offset
	if ( index < 0 || index >= _listItems.length ) return;
	removeItem( item )
	_listItems.splice(index, 0, item);
}

// ----------------------------------------------------------------------------- DEFAULT ITEMS

function addRandomItems ( total:number = 0 ) {
	total ||= rand( 5 + _listItems.length ) + 1
	for ( let i = 0; i < total; i++ ) {
		addItem("bottom", {
			id: createUID(),
			name: pickRandom(colorList) + " " + pickRandom(foodList)
		})
	}
}

function removeRandomItems () {
	const total = rand( _listItems.length ) + 1
	for ( let i = 0; i < total; i++ ) {
		const item = pickRandom( _listItems )
		removeItem( item )
	}
}

// ----------------------------------------------------------------------------- LIST ITEM

const listItemStyle = {
	border: `1px solid black`
}

interface IListItemProps {
	item	: IListItem
	render	: () => void
	key		?
}
function ListItem ( props:IListItemProps ) {
	function removeClicked () {
		removeItem( props.item )
		props.render();
	}
	function moveUpClicked () {
		moveItem( props.item, -1 )
		props.render();
	}
	function moveDownClicked () {
		moveItem( props.item, +1 )
		props.render();
	}
	return <tr class="ListItem" data-id={ props.item.id } style={ listItemStyle }>
		<td>{ props.item.name }</td>
		{/*<td><button onClick={ moveUpClicked } disabled={ _listItems.length < 2 }>⬆</button></td>*/}
		{/*<td><button onClick={ moveDownClicked } disabled={ _listItems.length < 2 }>⬇</button></td>*/}
		<td><button onClick={ moveUpClicked }>⬆</button></td>
		<td><button onClick={ moveDownClicked }>⬇</button></td>
		<td><button onClick={ removeClicked }>Remove</button></td>
	</tr>
}

// ----------------------------------------------------------------------------- LIST APP

interface IListDemoAppProps {
	render			: () => void
	// To force new renders
	renderIndex		:number
}

export function ListDemoApp ( props:IListDemoAppProps ) {

	function addRandomItemClicked ( max:number = 0 ) {
		addRandomItems( max );
		props.render();
	}
	function removeRandomItemsClicked () {
		removeRandomItems();
		props.render();
	}
	function clearListClicked () {
		clearList();
		props.render();
	}
	function controlSubmitted ( event:Event ) {
		event.preventDefault()
		// TODO : Implement refs
		const nameInput = document.getElementById("ListDemoApp_nameInput") as HTMLInputElement
		if ( !nameInput.value ) return;
		addItem("top", {
			name: nameInput.value,
			id: createUID()
		})
		nameInput.value = ""
		props.render();
	}

	return <div class="ListDemoApp">
		<div class="ListDemoApp_controls">
			<table>
				<button onClick={ e => addRandomItemClicked() }>Add random items to bottom</button>
				<button onClick={ e => addRandomItemClicked(1000) }>Add 1000 items to bottom</button>
				<button onClick={ removeRandomItemsClicked }>Remove random items</button>
				<button onClick={ clearListClicked }>Clear list</button>
			</table>
			<form onSubmit={ controlSubmitted }>
				<table>
					<input
						id="ListDemoApp_nameInput"
						type="text" name="name" placeholder="Name ..."
					/>
					<button type="submit">Add to top</button>
				</table>
			</form>
		</div>
		<h3>{_listItems.length} element{ _listItems.length> 1 ? 's' : '' }</h3>
		<table>
			{ _listItems.map( item =>
				<ListItem item={ item } key={ item.id } render={ props.render } />
			)}
		</table>
	</div>
}