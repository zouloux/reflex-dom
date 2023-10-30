import { changed, ComponentInstance, h, mounted, state } from "reflex-dom";
import sdk from '@stackblitz/sdk';
import { VM } from "@stackblitz/sdk/types/vm";
import { limitRange } from "@zouloux/ecma-core";
import S from "./App.module.less"


function loadStackFiles () {
	// Load all stack files as raw text
	const __globFiles = import.meta.glob('../stack/**/**.*', { as: 'raw', eager: true });
	// const file = import.meta.glob('../stack/steps/01.props.tsx', { as: 'raw', eager: true });
	// console.log( file );
	// Patch keys
	const stackFiles:Record<string, string> = {}
	Object.keys( __globFiles ).map( fileName => {
		const value = __globFiles[ fileName ]
		fileName = fileName.substring(9, fileName.length)
		stackFiles[ fileName ] = value
	})
	console.log( stackFiles );
	return stackFiles
}

export function App ( props ) {
	let _editor:VM
	let _stepFiles:string[] = []
	let stackFiles = loadStackFiles()
	mounted( async () => {
		_stepFiles = Object.keys( stackFiles ).filter( f => f.startsWith('steps/') )
		_editor = await sdk.embedProject(
			'iframe', {
				title: 'Learn Reflex',
				description: 'Learn Reflex tutorial',
				template: 'node',
				files: {
					...stackFiles,
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
		const filePath = _stepFiles[ step.value ]
		if ( !_editor )
			return
		await _editor.editor.openFile( filePath )
		if ( isFirst ) {
			isFirst = false
			return
		}
		// Replace first line of index.tsx
		const indexLines = stackFiles["index.tsx"].split("\n")
		indexLines.shift();
		indexLines.unshift(`import * as CurrentStep from './${filePath}'`)
		const indexRaw = indexLines.join("\n")
		await _editor.applyFsDiff({
			destroy: [],
			create: { 'index.tsx' : indexRaw },
		})
	})

	function changeStep ( delta:number ) {
		step.value = limitRange( 0, step.value + delta, 2 )
	}
	const prevStep = () => changeStep(-1)
	const nextStep = () => changeStep(+1)
	const reset = async () => {
		const filePath = _stepFiles[ step.value ]
		const fileValue = stackFiles[ filePath ]
		const create = {}
		create[ filePath ] = fileValue
		await _editor.applyFsDiff({ destroy: [], create })
	}

	return () => <div class={ S.App }>
		<nav>

		</nav>
		<iframe id="iframe" class={ S._iframe } />
		{isReady.value && <div>
			<button onClick={ prevStep }>Prev</button>
			<button onClick={ nextStep }>Next</button>
			<button onClick={ reset }>Reset current file</button>
		</div>}
	</div>
}
