/// <reference lib="dom" />

// NOTE : Avoid glob exports from which insert a helper
// Unzipped is smaller with glob but bigger when zipped;

// ----------------------------------------------------------------------------- IMPORT / EXPORT

// Export public API
export { state } from "./states"
export { getCurrentComponent } from "./diff"
export { ref, refs } from "./ref"
export { defaultProps } from "./props"
export { mounted, unmounted, changed } from "./lifecycle"
export { render, invalidateComponent } from "./render"

// Also export createElement for JSX pragma React
export { h, h as createElement } from "./jsx"

// Export types ( do not export too much to keep it simple )
export type { IState, TInitialValue } from "./states"
export type { IRef, IRefs } from "./ref"
export type { ComponentInstance, IComponentAPI } from "./component"
export type {
	VNode, IAbstractNode, IAbstractText, IAbstractElement, IAbstractDocument,
	IAbstractComment, INodeEnv, AbstractNodeTypes, DefaultReflexBaseProps,
	DefaultReflexProps, HasClassProp
} from "./common"

// ----------------------------------------------------------------------------- JSX TYPES

// Import / Export JSX types without creating a useless empty module into the bundle
import type { ReflexIntrinsicElements } from "./jsx-types"
export type {
	ComponentChild, DOMAttributes, HTMLAttributes, DefaultReflexAttributes,
	SVGAttributes, ReflexIntrinsicElements, CSSProperties
} from "./jsx-types"

// Declare global JSX types
// FIXME : Do it smarter to be compatible with other multiple JSX Runtimes
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#locally-scoped-jsx-namespaces
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#per-file-jsx-factories
declare global {
	namespace JSX {
		// @ts-ignore
		interface IntrinsicElements extends ReflexIntrinsicElements {}
		// TODO : Element & ElementClass for factory functions
		//type Element <GProps extends object = object> = VNode
		//type ElementClass = ComponentFunction
	}
}
