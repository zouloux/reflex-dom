import {
	_dispatch, _featureHooks, ComponentFunction, ComponentReturn, INodeEnv,
	RenderDom, RenderFunction, VNode
} from "./common";
import { cloneVNode, createVNode } from "./jsx";
import { IInternalRef } from "./ref";
import { _createComponentInstance, ComponentInstance, shallowPropsCompare } from "./component";
import { state } from "./states";

// ----------------------------------------------------------------------------- CONSTANTS

// Attached listeners to a dom element are stored in this array
export const _DOM_PRIVATE_LISTENERS_KEY = "__l"

// Stolen from Preact, to check if a style props is non-dimensional (does not need to add a unit)
const _IS_NON_DIMENSIONAL_REGEX = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

// Check if an event is a capture one
const _CAPTURE_REGEX = /Capture$/

// Namespace for SVG elements
const _svgNS = "http://www.w3.org/2000/svg"

// ----------------------------------------------------------------------------- CURRENT SCOPED COMPONENT

// We store current component in factory phase for hooks
let _currentComponent:ComponentInstance = null

/**
 * Get current component instance.
 * TODO : Add to doc
 */
export function getCurrentComponent
	<GComponent extends ComponentInstance = ComponentInstance>
	():GComponent {
	// if ( !_currentComponent && process.env.NODE_ENV !== "production" )
	// 	throw new Error(`Reflex - getHookedComponent // Cannot use a factory hook outside of a factory component.`)
	return _currentComponent as GComponent
}

// ----------------------------------------------------------------------------- COMMON

function _getEventNameAndKey ( name:string, dom:Element ) {
	// Note : Capture management stolen from Preact, thanks
	const useCapture = name !== ( name = name.replace(_CAPTURE_REGEX, '') );
	// Infer correct casing for DOM built-in events:
	const eventName = ( name.toLowerCase() in dom ? name.toLowerCase() : name ).slice(2)
	// Create unique key for this event
	const eventKey = eventName + (useCapture ? 'C' : '')
	return { eventName, eventKey, useCapture }
}

// Stolen from Preact, attach some style à key / value to a dom element
function _setStyle ( style:CSSStyleDeclaration, key:string, value:string|null ) {
	if ( key[0] === '-' )
		style.setProperty(key, value);
	else if ( value == null )
		style[key] = '';
	// FIXME : IS_NON_DIMENSIONAL_REGEX -> Is it really necessary ?
	else if ( typeof value != "number" || _IS_NON_DIMENSIONAL_REGEX.test(key) )
		style[key] = value;
	else
		style[key] = value + 'px';
}

function _updateNodeRef ( node:VNode ) {
	node._ref && ( node._ref as IInternalRef )._setFromVNode( node as any )
}

// ----------------------------------------------------------------------------- DIFF ELEMENT

// FIXME : Doc
let _currentDiffingNode:VNode
export const _getCurrentDiffingNode = () => _currentDiffingNode

// FIXME : Doc
export function _setDomAttribute ( dom:Element, name:string, value:any ) {
	// className as class for non jsx components
	if ( name == "className" )
		name = "class"
	if ( value === false || value === null )
		dom.removeAttribute( name )
	else if ( value === true )
		dom.setAttribute( name, "" )
	// Manage style as object only
	else if ( name == "style" && typeof value == "object" ) {
		// https://esbench.com/bench/62ecb9866c89f600a5701b47
		Object.keys( value ).forEach(
			k => _setStyle( (dom as HTMLElement).style, k, value[k] )
		);
	}
	else {
		// Manage class as arrays
		if ( name == "class" && Array.isArray( value ) )
			value = value.flat( 1 ).filter( v => v !== true && !!v ).join(" ").trim()
		dom.setAttribute( name, value )
	}
}

/**
 * TODO DOC
 * @param newNode
 * @param oldNode
 * @param nodeEnv
 */
