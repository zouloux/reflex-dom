/**
 * TODO : Keep states and scroll positions between refreshes !
 */

// For some reason, hot.accept() needs to be into module and cannot be called from runtime file
const injectedCodeAfter = (reflexLibImport, reflexRefreshLibImport) => `
// Injected code - Reflex Refresh plugin
import { cloneVNode as __refreshDep1, diffNode as __refreshDep2, recursivelyUpdateMountState as __refreshDep3, hookComponentMount as __refreshDep4 } from "${reflexLibImport}"
import { enableReflexRefresh } from "${reflexRefreshLibImport}"
if ( import.meta.hot ) {
	const __acceptViteRefresh = enableReflexRefresh( import.meta, __refreshDep1, __refreshDep2, __refreshDep3, __refreshDep4 )
	import.meta.hot.accept( __acceptViteRefresh )
}
`

export function reflexRefresh ( options ) {
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
				|| !/\.(t|j)sx?$/.test(id)
				// Do not check files into node_modules
				|| id.includes('node_modules')
				// Do not check workers
				|| id.includes('?worker')
			)
				return;

			// Target reflex libs for the runtime
			const reflexLibImport = await this.resolve('reflex-dom')
			const reflexRefreshLibImport = await this.resolve('reflex-dom/hmr-runtime')

			// Inject imports and hot.accept
			code += injectedCodeAfter(reflexLibImport.id, reflexRefreshLibImport.id)
			return { code }
		}
	}
}