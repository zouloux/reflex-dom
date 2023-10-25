import { IRefOrRefs } from "./ref";
import { ComponentInstance } from "./component";
import { ClassNameItem } from "./jsx-types";
import { IState } from "./states";

// ----------------------------------------------------------------------------- DOCUMENT INTERFACE
// ----------------------------------------------------------------------------- TYPES

export type AbstractNodeTypes = "comment"|"text"|"element"

export interface IAbstractNode
{
	abstractType:AbstractNodeTypes
}

export interface IAbstractComment extends IAbstractNode
{
	abstractType:"comment"
	data:string
}
export interface IAbstractText extends IAbstractNode
{
	abstractType:"text"
	nodeValue:string
}
export interface IAbstractElement extends IAbstractNode
{
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
	isSVG		: boolean,
	document	: Document | IAbstractDocument,
}

// ----------------------------------------------------------------------------- INTERNAL - CREATE COMPONENT
// ----------------------------------------------------------------------------- TYPES

export type TComponentFunctionProperties = {
	isFactory		?: boolean
	renderFilter	?:( component:ComponentInstance, renderResult:VNode ) => VNode
}

export type RenderDom = Element | Text | Comment

// FIXME : Cannot be VNode[] in current implementation.
// FIXME : Cannot be string in current implementation.
export type RenderFunction <GProps extends object = object> = ( props?:GProps ) => VNode
export type ComponentReturn <GProps extends object = object> = RenderFunction<GProps> | VNode
export type FactoryComponent <GProps extends object = object> = ( props?:GProps ) => RenderFunction
export type ComponentFunction <GProps extends object = object> = ( RenderFunction<GProps> | FactoryComponent<GProps> ) & TComponentFunctionProperties

export type LifecycleHandler <GReturn = void|Promise<void>> = (...rest) => GReturn
export type MountHandler = LifecycleHandler|LifecycleHandler<LifecycleHandler|((LifecycleHandler|boolean)[])>

// ----------------------------------------------------------------------------- JSX H / CREATE ELEMENT
// ----------------------------------------------------------------------------- TYPES

// FIXME : const enum not working ! TS create the enum as object because
// FIXME : Its not possible to export or use as const in other modules
// FIXME : https://ncjamieson.com/dont-export-const-enums/
// export const enum VNodeTypes {
// 	TEXT		= 1,
// 	NULL		= 0,
// 	_CONTAINERS	= 4 // next are containers
// 	ROOT		= 5,
// 	ELEMENT		= 6,
// 	COMPONENT	= 7,
// 	LIST		= 8,
// }

// All VNode types are inlined manually with a comment.
// No way to inline automatically with TS for now.
type _VNodeTypes_NULL 			= 0
type _VNodeTypes_TEXT 			= 1
type _VNodeTypes_ARGUMENT 		= 2
type _VNodeTypes_STATE 			= 3
type _VNodeTypes_CONTAINERS 	= 4
type _VNodeTypes_ROOT 			= 5
type _VNodeTypes_ELEMENT 		= 6
type _VNodeTypes_COMPONENT 		= 7
type _VNodeTypes_LIST 			= 8

export type VNodeTypes =
	| _VNodeTypes_NULL
	| _VNodeTypes_TEXT
	| _VNodeTypes_ARGUMENT
	| _VNodeTypes_STATE
	| _VNodeTypes_CONTAINERS
	| _VNodeTypes_ROOT
	| _VNodeTypes_ELEMENT
	| _VNodeTypes_COMPONENT
	| _VNodeTypes_LIST

export type VNodeElementValue = keyof (HTMLElementTagNameMap|SVGElementTagNameMap)
export type VNodeTextValue = string
export type VNodeValue = ( VNodeElementValue | VNodeTextValue | ComponentFunction | IState<any> ) & TComponentFunctionProperties

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
	component		?:GComponent

	// Private members (will be mangled)
	_nodeEnv		?:INodeEnv
	_keys			?:Map<string, VNode>
	_ref			?:IRefOrRefs<GDom>
	_keep			?:boolean
	_id				?:number
}

export interface DefaultReflexBaseProps<GDom extends Element = Element> {
	key			?:string;
	ref			?:IRefOrRefs<GDom>
	innerHTML	?:string
	children	?:any|any[]
}

export interface DefaultReflexProps<
	GDom extends Element = Element,
	GComponent extends ComponentInstance = ComponentInstance,
> extends DefaultReflexBaseProps<GDom> {
	// Children are created by h here, so it's VNode, not string or number
	children	?:VNode<any>[]
}

// Helper to add class props when extending component props interface
export interface HasClassProp {
	class ?: ClassNameItem | ClassNameItem[]
}

// ----------------------------------------------------------------------------- DISPATCH

// Can we minimize it ?
export const _dispatch =
	( handlers:Function[], scope?:any, ...rest:any[] ) =>
		handlers.map( h => h?.apply(scope, rest) );

// ----------------------------------------------------------------------------- FEATURE HOOKS
// FIXME : This should take the minimum size possible ->


export let _featureHooks:THookHandler[] = []

type THookHandler = ( type:number, ...rest ) => any|void

/**
 * Hook into Reflex core functions.
 * Will call handler for every hook. Handler have to check type
 * 0 -> NEW ROOT			Rendered a root. [ previousNode, newNode ]
 * 1 -> MOUNT / UNMOUNT 	Component mounted or unmounted [ componentInstance, isMounted ]
 * 2 -> DIFFING NODE		Updating a component node [ vNode ]. Have to return a handler, called when diffing finished.
 * 3 -> MUTATING NODE		Mutating a dom element [ key ]
 * 4 -> NEW STATE			A new state is created
 * @param handler
 */
export function featureHook ( handler:THookHandler ) {
	_featureHooks.push( handler )
	return () => _featureHooks = _featureHooks.filter( e => e !== handler )
}