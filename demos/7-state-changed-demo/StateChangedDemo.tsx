import { changed, h, state } from "../../src";

interface IChangedTestProps {
	total:number
}

function ChangedTest ( props:IChangedTestProps ) {

	const stateA = state(0)
	const stateB = state(0)
	const stateC = state(0)

	// Listen stateA, stateB, and props.total.
	// Do not listen stateC
	// API 1, with an array of dependencies
	changed([stateA, stateB, () => props.total], (newA, newB, newTotal/*, oldA, oldB, oldTotal*/) => {
		console.log('Updated 1', {
			newA, newB, newTotal,
			// oldA, oldB, oldTotal
		})
	})

	// Listen stateA, stateB, and props.total.
	// Do not listen stateC
	// API 2, with a handler which will check all values of the array
	changed(() => [stateA.value, stateB.value, props.total], (newA, newB, newTotal/*, oldA, oldB, oldTotal*/) => {
		console.log('Updated 2', {
			newA, newB, newTotal,
			// oldA, oldB, oldTotal
		})
	})

	// Listen stateC and props.total
	// Dispatch when stateC is different than props.total
	changed([stateC, () => props.total], (a, b) => {
		if ( a !== b ) {
			console.log("StateC is different than props.total")
		}
	})

	return () => <div>
		<button onClick={ e => stateA.value ++ }>State A { stateA.value }</button>
		<button onClick={ e => stateB.value ++ }>State B { stateB.value }</button>
		<button onClick={ e => stateC.value ++ }>State C { stateC.value }</button>
	</div>
}



export function StateChangedDemo () {

	const propState = state(0)

	return () => <div>
		<button onClick={ e => propState.value ++ }>Props {propState.value}</button>
		<ChangedTest total={ propState.value } />
	</div>
}