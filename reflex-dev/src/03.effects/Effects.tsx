import { afterNextRender, changed, compute, effect, h, mounted, state } from "../../../reflex-dom/src";

export function Effects () {


	const s1 = state( 0 )
	const c1 = compute(() => s1.value * 2 )

	const renderState = state()

	effect((oldS1, oldC1) => {
		console.log(s1.value, c1.value, oldS1, oldC1)
	}, () => [s1, c1])

	return () => <div>
		EFFECTS
		<hr />
		<h2>{ s1 }</h2>
		<button onClick={ e => s1.value ++ }>Inc</button>
		<button onClick={ e => s1.value = 0 }>Reset</button>
		<button onClick={ e => renderState.value = Math.random() }>Re render</button>
		<div hidden>{ renderState.value + "-" }</div>
	</div>
}
