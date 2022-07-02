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

export const _TEXT_NODE_TYPE_NAME = "#Text"
export const _ROOT_NODE_TYPE_NAME = "#Root"

// ----------------------------------------------------------------------------- ERRORS

export class ReflexError extends Error {}

// ----------------------------------------------------------------------------- POLYFILLS

export const microtask = ( window.queueMicrotask ?? (h => window.setTimeout( h, 0 )) )

// ----------------------------------------------------------------------------- UTILS

// Force a list or a lonely item to be an array with the same type
export const forceArray = <G>( item:G|G[] ):G[] => Array.isArray( item ) ? item : [ item ]


export function flattenChildren ( vnode:VNode ) {
	// Re-assign flattened array to the original virtual node, and return it
	return vnode.props.children = (vnode.props?.children?.flat() ?? [])
}

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
export type InternalVNodeTypes = typeof _ROOT_NODE_TYPE_NAME | typeof _TEXT_NODE_TYPE_NAME

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
	dom				?:RenderDom
	_keys			?:Map<string, VNode>
	_ref			?:IRef | IRefs
	_component		?:ComponentInstance
	_keep			?:boolean
}

export interface VTextNode extends VNode<{value:string}> {
	type		: typeof _TEXT_NODE_TYPE_NAME
}

export type VNodeOrVNodes = VNode|VNode[]