import { IRef, IRefs } from "./ref";
import { ComponentInstance, IComponentAPI } from "./component";

// ----------------------------------------------------------------------------- TYPES

// Declare global JSX override hack
// declare global {
// 	namespace JSX {
//
// 	}
// }

// ----------------------------------------------------------------------------- POLYFILLS

// export const _microtask = ( window.queueMicrotask ?? ( h => window.setTimeout( h, 0 )) )

// ----------------------------------------------------------------------------- UTILS

// Force a list or a lonely item to be an array with the same type
// TODO : Into ecma-core + inline in bundle
// export const _forceArray = <G>( item:G|G[] ):G[] => Array.isArray( item ) ? item : [ item ]

// export const _typeof = (entity:any, firstLetterOfType:string) => (typeof entity)[0] == firstLetterOfType

// export const _isStringOrNumber = entity => ["s", "n"].indexOf( (typeof entity)[0] ) >= 0

// export function _flattenChildren ( vnode:VNode ) {
// 	// Re-assign flattened array to the original virtual node, and return it
// 	return vnode.props.children = (vnode.props.children.flat() ?? [])
// }

// ----------------------------------------------------------------------------- INTERNAL - CREATE COMPONENT

export type RenderDom = Element | Text | Comment

// FIXME : Cannot be VNode[] in current implementation.
// FIXME : Cannot be string in current implementation.
export type RenderFunction <GProps extends object = object> = ( props?:GProps, componentAPI?:IComponentAPI ) => VNode
export type ComponentReturn <GProps extends object = object> = RenderFunction<GProps> | VNode
export type FactoryComponent <GProps extends object = object> = ( props?:GProps ) => RenderFunction
export type ComponentFunction <GProps extends object = object> = RenderFunction<GProps> | FactoryComponent<GProps>

export type LifecycleHandler <GReturn = void> = (...rest) => GReturn
export type MountHandler = LifecycleHandler|LifecycleHandler<LifecycleHandler>


// ----------------------------------------------------------------------------- INITIAL VALUE
export type TInitialValue<GType> = GType | ((oldValue?:GType) => GType)

export const prepareInitialValue = <GType> ( initialValue:TInitialValue<GType>, oldValue?:GType ) => (
	typeof initialValue == "function" ? ( initialValue as (oldValue?:GType) => GType )(oldValue) : initialValue as GType
)

// ----------------------------------------------------------------------------- JSX H / CREATE ELEMENT

// FIXME : const enum not working !
// FIXME : https://ncjamieson.com/dont-export-const-enums/
export const enum VNodeTypes {
	TEXT		= 1,
	NULL		= 0,
	_NEXT_ARE_CONTAINERS = 4,
	ROOT		= 5,
	ELEMENT		= 6,
	COMPONENT	= 7,
	LIST		= 8,
}

export type VNodeElementValue = keyof (HTMLElementTagNameMap|SVGElementTagNameMap)
export type VNodeTextValue = string
export type VNodeValue = VNodeElementValue | VNodeTextValue | ComponentFunction

export interface VNodeBaseProps {
	children	?:VNode[],
	key			?:string
	ref			?:IRef|IRefs
	pure		?:boolean
}

export interface VNode <
	GProps extends VNodeBaseProps	= VNodeBaseProps,
	GValue extends VNodeValue 		= VNodeValue,
> {
	// Type of virtual node, as const
	// Not the JSX type, which is named value here
	type			:VNodeTypes
	// Virtual node value can be derived from type :
	// ROOT -> null
	// ELEMENT -> string like "div", "ul" ...
	// TEXT -> string like "I'm a text"
	// COMPONENT -> Function which create the component
	// NULL -> null (this node is a certainly a condition, so we keep it in the structure)
	// LIST -> null (elements of list are in props.children)
	value			:GValue
	props			:GProps
	key				:string	// Allow numbers ?
	dom				?:RenderDom
	_keys			?:Map<string, VNode>
	_ref			?:IRef | IRefs
	_component		?:ComponentInstance
	_keep			?:boolean
	_id				?:number
}