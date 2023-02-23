import { h, mounted, state } from "../../../reflex-dom/src";


export function OtherComponent ( props ) {
	const state1 = state( 0 )
	const state2 = state( 0 )
	mounted(() => {
		// console.log( this.vnode.dom.parentElement.parentElement );
	})
	return () => <div>
		<h3>{ props.id } test</h3>
		<button onClick={ e => state1.value ++ }>State 1 : {state1}</button>
		<button onClick={ e => state2.value ++ }>State 2 : {state2}</button>
		<hr />
	</div>
}