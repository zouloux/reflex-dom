import {
	_dispatch, _featureHooks, ComponentReturn,
	IVirtualDocument, RenderDom, RenderFunction, VNode
} from "./common";
import { IInternalRef } from "./ref";
import { ComponentInstance, shallowPropsCompare } from "./component";
import { state } from "./states";

// ----------------------------------------------------------------------------- CONSTANTS

// Attached listeners to a dom element are stored in this array
export const _DOM_PRIVATE_LISTENERS_KEY = "_l"

// Stolen from Preact, to check if a style props is non-dimensional (does not need to add a unit)
const _IS_NON_DIMENSIONAL_REGEX = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

// Check if an event is a capture one
const _CAPTURE_REGEX = /Capture$/

// Namespace for SVG elements
const _svgNS = "http://www.w3.org/2000/svg"

// ----------------------------------------------------------------------------- CURRENT SCOPED COMPONENT

// Store current component in factory phase for hooks
let _currentComponent:ComponentInstance = null

/**
 * Get current component instance.
 */
export const getCurrentComponent =
	<GComponent extends ComponentInstance = ComponentInstance>
	():GComponent => _currentComponent as GComponent

// ----------------------------------------------------------------------------- COMMON

function _getEventNameAndKey ( name:string, dom:Element ) {
	// Note : Capture management stolen from Preact, thanks
	const useCapture = name !== ( name = name.replace(_CAPTURE_REGEX, '') );
	// Infer correct casing for DOM built-in events:
	const lowerName = name.toLowerCase()
	const eventName = ( lowerName in dom ? lowerName : name ).slice(2)
	// Create unique key for this event
	const eventKey = eventName + (useCapture ? 'C' : '')
	return { eventName, eventKey, useCapture }
}

function _updateNodeRef ( node:VNode ) {
	(node.props?.ref as IInternalRef)?._setFromVNode( node as any )
}

// ----------------------------------------------------------------------------- DIFF ELEMENT

// Store current diffing node for atomic updates
let _currentDiffingNode:VNode

/**
 * Get current diffing node for atomic updates
 */
export const getCurrentDiffingNode = () => _currentDiffingNode

/**
 * Set dom attribute
 * @param dom dom element to set attributes on
 * @param name name of the attribute
 * @param value value of the attribute
 */
export function _setDomAttribute ( dom:Element, name:string, value:any ) {
	// className as class for non jsx components
	if ( name === "className" )
		name = "class"
	// false / null - remove attribute
	if ( value === null || value === false )
		dom.removeAttribute( name )
	// true / "" - set attribute without value
	else if ( value === true || value === "" )
		dom.setAttribute( name, "" )
	// Manage style as object only
	else if ( name == "style" && typeof value == "object" ) {
		const style = (dom as HTMLElement).style
		const keys = Object.keys(value)
		const total = keys.length
		for ( let i = 0; i < total; ++i ) {
			const key = keys[ i ]
			const propertyValue = value[key]
			if ( key[0] === '-' )
				style.setProperty(key, propertyValue);
			else if ( propertyValue == null )
				style[key] = '';
			else if ( typeof propertyValue != "number" || _IS_NON_DIMENSIONAL_REGEX.test(key) )
				style[key] = propertyValue;
			else
				style[key] = propertyValue + 'px';
		}
	}
	else {
		// Manage class as arrays
		if ( name === "class" && Array.isArray( value ) )
			value = value.flat( 1 ).filter( v => v !== true && !!v ).join(" ")
		dom.setAttribute( name, value )
	}
}

/**
 * Diff an element node and create its attached dom element.
 * @param newNode New node, can be the only argument to create dom element.
 * @param oldNode Old node, for diffing.
 * @param element for hydration only, the corresponding node already in document.
 */
