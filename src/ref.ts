import { VNode } from "./common";

// ----------------------------------------------------------------------------- REF

export interface IRef <GDom extends Element = Element> {
	dom				:GDom
}

// Internal API to set ref value from diffing algorithm
export interface IInternalRef <GDom extends Element = Element> extends IRef {
	_setFromVNode	: ( vnode:VNode ) => void
}

export function ref <GDom extends Element = Element> ():IRef<GDom> {
	// return value as never as IRef<GDom>;
	let dom:GDom
	const api:IInternalRef<GDom> = {
		get dom () { return dom },
		_setFromVNode ( vNode:VNode ) { dom = vNode.dom as GDom }
	}
	return api as never as IRef<GDom>;
}

// ----------------------------------------------------------------------------- REFS

export interface IRefs <GDom extends Element = Element> {
	doms		: GDom[]
	clear   : () => void
	atIndex	: (index:number) => any
}

// Internal API to set ref value from diffing algorithm
export interface IInternalRefs <GDom extends Element = Element> extends IRefs {
	_setFromVNode	: ( vNode:VNode ) => void
}

export type IRefOrRefs <GDom extends Element = Element> = IRef<GDom> | IRefs<GDom>

export function refs <GDom extends Element = Element> ():IRefs<GDom> {
	let _counter = 0;
	let _doms = []

	function registerAtIndex ( vNode:VNode, index:number ) {
		// Delete
		if ( !vNode.dom )
			_doms = _doms.filter( (_, i) => i !== index )
		// Create / update
		// FIXME : Check if dom change checking is necessary
		// else if ( !list[index] || list[index].dom != vNode.dom ) {
		else
			_doms[ index ] = vNode.dom as GDom
	}

	const value:IInternalRefs<GDom> = {
		get doms () { return _doms },
		clear: () => _doms = [],
		_setFromVNode ( vNode:VNode ) {
			// Set vNode id from counter.
			// Node ids starts from 1 to be able to compress a bit
			if ( !vNode._id )
				vNode._id = ++_counter
			// Set back from starting 1 to 0
			registerAtIndex( vNode, vNode._id - 1 )
		},
		// FIXME : Better api ?
		atIndex ( index:number ) {
			// Return a regular ref as thunk with the index
			return {
				// TODO : Check if terser uses same mangled name
				_setFromVNode ( vNode:VNode ) {
					registerAtIndex( vNode, index )
				}
			}
		}
	}
	return value as never as IRefs<GDom>;
}