export function _diffElement ( newNode:VNode, oldNode:VNode, nodeEnv:INodeEnv ) {
	// TODO : DOC
	let dom:RenderDom
	if ( oldNode ) {
		dom = oldNode.dom
		if ( (
			newNode.type === 1/*TEXT*/ && oldNode.value !== newNode.value
			// If the whole component is re-rendered by any state change that is not a signal
			// We need to update all signal based text values
			|| newNode.type === 3/*STATE*/
		))
			dom.nodeValue = newNode.value as string
	}
	else {
		const { document } = nodeEnv as { document: Document }
		if ( newNode.type === 0/*NULL*/ )
			dom = document.createComment('')
		else if ( newNode.type === 1/*TEXT*/ || newNode.type === 3/*STATE*/ ) {
			_currentDiffingNode = newNode
			// If newNode is a state, createTextNode will call .toString() on the state
			// which will track the dependency
			dom = document.createTextNode( newNode.value as string )
		}
		else if ( newNode.type === 6/*ELEMENTS*/ ) {
			if ( newNode.value as string === "svg" )
				nodeEnv.isSVG = true
			dom = (
				nodeEnv.isSVG
				? document.createElementNS( _svgNS, newNode.value as string )
				: document.createElement( newNode.value as string )
			)
		}
	}
	if ( newNode.type === 0/*NULL*/ || newNode.type === 1/*TEXT*/ || newNode.type === 3/*STATE*/ )
		return dom
	else if ( newNode.type === 8/*LIST*/ ) {
		// FIXME : Check ?
		_diffChildren( newNode, oldNode, nodeEnv )
		return dom
	}
	// For typescript only, (FIXME : Check if removed from build)
	dom = dom as Element
	// Remove attributes which are removed from old node
	if ( oldNode ) for ( let name in oldNode.props ) {
		// Do not process children and remove only if not in new node
		if (
			["children", "key", "ref"].includes( name ) // FIXME : Check perfs vs code golfing here
			// name === "children" || name === "key" || name === "ref"
			|| (name in newNode.props && newNode.props[ name ] === oldNode.props[ name ])
		)
			continue;
		// Insert HTML directly without warning
		if ( name == "innerHTML" )
			dom.innerHTML = "" // FIXME : Maybe use delete or null ?
		// Events starts with "on". On preact this is optimized with [0] == "o"
		// But recent benchmarks are pointing to startsWith usage as faster
		else if ( name.startsWith("on") ) {
			const { eventName, eventKey, useCapture } = _getEventNameAndKey( name, dom );
			dom.removeEventListener( eventName, dom[ _DOM_PRIVATE_LISTENERS_KEY ][ eventKey ], useCapture )
		}
		// Other attributes
		else {
			dom.removeAttribute( name )
		}
	}
	// Update props
	for ( let name in newNode.props ) {
		let value = newNode.props[ name ];
		if (
			// Do not continue if value is undefined or null.
			// 	Undefined is checked here as a value, so no need for typeof check
			// 	It can happen when JSX source is pushing a props from an undefined value
			// Keep going if falsy to allow empty attributes
			value === undefined || value === null
			// Do not continue for "internal" attributes
			|| name === "children" || name === "key" || name === "ref"
			// Do not continue if attribute or event did not change
			|| ( oldNode && name in oldNode.props && oldNode.props[ name ] === value )
		)
			continue;
		// Insert HTML directly without warning
		if ( name === "innerHTML" )
			dom.innerHTML = value
		// Events starts with "on". On preact this is optimized with [0] == "o"
		// But recent benchmarks are pointing to startsWith usage as faster
		else if ( name.startsWith("on") ) {
			const { eventName, eventKey, useCapture } = _getEventNameAndKey( name, dom );
			// Init a collection of handlers on the dom object as private property
			if ( !dom[ _DOM_PRIVATE_LISTENERS_KEY ] )
				dom[ _DOM_PRIVATE_LISTENERS_KEY ] = new Map();
			// Store original listener to be able to remove it later
			dom[ _DOM_PRIVATE_LISTENERS_KEY ][ eventKey ] = value;
			// And attach listener
			dom.addEventListener( eventName, value, useCapture )
		}
		// Other attributes
		else {
			// If value is a state, track its changes by creating an "argument state" type of node
			if ( value !== null && typeof value === "object" && value.type === 3 ) {
				_currentDiffingNode = createVNode( 2/*ARGUMENT*/, value, null, name )
				_currentDiffingNode.dom = dom;
				value = value.value
			}
			// Set dom attribute on element
			_setDomAttribute( dom, name, value )
		}
	}
	return dom;
}

// ----------------------------------------------------------------------------- RECURSIVELY MOUNT / UNMOUNT

export function _diffAndMount ( newNode:VNode, oldNode:VNode, nodeEnv?:INodeEnv, forceUpdate = false ) {
	const finishHandlers = _dispatch(_featureHooks, null, 2/* DIFFING NODE */, newNode)
	if ( newNode ) {
		diffNode( newNode, oldNode, nodeEnv, forceUpdate )
		recursivelyUpdateMountState( newNode, true )
		_dispatch( finishHandlers );
	}
}

