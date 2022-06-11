import {
	TEXT_NODE_TYPE_NAME, ComponentInstance, RenderDom, RenderFunction,
	shallowPropsCompare, VNode, VNodeDomType, VTextNode, ComponentFunction,
	ComponentReturn, ReflexError
} from "./index";
import { cloneVNode } from "./jsx";
import { IInternalRef, IInternalRefs } from "./ref";

/**
 * TODO : Disallow a component render function to return a component as main node !
 * 			() => <OtherComponent /> <- Forbidden
 */

// ----------------------------------------------------------------------------- CONSTANTS

// Virtual node object is injected into associated dom elements with this name
export const DOM_PRIVATE_VIRTUAL_NODE_KEY = "__v"

// Attached listeners to a dom element are stored in this array
export const DOM_PRIVATE_LISTENERS_KEY = "__l"

// Stolen from Preact, to check if a style props is non-dimensional (does not need to add a unit)
const IS_NON_DIMENSIONAL_REGEX = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

// Check if an event is a capture one
const CAPTURE_REGEX = /Capture$/

// ----------------------------------------------------------------------------- CURRENT SCOPED COMPONENT

// We store current component in factory phase for hooks
let _hookedComponent:ComponentInstance = null
export function getHookedComponent ():ComponentInstance {
	if ( !_hookedComponent && process.env.NODE_ENV !== "production" )
		throw new ReflexError(`Using hook outside of a factory component.`)
	return _hookedComponent
}

// ----------------------------------------------------------------------------- COMMON

function getEventNameAndKey ( name:string, dom:Element ) {
	// Note : Capture management stolen from Preact, thanks
	const useCapture = name !== ( name = name.replace(CAPTURE_REGEX, '') );
	// Infer correct casing for DOM built-in events:
	const eventName = ( name.toLowerCase() in dom ? name.toLowerCase() : name ).slice(2)
	// Create unique key for this event
	const eventKey = eventName + (useCapture ? 'C' : '')
	return { eventName, eventKey, useCapture }
}

// Stolen from Preact, attach some style à key / value to a dom element
function setStyle ( style:CSSStyleDeclaration, key:string, value:string|null ) {
	if (key[0] === '-')
		style.setProperty(key, value);
	else if (value == null)
		style[key] = '';
	else if (typeof value != 'number' || IS_NON_DIMENSIONAL_REGEX.test(key))
		style[key] = value;
	else
		style[key] = value + 'px';
}

// Optimize it in a function @see jsx.ts/createVNode()
function createComponentInstance ( vnode:VNode<null, ComponentFunction> ):ComponentInstance {
	return {
		vnode,
		isDirty: false,
		isMounted: false,
		name: vnode.type.name,
		mountHandlers: [],
		unmountHandlers: [],
	}
}

// ----------------------------------------------------------------------------- DIFF ELEMENT

