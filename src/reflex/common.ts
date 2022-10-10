import { IRefOrRefs } from "./ref";
import { ComponentInstance, IComponentAPI } from "./component";
import { ClassNameItem } from "./jsx-types";

// ----------------------------------------------------------------------------- DOCUMENT INTERFACE

export type AbstractNodeTypes = "comment"|"text"|"element"

export interface IAbstractNode {
	abstractType:AbstractNodeTypes
}

export interface IAbstractComment extends IAbstractNode {
	abstractType:"comment"
	data:string
}
export interface IAbstractText extends IAbstractNode {
	abstractType:"text"
	nodeValue:string
}
export interface IAbstractElement extends IAbstractNode {
	abstractType:"element"
	namespace:string
	type:string
	readonly attributes:object
	readonly children:IAbstractNode[]
	addEventListener (...rest):any
	removeEventListener (...rest):any
	setAttribute ( name:string, value:any )
	getAttribute ( name:string )
	removeAttribute ( name:string )
	removeChild ( child:IAbstractNode )
	appendChild ( child:IAbstractNode )
	insertBefore ( child:IAbstractNode, before:IAbstractNode ),
	innerHTML:string
	toString():string
}

export interface IAbstractDocument
{
	createComment 	(data:string):IAbstractComment
	createTextNode 	(data:string):IAbstractText
	createElement 	(type:string):IAbstractElement
	createElementNS (namespace:string, type:string):IAbstractElement
}

export interface INodeEnv {
	isSVG: boolean,
	document: Document | IAbstractDocument,
}

// ----------------------------------------------------------------------------- INTERNAL - CREATE COMPONENT

export type THasIsFactoryProp = { isFactory?: boolean }

export type RenderDom = Element | Text | Comment

// FIXME : Cannot be VNode[] in current implementation.
// FIXME : Cannot be string in current implementation.
export type RenderFunction <GProps extends object = object> = ( props?:GProps, componentAPI?:IComponentAPI ) => VNode
export type ComponentReturn <GProps extends object = object> = RenderFunction<GProps> | VNode
export type FactoryComponent <GProps extends object = object> = ( props?:GProps ) => RenderFunction
export type ComponentFunction <GProps extends object = object> = ( RenderFunction<GProps> | FactoryComponent<GProps> ) & THasIsFactoryProp

export type LifecycleHandler <GReturn = void> = (...rest) => GReturn
export type MountHandler = LifecycleHandler|LifecycleHandler<LifecycleHandler>

// ----------------------------------------------------------------------------- JSX H / CREATE ELEMENT

// FIXME : const enum not working ! TS create the enum as object because
// FIXME : Its not possible to export or use as const in other modules
// FIXME : https://ncjamieson.com/dont-export-const-enums/
// export const enum VNodeTypes {
// 	TEXT		= 1,
// 	NULL		= 0,
// 	_CONTAINERS = 4, // next are containers
// 	ROOT		= 5,
// 	ELEMENT		= 6,
// 	COMPONENT	= 7,
// 	LIST		= 8,
// }

export const _VNodeTypes_NULL = 0
export const _VNodeTypes_TEXT = 1
// export const _VNodeTypes_BOOLEAN = 2
export const _VNodeTypes_STATE = 3
export const _VNodeTypes_CONTAINERS = 4
export const _VNodeTypes_ROOT = 5
export const _VNodeTypes_ELEMENT = 6
export const _VNodeTypes_COMPONENT = 7
export const _VNodeTypes_LIST = 8

export type VNodeTypes = (
	typeof _VNodeTypes_NULL |
	typeof _VNodeTypes_TEXT |
	// typeof _VNodeTypes_BOOLEAN |
	typeof _VNodeTypes_STATE |
	typeof _VNodeTypes_CONTAINERS |
	typeof _VNodeTypes_ROOT |
	typeof _VNodeTypes_ELEMENT |
	typeof _VNodeTypes_COMPONENT |
	typeof _VNodeTypes_LIST
)

export type VNodeElementValue = keyof (HTMLElementTagNameMap|SVGElementTagNameMap)
export type VNodeTextValue = string
export type VNodeValue = ( VNodeElementValue | VNodeTextValue | ComponentFunction ) & THasIsFactoryProp

export interface VNode <
	GProps extends DefaultReflexProps	= DefaultReflexProps,
	GValue extends VNodeValue 				= VNodeValue,
	GDom extends Element 					= Element,
	GComponent extends ComponentInstance 	= ComponentInstance,
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
	_nodeEnv		?:INodeEnv
	_keys			?:Map<string, VNode>
	_ref			?:IRefOrRefs<GDom, GComponent>
	_component		?:ComponentInstance
	_keep			?:boolean
	_id				?:number
}

export interface DefaultReflexBaseProps<
	GDom extends Element = Element,
	GComponent extends ComponentInstance = ComponentInstance
> {
	key			?:string;
	ref			?:IRefOrRefs<GDom, GComponent>
	innerHTML	?:string
	children	?:any[]
}

export interface DefaultReflexProps<
	GDom extends Element = Element,
	GComponent extends ComponentInstance = ComponentInstance,
> extends DefaultReflexBaseProps<GDom, GComponent> {
	// Children are created by h here, so it's VNode, not string or number
	children	?:VNode<any>[]
}

// Helper to add class props when extending component props interface
export interface HasClassProp {
	class ?: ClassNameItem | ClassNameItem[]
}

export function _dispatch ( handlers:Function[], scope:any, args:any[] ) {
	const total = handlers.length
	for ( let i = 0; i < total; ++i )
		handlers[ i ].apply( scope, args )
}
