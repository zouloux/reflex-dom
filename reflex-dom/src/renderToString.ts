import { render } from "./index";
import {
	IAbstractComment, IAbstractDocument, IAbstractElement, IAbstractNode,
	IAbstractText, VNode
} from "./common";

/**
 * TODO : Missing async components and a lot of other stuff ...
 */

function renderAbstractNodeToString ( node:IAbstractNode ) {
	if ( node.abstractType === "comment" )
		return `<!--${(node as IAbstractComment).data}-->`
	if ( node.abstractType === "text" )
		return (node as IAbstractText).nodeValue
	if ( node.abstractType === "element" ) {
		const nodeElement = node as IAbstractElement
		const type = nodeElement.type.toLowerCase()
		let buffer = `<${type}`
		Object.keys( nodeElement.attributes ).forEach( key => {
			// FIXME : Replace all ?
			const value = nodeElement.attributes[key]
			// TODO : Check key with capital-case and dash here !
			if ( value )
				buffer += ` ${key}="${(value+'').replace(/"/g, '&quot;')}"`
		})
		if ( nodeElement.children.length === 0 )
			return buffer + "/>"
		buffer += ">"
		buffer += nodeElement.innerHTML
		return `${buffer}</${type}>`
	}
}

const abstractDocument:IAbstractDocument = {
	createComment ( data:string ):IAbstractComment {
		return {
			abstractType: "comment",
			data
		}
	},
	createTextNode ( nodeValue:string ):IAbstractText {
		return {
			abstractType: "text",
			nodeValue
		}
	},
	createElement( type:string ):IAbstractElement {
		return abstractDocument.createElementNS( null, type )
	},
	createElementNS( namespace:string, type:string ):IAbstractElement {
		let innerHTML = ""
		let attributes = {}
		let children = [];
		return {
			/** Get components */
			get attributes () { return attributes },
			get children () { return children },
			/** Base element type */
			abstractType: "element",
			type, namespace,
			/** Events are useless here */
			// FIXME : Will become useful for hydrate
			addEventListener (...rest) {},
			removeEventListener (...rest) {},
			/** Attributes */
			setAttribute ( name:string, value:any ) {
				attributes[ name ] = value
			},
			getAttribute ( name:string ) {
				return attributes[ name ]
			},
			removeAttribute ( name:string ) {
				delete attributes[ name ]
			},
			/** Children */
			removeChild ( child:IAbstractNode ) {
				children = children.filter( c => c !== child )
			},
			appendChild ( child:IAbstractNode ) {
				children.push( child )
			},
			insertBefore ( child:IAbstractNode, before:IAbstractNode ) {
				children.splice( children.indexOf( before ), 0, child )
			},
			/** innerHTML */
			get innerHTML () {
				return (
					( innerHTML != "" )
					? innerHTML
					: children.map( child => renderAbstractNodeToString( child ) ).join("")
				)
			},
			set innerHTML ( value:string ) {
				if ( value == "" )
					children = []
				innerHTML = value
			},
			/** toString */
			toString ():string {
				return renderAbstractNodeToString( this )
			}
		}
	},
}

export function renderToString ( rootNode:VNode ) {
	const rootElement = abstractDocument.createElement('body')
	render( rootNode, rootElement, abstractDocument )
	return rootElement.innerHTML
}