export function diffElement ( newNode:VNode, oldNode:VNode ) {
	// console.log("diffElement", newNode, oldNode)
	const isTextNode = newNode.type == TEXT_NODE_TYPE_NAME
	// Get dom element from oldNode or create it
	const dom:RenderDom = (
		oldNode ? oldNode.dom : (
			isTextNode
			? document.createTextNode( (newNode as VTextNode).props.value )
			: document.createElement( newNode.type as VNodeDomType )
		)
	)
	// Update text contents
	if ( isTextNode && oldNode ) {
		const { value } = (newNode as VTextNode).props;
		// Only when content has changed
		if ( value != (dom as Text).nodeValue )
			( dom as Text ).nodeValue = value
	}
	// Text nodes does not have attributes or events
	if ( isTextNode ) return dom
	// Remove attributes which are removed from old node
	oldNode && Object.keys( oldNode.props ).map( name => {
		// Do not process children and remove only if not in new node
		if ( name === "children" ) return
		if ( name in newNode.props && newNode.props[ name ] === oldNode.props[ name ] )
			return
		// Insert HTML directly without warning
		if ( name === "innerHTML" )
			( dom as Element ).innerHTML = "" // FIXME : Maybe use delete ?
			// Events starts with "on". On preact this is optimized with [0] == "o"
		// But recent benchmarks are pointing to startsWith usage as faster
		else if ( name.startsWith("on") ) {
			const { eventName, eventKey, useCapture } = getEventNameAndKey( name, dom as Element );
			dom.removeEventListener( eventName, dom[ DOM_PRIVATE_LISTENERS_KEY ][ eventKey ], useCapture )
		}
		// Other attributes
		else {
			( dom as Element ).removeAttribute( name )
		}
	})
	// Update props
	Object.keys( newNode.props ).map( name => {
		if ( name === "children" ) return
		let value = newNode.props[ name ];
		// Do not continue if attribute or event did not change
		if ( oldNode && name in oldNode.props && oldNode.props[ name ] === value )
			return;
		// Insert HTML directly without warning
		if ( name === "innerHTML" )
			( dom as Element ).innerHTML = value
		// Events starts with "on". On preact this is optimized with [0] == "o"
		// But recent benchmarks are pointing to startsWith usage as faster
		else if ( name.startsWith("on") ) {
			const { eventName, eventKey, useCapture } = getEventNameAndKey( name, dom as Element );
			// Init a collection of handlers on the dom object as private property
			dom[ DOM_PRIVATE_LISTENERS_KEY ] ??= new Map();
			// Store original listener to be able to remove it later
			dom[ DOM_PRIVATE_LISTENERS_KEY ][ eventKey ] = value;
			// And attach listener
			dom.addEventListener( eventName, value, useCapture )
		}
		// Other attributes, just set right on the dom element
		else {
			// Manage class as arrays
			if ( name === "class" && Array.isArray( value ) )
				value = value.filter( v => v !== true && !!v ).join(" ").trim()
			// Manage style as object only
			else if ( name === "style" && typeof value === "object" )
				// FIXME : Can it be optimized ? Maybe only setStyle when needed ?
				return Object.keys( value ).map(
					k => setStyle( (dom as HTMLElement).style, k, value[k] )
				);
			// Remove falsy values
			else if ( value === false )
				return;
			// FIXME : What about checked / disabled / autoplay ...
			// Set new attribute value
			( dom as Element ).setAttribute( name, value )
		}
	})
	return dom;
}

// ----------------------------------------------------------------------------- DIFF CHILDREN

/**
 * Note about performances
 * - Very important, avoid loops in loops ! Prefer 3 static loops at top level
 *   rather than 2 nested loops. n*3 is lower than n^n !
 * @param newParentNode
 * @param oldParentNode
 */