export function recursivelyUpdateMountState ( node:VNode, doMount:boolean ) {
	if ( node?.type === 7/*COMPONENTS*/ ) {
		// FIXME : Can optimize and code-golf this
		const { component } = node
		if ( component ) { // FIXME : Is this check usefull ?
			// First, we recursively mount children before mounting the parent component
			recursivelyUpdateMountState( component.children, doMount )
			// --- MOUNT
			if ( doMount && !component.isMounted ) {
				// Execute after render handlers
				component.isMounted = true;
				if ( node.value.isFactory !== false ) {
					// Call every mount handler and store returned unmount handlers
					// FIXME : Can we use _dispatch here ?
					const total = component._mountHandlers.length
					for ( let i = 0; i < total; ++i ) {
						const mountedReturn = component._mountHandlers[ i ].apply( component );
						// Allow mounted handler to return a single unmount
						if ( typeof mountedReturn === "function" )
							component._unmountHandlers.push( mountedReturn )
						// Allow mounted handler to return an array of unmount
						else if ( Array.isArray( mountedReturn ) )
							mountedReturn.filter( v => v ).map( h => component._unmountHandlers.push( h ) )
					}
					// Reset mount handlers, no need to keep them
					component._mountHandlers = []
					_dispatch( component._renderHandlers, component )
					_dispatch( component._nextRenderHandlers, component )
					component._nextRenderHandlers = []
				}
				_dispatch(_featureHooks, null, 1/* MOUNT / UNMOUNT */, component, true )
			}
			// --- UNMOUNT
			else if ( !doMount && component.isMounted ) {
				_dispatch(_featureHooks, null, 1/* MOUNT / UNMOUNT */, component, false )
				_dispatch(component._unmountHandlers, component)
				component.isMounted = false;
				// Cut component branch from virtual node to allow GC to destroy component
				delete node.component
				delete component.vnode
				// FIXME : Do we need to do this ? Is it efficient or is it just noise ?
				// delete component.vnode
				// delete component._mountHandlers;
				// delete component._renderHandlers;
				// delete component._unmountHandlers;
				// delete component._afterRenderHandlers;
				// delete component.methods
				// delete component._observables
				// TODO : Remove all listeners ?
			}
		}
	}
	else if ( node?.type > 4/*CONTAINERS*/ ) {
		const total = node.props.children.length
		for ( let i = 0; i < total; ++i )
			recursivelyUpdateMountState( node.props.children[ i ], doMount )
	}
}

// ----------------------------------------------------------------------------- DIFF CHILDREN

/**
 * TODO DOC
 * @param parentNode
 * @param childNode
 */
function _registerKey ( parentNode:VNode, childNode:VNode ) {
	if ( childNode.key ) {
		if ( !parentNode._keys )
			parentNode._keys = new Map<string, VNode>()
		parentNode._keys.set( childNode.key, childNode )
	}
}



// TODO : DOC
let _previousParentContainer:VNode
let _previousParentContainerDom:Element

/**
 * TODO DOC
 * @param newParentNode
 * @param oldParentNode
 * @param nodeEnv
 */
