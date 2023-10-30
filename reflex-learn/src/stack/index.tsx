import * as CurrentStep from './steps/00.render'

if ( CurrentStep.default && window['__allowRender'] ) {
	document.body.children[0]?.remove()
	CurrentStep.default()
}
