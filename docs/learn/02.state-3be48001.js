const n=`import { h, state } from 'reflex-dom';

export function App(props) {
	const counter = state( 0 )
	const decrement = () => counter.value --
	const increment = () => counter.value ++
	return () => (
		<div>
			<div>Counter is {counter}</div>
			<button onClick={ decrement }>Decrement</button>
			<button onClick={ increment }>Increment</button>
		</div>
	);
}

// NOTE : render() is now called outside this file for convenience
`;export{n as default};
