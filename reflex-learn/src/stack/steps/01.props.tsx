import { h, render } from 'reflex-dom';

function App (props) {
	// TODO
	return (
		<div>
			<h2>Hello PROPS { props.name }</h2>
		</div>
	);
}

render( <App name="world" />, document.body );