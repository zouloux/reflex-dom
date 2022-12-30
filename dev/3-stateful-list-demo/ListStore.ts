import { IState, state } from "../../src";
import { colorList, createUID, foodList, pickRandom, rand } from "../common/demoHelpers";

export interface IListItem {
	name	:string
	id		:string
}

export interface IListStore {
	list:IState<IListItem[]>,
	clearList,
	addItem,
	removeItem,
	moveItem,
	addRandomItems,
	removeRandomItems,
	removeLastItem,
}

export function createListStore ():IListStore {

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

	return {
		list,
		clearList,
		addItem,
		removeItem,
		moveItem,
		addRandomItems,
		removeRandomItems,
		removeLastItem,
	}
}