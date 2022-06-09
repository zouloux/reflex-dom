import { h } from "../vdom";

// ----------------------------------------------------------------------------- HELPERS

const toHex = (n:number) => (~~n).toString(16)
const createUID = () => `${toHex(Date.now())}-${toHex(Math.random() * 999999999)}`;
const pickRandom = (array:any[]) => array[ ~~(Math.random() * array.length) ]
const rand = (max:number) => ~~(Math.random() * max)

const foodList = ["Cheese", "Carrots", "Pastas", "Pizza", "Burgers", "Ham", "Salad", "Mustard"]
const colorList = ["Red", "Blue", "Yellow", "Purple", "Orange", "Black"]

interface IListItem {
	name	:string
	id		:string
}

// ----------------------------------------------------------------------------- LIST ITEM

const listItemStyle = {
	border: `1px solid black`
}

interface IListItemProps {
	item	: IListItem
	key		?
}
function ListItem ( props:IListItemProps ) {
	function removeClicked () {
		removeItem( props.item )
	}
	function moveUpClicked () {
		moveItem( props.item, -1 )
	}
	function moveDownClicked () {
		moveItem( props.item, +1 )
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

function InnerStatefulDemoApp () {

	let _listItems:IListItem[] = []

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

	return () => <div class="StatefulDemoApp">
		<div class="StatefulDemoApp_controls">
			<table>
				<button onClick={ e => addRandomItems() }>Add random items to bottom</button>
				<button onClick={ e => addRandomItems(1000) }>Add 1000 items to bottom</button>
				<button onClick={ e => removeRandomItems() }>Remove random items</button>
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
		<h3>{ _listItems.length} element{ _listItems.length> 1 ? 's' : '' }</h3>
		<table>
			{ _listItems.map( item =>
				<ListItem item={ item } key={ item.id } />
			)}
		</table>
	</div>
}


let internalRenderCount = 0
export function StatefulDemoApp () {
	return <div>
		<h3>Parent app {internalRenderCount++}</h3>
		<InnerStatefulDemoApp />
	</div>
}