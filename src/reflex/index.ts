/// <reference lib="dom" />
import { IRef, IRefs } from "./ref";
import { ComponentInstance } from "./component";

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

// ----------------------------------------------------------------------------- INTERNAL - CREATE COMPONENT

export type RenderDom = Element|Text

// FIXME : Cannot be VNode[] in current implementation.
// FIXME : Cannot be string in current implementation.
export type RenderFunction = () => VNode
export type FunctionalComponent = RenderFunction
export type ComponentReturn = RenderFunction|VNode
export type FactoryComponent = () => RenderFunction
export type ComponentFunction = FunctionalComponent|FactoryComponent

export type LifecycleHandler <GReturn = void> = (...rest) => GReturn
export type MountHandler = LifecycleHandler|LifecycleHandler<LifecycleHandler>

// ----------------------------------------------------------------------------- JSX H / CREATE ELEMENT

export type VNodeDomType = keyof (HTMLElementTagNameMap|SVGElementTagNameMap)
export type InternalVNodeTypes = typeof ROOT_NODE_TYPE_NAME | typeof TEXT_NODE_TYPE_NAME

export interface VNodeBaseProps {
	children	?:VNode[],
	key			?:string
	ref			?:IRef|IRefs
	pure		?:boolean
}

export interface VNode <
	GProps 	= VNodeBaseProps,
	GType 	= ( VNodeDomType | InternalVNodeTypes | ComponentFunction ),
> {
	type			:GType
	props			:GProps
	key				:string	// Allow numbers ?
	keys			?:Map<string, VNode>
	ref				?:IRef | IRefs
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