export function diffChildren ( newParentNode:VNode, oldParentNode?:VNode ) {
	// console.log("Diff children", newParentNode, oldParentNode)
	// Target new and old children.
	const newChildren = newParentNode.props.children?.flat()
	const oldChildren = oldParentNode?.props.children?.flat()
	// FIXME : If new does not have children but old does, we need to destroy old children components instances
	if ( !newChildren ) return;
	const parentDom = newParentNode.dom as Element
	// Create key array on parent node to register keyed children
	// This will allow us to find any child by its key directly without
	// having to search for it
	newParentNode.keys = new Map()
	const registerKey = c => {
		if ( c?.key )
			newParentNode.keys[ c.key ] = c
	}
	// This is a new parent node (no old), so no diffing
	// we juste process and add every child node
	if ( !oldChildren ) {
		newChildren.map( newChildNode => {
			if (!newChildNode) return;
			diffNode( newChildNode )
			parentDom.appendChild( newChildNode.dom )
			// Register this child with its key on its parent
			registerKey( newChildNode )
		})
		return;
	}
	// Map all new children keys into the keys register to avoid to use find
	// when searching for removed nodes
	// NOTE : About performances : 1st non-nested loop
	newChildren.map( registerKey )
	// Check if an old keyed node has been removed and get which index are offset after removal
	// NOTE : About performances : 2nd non-nested loop
	const lostIndexes = oldChildren.map(
		oldChild => !!(oldChild?.key && !newParentNode.keys[oldChild.key] )
	)
	// Otherwise we need to compare between old and new tree
	const oldParentKeys = oldParentNode.keys
	let collapseCount = 0
	// NOTE : About performances : 3rd non-nested loop
	newChildren.map( (newChildNode, i) => {
		// Collapsed corresponding index between old and new nodes
		// To be able to detect moves or if just collapsing because a top sibling
		// has been removed
		if ( lostIndexes[i] )
			collapseCount ++
		/** REMOVED **/
		// If falsy, it's surely a child that has been removed with a ternary or a boolean
		// Do nothing else and do not mark old node to keep, so it will be removed
		if ( !newChildNode )
			return;
		// Has key, same key found in old, same type on both
		/** MOVE & UPDATE KEYED CHILD **/
		if (
			newChildNode.key
			&& oldParentKeys[ newChildNode.key ]
			&& oldParentKeys[ newChildNode.key ].type == newChildNode.type
		) {
			const oldNode = oldParentKeys[ newChildNode.key ]
			diffNode( newChildNode, oldNode )
			oldNode.keep = true;
			// Check if index changed, compare with collapsed index to detect moves
			const collapsedIndex = i + collapseCount
			// FIXME : Should do 1 operation when swapping positions, not 2
			// FIXME : Perf, is indexOf quick ? Maybe store every indexes in an array ?
			if ( oldChildren.indexOf( oldNode ) != collapsedIndex ) {
				parentDom.insertBefore( newChildNode.dom, parentDom.children[ i ] )
			}
		}
		// Has key, but not found in old
		/** CREATE **/
		else if ( newChildNode.key && !oldParentKeys[ newChildNode.key ] ) {
			diffNode( newChildNode )
			parentDom.insertBefore( newChildNode.dom, parentDom.children[ i ] )
			collapseCount --
		}
		// Found at same index, with same type.
		// Old node does not have a key.
		/** UPDATE IN PLACE **/
		else if ( i in oldChildren && oldChildren[ i ].type == newChildNode.type ) {
			const oldNode = oldChildren[ i ]
			diffNode( newChildNode, oldNode )
			oldNode.keep = true;
		}
		// Not found
		/** CREATE **/
		else {
			diffNode( newChildNode )
			parentDom.insertBefore( newChildNode.dom, parentDom.children[ i ] )
			collapseCount --
		}
	})
	// Remove old children which are not reused
	// NOTE : About performances : 4th non-nested loop
	oldChildren.map( oldChildNode => {
		if ( oldChildNode && !oldChildNode.keep ) {
			// Call unmount handlers
			// TODO : Remove component -> bubble deletion + remove parent from dom only
			//recursivelyUnmountNode();
			unmountComponent( oldChildNode.component )
			// Remove ref
			const { dom } = oldChildNode
			oldChildNode.dom = null;
			updateNodeRef( oldChildNode )
			parentDom.removeChild( dom )
		}
	})
}

function mountComponent ( component:ComponentInstance ) {
	// Call every mount handler and store returned unmount handlers
	component.mountHandlers.map( handler => {
		const mountedReturn = handler.apply( component, [] );
		if ( typeof mountedReturn === "function" )
			component.unmountHandlers.push( mountedReturn )
	})
	// Reset mount handlers, no need to keep them
	component.mountHandlers = []
	component.isMounted = true;
}

function unmountComponent ( component:ComponentInstance ) {
	component.unmountHandlers.map( h => h.apply( component, [] ) )
	component.unmountHandlers = []
	component.isMounted = false;
}

function recursivelyUnmountNode ( node:VNode, depth:number = 0 ) {
	// TODO : Get depth of each child
	//			Then unmount child with higher depth in first
	node.props.children.map( child => {

	})
}

// ----------------------------------------------------------------------------- DIFF NODE

export function flattenChildren ( vnode:VNode ) {
	// Re-assign flattened array to the original virtual node, and return it
	return vnode.props.children = (vnode.props.children?.flat() ?? [])
}

function renderNode <GReturn = ComponentReturn> ( node:VNode<null, ComponentFunction>, component:ComponentInstance ) :GReturn {
	// Tie component and virtual node
	component.vnode = node
	node.component = component
	// Select hooked component
	_hookedComponent = component;
	// TODO : props proxy
	// Execute rendering
	const result = (component.render ?? node.type as RenderFunction).apply( component, [ node.props ])
	// Unselect hooked component
	_hookedComponent = null
	return result as GReturn
}

