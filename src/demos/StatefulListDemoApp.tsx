import { h } from "../vdom";
import { createState } from "../vdom/hooks";

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
	item			: IListItem
	key				?
	removeClicked	?:	(e) => void
	moveUpClicked	?:	(e) => void
	moveDownClicked	?:	(e) => void
}

function ListItem ( props:IListItemProps ) {
	return <tr class="ListItem" data-id={ props.item.id } style={ listItemStyle }>
		<td>{ props.item.name }</td>
		<td><button onClick={ props.moveUpClicked }>⬆</button></td>
		<td><button onClick={ props.moveDownClicked }>⬇</button></td>
		<td><button onClick={ props.removeClicked }>Remove</button></td>
	</tr>
}

// ----------------------------------------------------------------------------- LIST APP

function InnerStatefulDemoApp () {

	const list = createState<IListItem[]>([])

	const clearList = () => {
		list.set([])
	}
	const addItem = ( position:"top"|"bottom", item:IListItem ) => {
		if ( position === "bottom" )
			list.set([...list.value, item])
		else
			list.set([item, ...list.value])
	}
	const removeItem = ( item:IListItem ) => {
		list.set( list.value.filter( currentItem => currentItem != item ) )
	}
	const moveItem = ( item:IListItem, offset:number ) => {
		const index = list.value.indexOf( item ) + offset
		if ( index < 0 || index >= list.value.length ) return;
		removeItem( item )
		list.set( [...list.value].splice( index, 0, item ) );
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

	function Controls () {
		console.log("Controls rendered")
		return <div className="StatefulDemoApp_controls">
			<table>
				<button onClick={ e => addRandomItems() }>Add random items to bottom</button>
				<button onClick={ e => addRandomItems( 1000 ) }>Add 1000 items to bottom</button>
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
	}

	return () => <div class="StatefulDemoApp">
		{/* Optimized node, should render once */}
		<Controls />
		<h3>{ list.value.length } element{ list.value.length > 1 ? 's' : '' }</h3>
		<table>
			{ list.value.map( item =>
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


let internalRenderCount = 0
export function StatefulDemoApp () {
	// External component to check if it re-renders when sub-component updates
	return <div>
		<h3>Parent app {internalRenderCount++}</h3>
		<InnerStatefulDemoApp />
	</div>
}