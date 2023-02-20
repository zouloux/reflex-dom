import { h, render } from 'reflex-dom';

export function App(props) {
	return (
		<div>
			<h2>Hello {props.name}</h2>
		</div>
	);
}

render(<App name="world" />, document.body);
