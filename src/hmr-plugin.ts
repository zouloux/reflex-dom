
// Import reflex lib from module and not helper, easier
const injectedCodeBefore = (reflexLibImport, reflexHMRLibImport) => `
// Injected code - Reflehx HMR plugin
import { cloneVNode, diffNode, recursivelyUpdateMountState } from "${reflexLibImport}"
import { enableReflexRefresh } from "${reflexHMRLibImport}"
`;

const injectedCodeAfter = `
// Injected Code - Reflex HMR plugin
if ( import.meta.hot ) {
	const __acceptViteHMR = enableReflexRefresh( import.meta, cloneVNode, diffNode, recursivelyUpdateMountState )
	// hot.accept needs to be inside this module and cannot be inside runtime file
	import.meta.hot.accept( __acceptViteHMR )
}
`

export function reflexRefresh ( options ) {
	return {
		name: 'reflexRefresh',
		async transform (code, id, options) {
			if (
				!/\.(t|j)sx?$/.test(id) ||
				id.includes('node_modules') ||
				id.includes('?worker')
			)
				return;

			const reflexLibImport = await this.resolve('@zouloux/reflex')
			const reflexHMRLibImport = await this.resolve('@zouloux/reflex/hmr-runtime')

			return {
				code: (
					injectedCodeBefore(reflexLibImport.id, reflexHMRLibImport.id)
					+ code
					+ injectedCodeAfter
				)
			}
		}
	}
}