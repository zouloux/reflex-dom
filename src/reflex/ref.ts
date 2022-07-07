import { VNode, VNodeBaseProps } from "./common";
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
	_setFromVNode	: ( vnode:VNode<VNodeBaseProps, GComponent> ) => void
}

export function ref <
	GDom extends Element = Element,
	GComponent extends ComponentInstance = ComponentInstance,
> ():IRef<GDom, GComponent> {
	const value:IInternalRef<GDom, GComponent> = {
		component: null,
		dom: null,
		_setFromVNode ( vnode:VNode<VNodeBaseProps, GComponent> ) {
			value.dom 		= vnode.dom as GDom;
			value.component = vnode._component as GComponent;
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
	_setFromVNode	: ( vnode:VNode<VNodeBaseProps, GComponent> ) => void
}

export function refs <
	GComponent extends ComponentInstance = ComponentInstance,
	GDom extends Element = Element,
> ():IRefs<GDom, GComponent> {
	let _counter = 0;
	let _list = []

	function registerAtIndex ( vnode, index ) {
		// Delete
		if ( !vnode.dom )
			_list = _list.filter( (_, i) => i != index )
		// Create / update
		// FIXME : Check if dom change checking is necessary
		// else if ( !list[index] || list[index].dom != vnode.dom ) {
		else {
			_list[ index ] = {
				dom 		: vnode.dom as GDom,
				component	: vnode._component as GComponent,
			}
		}

	}
	const value:IInternalRefs<GDom, GComponent> = {
		get list () { return _list },
		_setFromVNode ( vnode:VNode<VNodeBaseProps, GComponent> ) {
			// Set vnode id from counter.
			// Node ids starts from 1 to be able to compress a bit
			if ( !vnode._id )
				vnode._id = ++_counter
			// Set back from starting 1 to 0
			registerAtIndex( vnode, vnode._id - 1 )
		},
		// FIXME : Better api ?
		atIndex ( index:number ) {
			return {
				// TODO : Check if terser uses same mangled name
				_setFromVNode ( vnode:VNode<VNodeBaseProps, GComponent> ) {
					registerAtIndex( vnode, index )
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