export function _diffElement ( newNode:VNode, oldNode:VNode, element?:RenderDom ) {
	const { type, value } = newNode
	// If the whole component is re-rendered by any state change that is not a signal
	// We need to update all state based text values
	const isText = ( type === 1/*TEXT*/ || type === 3/*STATE*/ )
	let dom:RenderDom
	// Hydrating
	if ( element ) {
		// Use hydrated node
		dom = element
		// Update value if it changed after client render
		if ( isText ) {
			// Save this node as currently diffing to allow state and effects to track it
			_currentDiffingNode = newNode
			if ( element.nodeValue != value )
				element.nodeValue = value as string
		}
	}
	// Update a node
	else if ( oldNode ) {
		// Reuse old dom node
		dom = oldNode.dom
		// Update text or state value
		if ( isText && oldNode.value !== value )
			dom.nodeValue = value as string
	}
	// Create a node
	else {
		if ( value as string === "svg" )
			newNode._isSVG = true
		const document = newNode._document as Document
		if ( type === 0/*NULL*/ )
			dom = document.createComment('')
		else if ( isText ) {
			// Save this node as currently diffing to allow state and effects to track it
			_currentDiffingNode = newNode
			// If newNode is a state, createTextNode will call .toString() on the state
			// which will track the dependency
			dom = document.createTextNode( value as string )
		}
		else if ( type === 6/*ELEMENTS*/ ) {
			dom = (
				newNode._isSVG
				? document.createElementNS( _svgNS, value as string )
				: document.createElement( value as string )
			)
		}
	}
	// Skip attributes for those types
	if ( type === 0/*NULL*/ || isText )
		return dom
	else if ( type === 8/*LIST*/ ) {
		// Recursively diff children of lists
		_diffChildren( newNode, oldNode, dom )
		return dom
	}
	// Remove attributes which are removed from old node
	// https://esbench.com/bench/652e2ce67ff73700a4debb26
	let total
	let keys
	let i;
	if ( oldNode ) {
		keys = Object.keys(oldNode.props)
		total = keys.length
		for ( i = 0; i < total; ++i ) {
			const name = keys[ i ]
			if (
				// Do not continue for "internal" attributes
				name !== 'children' && name !== 'key' && name !== 'ref'
				// Do not continue if this attribute is not removed
				&& !( name in newNode.props && newNode.props[name] === oldNode.props[name] )
			) {
				// Insert HTML directly without warning
				if ( name == "innerHTML" )
					(dom as Element).innerHTML = "" // FIXME : Maybe use delete or null ?
				// Events starts with "on". On preact this is optimized with [0] == "o"
				// But recent benchmarks are pointing to startsWith usage as faster
				else if ( name.startsWith("on") ) {
					const { eventName, eventKey, useCapture } = _getEventNameAndKey( name, dom as Element );
					(dom as Element).removeEventListener(
						eventName,
						dom[ _DOM_PRIVATE_LISTENERS_KEY ].get( eventKey ),
						useCapture
					)
				}
				// Other attributes
				else {
					(dom as Element).removeAttribute( name )
				}
			}
		}
	}
	// Update props
	keys = Object.keys(newNode.props)
	total = keys.length
	for ( i = 0; i < total; ++i ) {
		const name = keys[ i ]
		let propValue = newNode.props[ name ];
		if (
			// Do not continue if value is undefined or null.
			// 	Undefined is checked here as a value, so no need for typeof check
			// 	It can happen when JSX source is pushing a props from an undefined value
			// Keep going if falsy to allow empty attributes
			propValue !== undefined && propValue !== null
			// Do not continue for "internal" attributes
			&& name !== "children" && name !== "key" && name !== "ref"
			// Do not continue if attribute or event did not change
			&& !( oldNode && name in oldNode.props && oldNode.props[ name ] === propValue )
		) {
			// Insert HTML directly without warning
			if ( name === "innerHTML" )
				(dom as Element).innerHTML = propValue
			// Events starts with "on". On preact this is optimized with [0] == "o"
			// But recent benchmarks are pointing to startsWith usage as faster
			else if ( name.startsWith("on") ) {
				const { eventName, eventKey, useCapture } = _getEventNameAndKey( name, dom as Element );
				// Init a collection of handlers on the dom object as private property
				dom[ _DOM_PRIVATE_LISTENERS_KEY ] ??= new Map();
				// Store original listener to be able to remove it later
				dom[ _DOM_PRIVATE_LISTENERS_KEY ].set( eventKey, propValue );
				// And attach listener
				dom.addEventListener( eventName, propValue, useCapture )
			}
			// Other attributes
			else {
				// If value is a state, track its changes by creating an "argument state" type of node
				if ( propValue !== null && typeof propValue === "object" && propValue.type === 3 ) {
					_currentDiffingNode = {
						type: 2/*ARGUMENT*/,
						value: propValue,
						_propertyName: name,
						dom
					}
					propValue = propValue.value
				}
				// Set dom attribute on element
				// Skip this when hydrating
				if ( !element )
					_setDomAttribute( dom as Element, name, propValue )
			}
		}
	}
	return dom;
}

