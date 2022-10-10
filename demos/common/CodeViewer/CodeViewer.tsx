import Prism from "prismjs"
import { changed, h, mounted, refs, state } from "../../../src";
import * as path from "path";
// @ts-ignore
import S from "./CodeViewer.module.less"
import { randomDelay } from "../demoHelpers";
// import loadLanguages from 'prismjs/components/'

const repoBase = `https://raw.githubusercontent.com/zouloux/reflex/main/`

interface ICodeViewProps {
	files			:string[]
	defaultIndex	?:number
}

export function CodeViewer ( props:ICodeViewProps ) {
	const loadedFiles = state<any[]>( props.files.map( f => false ) )
	const selectedTabIndex = state( props.defaultIndex ?? 1 );
	const codeElements = refs()

	mounted(() => props.files.map( async (file, i) => {
		// Load file content from github
		const loadedFile = await fetch(`${repoBase}${file}`)
		await randomDelay(0, 2)
		// console.log('R', i)
		loadedFiles.value[ i ]  = await loadedFile.text();
		// Update state (clone array to force state change)
		await loadedFiles.set([ ...loadedFiles.value ])
		// Target code element from ref, and highlight syntax with Prism
		const codeElement = codeElements.list[ i ].dom
		Prism.highlightElement( codeElement )
	}))


	// changed(() => loadedFiles.value, () => {
	// 	console.log('Changed', loadedFiles.value)
	// })

	// const testRef = refs<never, HTMLSpanElement>();
	// changed(() => { console.log('TEST REF', testRef.list.map( el => el.dom.innerHTML )) })

	return () => <div class={[ S.CodeViewer, "line-numbers" ]}>
		<div class={ S._header }>
			{props.files.map( (file, i) =>
				<button
					class={[
						S._tab,
						i == selectedTabIndex.value && `${S._tab}-selected`
					]}
					onClick={ e => selectedTabIndex.set( i ) }
					children={[path.basename( file )]}
				/>
			)}
		</div>
		<div class={ S._files }>
			{loadedFiles.value.map( (file, i) =>
				<pre class={ S._file } hidden={ i != selectedTabIndex.value }>
					{
						!file ? <div class={ S._spinner } />
						: <code
							ref={ codeElements.atIndex( i ) }
							class={[ S._code, `language-typescript`]}
							children={[file]}
						/>
					}
				</pre>
			)}
		</div>
		{/*{[...Array(100)].map( (_, i) => <span ref={ testRef }>{i}</span> )}*/}
	</div>
}