import { ComponentFunction, VNode, DefaultReflexProps } from "./common";
import { ComponentInstance } from "./component";

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
	_setFromVNode	: ( vnode:VNode<DefaultReflexProps, ComponentFunction> ) => void
}

export function ref <
	GDom extends Element = Element,
	GComponent extends ComponentInstance = ComponentInstance,
> ():IRef<GDom, GComponent> {
	const value:IInternalRef<GDom, GComponent> = {
		component: null,
		dom: null,
		_setFromVNode ( vNode:VNode<DefaultReflexProps, ComponentFunction, GDom, GComponent> ) {
			value.dom 		= vNode.dom as GDom;
			value.component = vNode._component as GComponent;
		}
	}
	return value as never as IRef<GDom, GComponent>;
}

// ----------------------------------------------------------------------------- REFS

export interface IRefs <
	GDom extends Element = Element,
	GComponent extends ComponentInstance = ComponentInstance,
> {
	list 	: IRef<GDom, GComponent>[]
	atIndex	: (index:number) => any
}

export interface IInternalRefs <
	GDom extends Element = Element,
	GComponent extends ComponentInstance = ComponentInstance,
> extends IRefs {
	_setFromVNode	: ( vnode:VNode<DefaultReflexProps, ComponentFunction> ) => void
}

export function refs <
	GDom extends Element = Element,
	GComponent extends ComponentInstance = ComponentInstance,
> ():IRefs<GDom, GComponent> {
	let _counter = 0;
	let _list = []

	function registerAtIndex ( vNode, index ) {
		// Delete
		if ( !vNode.dom )
			_list = _list.filter( (_, i) => i !== index )
		// Create / update
		// FIXME : Check if dom change checking is necessary
		// else if ( !list[index] || list[index].dom != vNode.dom ) {
		else {
			_list[ index ] = {
				dom 		: vNode.dom as GDom,
				component	: vNode._component as GComponent,
			}
		}

	}
	const value:IInternalRefs<GDom, GComponent> = {
		get list () { return _list },
		_setFromVNode ( vNode:VNode<DefaultReflexProps, ComponentFunction> ) {
			// Set vNode id from counter.
			// Node ids starts from 1 to be able to compress a bit
			if ( !vNode._id )
				vNode._id = ++_counter
			// Set back from starting 1 to 0
			registerAtIndex( vNode, vNode._id - 1 )
		},
		// FIXME : Better api ?
		atIndex ( index:number ) {
			return {
				// TODO : Check if terser uses same mangled name
				_setFromVNode ( vNode:VNode<DefaultReflexProps, ComponentFunction> ) {
					registerAtIndex( vNode, index )
				}
			}
		}
	}

	return value as never as IRefs<GDom, GComponent>;
}

export type IRefOrRefs <
	GDom extends Element = Element,
	GComponent extends ComponentInstance = ComponentInstance,
> = IRef<GDom, GComponent> | IRefs<GDom, GComponent>

// FIXME : When using web components with original dom not from Reflex
// FIXME : Move it in module web-components ?
// export function find () {
//
// }