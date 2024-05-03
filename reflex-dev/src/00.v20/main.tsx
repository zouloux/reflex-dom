// import { h, render, state, DefaultReflexBaseProps, shouldUpdate } from "reflex-dom"
import { h, state } from "../../../src"
import { For, atom, particle } from "../../../src/performance-helpers"
import { IAtom } from "../../../src/states";

// ----------------------------------------------------------------------------- DEBUG

// @ts-ignore
// let memoryDebugger
// import { drawReflexDebug, MemoryUsage } from "../../../src/debug";
// if ( process.env.NODE_ENV !== 'production' ) {
// 	drawReflexDebug();
// 	memoryDebugger = <MemoryUsage />
// }

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
	label	:IAtom<string>
}

const $data = state<IDataItem[]>([])
const $selected = state<number>( null )

// ----------------------------------------------------------------------------- DATA ACTIONS

const run = () => $data.set( buildData(1000) )
const runLots = () => $data.set( buildData(10000) )
const add1 = () => $data.set( d => [...buildData(100), ...d] )
const add2 = () => $data.set( d => [...d, ...buildData(100)] )
const update = () => {
	const list = $data.peek()
	for ( let i = 0; i < list.length; i += 10 )
		list[i].label.value += ' !!!';
}
const clear = () => $data.set([])
const swapRows = () => $data.set( d => {
	if ( d.length > 998 ) {
		let tmp = d[1];
		d[1] = d[998];
		d[998] = tmp;
		return [...d];
	}
	return d
})
const remove = id => $data.set(d => {
	const idx = d.findIndex( d => d.id === id );
	return [ ...d.slice(0, idx), ...d.slice(idx + 1) ];
})
const toggleSelection = ( id:number ) => {
	$selected.set( $selected.value === id ? null : id )
}

// ----------------------------------------------------------------------------- BUILD DATA

let _counter = 1;
const buildData = (count:number) => {
	// eslint-disable-next-line unicorn/no-new-array
	const data = new Array(count);
	for ( let i = 0; i < count; ++i ) {
		data[i] = {
			id: _counter++,
			label: atom( `${_pick(A)} ${_pick(C)} ${_pick(N)}` ),
		};
	}
	return data;
};

// ----------------------------------------------------------------------------- BUTTON

const Button = ({ id, onClick, title }) =>
	<div class="col-sm-6 smallpad">
		<button
			type="button"
			class="btn btn-primary btn-block"
			id={ id } onClick={ onClick }
			children={[ title ]}
		/>
	</div>

// ----------------------------------------------------------------------------- ROW

const Row = ( props ) => {
	// const classes = atomic( () => $selected.value === props.id ? "danger" : "" )
	// return <tr class={ classes }>
	const classes = particle( () => $selected.value === props.id ? "danger" : "" )
	// return <tr class={ atom( () => $selected.value === props.id ? "danger" : "" ) }>
	// return <tr class={ props.selected ? "danger" : "" }>
	return <tr class={ classes }>
		{Math.random()}
		<td class="col-md-1">{ props.id }</td>
		<td class="col-md-4">
			<a onClick={ () => toggleSelection( props.id ) }>
				{ props.label }
			</a>
		</td>
		<td class="col-md-1">
			<a onClick={ () => remove( props.id ) }>
				<span class="glyphicon glyphicon-remove" aria-hidden="true" />
			</a>
		</td>
		<td class="col-md-6" />
	</tr>
}

// Row.shouldUpdate = (newProps, oldProps) => oldProps.label !== newProps.label
Row.shouldUpdate = (newProps, oldProps) => false

// ----------------------------------------------------------------------------- JUMBOTRON

const Jumbotron = () =>
	<div class="jumbotron">
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

// ----------------------------------------------------------------------------- APP

export const App = () =>
	<div class="container">
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
			table {
				width: 800px;
				border: 1px solid red;
			}
			.col-md-4 {
				width: 100%;
			}
		`} />
		{/*{ memoryDebugger }*/}
		<Jumbotron />
		<table class="table table-hover table-striped test-data">
			<For as="tbody" each={ $data }>
				{ item => <Row
					key={ item.id } id={ item.id }
					label={ item.label }
					// selected={ $selected.value === item.id }
				/> }
			</For>
		</table>
	</div>

//render(<App />, document.getElementById("main"))
