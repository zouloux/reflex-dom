// import { h, render, state, DefaultReflexBaseProps, shouldUpdate } from "reflex-dom"
import {
	h, state,
	shouldUpdate, IState, createBatch,
	getCurrentDiffingNode, updateDomFromState, VNode, effect,
} from "../../../src"
import { For, createDomSelector } from "../../../src/performance-helpers"

// ----------------------------------------------------------------------------- DEBUG

// @ts-ignore
let memoryDebugger
import { drawReflexDebug, MemoryUsage } from "../../../src/debug";
if ( process.env.NODE_ENV !== 'production' ) {
	// drawReflexDebug();
	memoryDebugger = <MemoryUsage />
}

// ----------------------------------------------------------------------------- DATA HELPERS

const A = [
	"pretty", "large", "big", "small", "tall", "short", "long", "handsome",
	"plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful",
	"mushy", "odd", "unsightly", "adorable", "important", "inexpensive",
	"cheap", "expensive", "fancy"
];
const C = [
	"red", "yellow", "blue", "green", "pink", "brown", "purple", "brown",
	"white", "black", "orange"
];
const N = [
	"table", "chair", "house", "bbq", "desk", "car", "pony", "cookie",
	"sandwich", "burger", "pizza", "mouse", "keyboard"
];

const _pick = array => array[Math.floor(Math.random() * array.length)]

// ----------------------------------------------------------------------------- STRUCT & STATES

interface IDataItem
{
	id		:number
	label	:string
}

const $data = state<IDataItem[]>([])
let _selectedId = null

// ----------------------------------------------------------------------------- DOM SELECTOR

// TODO : To include into reflex

const isSelectedClassNameDomSelector = createDomSelector<string>( path => {
	return _selectedId === path ? "danger" : ""
})

const labelDomSelector = createDomSelector<number>( path => {
	const item = $data.peek().find( item => item.id === path )
	return item.label
})

// ----------------------------------------------------------------------------- DATA ACTIONS

const run = () => $data.set( buildData(100) )
const runLots = () => $data.set( buildData(10000) )
const add1 = () => $data.set( d => [...buildData(100), ...d] )
const add2 = () => $data.set( d => [...d, ...buildData(100)] )
const update = () => {
	const data = $data.peek()
	const length = data.length
	for ( let i = 0; i < length; i += 10 ) {
		const item = data[i]
		item.label += ' !!!';
		labelDomSelector.update( item.id )
	}
}
// effect(() => {
// 	console.log("L", $data.value.length)
// })
const clear = () => {
	$data.set([])
	labelDomSelector.clear()
	isSelectedClassNameDomSelector.clear()
}
const swapRows = () => $data.set( d => {
	if ( d.length >= 100 ) {
		let tmp = d[1];
		d[1] = d[98];
		d[98] = tmp;
		return [...d];
	}
	return d
})
const remove = id => $data.set(d => {
	// alert( id )
	labelDomSelector.remove( id )
	isSelectedClassNameDomSelector.remove( id )
	const index = d.findIndex( d => d.id === id );
	if ( index < 0 ){
		console.error(`Id ${id} not found`)
		return d
	}
	return [ ...d.slice(0, index), ...d.slice(index + 1) ];
})
const toggleSelection = ( id:number ) => {
	let previousId = _selectedId
	_selectedId = _selectedId === id ? null : id
	previousId && isSelectedClassNameDomSelector.update( previousId )
	_selectedId && isSelectedClassNameDomSelector.update( _selectedId )
}

// ----------------------------------------------------------------------------- BUILD DATA

let _counter = 1;
const buildData = (count:number) => {
	const data = new Array(count);
	for ( let i = 0; i < count; i++ ) {
		data[i] = {
			id: _counter++,
			label: `${_pick(A)} ${_pick(C)} ${_pick(N)}`,
		};
	}
	return data;
};

// ----------------------------------------------------------------------------- BUTTON

function Button ({ id, onClick, title }) {
	return <div class="col-sm-6 smallpad">
		<button
			type="button"
			class="btn btn-primary btn-block"
			id={ id } onClick={ onClick }
			children={[ title ]}
		/>
	</div>
}

// ----------------------------------------------------------------------------- ROW

Row.isFactory = false
Row.shouldUpdate = () => false
function Row ( props ) {
	// console.log("Render row", props.key)
	return <tr class={ isSelectedClassNameDomSelector.connect( props.id ) }>
		<td class="col-md-1">{ props.id }</td>
		<td class="col-md-4">
			<a onClick={ () => toggleSelection( props.id ) }>
				{ labelDomSelector.connect( props.id ) }
			</a>
		</td>
		<td class="col-md-1">
			<a onClick={ () => remove( props.id ) }>
				<span class="glyphicon glyphicon-remove" aria-hidden="true" />
				{/*<span>{ props.id }</span>*/}
			</a>
		</td>
		<td class="col-md-6" />
	</tr>
}

// ----------------------------------------------------------------------------- JUMBOTRON

function Jumbotron () {
	return <div class="jumbotron">
		<div class="row">
			<div class="col-md-6">
				<h1>Reflex-DOM keyed</h1>
			</div>
			<div class="col-md-6">
				<div class="row">
					<Button id="run" title="Create 100 rows" onClick={ run } />
					<Button id="runlots" title="Create 10,000 rows" onClick={ runLots } />
					<Button id="add1" title="Prepend 100 rows" onClick={ add1 } />
					<Button id="add2" title="Append 100 rows" onClick={ add2 } />
					<Button id="update" title="Update every 10th row" onClick={ update } />
					<Button id="clear" title="Clear" onClick={ clear } />
					<Button id="swaprows" title="Swap Rows" onClick={ swapRows } />
				</div>
			</div>
		</div>
	</div>
}

// ----------------------------------------------------------------------------- APP

export function App () {
	return () => <div class="container">
		<style innerHTML={`
			.danger {
				background: red
			}
			.glyphicon-remove {
				display: block;
				background: green;
				width: 20px;
				height: 20px;
			}
		`} />
		{ memoryDebugger }
		<Jumbotron />
		<table class="table table-hover table-striped test-data">
			{/*<tbody>*/}
			{/*	{ $data.value.map( item => <Row key={ item.id } id={ item.id } /> ) }*/}
			{/*</tbody>*/}
			<For each={ $data } as="tbody">
				{ item => <Row key={ item.id } id={ item.id } /> }
			</For>
		</table>
		{/*<span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true" />*/}
	</div>
}

//render(<App />, document.getElementById("main"))
