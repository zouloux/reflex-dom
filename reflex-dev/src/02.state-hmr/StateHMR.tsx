import { h, mounted, state } from "../../../reflex-dom/src";

const getRandom = () => ~~(Math.random() * 10 )

export function StateHMR ( p ) {

	const topState = state( getRandom() )

	// mounted(() => {
	// 	console.log("mounted")
	// 	return () => {
	// 		console.log("unmounted")
	// 	}
	// })

	return () => <div>
		<button onClick={ e => topState.value ++ }>Top State : {topState}</button>
		<OtherComponent id={1} />
		<OtherComponent id={2} />
		<OtherComponent id={3} />
		<OtherComponent id={4} />
		<OtherComponent id={5} />
	</div>
}


export function OtherComponent ( props ) {
	const state1 = state( getRandom() )
	const state2 = state( getRandom() )
	return () => <div>
		<h3>{ props.id }</h3>
		<button onClick={ e => state1.value ++ }>State 1 : {state1}</button>
		<button onClick={ e => state2.value ++ }>State 2 : {state2}</button>
		<hr />
	</div>
}