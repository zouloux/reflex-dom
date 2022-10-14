import { render, h } from "../../src";
import { CodeViewer } from "./CodeViewer/CodeViewer";


export function injectCodeViewer ( files:string[], defaultIndex = 0 ) {
	// Load typescript and tsx highlighters
	require("prismjs") // needed to expose Prism as global.Prism 🫠
	require('prismjs/components/prism-typescript.js')
	require('prismjs/components/prism-jsx.js')
	require('prismjs/components/prism-tsx.js')

	// Load prism line numbers plugin
	require("prismjs/plugins/line-numbers/prism-line-numbers.js")
	require("prismjs/plugins/line-numbers/prism-line-numbers.css")

	// Load prism CSS
	require("prismjs/themes/prism.css")

	// Load code highlight theme
	require("prismjs/themes/prism-coy.css")
	// require("prismjs/themes/prism-dark.css")
	// require("prismjs/themes/prism-funky.css")
	// require("prismjs/themes/prism-okaidia.css")
	// require("prismjs/themes/prism-solarizedlight.css")
	// require("prismjs/themes/prism-tomorrow.css")
	// require("prismjs/themes/prism-twilight.css")

	// Create container
	const codeViewerContainer = document.createElement('div')
	codeViewerContainer.setAttribute('id', 'codeViewer')
	document.body.append( codeViewerContainer )

	// Render into container
	render(
		<CodeViewer files={ files } defaultIndex={ defaultIndex } />,
		codeViewerContainer
	)
}