export function _diffChildren ( newParentNode:VNode, oldParentNode?:VNode, nodeEnv?:INodeEnv ) {
	// console.log( "_diffChildren", newParentNode, oldParentNode );
	// TODO : DOC
	let parentDom = (newParentNode.dom ?? _previousParentContainerDom) as Element
	// TODO : DOC
	// FIXME : Why do we have to keep both node and dom ?
	_previousParentContainer = newParentNode
	_previousParentContainerDom = _previousParentContainer.dom as Element
	// TODO : DOC
	// No old parent node, or empty old parent node, we inject directly without checks.
	// FIXME : This optim may not work if list not only child
	// if ( !oldParentNode )
	// Target children lists
	const newChildren = newParentNode.props.children
	const total = newChildren.length
	if ( !oldParentNode || oldParentNode.props.children.length === 0 ) {
		for ( let i = 0; i < total; ++i ) {
			const child = newChildren[ i ]
			diffNode( child, null, nodeEnv )
			_registerKey( newParentNode, child )
			child.dom && parentDom.appendChild( child.dom )
		}
		return
	}
	const oldChildren = oldParentNode.props.children
	// If we are on a list which has been cleared
	// And this list is the only child of its parent node
	// We can take a shortcut and clear dom with innerHTML
	if (
		newParentNode.type === 8/*LIST*/
		&& oldParentNode
		&& _previousParentContainer.props.children.length === 0
		&& newChildren.length === 0
		&& oldChildren.length > 0
	) {
		// FIXME : Check if unmount is correct ? Order ? Events ?
		recursivelyUpdateMountState( oldParentNode, false )
		parentDom.innerHTML = ''
		return;
	}
	// Register keys of new children to detect changes without having to search
	if ( !total ) return;
	let i:number
	for ( i = 0; i < total; ++i )
		_registerKey( newParentNode, newChildren[ i ] )
	// Browse all new nodes
	const oldParentKeys = oldParentNode._keys
	let collapseCount = 0
	for ( i = 0; i < total; ++i ) {
		// Collapsed corresponding index between old and new nodes
		// To be able to detect moves or if just collapsing because a top sibling
		// has been removed
		const newChildNode = newChildren[ i ]
		if ( !newChildNode )
			continue;
		let oldChildNode:VNode = oldChildren[ i ]
		if (
			oldChildNode
			&& oldChildNode.key
			&& newParentNode._keys
			&& !newParentNode._keys.has( oldChildNode.key )
		) {
			++collapseCount
		}
		// Has key, same key found in old, same type on both
		/** MOVE & UPDATE KEYED CHILD **/
		if (
			newChildNode.key
			// FIXME : OPTIM - Maybe do a has before the get ?
			&& ( oldChildNode = oldParentKeys?.get( newChildNode.key ) )
			&& oldChildNode.type === newChildNode.type
			&& (
				newChildNode.type !== 6/*ELEMENTS*/
				|| oldChildNode.value === newChildNode.value
			)
		) {
			// console.log("move keyed", newChildNode, oldChildNode)
			diffNode( newChildNode, oldChildNode, nodeEnv )
			oldChildNode._keep = true;
			// Check if index changed, compare with collapsed index to detect moves
			const collapsedIndex = i + collapseCount
			// FIXME : Should do 1 operation when swapping positions, not 2
			// FIXME : Perf, is indexOf quick ? Maybe store every indexes in an array ?
			if ( oldChildren.indexOf( oldChildNode ) !== collapsedIndex )
				parentDom.insertBefore( newChildNode.dom, parentDom.children[ collapsedIndex + 1 ] )
		}
		// Has key, but not found in old
		/** CREATE HAS KEY**/
		// FIXME : OPTIM - Maybe do a has before the get ?
		else if ( newChildNode.key && oldParentKeys && !oldParentKeys.get( newChildNode.key ) ) {
			// console.log("create from key", newChildNode)
			diffNode( newChildNode, null, nodeEnv )
			parentDom.insertBefore( newChildNode.dom, parentDom.children[ i ] )
			--collapseCount
		}
		// Found at same index, with same type.
		// Old node does not have a key.
		/** UPDATE IN PLACE **/
		else if (
			i in oldChildren
			&& ( oldChildNode = oldChildren[ i ] )
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
			// console.log("update in place", newChildNode, oldChildNode)
			diffNode( newChildNode, oldChildNode, nodeEnv )
			oldChildNode._keep = true;
		}
		// Not found
		/** CREATE **/
		else {
			// console.log("create no key", newChildNode)
			diffNode( newChildNode, null, nodeEnv )
			parentDom.insertBefore( newChildNode.dom, parentDom.children[ i ] )
			--collapseCount
		}
	}
	// Remove old children which are not reused
	const totalOld = oldChildren.length
	for ( i = 0; i < totalOld; ++i ) {
		const oldChildNode = oldChildren[ i ]
		if ( oldChildNode && !oldChildNode._keep ) {
			// Call unmount handlers
			recursivelyUpdateMountState( oldChildNode, false );
			// Remove ref
			const { dom } = oldChildNode
			oldChildNode.dom = null;
			_updateNodeRef( oldChildNode )
			if (dom) // Sometimes it is not valid. Why ? HMR ?
				parentDom.removeChild( dom )
		}
	}
}

// ----------------------------------------------------------------------------- DIFF NODE

function _renderComponentNode <GReturn = ComponentReturn> ( node:VNode<any, ComponentFunction> ) :GReturn {
	// Select current component before rendering
	_currentComponent = node.component;
	// Only on factory components
	// we create a proxy for props which will update a state for dependency tracking
	if ( node.value.isFactory !== false ) {
		// Create the props proxy with its state
		if ( !_currentComponent._proxy ) {
			// Create prop states to track dependencies
			// We give _p quietly so HMR will know this is a prop state,
			// that shouldn't be kept between refreshes
			// @ts-ignore
			const s = state( node.props, { _p: true } )
			_currentComponent._propState = s
			// Create proxy and map getter to the state to track effects
			// FIXME : Proxy is not browsable :(
			const proxy = Proxy.revocable( {}, {
				get : ( target, prop ) => Reflect.get( s.value, prop )
			})
			// Associate proxy to component and dispose proxy on component unmount
			_currentComponent._proxy = proxy.proxy
			_currentComponent._unmountHandlers.push( proxy.revoke )
		}
		// FIXME : Can't we ovoid that check ?
		// else //if ( props !== _currentComponent._propStates.peek() )
		// 	_currentComponent._propState.set( node.props )
	}
	// Render component with props instance and component API instance
	let result = _currentComponent._render.apply(
		_currentComponent, [ _currentComponent._proxy ?? node.props, _currentComponent ] // FIXME : Add component or ref as second argument
	)
	// Keep _currentComponent, we'll unselect it later on purpose.
	return result as GReturn
}