// ----------------------------------------------------------------------------- RECURSIVELY MOUNT / UNMOUNT

export function _diffAndMount ( newNode:VNode, oldNode:VNode, element?:Element, forceUpdate = false ) {
	const finishHandlers = _dispatch(_featureHooks, 2/* DIFFING NODE */, newNode, oldNode, element, forceUpdate)
	if ( newNode ) {
		diffNode( newNode, oldNode, element, forceUpdate )
		recursivelyUpdateMountState( newNode, true )
		_dispatch( finishHandlers );
	}
}

/**
 * Recursively update mount state of components associated to node.
 * Will browse every component to update the mounting state in correct order.
 * Will call mount / unmount / render extensions.
 * @param node The starting node.
 * @param doMount Mount, or unmount.
 */
export function recursivelyUpdateMountState ( node:VNode, doMount:boolean ) {
	if ( !node || (node._document as IVirtualDocument).isVirtual )
		return
	if ( node.type === 7/*COMPONENTS*/ ) {
		const { component } = node
		// fixme : can't be smaller ?
		if ( !component )
			return
		// First, we recursively mount children before mounting the parent component
		recursivelyUpdateMountState( component.children, doMount )
		// --- MOUNT
		if ( doMount && !component.isMounted ) {
			// Execute after render handlers
			component.isMounted = true;
			// Call mount only on factory components
			if ( node.value.isFactory !== false ) {
				// Call every mount handler and store returned unmount handlers
				// Faster to store handlers before using it in the for loop
				const handlers = component._mountHandlers
				const total = handlers.length
				for ( let i = 0; i < total; ++i ) {
					const handler = handlers[ i ]
					const mountedReturn = handler.apply( component );
					if ( typeof mountedReturn === "function" )
						component._unmountHandlers.push( mountedReturn )
					// Allow mounted handler to return an array of unmount
					else if ( Array.isArray( mountedReturn ) )
						// todo : esbench this
						component._unmountHandlers.push( ...mountedReturn )
				}
				// Call render handler only on factory components
				component._mountHandlers = []
			}
			// Call mount / unmount feature hook
			_dispatch(_featureHooks, 1/* MOUNT / UNMOUNT */, component, true )
		}
		// --- UNMOUNT
		else if ( !doMount && component.isMounted ) {
			// Call mount / unmount feature hook
			_dispatch( _featureHooks, 1/* MOUNT / UNMOUNT */, false )
			// Call all unmount handler, for factory and functional components
			_dispatch( component._unmountHandlers )
			component.isMounted = false;
			// Cut component branch from virtual node to allow GC to destroy component
			node.component = null // avoid megamorphic, remove ref but keep key !
			component.vnode = null
		}
	}
	// --- RECURSIVE
	else if ( node.type > 4/*CONTAINERS*/ ) {
		const children = node.props.children
		const total = children.length
		for ( let i = 0; i < total; ++i )
			recursivelyUpdateMountState( children[i], doMount )
	}
}

