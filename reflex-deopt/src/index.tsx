import { compute, h, state } from "../../src"
import { renderToString } from "../../src/renderToString.js"
import { For } from "../../src/performance-helpers";


function Item ( props ) {
	const $class = compute(() => props.isSelected ? "selected" : "" )
	return <div class={ $class }>
		<span>ITEM</span>
		<span>{ props.label }</span>
	</div>
}

function getState () {
	return Array.from({ length: 1000 }).map( (_, i) => ({
		label: `Label ${i}`,
		isSelected: i % 2 == 0,
	}))
}

function App () {
	const $s1 = state( getState )
	return <div>
		<h1>Deoptigate test</h1>
		<For each={ $s1 }>
			{ item => <Item {...item} /> }
		</For>
	</div>
}

const c = renderToString( <App /> )

console.log( c )
