/**
 * TODO : Keep states and scroll positions between refreshes !
 */

// Import reflex lib from module and not helper, easier
const injectedCodeBefore = (reflexLibImport, reflexRefreshLibImport) => `
// Injected code - Reflex Refresh plugin
import { cloneVNode as __refreshDep1, diffNode as __refreshDep2, recursivelyUpdateMountState as __refreshDep3 } from "${reflexLibImport}"
import { enableReflexRefresh } from "${reflexRefreshLibImport}"
`;

// For some reason, hot.accept() needs to be into module and cannot be called from runtime file
const injectedCodeAfter = `
// Injected Code - Reflex Refresh plugin
if ( import.meta.hot ) {
	const __acceptViteRefresh = enableReflexRefresh( import.meta, __refreshDep1, __refreshDep2, __refreshDep3 )
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
			const reflexLibImport = await this.resolve('@zouloux/reflex')
			const reflexRefreshLibImport = await this.resolve('@zouloux/reflex/hmr-runtime')

			// Inject imports and hot.accept
			return {
				code: (
					injectedCodeBefore(reflexLibImport.id, reflexRefreshLibImport.id)
					+ code
					+ injectedCodeAfter
				)
			}
		}
	}
}