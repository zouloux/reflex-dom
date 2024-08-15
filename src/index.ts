/// <reference lib="dom" />

// NOTE : Avoid glob exports from which insert a helper
// Unzipped is smaller with glob but bigger when zipped;

// ----------------------------------------------------------------------------- IMPORT / EXPORT

// Export public API
export { state, effect, compute, changed, invalidateComponent, updateDomFromState } from "./states"
export { recursivelyUpdateMountState, getCurrentComponent, diffNode, getCurrentDiffingNode } from "./diff"
export { ref, refs } from "./ref"
export { render, hydrate } from "./render"
export { featureHook, createBatch } from "./common"
export { mounted, unmounted, rendered, defaultProps, shouldUpdate, shallowPropsCompare } from "./component"

// Also export createElement for JSX pragma React
export { h, h as createElement, hh } from "./jsx"

// Export types ( do not export too much to keep it simple )
export type { IAtom, IState, IComputeState, TInitialValue, TEffectHandler, TDisposeHandler, TComputed } from "./states"
export type { IRef, IRefs, IRefOrRefs } from "./ref"
export type { ComponentInstance } from "./component"
export type {
	VNode, IVirtualNode, IVirtualText, IVirtualElement, IVirtualDocument,
	IVirtualComment, VirtualNodeTypes, DefaultReflexBaseProps,
	DefaultReflexProps, HasClassProp, LifecycleHandler
} from "./common"

// ----------------------------------------------------------------------------- JSX TYPES

// Import / Export JSX types without creating a useless empty module into the bundle
import type { ReflexIntrinsicElements } from "./jsx-types"
export type {
	ComponentChild, DOMAttributes, HTMLAttributes, DefaultReflexJSXAttributes,
	SVGAttributes, ReflexIntrinsicElements, CSSProperties, ClassName, ClassNameItem
} from "./jsx-types"

// Declare global JSX types
// FIXME : Do it smarter to be compatible with other multiple JSX Runtimes
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#locally-scoped-jsx-namespaces
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#per-file-jsx-factories
declare global {
	namespace JSX {
		// FIXME : Why when class?:ClassName, IntrinsicElements becomes incompatible ?
		// @ts-ignore
		interface IntrinsicElements extends ReflexIntrinsicElements {}
		// TODO : Element & ElementClass for factory functions
		//type Element <GProps extends object = object> = VNode
		//type ElementClass = ComponentFunction
	}
}
