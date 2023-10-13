import { changed, ComponentInstance, h, mounted, state } from "reflex-dom";
import sdk from '@stackblitz/sdk';
import { VM } from "@stackblitz/sdk/types/vm";
import { limitRange } from "@zouloux/ecma-core";
import S from "./App.module.less"

// Load all stack files as raw text
const __globFiles = import.meta.glob('../stack/**/**.*', { as: 'raw', eager: true });
// Patch keys
const __stackFiles:Record<string, string> = {}
Object.keys( __globFiles ).map( fileName => {
	const value = __globFiles[ fileName ]
	fileName = fileName.substring(9, fileName.length)
	__stackFiles[ fileName ] = value
})

export function App ( props, component:ComponentInstance ) {
	let _editor:VM
	let _stepFiles:string[] = []
	mounted( async () => {
		_stepFiles = Object.keys( __stackFiles ).filter( f => f.startsWith('steps/') )
		_editor = await sdk.embedProject(
			'iframe', {
				title: 'Learn Reflex',
				description: 'Learn Reflex tutorial',
				template: 'node',
				files: {
					...__stackFiles,
					'loading' : 'Stackblitz is loading'
				}
			}, {
				clickToLoad: false,
				openFile: 'loading',
				terminalHeight: 0,
				hideExplorer: true,
				hideNavigation: true,
				theme: "dark"
			},
		);
	})

	const isReady = state( false )

	mounted(() => {
		const clear = () => clearInterval( interval )
		const interval = setInterval( async () => {
			if ( !_editor ) return
			const fs = await _editor.getFsSnapshot()
			if ( !('ready' in fs) ) return
			isReady.value = true
			step.value = 0;
			clear();
		}, 500)
		return clear
	})

	const step = state( -1 )

	let isFirst = true
	changed( async () => {
		const file = _stepFiles[ step.value ]
		if ( !_editor )
			return
		await _editor.editor.openFile( file )
		if ( isFirst ) {
			isFirst = false
			return
		}
		// Replace first line of index.tsx
		const indexLines = __stackFiles["index.tsx"].split("\n")
		indexLines.shift();
		indexLines.unshift(`import * as CurrentStep from './${file}'`)
		const indexRaw = indexLines.join("\n")
		await _editor.applyFsDiff({
			destroy: [],
			create: { 'index.tsx' : indexRaw },
		})
	})

	function changeStep ( delta:number ) {
		step.value = limitRange( 0, step.value + delta, 2 )
	}

	return () => <div class={ S.App }>
		<nav>

		</nav>
		<iframe id="iframe" class={ S._iframe } />
		{isReady.value && <div>
			<button onClick={ () => changeStep(-1) }>Prev</button>
			<button onClick={ () => changeStep(+1) }>Next</button>
		</div>}
	</div>
}