export function diffNode ( newNode:VNode, oldNode?:VNode, nodeEnv:INodeEnv = newNode._nodeEnv, forceUpdate = false ) {
	// console.log('diffNode', newNode, oldNode)
	// IMPORTANT : Here we clone node if we got the same instance
	// 			   Otherwise, altering props.children after render will fuck everything up
	// Clone identical nodes to be able to diff them
	if ( oldNode && oldNode === newNode )
		newNode = cloneVNode( oldNode )
	// Transfer id for refs
	if ( oldNode && oldNode._id )
		newNode._id = oldNode._id
	// Create / update DOM element for those node types
	if (
		newNode.type === 0/*NULL*/
		|| newNode.type === 1/*TEXT*/
		|| newNode.type === 3/*STATE*/
		|| newNode.type === 6/*ELEMENTS*/
	) {
		// Clone node env for children, to avoid env to propagate on siblings
		nodeEnv = Object.assign({}, nodeEnv)
		// Compute dom element for this node
		newNode.dom = _diffElement( newNode, oldNode, nodeEnv )
		_currentDiffingNode = null
	}
	// Diff component node
	else if ( newNode.type === 7/*COMPONENTS*/ ) {
		// Transfer component instance from old node to new node
		let component:ComponentInstance = oldNode?.component
		// Check if we need to instantiate component
		let renderResult:VNode
		if ( !component ) {
			// Create component instance (without new keyword for better performances)
			component = _createComponentInstance( newNode as VNode<object, ComponentFunction> )
			newNode.component = component
			component._render = newNode.value as RenderFunction
			// Execute component's function and check what is returned
			const result = _renderComponentNode( newNode as VNode<object, ComponentFunction> )
			// This is a factory component which return a render function
			if ( typeof result === "function" ) {
				newNode.value.isFactory = true
				component._render = result as RenderFunction
			}
			// This is pure functional component which returns a virtual node
			else if ( typeof result === "object" && "type" in result ) {
				newNode.value.isFactory = false
				component._render = newNode.value as RenderFunction
				renderResult = result
			}
		}
		// Keep old component instance
		else {
			newNode.component = component
			component.vnode = newNode as VNode<object, ComponentFunction>
		}
		// Here we check if this component should update
		// By default, we always update component on refreshes
		let shouldUpdate = true
		if ( !forceUpdate && !renderResult && oldNode ) {
			// We check should update on functional and factory components
			shouldUpdate = (
				// Use shouldUpdate function on component API
				component._shouldUpdate
				? component._shouldUpdate( newNode.props, oldNode.props )
				// Otherwise shallow props compare with children check
				: !shallowPropsCompare( newNode.props, oldNode.props, true )
			)
			// Otherwise, if we should update a factory component
			if ( shouldUpdate && component.vnode.value.isFactory === true ) {
				// Do not continue regular update, update props on state
				// and let the state update its dependencies
				component._propState.set({
					...component._defaultProps,
					...newNode.props
				})
				// We rendered with a state change
				// do not continue regular update with a render
				shouldUpdate = false
			}
			// Keep dom reference from old node if we should not update
			if ( !shouldUpdate )
				newNode.dom = oldNode.dom
		}
		// If this component needs a render (factory function), render it
		if ( !renderResult && shouldUpdate )
			renderResult = _renderComponentNode<VNode>( newNode as VNode<object, ComponentFunction> )
		// We rendered something (not reusing old component)
		if ( renderResult ) {
			diffNode( renderResult, component.children, nodeEnv )
			component.children = renderResult
			newNode.dom = renderResult.dom
		}
		// We can clear component now
		_currentComponent = null
	}
	// Inject node env into node, now that it has been diffed and rendered
	if ( !newNode._nodeEnv )
		newNode._nodeEnv = nodeEnv
	// Update ref on node
	_updateNodeRef( newNode )
	// Diff children for node that are containers and not components
	if ( newNode.type > 4/*CONTAINERS*/ )
		_diffChildren( newNode, oldNode, nodeEnv )
}