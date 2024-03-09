import { basename } from "path"

const injectedCodeAfter = ( moduleName, reflexLibImport, reflexRefreshLibImport ) => `
// Injected code - Reflex Refresh plugin
import * as __currentModule from "./${moduleName}"
import * as __reflexLib from "${reflexLibImport}"
import { enableReflexRefresh as __enableReflexRefresh } from "${reflexRefreshLibImport}"
if ( import.meta.hot ) {
	const __acceptViteRefresh = __enableReflexRefresh(
		import.meta.url,
		__currentModule,
		__reflexLib,
	)
	// Accept call needs to be in this module
	import.meta.hot.accept( __acceptViteRefresh )
}
`


export function reflexRefresh ( pluginOptions ) {
	pluginOptions = {
		enabledHMRDevMode: false,
		...pluginOptions,
	}
	let isProduction = false;
	return {
		name: 'reflexRefresh',
		configResolved(config) {
			isProduction = config.command === 'build' || config.isProduction;
		},
		async transform (code, id, options) {
			if (
				// Do not use HMR in production
				isProduction
				// Only check jsx and tsx files
				|| !/\.([tj])sx/.test( id )
				// Do not check files into node_modules
				|| id.includes('node_modules')
				// Do not check workers
				|| id.includes('?worker')
			)
				return;

			// Target reflex libs for the runtime
			let reflexLibImport;
			let reflexRefreshLibImport;
			// In dev mode, load from ts files in src
			if ( pluginOptions.enabledHMRDevMode ) {
				reflexLibImport = await this.resolve('/../../src/index')
				reflexRefreshLibImport = await this.resolve('/../../src/hmr-runtime')
			}
			// In regular mode, load from installed lib
			else {
				reflexLibImport = await this.resolve('reflex-dom')
				reflexRefreshLibImport = await this.resolve('reflex-dom/hmr-runtime')
			}
			// Compute module name to import it into itself
			let moduleName = basename( id )
			moduleName = moduleName.substring(0, moduleName.lastIndexOf("."));
			// Inject imports and hot.accept
			code += injectedCodeAfter( moduleName, reflexLibImport.id, reflexRefreshLibImport.id )
			return { code }
		}
	}
}
