import { IRefOrRefs } from "./ref";
import { ComponentInstance, TShouldUpdate } from "./component";
import { ClassNameItem } from "./jsx-types";
import { IState } from "./states";

// ----------------------------------------------------------------------------- DOCUMENT INTERFACE
// Virtual document interface which replicate Document interface
// For faster and easier renderToString implementation

export type VirtualNodeTypes = "comment"|"text"|"element"

export interface IVirtualNode
{
	virtualType:VirtualNodeTypes
}

export interface IVirtualComment extends IVirtualNode
{
	virtualType:"comment"
	data:string
}
export interface IVirtualText extends IVirtualNode
{
	virtualType:"text"
	nodeValue:string
}
export interface IVirtualElement extends IVirtualNode
{
	virtualType:"element"
	namespace:string
	type:string
	readonly attributes:object
	readonly children:IVirtualNode[]
	addEventListener (...rest):any
	removeEventListener (...rest):any
	setAttribute ( name:string, value:any )
	getAttribute ( name:string )
	removeAttribute ( name:string )
	removeChild ( child:IVirtualNode )
	appendChild ( child:IVirtualNode )
	insertBefore ( child:IVirtualNode, before:IVirtualNode ),
	innerHTML:string
	toString():string
	style:object
}

export interface IVirtualDocument
{
	createComment 	(data:string):IVirtualComment
	createTextNode 	(data:string):IVirtualText
	createElement 	(type:string):IVirtualElement
	createElementNS (namespace:string, type:string):IVirtualElement
	isVirtual:true
}

// ----------------------------------------------------------------------------- INTERNAL - CREATE COMPONENT

export type TComponentFunctionProperties = {
	isFactory		?:boolean
	shouldUpdate	?:TShouldUpdate
	renderFilter	?:( component:ComponentInstance, renderResult:VNode ) => VNode
}

export type RenderDom = Element | Text | Comment

export type RenderFunction <GProps extends object = object> = ( props?:GProps ) => VNode
export type ComponentReturn <GProps extends object = object> = RenderFunction<GProps> | VNode
export type FactoryComponent <GProps extends object = object> = ( props?:GProps ) => RenderFunction
export type ComponentFunction <GProps extends object = object> = ( RenderFunction<GProps> | FactoryComponent<GProps> ) & TComponentFunctionProperties

export type LifecycleHandler <GReturn = void|Promise<void>> = (...rest) => GReturn
type LifecycleHandlerMultipleReturns = ( LifecycleHandler | boolean )[]

export type MountHandler = (
	// A regular any handler
	| LifecycleHandler
	// An any handler which can return
	// - Another any handler ( on / off )
	// - A list of any handlers that can be filtered out ( can have some booleans )
	| LifecycleHandler<LifecycleHandler | LifecycleHandlerMultipleReturns>
)

// ----------------------------------------------------------------------------- JSX H / CREATE ELEMENT

// All VNode types are inlined manually with a comment.
// No way to inline automatically with TS for now.
type _VNodeTypes_NULL 				= 0
type _VNodeTypes_TEXT 				= 1
type _VNodeTypes_ARGUMENT_STATE 	= 2
type _VNodeTypes_VALUE_STATE 		= 3
type _VNodeTypes_CONTAINERS 		= 4
type _VNodeTypes_ROOT 				= 5
type _VNodeTypes_ELEMENT 			= 6
type _VNodeTypes_COMPONENT 			= 7
type _VNodeTypes_LIST 				= 8

export type VNodeTypes =
	| _VNodeTypes_NULL
	| _VNodeTypes_TEXT
	| _VNodeTypes_ARGUMENT_STATE
	| _VNodeTypes_VALUE_STATE
	| _VNodeTypes_CONTAINERS
	| _VNodeTypes_ROOT
	| _VNodeTypes_ELEMENT
	| _VNodeTypes_COMPONENT
	| _VNodeTypes_LIST

export type VNodeElementValue = keyof (HTMLElementTagNameMap|SVGElementTagNameMap)
export type VNodeTextValue = string
export type VNodeValue = ( VNodeElementValue | VNodeTextValue | ComponentFunction | IState ) & TComponentFunctionProperties

export interface INodeEnv {
	isSVG		: boolean
	document	: Document | IVirtualDocument
}

export interface VNode {
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
	value			:VNodeValue
	// Props of associated Node
	// Can be null or undefined, for states or lists
	props			?:DefaultReflexProps
	// Associated dom Element
	dom				?:RenderDom
	// Associated component instance
	component		?:ComponentInstance
	// List of children, recorded with their keys
	// Is used by diff algorithm to check differences between components
	keys			?:Record<number|string, VNode>
	// Node env is used to propagate the SVG mode
	// - When an <svg> tag is discovered, current node and its children will be
	//		created using createSVGElement
	// Also to propagate current Document interface ( the page's document or a
	//		fake document to render to string
	env				?:INodeEnv
	// Private members ( starts with _, will be mangled )
	// Property name is used by Argument States to know which argument to mutate
	_propertyName	?:string
	// Used by diff algorithm
	_keep			?:boolean
	// Used by refs, to keep track of ref index in ref lists
	_id				?:number
}

export interface DefaultReflexBaseProps {
	key				?:number|string
	ref				?:IRefOrRefs
	innerHTML		?:string
	children		?:any|any[]
}

// FIXME : Can we delete change ?
export interface DefaultReflexProps extends DefaultReflexBaseProps {
	// Children are created by h here, so it's VNode, not string or number
	children	?:VNode[]
}

// Helper to add class props when extending component props interface
export interface HasClassProp {
	class ?: ClassNameItem | ClassNameItem[]
}

// ----------------------------------------------------------------------------- DISPATCH

// Can we minimize it ?
// TODO : OPTIMIZE - Optimize this loop
export const _dispatch = ( handlers:Function[], ...rest:any[] ) => handlers.map( h => h?.(...rest) );

// ----------------------------------------------------------------------------- BATCHED TASK

// Micro task polyfill
const _microtask = queueMicrotask ?? ( h => setTimeout( h, 0 ) )

type TTaskHandler <GType> = ( element:GType ) => void

/**
 * TODO : DOC
 * @param task
 */
export function createBatch <GType> ( task:TTaskHandler<GType> ) {
	// Bucket is a set here because we need to filter out components instances
	// that are the same
	const _bucket = new Set<GType>()
	// We do not need this behavior here so _resolves is an array
	let _resolves = []

	function execute () {
		// When microtask is called, batch may have grown into multiple elements
		// Call the task with each of the elements of the bucket
		// esbench : https://esbench.com/bench/6539700c7ff73700a4debba8
		for ( const element of _bucket )
			task( element )
		// Clear the bucket, call the resolves and clear the resolves handlers
		_dispatch( _resolves )
		_bucket.clear()
		_resolves = []
	}

	return ( element:GType, resolve?:() => any ) => {
		// Create a new microtask to execute all pending elements in the bucket
		// This new microtask is attached once by batch, only when the size is 0
		_bucket.size || _microtask( execute );
		// Add element into the bucket and keep the optional resolve handler
		_bucket.add( element )
		_resolves.push( resolve )
	}
}

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