// ----------------------------------------------------------------------------- DIFF CHILDREN

/**
 * Register child key on parent keys map
 * Init keys on parent
 * Transfer SVG mark and document from parent to child
 */
function _registerKeyAndEnv ( parentNode:VNode, childNode:VNode ) {
	// Inject SVG and document from parent
	// When a <svg> tag is discovered, every child is marked as SVG
	// _isSVG is used to create element with the correct NS
	childNode._isSVG = parentNode._isSVG
	childNode._document = parentNode._document
	// check for null and undefined, but 0 and "" are valid keys
	if ( childNode.props?.key != null ) {
		// esbench : Object faster than Map with number
		// https://esbench.com/bench/652d49867ff73700a4debb1a
		parentNode._keys ??= new Map()
		parentNode._keys.set( childNode.props.key, childNode)
	}
}

/**
 * Remove a node drom DOM and unmount it.
 */
function _removeNode ( node:VNode ) {
	recursivelyUpdateMountState( node, false );
	node.dom.remove()
	node.dom = null
	_updateNodeRef( node )
}

// Previous parent node that was in diffChildren for lists that does not have their own dom
let _previousParentNode:VNode

/**
 * Diff all children, with or without keys.
 * @param newParentNode New parent node to diff
 * @param oldParentNode Old parent node to diff, can be null to create element with newParentNode
 * @param element Used for hydration only. If defined, will not diff but only hydrate.
 */
