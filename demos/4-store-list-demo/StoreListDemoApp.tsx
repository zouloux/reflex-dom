import { h, ref } from "../../src/reflex";
import { createStore } from "../../src/store/store";
import { storeState } from "../../src/store/reflexStoreState";
import { colorList, createUID, foodList, pickRandom, rand } from "../demoHelpers";

// ----------------------------------------------------------------------------- STORE

interface IListItem {
	name	:string
	id		:string
}

const getInitialListState = ():IListItem[] => []

const listStore = createStore( getInitialListState(), {
	clearList () {
		return getInitialListState()
	},
	addItem ( state, position:"top"|"bottom", item:IListItem ) {
		return position === "bottom" ? [ ...state, item ] : [ item, ...state ]
	},
	removeItem ( state, item:IListItem ) {
		return state.filter( currentItem => currentItem != item )
	},
	moveItem ( state, item:IListItem, offset:number ) {
		const index = state.indexOf( item ) + offset
		if ( index < 0 || index >= state.length ) return;
		state = this.removeItem( state, item )
		state.splice( index, 0, item )
		return state
	},
	addRandomItems ( state, total:number = 0 ) {
		total ||= rand( 5 + state.length ) + 1
		for ( let i = 0; i < total; ++i ) {
			state = this.addItem(state, "bottom", {
				id: createUID(),
				name: pickRandom(colorList) + " " + pickRandom(foodList)
			})
		}
		return state
	},
	removeRandomItems ( state ) {
		const total = rand( state.length ) + 1
		for ( let i = 0; i < total; ++i ) {
			const item = pickRandom( state )
			state = this.removeItem( state, item )
		}
		return state
	}
})

// ----------------------------------------------------------------------------- LIST ITEM

const listItemStyle = {
	border	: `1px solid black`
}

interface IListItemProps {
	item	: IListItem
	key		?
}

function ListItem ( props:IListItemProps ) {
	// console.log("ListItem")
	const { item } = props;
	return <tr class="ListItem" data-id={ item.id } style={ listItemStyle }>
		<td>{ item.name }</td>
		<td><button onClick={ e => listStore.dispatch("moveItem", item, -1 ) }>⬆</button></td>
		<td><button onClick={ e => listStore.dispatch("moveItem", item, +1 ) }>⬇</button></td>
		<td><button onClick={ e => listStore.dispatch("removeItem", item ) }>Remove</button></td>
	</tr>
}

// ----------------------------------------------------------------------------- LIST APP

export function StoreListDemoApp ( props ) {

	const list = storeState( listStore )
	const nameInput = ref<HTMLInputElement>()

	function controlSubmitted ( event:Event ) {
		event.preventDefault()
		if ( !nameInput.dom.value ) return;
		listStore.dispatch("addItem", "top", {
			name: nameInput.dom.value,
			id: createUID()
		})
		nameInput.dom.value = ""
	}

	function Controls () {
		return <div className="StatefulDemoApp_controls">
			<table>
				<button onClick={ e => listStore.dispatch("addRandomItems") }>Add random items to bottom</button>
				<button onClick={ e => listStore.dispatch("addRandomItems", 1_000 ) }>Add 1.000 items to bottom</button>
				<button onClick={ e => listStore.dispatch("addRandomItems", 10_000 ) }>Add 10.000 items to bottom</button>
				<button onClick={ e => listStore.dispatch("removeRandomItems") }>Remove random items</button>
				<button onClick={ e => listStore.dispatch("clearList") }>Clear list</button>
			</table>
			<form onSubmit={ controlSubmitted }>
				<table>
					<input
						id="StatefulDemoApp_nameInput" ref={ nameInput }
						type="text" name="name" placeholder="Name ..."
					/>
					<button type="submit">Add to top</button>
				</table>
			</form>
		</div>
	}

	return () => <div class="StatefulDemoApp">
		<span>Root render index : { props.renderIndex }</span>
		<Controls />
		<h3>{ list.value.length } element{ list.value.length > 1 ? 's' : '' }</h3>
		<table>
			{ list.value.map( item =>
				<ListItem item={ item } key={ item.id } />
			)}
		</table>
	</div>
}
