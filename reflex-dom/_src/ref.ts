import { ComponentFunction, VNode, DefaultReflexProps } from "./common";

// ----------------------------------------------------------------------------- REF

export interface IRef <GDom extends Element = Element> {
	dom				:GDom
}

export interface IInternalRef extends IRef {
	_setFromVNode	: ( vnode:VNode<DefaultReflexProps, ComponentFunction> ) => void
}

export function ref <GDom extends Element = Element> ():IRef<GDom> {
	const value:IInternalRef = {
		dom: null,
		_setFromVNode ( vNode:VNode<DefaultReflexProps, ComponentFunction, GDom> ) {
			value.dom 		= vNode.dom as GDom;
		}
	}
	return value as never as IRef<GDom>;
}

// ----------------------------------------------------------------------------- REFS

export interface IRefs <GDom extends Element = Element> {
	list 	: IRef<GDom>[]
	doms	: GDom[]
	atIndex	: (index:number) => any
}

export interface IInternalRefs extends IRefs {
	_setFromVNode	: ( vNode:VNode<DefaultReflexProps, ComponentFunction> ) => void
}

export function refs <GDom extends Element = Element> ():IRefs<GDom> {
	let _counter = 0;
	let _list = []

	function registerAtIndex ( vNode:VNode, index ) {
		// Delete
		if ( !vNode.dom )
			_list = _list.filter( (_, i) => i !== index )
		// Create / update
		// FIXME : Check if dom change checking is necessary
		// else if ( !list[index] || list[index].dom != vNode.dom ) {
		else {
			_list[ index ] = {
				dom 		: vNode.dom as GDom
			}
		}
	}
	const value:IInternalRefs = {
		get list () { return _list },
		get doms () { return _list.map( d => d.dom ) },
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
	return value as never as IRefs<GDom>;
}


export type IRefOrRefs <GDom extends Element = Element> = IRef<GDom> | IRefs<GDom>

// FIXME : When using web components with original dom not from Reflex
// FIXME : Move it in module web-components ?
// export function find () {
//
// }