function updateNodeRef ( node:VNode ) {
	if ( !node.ref ) return;
	// Ref as refs
	if ( 'list' in node.ref ) {
		// FIXME : Type
		// FIXME : Keep track of index ? Do it from diffChildren maybe ?
		( node.ref as IInternalRefs ).setFromVNode( 0, node as any )
	} else {
		// FIXME : Type
		( node.ref as IInternalRef ).setFromVNode( node as any )
	}
}

export function diffNode ( newNode:VNode, oldNode?:VNode ) {
	// IMPORTANT : Here we clone node if we got the same instance
	// 			   Otherwise, altering props.children after render will fuck everything up
	// Clone identical nodes to be able to diff them
	if ( oldNode && oldNode === newNode )
		newNode = cloneVNode( oldNode )
	// Transfer component instance from old node to new node
	let component:ComponentInstance = oldNode?.component
	// We may need a new component instance
	let renderResult:VNode
	if ( !component && typeof newNode.type === "function" ) {
		// Create component instance (without new keyword for better performances)
		component = createComponentInstance( newNode as VNode<null, ComponentFunction> )
		// Execute component's function and check what is returned
		const result = renderNode( newNode as VNode<null, ComponentFunction>, component )
		// This is a factory component which return a render function
		if ( typeof result === "function" ) {
			component.render = result as RenderFunction
			component.isFactory = true
		}
		// This is pure functional component which returns a virtual node
		else if ( typeof result == "object" && "type" in result ) {
			component.render = newNode.type as RenderFunction
			component.isFactory = false
			renderResult = result
		}
	}
	let dom:RenderDom
	// Virtual node is a dom element
	if ( !component ) {
		newNode.dom = dom = diffElement( newNode, oldNode )
	}
	// Virtual node is a component
	else {
		// FIXME : Is it a good idea to shallow compare props on every changes by component ?
		// 			-> It seems to be faster than preact + memo with this 👀, check other cases
		// TODO : Maybe do not shallow by default but check if component got an "optimize" function
		//			which can be implemented with hooks. We can skip a lot with this !
		// FIXME : Does not work if props contain dynamic arrow functions :(
		//			<Sub onEvent={ e => handler(e, i) } />
		//			Here the handler is a different ref at each render
		// If props did not changed between old and new
		// Only optimize pure components, factory components mau have state so are not pure
		if (
			// If pure functional component has not already been rendered
			!renderResult
			// Need to be a component update, on a pure functional component,
			&& oldNode && !component.isFactory // && !component.isDirty
			// New component isn't marked as not pure
			&& newNode.props.pure !== false // FIXME : Rename it forceRefresh={ true } ?
			// Cannot optimize components which have children properties
			// Because parent component may have altered rendering of injected children
			&& newNode.props.children.length === 0
			// Do shallow compare
			&& shallowPropsCompare(newNode.props, oldNode.props)
		) {
			// FIXME : Weirdly, it seems to optimize not all components
			//			Ex : click on create 1000 several times and watch next console log
			// console.log("OPTIMIZE")
			// Do not re-render, just get children and dom from old node
			// newNode.props.children = [ ...oldNode.props.children ]
			newNode.props.children = oldNode.props.children
			newNode.dom = dom = oldNode.dom
		}
		// Not already rendered, and not optimization possible. Render now.
		else if ( !renderResult ) {
			renderResult = renderNode<VNode>( newNode as VNode<null, ComponentFunction>, component )
		}
		// We rendered something (not reusing old component)
		if ( renderResult ) {
			// Apply new children list to the parent component node
			newNode.props.children = flattenChildren( renderResult )
			// Diff rendered element
			newNode.dom = dom = diffElement( renderResult, oldNode )
		}
		component.isDirty = false
	}
	// Update ref on node
	updateNodeRef( newNode )
	// Diff children of this element (do not process text nodes)
	if ( dom instanceof Element )
		diffChildren( newNode, oldNode )
	// If component is not mounted yet, mount it
	if ( component && !component.isMounted )
		mountComponent( component )
}