export function _diffChildren ( newParentNode:VNode, oldParentNode:VNode, element:RenderDom ) {
	// Keep node ref for lists, that does not have their own dom
	const isList = newParentNode.type === 8/* LIST */
	const parentDom = ( isList ? _previousParentNode.dom : newParentNode.dom ) as Element
	// Target new and old children
	const newChildren = newParentNode.props.children
	const totalNew = newChildren.length
	const oldChildren = oldParentNode?.props.children
	const totalOld = oldChildren ? oldChildren.length : 0
	// If only have one child, save the previous parent node because it's maybe a list
	if ( totalNew === 1 )
		_previousParentNode = newParentNode
	// If we are on a list which has been cleared
	// And this list is the only child of its parent node
	// We can take a shortcut and clear dom with innerHTML
	if ( isList && totalNew === 0 && totalOld > 0 ) {
		recursivelyUpdateMountState( oldParentNode, false )
		// parentDom.innerHTML = ''
		parentDom.textContent = ''
		return;
	}
	// Nothing to add
	if ( totalNew === 0 )
		return;
	// No old parent node, or empty old parent node, we inject directly without checks.
	// Also for hydration which will patch merged text nodes
	// Target children lists
	// https://esbench.com/bench/652d43c97ff73700a4debaee
	let i:number
	// if ( !oldParentNode || totalOld === 0 ) {
	if ( totalOld === 0 ) {
		let previousIsText = false
		// If using "i", it's faster to have a classic for ( instead of "for const of" )
		for ( i = 0; i < totalNew; ++i ) {
			const child = newChildren[ i ]
			if ( child ) {
				_registerKeyAndEnv( newParentNode, child )
				// HYDRATION ONLY
				// Text nodes are merged when rendering to string
				// Ex : <div>Hello { name }</div> becomes <div>Hello Jean-Mi</div>
				// Which collapse two nodes into one. We need to create new text nodes and
				// inject them in between. DiffNode will set the correct value of the node later.
				// NOTE : Here, DOM is mutated while hydrating, which can cause reflow / redraw
				//			I don't know if we can improve this to avoid or delay those computations
				let childElement:RenderDom
				if ( element ) {
					const currentIsText = ( child.type === 1/*TEXT*/ || child.type === 3/*STATE*/ )
					if ( currentIsText && previousIsText ) {
						// Create a zero width space otherwise the browser will collapse it again.
						childElement = document.createTextNode('\u200B')
						element.insertBefore( childElement, element.childNodes[i] )
					}
					else {
						childElement = element.childNodes[ i ] as RenderDom
					}
					previousIsText = currentIsText
				}
				diffNode( child, null, childElement )
				// Append child only on render mode, not in hydration mode
				if ( !element && child.dom )
					parentDom.appendChild( child.dom )
			}
		}
		return
	}
	// Register keys before browsing in the big loop
	// We have to loop 2 times here. This one to get all child keys before browsing for diffing.
	// Anyway, 2n is better than n(n)
	// Optimisation : Maybe having a cond which check for all keys when we are looking for the first one
	// to run this loop only when needed ( in keyed lists only )
	// esbench : https://esbench.com/bench/652d43c97ff73700a4debaee todo : up to date ?
	for ( i = 0; i < totalNew; ++i ) {
		const child = newChildren[i]
		if ( child )
			_registerKeyAndEnv( newParentNode, child )
	}
	// If using "i", it's faster to have a classic for ( instead of "for const of" )
	const totalMax = Math.max( totalNew, totalOld )
	let offset = 0
	for ( i = 0; i < totalMax; ++i ) {
		// We keep the old child node at index to compare with keyless new node
		let oldChildNode:VNode
		let deleteOldNode = false
		// Browse old nodes
		if ( i < totalOld ) {
			// Target old node and keep it for new node browsing
			oldChildNode = oldChildren[ i ]
			if ( oldChildNode ) {
				const oldChildNodeKey = oldChildNode.props?.key
				// Keyed node
				// check for null and undefined, but 0 and "" are valid keys
				if ( oldChildNodeKey != null ) {
					// Keyed node has been removed
					if ( !newParentNode._keys.has(oldChildNodeKey) ) {
						// console.log(i, "KEYED - DELETE")
						--offset
						deleteOldNode = true
					}
				}
				// Keyless node
				else if ( i >= totalNew ) {
					// console.log(i, "KEYLESS - DELETE")
					deleteOldNode = true
				}
				if ( deleteOldNode )
					_removeNode( oldChildNode )
			}
		}
		// Browse new nodes
		if ( i < totalNew ) {
			const newChildNode:VNode = newChildren[ i ]
			if ( newChildNode ) {
				const newChildNodeKey = newChildNode.props?.key
				let addNewNode = false
				// Keyed node
				// check for null and undefined, but 0 and "" are valid keys
				if ( newChildNodeKey != null ) {
					// Keyed node has been kept
					if ( oldParentNode._keys.has(newChildNodeKey) ) {
						// Get index position from old
						const oldChildNodeFromKey = oldParentNode._keys.get( newChildNodeKey )
						const index = oldChildren.indexOf( oldChildNodeFromKey )
						diffNode( newChildNode, oldChildNodeFromKey )
						// Keyed node has been moved
						if ( i !== index + offset ) {
							// console.log(i, "KEYED - MOVED", index, offset)
							parentDom.insertBefore( newChildNode.dom, parentDom.children[ i + 1 ] )
						}
						// Else keyed node didn't move, we replaced in place
						// else console.log(i, "KEYED - UPDATE")
					}
					// Keyed node has been added
					else {
						// console.log(i, "KEYED - ADDED")
						++offset
						addNewNode = true
					}
				}
				// Keyless, still in same stack
				else if (
					oldChildNode // Old child node from same index
					&& oldChildNode.type === newChildNode.type
					&& (
						// If element tag name changes,
						// Or if component function changes,
						// Do not try to update in place, but replace whole node
						(
							newChildNode.type !== 6/*ELEMENTS*/
							&& newChildNode.type !== 7/*COMPONENTS*/
						)
						|| oldChildNode.value === newChildNode.value
					)
				) {
					// console.log(i, "KEYLESS - UPDATE")
					diffNode( newChildNode, oldChildNode )
				}
				// Keyless, old stack overflowed, add new node
				else {
					addNewNode = true
					if ( oldChildNode && !deleteOldNode ) {
						// console.log(i, "KEYLESS - REPLACE", newChildNode, oldChildNode)
						_removeNode( oldChildNode )
					}
					// else console.log(i, "KEYLESS - CREATE", oldChildNode)
				}
				if ( addNewNode ) {
					diffNode( newChildNode )
					parentDom.insertBefore( newChildNode.dom, parentDom.children[ i ] )
				}
			}
		}
	}
}


