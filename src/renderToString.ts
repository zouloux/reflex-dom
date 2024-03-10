import { render } from "./index";
import {
	IVirtualComment, IVirtualDocument, IVirtualElement, IVirtualNode,
	IVirtualText, VNode
} from "./common";


const _attributesSpecialCases = {
	'className': 'class'
};

const _kebabRegex = /([a-z0-9])([A-Z])/g

const _compressCSS = (css:string) => css
	.replace(/\/\*[\s\S]*?\*\//g, '') 	// Remove comments
	.replace(/\s+/g, ' ') 				// Collapse whitespace
	.replace(/\s*([{:;,}])\s*/g, '$1') 	// Remove space around { } : ; ,
	.replace(/;}/g, '}'); 				// Remove unnecessary semicolons before }


function toKebabCase ( string:string ) {
	if ( _attributesSpecialCases[string] )
		return _attributesSpecialCases[string]
	return string.replace(_kebabRegex, '$1-$2').toLowerCase()
}

function renderAbstractNodeToString ( node:IVirtualNode ) {
	if ( node.virtualType === "comment" )
		return `<!--${(node as IVirtualComment).data}-->`
	if ( node.virtualType === "text" )
		return (node as IVirtualText).nodeValue
	if ( node.virtualType === "element" ) {
		const nodeElement = node as IVirtualElement
		const type = nodeElement.type.toLowerCase()
		let buffer = `<${type}`
		Object.keys( nodeElement.attributes ).forEach( key => {
			const name = toKebabCase( key );
			const value = nodeElement.attributes[key]
			if ( value !== false && value != null )
				buffer += ` ${name}="${(value + '').replace(/"/g, '&quot;')}"`
			else if ( value === true )
				buffer += ` ${name}`
		})
		const styleKeys = Object.keys( nodeElement.style )
		if ( styleKeys.length ) {
			const styleRules = styleKeys.map(
				key => `${toKebabCase(key)}:${nodeElement.style[key]}`
			)
			buffer += ` style="${styleRules.join(";")}"`
		}
		if ( nodeElement.children.length === 0 && nodeElement.innerHTML === "" )
			return buffer + "/>"
		buffer += ">"
		const { innerHTML } = nodeElement
		buffer += type === "style" ? _compressCSS( innerHTML ) : innerHTML
		return `${buffer}</${type}>`
	}
}

const virtualDocument:IVirtualDocument = {
	isVirtual: true,
	createComment ( data:string ):IVirtualComment {
		return {
			virtualType: "comment",
			data
		}
	},
	createTextNode ( nodeValue:string ):IVirtualText {
		return {
			virtualType: "text",
			nodeValue
		}
	},
	createElement( type:string ):IVirtualElement {
		return virtualDocument.createElementNS( null, type )
	},
	createElementNS( namespace:string, type:string ):IVirtualElement {
		let innerHTML = ""
		let attributes = {}
		let children = [];
		return {
			style: {},
			/** Get components */
			get attributes () { return attributes },
			get children () { return children },
			/** Base element type */
			virtualType: "element",
			type, namespace,
			/** Events are useless here and kept only to simplify the diff algo */
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
			removeChild ( child:IVirtualNode ) {
				children = children.filter( c => c !== child )
			},
			appendChild ( child:IVirtualNode ) {
				children.push( child )
			},
			insertBefore ( child:IVirtualNode, before:IVirtualNode ) {
				children.splice( children.indexOf( before ), 0, child )
			},
			/** innerHTML */
			get innerHTML () {
				return (
					innerHTML != "" ? innerHTML :
					children.map( renderAbstractNodeToString ).join("")
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
	// TODO : Disable extensions when rendering to string
	const rootElement = virtualDocument.createElement('root')
	render( rootNode, rootElement, virtualDocument )
	return rootElement.innerHTML
}
