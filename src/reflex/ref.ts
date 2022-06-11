import { ComponentInstance, VNode, VNodeBaseProps } from "./index";

// ----------------------------------------------------------------------------- REF

export interface IRef <
	GDom extends Element = Element,
	GComponent extends ComponentInstance = ComponentInstance,
> {
	dom				:GDom
	component		:GComponent
}

export interface IInternalRef <
	GDom extends Element = Element,
	GComponent extends ComponentInstance = ComponentInstance,
> extends IRef {
	setFromVNode	: ( vnode:VNode<VNodeBaseProps, GComponent> ) => void
}

export function ref <
	GDom extends Element = Element,
	GComponent extends ComponentInstance = ComponentInstance,
> ():IRef<GDom, GComponent> {
	const value:IInternalRef<GDom, GComponent> = {
		component: null,
		dom: null,
		setFromVNode ( vnode:VNode<VNodeBaseProps, GComponent> ) {
			value.dom 		= vnode.dom as GDom;
			value.component = vnode.component as GComponent;
		}
	}
	return value as never as IRef<GDom, GComponent>;
}

// ----------------------------------------------------------------------------- REFS

export interface IRefs <
	GDom extends Element = Element,
	GComponent extends ComponentInstance = ComponentInstance,
	> {
	list : IRef<GDom, GComponent>[]
}

export interface IInternalRefs <
	GDom extends Element = Element,
	GComponent extends ComponentInstance = ComponentInstance,
	> extends IRefs {
	setFromVNode	: ( index:number, vnode:VNode<VNodeBaseProps, GComponent> ) => void
}

export function refs <
	GComponent extends ComponentInstance = ComponentInstance,
	GDom extends Element = Element,
> ():IRefs<GDom, GComponent> {
	const value:IInternalRefs<GDom, GComponent> = {
		list: [],
		setFromVNode ( index:number, vnode:VNode<VNodeBaseProps, GComponent> ) {
			// Delete
			if ( vnode == null ) {
				delete value.list[ index ]
				value.list.length --
			// Update
			} else if ( index in value.list ) {
				value.list[ index ].component	= vnode.component as GComponent;
				value.list[ index ].dom 	 	= vnode.dom as GDom;
			// Create
			} else {
				value.list[ index ] = {
					dom 		: vnode.dom as GDom,
					component	: vnode.component as GComponent,
				}
			}
		}
	}
	return value as never as IRefs<GDom, GComponent>;
}

// FIXME : When using web components with original dom not from Reflex
// FIXME : Move it in module web-components ?
// export function find () {
//
// }