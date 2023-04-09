import {
	afterNextRender,
	changed,
	checkChanged,
	checkEffect,
	compute,
	effect,
	h,
	mounted,
	state
} from "../../../reflex-dom/src";

export function Effects () {


	const s1 = state( 0 )
	const s2 = state( 0 )
	const s3 = compute(() => s1.value * 2)

	// effect(() => {
	// 	console.log(">", s1.value, s2.value)
	// })
	checkEffect(() => [s1, s3], () => {
		console.log(">>", s1.value, s2.value, s3.value)
	})
	// checkChanged(() => [s1, s3], () => {
	// 	console.log(">>", s1.value, s2.value, s3.value)
	// })
	// const c1 = compute(() => s1.value * 2 )
	//
	// const renderState = state()

	// effect((oldS1, oldC1) => {
	// 	console.log(s1.value, c1.value, oldS1, oldC1)
	// }, () => [s1, c1])



	return () => <div>
		<button onClick={ e => s1.value ++ }>Inc</button>
		<button onClick={ e => s1.value = 0 }>Reset</button>
		<button onClick={ e => {s1.value ++; s2.value ++;} }>Inc Both</button>
		{ Date.now() }
		{/*<p>Value 1 { s1.value }</p>*/}
		{/*<p>Value 2 { s1.value }</p>*/}
		<p>State 1 { s1 }</p>
		<p>State 2 { s2 }</p>
	</div>
}
