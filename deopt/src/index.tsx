import { compute, h, state } from "../../src"
import { renderToString } from "../../src/render-to-string"
import { For } from "../../src/performance-helpers";


function Item ( props ) {
	const $class = compute(() => props.isSelected ? "selected" : "" )
	return <div class={ $class }>
		<span>ITEM</span>
		<span>{ props.label }</span>
	</div>
}

function getState ( start = 0, total = 1000 ) {
	return Array.from({ length: total }).map( (_, i) => ({
		key: start + i,
		label: `Label ${start + i}`,
		isSelected: (start + i) % 2 == 0,
	}))
}

const $s1 = state( () => getState(0, 10) )

function App () {
	return <div>
		<h1>Deoptigate test</h1>
		<For each={ $s1 }>
			{ item => <Item key={ item.key } {...item} /> }
		</For>
	</div>
}

(async function () {
	const a = <App />
	const c1 = renderToString( a )
	await $s1.set( () => getState(5, 20) )
	const c2 = renderToString( a )

	console.log( c1 )
	console.log("-----")
	console.log( c2 )
})()