// ----------------------------------------------------------------------------- RENDER COMPONENT

/**
 * Render a component node.
 * Component is already instantiated and attached to node.
 * Will create Proxy props for Factory components
 * @param node
 */
function _renderComponentNode <GReturn = ComponentReturn> ( node:VNode ) :GReturn {
	// Select current component before rendering
	_currentComponent = node.component;
	// Only on factory components
	// we create a proxy for props which will update a state for dependency tracking
	const { value } = node
	// Default the isFactory :
	// - is a plain function ( function Component () {} ), defaults to true
	// - is an arrow function ( () => {} ), defaults to false
	// @ts-ignore
	value.isFactory ??= !!value.prototype
	// Create proxy for factory components
	if ( value.isFactory && !_currentComponent._proxy ) {
		// Create prop states to track dependencies
		const s = state( node.props )
		_currentComponent._propState = s
		// Create proxy and map getter to the state to track effects
		// FIXME : Proxy is not browsable :(
		// TODO : Optimize this
		// const proxy = Proxy.revocable( node.props, { // todo : to test ?
		const proxy = Proxy.revocable( {}, {
			get : ( _, prop ) => Reflect.get( s.value, prop )
		})
		// Associate proxy to component and dispose proxy on component unmount
		_currentComponent._proxy = proxy.proxy
		_currentComponent._unmountHandlers.push( proxy.revoke )
	}
	// todo
	_dispatch( _currentComponent._beforeNextRenderHandlers )
	_currentComponent._beforeNextRenderHandlers = []
	// Render component with props instance and component API instance
	return _currentComponent._render.apply(
		_currentComponent, [ _currentComponent._proxy ?? node.props, _currentComponent ]
	)
}

// ----------------------------------------------------------------------------- DIFF NODE

/**
 * Diff a node.
 * @param newNode New node, can be the only parameter to only add.
 * @param oldNode Old node, if diffing.
 * @param element Dom element for hydration only.
 * @param forceUpdate For update to bypass shouldUpdate on components.
 */
