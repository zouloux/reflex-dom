import { changed, ComponentInstance, h, mounted, state } from "reflex-dom";
import sdk from '@stackblitz/sdk';
import { VM } from "@stackblitz/sdk/typings/vm";
import { limitRange } from "@zouloux/ecma-core";
import S from "./App.module.less"

const filesToImport = {
	// Core files
	'index.html' 			: () => import(`../stack/index.html?raw`),
	'index.ts' 				: () => import(`../stack/index.ts?raw`),
	'package.json' 			: () => import(`../stack/package.json?raw`),
	'package-lock.json' 	: () => import(`../stack/package-lock.json?raw`),
	'tsconfig.json' 		: () => import(`../stack/tsconfig.json?raw`),
	'vite.config.js' 		: () => import(`../stack/vite.config.js?raw`),
	// Steps
	'steps/00.render.tsx' 	: () => import(`../stack/steps/00.render.tsx?raw`),
	'steps/01.state.tsx' 	: () => import(`../stack/steps/01.state.tsx?raw`),
}

const stepFiles = Object.keys( filesToImport ).filter( f => f.startsWith('steps/') )

async function importFiles () {
	const output = {}
	const fileNames = Object.keys( filesToImport )
	for ( const fileName of fileNames ) {
		const importer = filesToImport[ fileName ]
		const rawFile = await importer()
		output[ fileName ] = rawFile.default
	}
	return output
}


export function App ( props, component:ComponentInstance ) {
	let _editor:VM
	mounted( async () => {
		const files = await importFiles();
		_editor = await sdk.embedProject(
			'iframe', {
				title: 'Learn Reflex',
				description: 'Learn Reflex tutorial',
				template: 'node',
				files: {
					...files,
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

	changed( async () => {
		const file = stepFiles[ step.value ]
		if ( !_editor ) return;
		await _editor.applyFsDiff({
			destroy: [],
			create: {
				'index.ts' : `import './${file}'`
			},
		})
		await _editor.editor.openFile( file )
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