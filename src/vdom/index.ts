/// <reference lib="dom" />

// ----------------------------------------------------------------------------- TYPES

// Declare global JSX override hack
// declare global {
// 	namespace JSX {
//
// 	}
// }

// ----------------------------------------------------------------------------- CONSTANTS

// Name of private node types which should not be created with JSX
export const TEXT_NODE_TYPE_NAME = "#Text"
export const ROOT_NODE_TYPE_NAME = "#Root"

// ----------------------------------------------------------------------------- ERRORS

export class ReflexError extends Error {}
// ----------------------------------------------------------------------------- POLYFILLS

export const microtask = ( window.queueMicrotask ?? (h => window.setTimeout( h, 0 )) )

// ----------------------------------------------------------------------------- UTILS

// Force a list or a lonely item to be an array with the same type
export const forceArray = <G>( item:G|G[] ):G[] => Array.isArray( item ) ? item : [ item ]

// Shallow compare two objects, applied only for props between new and old virtual nodes.
// Will not compare "children" which is always different
// https://esbench.com/bench/62a138846c89f600a5701904
export const shallowPropsCompare = ( a:object, b:object ) => (
	// Same amount of properties ?
	Object.keys(a).length === Object.keys(b).length
	// Every property exists in other object ?
	&& Object.keys(a).every( key => key === "children" || (b.hasOwnProperty(key) && a[key] === b[key]) )
)

// export function shallowPropsCompare (a:object, b:object) {
// 	if ( Object.keys(a).length !== Object.keys(b).length )
// 		return false;
// 	return Object.keys(a).every( key => {
// 		if (key === "children")
// 			return true;
// 		const has = (b.hasOwnProperty(key) && a[key] === b[key])
// 		if (!has) {
// 			console.log(key, b.hasOwnProperty(key), a[key], b[key], a[key] === b[key])
// 		}
// 		return has
// 	})
// }

// ----------------------------------------------------------------------------- INTERNAL - CREATE COMPONENT

export type RenderDom = Element|Text

// FIXME : Cannot be VNode[] in current implementation.
// FIXME : Cannot be string in current implementation.
export type RenderFunction = () => VNode
export type FunctionalComponent = RenderFunction
export type ComponentReturn = RenderFunction|VNode
export type FactoryComponent = () => RenderFunction
export type ComponentFunction = FunctionalComponent|FactoryComponent

export interface ComponentInstance {
	vnode		:VNode
	name		:string
	isFactory	?:boolean
	render		?:RenderFunction
	isDirty		?:boolean
}

// ----------------------------------------------------------------------------- JSX H / CREATE ELEMENT

export type VNodeDomType = keyof (HTMLElementTagNameMap|SVGElementTagNameMap)
export type InternalVNodeTypes = typeof ROOT_NODE_TYPE_NAME | typeof TEXT_NODE_TYPE_NAME

export interface VNodeBaseProps {
	children	?:VNode[]
}

// FIXME
export interface VNode <GProps = VNodeBaseProps> {
	type			:VNodeDomType|InternalVNodeTypes|ComponentFunction // TODO 	: Generics
	props			:GProps
	key				:string
	keys			?:Map<string, VNode>
	ref				// TODO
	dom				?:RenderDom
	component		?:ComponentInstance
	keep			?:boolean
}

export interface VTextNode extends VNode<{value:string}> {
	type		: typeof TEXT_NODE_TYPE_NAME
}

export type VNodeOrVNodes = VNode|VNode[]

// ----------------------------------------------------------------------------- IMPORT / EXPORT

export { render } from "./render"
// Also export createElement for JSX pragma React
export { h, h as createElement } from "./jsx"