export function diffNode ( newNode:VNode, oldNode?:VNode, element?:RenderDom, forceUpdate = false ) {
	// IMPORTANT : Here we clone node if we got the same instance
	// 			   Otherwise, altering props.children after render will fuck everything up
	// Clone identical nodes to be able to diff them
	if ( oldNode && oldNode === newNode ) {
		// IMPORTANT : Do not deep clone to avoid changing nature of props
		// IMPORTANT : Props properties can be the same instance between shouldUpdate here
		// IMPORTANT : also clone props object
		// https://esbench.com/bench/65eb3c3c7ff73700a4dec08e
		newNode = { ...oldNode }
		// Important, do not change properties order and set "props" to avoid megamorphic
		newNode.props = { ...oldNode.props }
	}
	// Transfer id for refs and env
	if ( oldNode ) {
		newNode._isSVG = oldNode._isSVG
		newNode._document = oldNode._document
		newNode._id = oldNode._id
	}
	// https://esbench.com/bench/652a84367ff73700a4debaad
	// Create / update DOM element for those node types
	const type = newNode.type
	/* NULL | TEXT | STATE | ELEMENTS */
	if ( ( type >= 0 && type <= 3 ) || type === 6 ) {
		newNode.dom = _diffElement( newNode, oldNode, element )
		_currentDiffingNode = null
	}
	// Diff component node
	else if ( type === 7/*COMPONENTS*/ ) {
		const componentFunction = newNode.value
		// Check if we need to instantiate component or keep from old node
		let componentInstance:ComponentInstance = oldNode?.component
		let renderResult:VNode
		// Transfer component instance from old node to new node
		if ( componentInstance ) {
			newNode.component = componentInstance
			componentInstance.vnode = newNode
		}
		// No instance, create one and try to render
		else {
			// Create component instance (without new keyword for better performances)
			// Object creation is inlined for better perfs and smaller footprint
			componentInstance = {
				vnode: newNode,
				isMounted: false,
				children: null,
				// Private members, will be mangled
				// By default, we use the should-update attached to the component's function
				_shouldUpdate: componentFunction.shouldUpdate,
				_defaultProps: null,
				//
				_proxy: null,
				_propState: null,
				//
				_render: componentFunction as RenderFunction,
				//
				_mountHandlers: [],
				_renderHandlers: [],
				_beforeNextRenderHandlers: [],
				_afterNextRenderHandlers: [],
				_unmountHandlers: [],
			}
			newNode.component = componentInstance
			componentInstance._render = componentFunction as RenderFunction
			// Execute component's function and check what is returned
			const result = _renderComponentNode( newNode )
			// Check if this component returns a function or a dom node
			// Override isFactory
			const isFactory = typeof result === "function"
			componentFunction.isFactory = isFactory
			componentInstance._render = (isFactory ? result : componentFunction) as RenderFunction
			if ( !isFactory )
				renderResult = result
		}
		// Here we check if this component should update
		// By default, we always update component on refreshes
		let shouldUpdate = true
		if ( !forceUpdate && !renderResult && oldNode ) {
			// We check should update on functional and factory components
			// https://esbench.com/bench/652be1807ff73700a4debadb
			// We check should update on functional and factory components
			shouldUpdate = (
				// Use shouldUpdate function on component API
				componentInstance._shouldUpdate
				? componentInstance._shouldUpdate( newNode.props, oldNode.props )
				// Otherwise shallow props compare with children check
				: !shallowPropsCompare( newNode.props, oldNode.props )
			)
			// Otherwise, if we should update a factory component
			if ( shouldUpdate && componentFunction.isFactory ) {
				// Do not continue regular update, update props on state
				// and let the state update its dependencies
				componentInstance._propState.set({
					...componentInstance._defaultProps,
					...newNode.props
				})
				// We rendered with a state change
				// do not continue regular update with a render
				shouldUpdate = false
			}
			// Transfer dom reference from old node if we should not update
			if ( !shouldUpdate )
				newNode.dom = oldNode.dom
		}
		// If this component needs a render (factory function), render it
		if ( !renderResult && shouldUpdate )
			renderResult = _renderComponentNode<VNode>( newNode as VNode )
		// We rendered something (not reusing old component)
		if ( renderResult ) {
			// Transfer env from component to rendered node
			renderResult._isSVG = newNode._isSVG
			renderResult._document = newNode._document
			diffNode( renderResult, componentInstance.children, element )
			componentInstance.children = renderResult
			newNode.dom = renderResult.dom
			// Call render handlers on factory and functional components
			_dispatch( componentInstance._renderHandlers )
			_dispatch( componentInstance._afterNextRenderHandlers )
			componentInstance._afterNextRenderHandlers = []
		}
		// We can clear component now
		_currentComponent = null
	}
	// Update ref on node
	_updateNodeRef( newNode )
	// https://esbench.com/bench/652d0d307ff73700a4debaea
	// More bytes but better perfs
	if ( newNode.type > 4/*CONTAINERS*/ && newNode.type !== 7/*COMPONENT*/ )
		_diffChildren( newNode, oldNode, element )
}
