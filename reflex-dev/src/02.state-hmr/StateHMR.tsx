import { afterNextRender, changed, effect, h, mounted, state } from "../../../src";
import { OtherComponent } from "./OtherComponent";

const getRandom = () => 0//~~(Math.random() * 10 )

export function StateHMR ( p ) {

	const topState = state( getRandom() )

	// console.log("INIT 2")
	//
	// mounted(() => {
	// 	console.log("mounted")
	// 	return () => {
	// 		console.log("unmounted")
	// 	}
	// })
	// afterNextRender(() => {
	// 	console.log("afterNextRender 2 4")
	// })
	// changed(() => {
	// 	console.log("CHANGED", "hello", topState.value)
	// })
	// effect(() => {
	//
	// 	console.log("EFFECT", topState.value)
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
