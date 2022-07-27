// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"cuBJf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/// <reference lib="dom" />
// ----------------------------------------------------------------------------- IMPORT / EXPORT
/**
 * REFLEX JS
 *
 * - Reflex Core
 * 		- Core
 * 		- Polyfills
 * 		- Signal + Observer
 * 		- YADL
 * 		- Utils
 * - Reflex Components
 * 		- Reflex View (vdom + web components)
 * 		- Reflex Store
 * 			- Regular store / Async store or one big store well-made
 * 		- Reflex Router
 * 			- Based on Reflex Store
 * 		- Reflex Tween ?
 *		- Reflex Toolkit
 *			- Hooks
 *			- Responsive
 *			- Inputs
 *			- Cursor
 *			- Sound
 *			- Viewport
 *		- Reflex UI Kit
 *			- mixins
 *			- UI Kit
 *			- Components ( Slideshow / Menu / Player ... )
 * - Reflex Server
 *
 */ /**
 * FEATURES :
 *
 * - Basic v-dom
 * 	 ✔ Create / remove elements
 * 	 ✔ Set / remove attributes
 * 	 ✔ Set / remove event listeners
 * 	 ✔ Reuse previous components, do not trash everything everytime
 * 	 ✔ innerHTML
 *   ✔ Class as string or array filtered with booleans
 *   	- Optimize class when does not changes, is it possible ?
 *   ✔ Style as object only
 *   	- Optimize style when does not changes, is it possible ?
 *
 * - Advanced v-dom
 *   ✔ Move elements and keep track of dom elements with keyed virtual nodes
 *   	✔ Add to top
 *   	✔ Add to bottom
 *   	✔ Remove from top
 *   	✔ Remove from bottom
 *   	✔ Insert in the middle
 *      ✔ Remove from the middle
 *      ✔ Basic swap
 *  	X Optimized Swap
 *  		- Do 2 operations, should do only one
 *   ✔ Keep track of component instances
 *   ✔ Remove subtrees recursively
 *   ✔ Sub tree rendering
 *   ✔ Rendering optimization (like memo and skip)
 *
 * - Reactive
 *   ✔ Dom ref / component ref
 *   ✔ Factory helpers (like hooks), find name and prefix
 *   ✔ Var in ref as let ! Yeah
 *   ✔ States / observers
 *   ✔ Stores
 *   ✔ Mount / Unmount
 *   ✔ Updated + Props
 *
 * - Advanced Reactive
 *   - Multi refs in for loops and stuff, need to keep correct indexes even when moving
 *   - Factory Errors / Component errors ( try catch on instance + render etc )
 *   - Async states ! With cancellation
 *   - Fetch hook with race condition management + states + cache + cancellable
 *   - Imperative handles
 *
 * - Types
 * 	 - Basic JSX Type
 * 	 - Render and component return JSX Types
 * 	 - Props types
 *
 * - Release
 * 	 - Optimize
 * 	 - Benchmark
 * 	 - Docs
 * 	 - Release
 *
 * V2 :
 * - Advanced Hot Module reloading with state keeping automagically
 */ // NOTE : Avoid glob exports from which insert an helper
// Unzipped is smaller with glob but bigger when zipped
parcelHelpers.export(exports, "state", ()=>(0, _states.state));
parcelHelpers.export(exports, "syncState", ()=>(0, _states.syncState));
parcelHelpers.export(exports, "getCurrentComponent", ()=>(0, _diff.getCurrentComponent));
parcelHelpers.export(exports, "ref", ()=>(0, _ref.ref));
parcelHelpers.export(exports, "refs", ()=>(0, _ref.refs));
parcelHelpers.export(exports, "mounted", ()=>(0, _lifecycle.mounted));
parcelHelpers.export(exports, "unmounted", ()=>(0, _lifecycle.unmounted));
parcelHelpers.export(exports, "changed", ()=>(0, _lifecycle.changed));
parcelHelpers.export(exports, "render", ()=>(0, _render.render));
parcelHelpers.export(exports, "invalidateComponent", ()=>(0, _render.invalidateComponent));
// Also export createElement for JSX pragma React
parcelHelpers.export(exports, "h", ()=>(0, _jsx.h)) /**
 * http://localhost:1234/4-store-list-demo/index.html
 * plugged
 * Root rendering 0ms
 * index.4f0fe1bd.js:1317 Update dirty components 730ms
 * index.4f0fe1bd.js:1317 Update dirty components 170ms
 * index.4f0fe1bd.js:1317 Update dirty components 660ms
 * index.4f0fe1bd.js:1317 Update dirty components 150ms
 * index.4f0fe1bd.js:1317 Update dirty components 640ms
 * index.4f0fe1bd.js:1317 Update dirty components 150ms
 */ ;
parcelHelpers.export(exports, "createElement", ()=>(0, _jsx.h));
var _states = require("./states");
var _diff = require("./diff");
var _ref = require("./ref");
var _lifecycle = require("./lifecycle");
var _render = require("./render");
var _jsx = require("./jsx");

},{"./states":"jPtHd","./diff":"6sa8r","./ref":"fdaPH","./lifecycle":"8Qw9Y","./render":"krTG7","./jsx":"beq5O","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"jPtHd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// TODO : Merge async and sync states with an option second argument
parcelHelpers.export(exports, "state", ()=>state);
parcelHelpers.export(exports, "syncState", ()=>syncState);
var _common = require("./common");
var _diff = require("./diff");
// import { addDataListenerForNextNode } from "./jsx";
var _render = require("./render");
function state(initialValue, filter, afterChange) {
    initialValue = (0, _common._prepareInitialValue)(initialValue);
    const component = (0, _diff.getCurrentComponent)();
    // const affectedNodesIndex = component._affectedNodesByStates.push([]) - 1
    return {
        get value () {
            // if ( component._isRendering ) {
            // 	addDataListenerForNextNode( node => {
            // 		console.log('>', component._affectedNodesByStates[affectedNodesIndex].length, node)
            // 		component._affectedNodesByStates[affectedNodesIndex].push( node )
            // 	})
            // }
            return initialValue;
        },
        set value (newValue){
            initialValue = filter ? filter(newValue, initialValue) : newValue;
            (0, _render.invalidateComponent)(component);
            afterChange && component._afterRenderHandlers.push(()=>afterChange(initialValue));
        },
        async set (newValue) {
            return new Promise((resolve)=>{
                newValue = (0, _common._prepareInitialValue)(newValue, initialValue);
                initialValue = filter ? filter(newValue, initialValue) : newValue;
                component._afterRenderHandlers.push(()=>{
                    resolve();
                    afterChange && afterChange(initialValue);
                });
                (0, _render.invalidateComponent)(component);
            });
        }
    };
}
function syncState(initialValue, filter) {
    initialValue = (0, _common._prepareInitialValue)(initialValue);
    const component = (0, _diff.getCurrentComponent)();
    // const affectedNodesIndex = component._affectedNodesByStates.push([]) - 1
    return {
        get value () {
            // if ( component._isRendering ) {
            // 	addDataListenerForNextNode( node => {
            // 		console.log('>', component._affectedNodesByStates[affectedNodesIndex].length, node)
            // 		component._affectedNodesByStates[affectedNodesIndex].push( node )
            // 	})
            // }
            return initialValue;
        },
        set value (newValue){
            initialValue = filter ? filter(newValue, initialValue) : newValue;
            (0, _diff._diffNode)(component.vnode, component.vnode);
        }
    };
}

},{"./common":"8NUdO","./diff":"6sa8r","./render":"krTG7","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"8NUdO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_prepareInitialValue", ()=>_prepareInitialValue);
parcelHelpers.export(exports, "_VNodeTypes_NULL", ()=>_VNodeTypes_NULL);
parcelHelpers.export(exports, "_VNodeTypes_TEXT", ()=>_VNodeTypes_TEXT);
parcelHelpers.export(exports, "_VNodeTypes_CONTAINERS", ()=>_VNodeTypes_CONTAINERS);
parcelHelpers.export(exports, "_VNodeTypes_ROOT", ()=>_VNodeTypes_ROOT);
parcelHelpers.export(exports, "_VNodeTypes_ELEMENT", ()=>_VNodeTypes_ELEMENT);
parcelHelpers.export(exports, "_VNodeTypes_COMPONENT", ()=>_VNodeTypes_COMPONENT);
parcelHelpers.export(exports, "_VNodeTypes_LIST", ()=>_VNodeTypes_LIST);
const _prepareInitialValue = (initialValue, oldValue)=>typeof initialValue == "function" ? initialValue(oldValue) : initialValue;
const _VNodeTypes_NULL = 0;
const _VNodeTypes_TEXT = 1;
const _VNodeTypes_CONTAINERS = 4;
const _VNodeTypes_ROOT = 5;
const _VNodeTypes_ELEMENT = 6;
const _VNodeTypes_COMPONENT = 7;
const _VNodeTypes_LIST = 8;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"j7FRh":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"6sa8r":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_DOM_PRIVATE_VIRTUAL_NODE_KEY", ()=>_DOM_PRIVATE_VIRTUAL_NODE_KEY);
parcelHelpers.export(exports, "_DOM_PRIVATE_LISTENERS_KEY", ()=>_DOM_PRIVATE_LISTENERS_KEY);
parcelHelpers.export(exports, "getCurrentComponent", ()=>getCurrentComponent);
// ----------------------------------------------------------------------------- DIFF ELEMENT
/**
 *
 * @param newNode
 * @param oldNode
 */ parcelHelpers.export(exports, "_diffElement", ()=>_diffElement);
/**
 * TODO DOC
 * @param newParentNode
 * @param oldParentNode
 */ parcelHelpers.export(exports, "_diffChildren", ()=>_diffChildren);
// ----------------------------------------------------------------------------- DIFF NODE
parcelHelpers.export(exports, "_renderComponentNode", ()=>_renderComponentNode);
parcelHelpers.export(exports, "_diffNode", ()=>_diffNode);
var _common = require("./common");
var _jsx = require("./jsx");
var _component = require("./component");
var _props = require("./props");
const _DOM_PRIVATE_VIRTUAL_NODE_KEY = "__v";
const _DOM_PRIVATE_LISTENERS_KEY = "__l";
// Stolen from Preact, to check if a style props is non-dimensional (does not need to add a unit)
const _IS_NON_DIMENSIONAL_REGEX = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
// Check if an event is a capture one
const _CAPTURE_REGEX = /Capture$/;
// ----------------------------------------------------------------------------- CURRENT SCOPED COMPONENT
// We store current component in factory phase for hooks
let _currentComponent = null;
function getCurrentComponent() {
    return _currentComponent;
}
// ----------------------------------------------------------------------------- COMMON
function getEventNameAndKey(name, dom) {
    // Note : Capture management stolen from Preact, thanks
    const useCapture = name !== (name = name.replace(_CAPTURE_REGEX, ""));
    // Infer correct casing for DOM built-in events:
    const eventName = (name.toLowerCase() in dom ? name.toLowerCase() : name).slice(2);
    // Create unique key for this event
    const eventKey = eventName + (useCapture ? "C" : "");
    return {
        eventName,
        eventKey,
        useCapture
    };
}
// Stolen from Preact, attach some style à key / value to a dom element
function setStyle(style, key, value) {
    if (key[0] === "-") style.setProperty(key, value);
    else if (value == null) style[key] = "";
    else if (typeof value != "number" || _IS_NON_DIMENSIONAL_REGEX.test(key)) style[key] = value;
    else style[key] = value + "px";
}
function updateNodeRef(node) {
    node._ref && node._ref._setFromVNode(node);
}
function _diffElement(newNode, oldNode) {
    // TODO : DOC
    let dom;
    if (oldNode) {
        dom = oldNode.dom;
        if (newNode.type === (0, _common._VNodeTypes_TEXT) && oldNode.value !== newNode.value) dom.nodeValue = newNode.value;
    } else {
        if (newNode.type === (0, _common._VNodeTypes_NULL)) dom = document.createComment("");
        else if (newNode.type === (0, _common._VNodeTypes_TEXT)) dom = document.createTextNode(newNode.value);
        else if (newNode.type === (0, _common._VNodeTypes_ELEMENT)) dom = document.createElement(newNode.value);
    }
    if (newNode.type === (0, _common._VNodeTypes_TEXT) || newNode.type === (0, _common._VNodeTypes_NULL)) return dom;
    else if (newNode.type === (0, _common._VNodeTypes_LIST)) {
        // FIXME : Check ?
        _diffChildren(newNode, oldNode);
        return dom;
    }
    dom;
    // Remove attributes which are removed from old node
    if (oldNode) for(let name in oldNode.props){
        // Do not process children and remove only if not in new node
        if (name == "children") continue;
        if (name in newNode.props && newNode.props[name] === oldNode.props[name]) continue;
        // Insert HTML directly without warning
        if (name == "innerHTML") dom.innerHTML = "" // FIXME : Maybe use delete or null ?
        ;
        else if (name.startsWith("on")) {
            const { eventName , eventKey , useCapture  } = getEventNameAndKey(name, dom);
            dom.removeEventListener(eventName, dom[_DOM_PRIVATE_LISTENERS_KEY][eventKey], useCapture);
        } else dom.removeAttribute(name);
    }
    // Update props
    for(let name1 in newNode.props){
        let value = newNode.props[name1];
        if (name1 == "children" || !value) continue;
        // Do not continue if attribute or event did not change
        if (oldNode && name1 in oldNode.props && oldNode.props[name1] === value) continue;
        // Insert HTML directly without warning
        if (name1 == "innerHTML") dom.innerHTML = value;
        else if (name1.startsWith("on")) {
            const { eventName , eventKey , useCapture  } = getEventNameAndKey(name1, dom);
            // Init a collection of handlers on the dom object as private property
            if (!dom[_DOM_PRIVATE_LISTENERS_KEY]) dom[_DOM_PRIVATE_LISTENERS_KEY] = new Map();
            // Store original listener to be able to remove it later
            dom[_DOM_PRIVATE_LISTENERS_KEY][eventKey] = value;
            // And attach listener
            dom.addEventListener(eventName, value, useCapture);
        } else {
            // className as class for non jsx components
            if (name1 == "className") name1 = "class";
            // Manage class as arrays
            if (name1 == "class" && Array.isArray(value)) value = value.filter((v)=>v !== true && !!v).join(" ").trim();
            else if (name1 == "style" && typeof value == "object") {
                // FIXME : Can it be optimized ? Maybe only setStyle when needed ?
                Object.keys(value).forEach((k)=>setStyle(dom.style, k, value[k]));
                continue;
            }
            // FIXME : What about checked / disabled / autoplay ...
            dom.setAttribute(name1, value === true ? "" : value);
        }
    }
    return dom;
}
// ----------------------------------------------------------------------------- DIFF CHILDREN
/**
 * TODO DOC
 * @param parentNode
 * @param childNode
 */ function registerKey(parentNode, childNode) {
    if (childNode.key) {
        if (!parentNode._keys) parentNode._keys = new Map();
        parentNode._keys.set(childNode.key, childNode);
    }
}
/**
 * TODO DOC
 * @param parentDom
 * @param node
 */ function injectChildren(parentDom, node) {
    let childIndex = -1;
    const totalChildren = node.props.children.length;
    while(++childIndex < totalChildren){
        const child = node.props.children[childIndex];
        _diffNode(child, null);
        registerKey(node, child);
        if (child.dom) parentDom.appendChild(child.dom);
    }
}
// TODO : DOC
let previousParentContainer;
let previousParentContainerDom;
function _diffChildren(newParentNode, oldParentNode) {
    // console.log( "_diffChildren", newParentNode, oldParentNode );
    // TODO : DOC
    let parentDom = newParentNode.dom ?? previousParentContainerDom;
    // TODO : DOC
    // FIXME : Why do we have to keep both node and dom ?
    previousParentContainer = newParentNode;
    previousParentContainerDom = previousParentContainer.dom;
    // TODO : DOC
    // No old parent node, or empty old parent node, we inject directly without checks.
    // FIXME : This optim may not work if list not only child
    // if ( !oldParentNode )
    if (!oldParentNode || oldParentNode.props.children.length === 0) return injectChildren(parentDom, newParentNode);
    // Target children lists
    const newChildren = newParentNode.props.children;
    const oldChildren = oldParentNode.props.children;
    // If we are on a list which has been cleared
    // And this list is the only child of its parent node
    // We can take a shortcut and clear dom with innerHTML
    if (newParentNode.type === (0, _common._VNodeTypes_LIST) && oldParentNode && previousParentContainer.props.children.length === 0 && newChildren.length === 0 && oldChildren.length > 0) {
        // FIXME : Check if unmount is correct ? Order ? Events ?
        (0, _component._recursivelyUpdateMountState)(oldParentNode, false);
        parentDom.innerHTML = "";
        return;
    }
    // Register keys of new children to detect changes without having to search
    // FIXME : Check perfs with a simple foreach
    // newChildren.forEach( child => registerKey( newParentNode, child ) )
    const total = newChildren.length;
    if (total === 0) return;
    let i = 0;
    do registerKey(newParentNode, newChildren[i]);
    while (++i < total);
    // Browse all new nodes
    const oldParentKeys = oldParentNode._keys;
    let collapseCount = 0;
    i = 0;
    do {
        // Collapsed corresponding index between old and new nodes
        // To be able to detect moves or if just collapsing because a top sibling
        // has been removed
        const newChildNode = newChildren[i];
        if (!newChildNode) continue;
        let oldChildNode = oldChildren[i];
        if (oldChildNode && oldChildNode.key && newParentNode._keys && !newParentNode._keys.has(oldChildNode.key)) collapseCount++;
        // Has key, same key found in old, same type on both
        /** MOVE & UPDATE KEYED CHILD **/ if (newChildNode.key && (oldChildNode = oldParentKeys?.get(newChildNode.key)) && oldChildNode.type === newChildNode.type && (newChildNode.type === (0, _common._VNodeTypes_ELEMENT) ? oldChildNode.value === newChildNode.value : true)) {
            // console.log("move keyed", newChildNode, oldChildNode)
            _diffNode(newChildNode, oldChildNode);
            oldChildNode._keep = true;
            // Check if index changed, compare with collapsed index to detect moves
            const collapsedIndex = i + collapseCount;
            // FIXME : Should do 1 operation when swapping positions, not 2
            // FIXME : Perf, is indexOf quick ? Maybe store every indexes in an array ?
            if (oldChildren.indexOf(oldChildNode) != collapsedIndex) parentDom.insertBefore(newChildNode.dom, parentDom.children[collapsedIndex + 1]);
        } else if (newChildNode.key && oldParentKeys && !oldParentKeys.get(newChildNode.key)) {
            // console.log("create from key", newChildNode)
            _diffNode(newChildNode);
            parentDom.insertBefore(newChildNode.dom, parentDom.children[i]);
            collapseCount--;
        } else if (i in oldChildren && (oldChildNode = oldChildren[i]) && oldChildNode.type === newChildNode.type && (newChildNode.type === (0, _common._VNodeTypes_ELEMENT) ? oldChildNode.value === newChildNode.value : true)) {
            // console.log("update in place", newChildNode, oldChildNode)
            _diffNode(newChildNode, oldChildNode);
            oldChildNode._keep = true;
        } else {
            // console.log("create no key", newChildNode)
            _diffNode(newChildNode);
            parentDom.insertBefore(newChildNode.dom, parentDom.children[i]);
            collapseCount--;
        }
    }while (++i < total);
    // Remove old children which are not reused
    // FIXME : Faster loop ? Test with simple forEach
    // for ( const oldChildNode of oldChildren ) {
    const totalOld = oldChildren.length;
    if (total === 0) return;
    i = 0;
    do {
        const oldChildNode = oldChildren[i];
        if (oldChildNode && !oldChildNode._keep) {
            // Call unmount handlers
            (0, _component._recursivelyUpdateMountState)(oldChildNode, false);
            // Remove ref
            const { dom  } = oldChildNode;
            oldChildNode.dom = null;
            updateNodeRef(oldChildNode);
            parentDom.removeChild(dom);
        }
    }while (++i < totalOld);
}
function _renderComponentNode(node) {
    // Select current component before rendering
    _currentComponent = node._component;
    // FIXME: Before render handlers ?
    // FIXME: Optimize rendering with a hook ?
    // Execute rendering
    _currentComponent._isRendering = true;
    // Use regular ref and do not use proxy if we are sure we are on a functional component
    let props = node.props;
    // @ts-ignore - FIXME : Type
    // if ( !node.value.isFunctional && _currentComponent.isFactory ) {
    if (_currentComponent._propsProxy) {
        _currentComponent._propsProxy.set(node.props);
        props = _currentComponent._propsProxy.proxy;
    }
    // TODO : Add ref as second argument ? Is it useful ?
    const result = _currentComponent._render.apply(_currentComponent, [
        props,
        _currentComponent._componentAPI
    ]);
    _currentComponent._isRendering = false;
    // Unselect current component
    _currentComponent = null;
    return result;
}
function _diffNode(newNode, oldNode) {
    // IMPORTANT : Here we clone node if we got the same instance
    // 			   Otherwise, altering props.children after render will fuck everything up
    // Clone identical nodes to be able to diff them
    if (oldNode && oldNode === newNode) newNode = (0, _jsx._cloneVNode)(oldNode);
    // Transfer id for refs
    if (oldNode && oldNode._id) newNode._id = oldNode._id;
    // Create / update DOM element for those node types
    if (// FIXME : Create a set of number ? Or bitwise checking ? check perfs
    newNode.type === (0, _common._VNodeTypes_TEXT) || newNode.type === (0, _common._VNodeTypes_ELEMENT) || newNode.type === (0, _common._VNodeTypes_NULL)) newNode.dom = _diffElement(newNode, oldNode);
    else if (newNode.type === (0, _common._VNodeTypes_COMPONENT)) {
        // Transfer component instance from old node to new node
        let component = oldNode?._component;
        // Check if we need to instantiate component
        let renderResult;
        if (!component) {
            // Create component instance (without new keyword for better performances)
            component = (0, _component._createComponentInstance)(newNode);
            newNode._component = component;
            component._render = newNode.value;
            // Execute component's function and check what is returned
            const result = _renderComponentNode(newNode);
            // This is a factory component which return a render function
            if (typeof result == "function") {
                component._render = result;
                component.isFactory = true;
                // @ts-ignore - FIXME : Type
                newNode.value.isFunctional = false;
            } else if (typeof result == "object" && "type" in result) {
                component._render = newNode.value;
                component.isFactory = false;
                // @ts-ignore - FIXME : Type
                newNode.value.isFunctional = true;
                renderResult = result;
            }
        } else {
            newNode._component = component;
            component.vnode = newNode;
        }
        // TODO : DOC - Optim should update
        let shouldUpdate = true;
        if (!renderResult && oldNode && !component.isFactory) {
            if (component._componentAPI.shouldUpdate) shouldUpdate = component._componentAPI.shouldUpdate(newNode.props, oldNode.props);
            else // Copy new props to a new object
            // TODO : DOC
            // let newProps = Object.assign({}, newNode.props)
            // if ( !newProps.children )
            // 	newProps.children = oldNode.props.children
            // console.log(newProps, oldNode.props)
            shouldUpdate = (0, _props.shallowPropsCompare)(newNode.props, oldNode.props);
            // console.log("SHOULD UPDATE", newNode, oldNode, shouldUpdate)
            // TODO : DOC
            if (!shouldUpdate) {
                newNode.props.children = oldNode.props.children;
                newNode.dom = oldNode.dom;
            }
        }
        // If this component needs a render (factory function), render it
        if (!renderResult && shouldUpdate) renderResult = _renderComponentNode(newNode);
        // TODO : Cross assign node to component
        // We rendered something (not reusing old component)
        if (renderResult) {
            _diffNode(renderResult, oldNode?.props.children[0]);
            newNode.dom = renderResult.dom;
            newNode.props.children = [
                renderResult
            ];
        }
    }
    // Update ref on node
    updateNodeRef(newNode);
    // Now that component and its children are ready
    if (newNode.type === (0, _common._VNodeTypes_COMPONENT)) {
        // If component is not mounted yet, mount it recursively
        if (!newNode._component.isMounted) (0, _component._recursivelyUpdateMountState)(newNode, true);
        // Execute after render handlers
        newNode._component._renderHandlers.forEach((h)=>h());
    } else if (newNode.type > (0, _common._VNodeTypes_CONTAINERS)) _diffChildren(newNode, oldNode);
}

},{"./common":"8NUdO","./jsx":"beq5O","./component":"jK9Qg","./props":"bJNzu","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"beq5O":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addDataListenerForNextNode", ()=>addDataListenerForNextNode);
// NOTE : Keep it in a function and do not inline this
// It seems to be V8 optimized. @see Preact source code
parcelHelpers.export(exports, "_createVNode", ()=>_createVNode);
parcelHelpers.export(exports, "_cloneVNode", ()=>_cloneVNode);
parcelHelpers.export(exports, "h", ()=>h) // TRACKING TEST
 /*
let $ = []
let a = 0

h('div', {}, [
	h('h1', {className: $}, [ 	// -> h1
		"Content ", $			// -> h1
	]),
	h('ul', {}, $.map( a => a )),// -> ul
	h('p', {}, [$]),			// -> p
	a ? $ : null				// -> div
])
*/ ;
var _common = require("./common");
// FIXME : Is it an array ? Maybe its working as single prop
let _dataListenersForNextNode = [];
function addDataListenerForNextNode(listener) {
    _dataListenersForNextNode.push(listener);
}
function triggerDataListenerForNode(node) {
    _dataListenersForNextNode.forEach((handler)=>handler(node));
    _dataListenersForNextNode = [];
}
function _createVNode(type, value = null, props = {}, key, _ref) {
    const node = {
        type,
        value,
        props,
        key,
        _ref
    };
    // triggerDataListenerForNode( node )
    return node;
}
function _cloneVNode(vnode) {
    const newNode = Object.assign({}, vnode);
    // IMPORTANT : also clone props object
    newNode.props = Object.assign({}, vnode.props);
    // triggerDataListenerForNode( newNode )
    return newNode;
}
function h(value, props, ...children) {
    // Init props as empty object here and not in signature
    // Because jsx may pass null as argument
    if (props == null) props = {};
    // Target children, do not merge, we do not allow usage of both children arrays
    props.children = props.children ? props.children : children;
    // Browse children to patch types
    let childIndex = props.children.length;
    while(childIndex--){
        const child = props.children[childIndex];
        const typeofChild = typeof child;
        // Detect text nodes
        if (typeofChild === "string" || typeofChild === "number") props.children[childIndex] = _createVNode((0, _common._VNodeTypes_TEXT), child);
        else if (Array.isArray(child)) props.children[childIndex] = _createVNode((0, _common._VNodeTypes_LIST), null, {
            children: child
        });
        else if (child === null) props.children[childIndex] = _createVNode((0, _common._VNodeTypes_NULL));
    }
    // Virtual node type here can be only component or element
    // Other types are created elsewhere
    const type = typeof value === "function" ? (0, _common._VNodeTypes_COMPONENT) : (0, _common._VNodeTypes_ELEMENT);
    // Create and return the virtual node
    return _createVNode(type, value, props, props.key, props.ref);
}

},{"./common":"8NUdO","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"jK9Qg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// ----------------------------------------------------------------------------- CREATE COMPONENT INSTANCE
// Optimize it in a function @see jsx.ts/createVNode()
parcelHelpers.export(exports, "_createComponentInstance", ()=>_createComponentInstance);
// ----------------------------------------------------------------------------- MOUNT / UNMOUNT
parcelHelpers.export(exports, "_mountComponent", ()=>_mountComponent);
parcelHelpers.export(exports, "_unmountComponent", ()=>_unmountComponent);
parcelHelpers.export(exports, "_recursivelyUpdateMountState", ()=>_recursivelyUpdateMountState);
var _common = require("./common");
var _props = require("./props");
function _createComponentInstance(vnode) {
    const component = {
        vnode,
        _propsProxy: // @ts-ignore - FIXME Type
        vnode.value.isFunctional ? null : (0, _props._createPropsProxy)(vnode.props),
        name: vnode.value.name,
        isMounted: false,
        methods: {},
        _isDirty: false,
        _render: vnode.value,
        _mountHandlers: [],
        _renderHandlers: [],
        _unmountHandlers: [],
        _afterRenderHandlers: [],
        _affectedNodesByStates: [],
        _isRendering: false,
        _defaultProps: {},
        // Component API is given to every functional or factory component
        _componentAPI: {
            get defaultProps () {
                return component._defaultProps;
            },
            set defaultProps (value){
                // Register default props for the getter
                component._defaultProps = value;
                // If we have a proxy
                if (component._propsProxy) // Get current props from proxy as plain browsable object
                // Override props on proxy with defaults on a new object
                component._propsProxy.set(Object.assign({}, value, component._propsProxy.get()));
                else {
                    // Get props object instance from current virtual node
                    const { props  } = component.vnode;
                    // Browse default, and inject them if it does not exist on props
                    for(let i in value)if (!props.hasOwnProperty(i)) // @ts-ignore - FIXME : Type error
                    props[i] = value[i];
                }
            }
        }
    };
    return component;
}
function _mountComponent(component) {
    // Call every mount handler and store returned unmount handlers
    component._mountHandlers.map((handler)=>{
        const mountedReturn = handler.apply(component, []);
        if (typeof mountedReturn == "function") component._unmountHandlers.push(mountedReturn);
    });
    // Reset mount handlers, no need to keep them
    component._mountHandlers = [];
    component.isMounted = true;
}
function _unmountComponent(component) {
    // TODO : While optim ? Do bench !
    component._unmountHandlers.forEach((h)=>h.apply(component, []));
    component.isMounted = false;
    // Cut component branch from virtual node to allow GC to destroy component
    delete component.vnode._component;
    delete component.vnode;
// FIXME : Do we need to do this ? Is it efficient or is it just noise ?
// delete component.vnode
// delete component.propsProxy
// delete component._mountHandlers;
// delete component._renderHandlers;
// delete component._unmountHandlers;
// delete component._afterRenderHandlers;
// delete component.methods
// delete component._componentAPI
// delete component._observables
// TODO : Remove all listeners ?
}
function _recursivelyUpdateMountState(node, doMount) {
    if (node.type > (0, _common._VNodeTypes_CONTAINERS)) {
        // TODO : While optim ? Do bench !
        node.props.children.forEach((child)=>{
            // FIXME : Is it necessary ?
            // Remove all event listeners
            // if ( child.type === VNodeTypes.ELEMENT ) {
            // 	const listeners = child.dom[ _DOM_PRIVATE_LISTENERS_KEY ]
            // 	Object.keys( listeners ).forEach( event => {
            // 		console.log( event )
            // 		child.dom.removeEventListener
            // 	})
            // }
            _recursivelyUpdateMountState(child, doMount);
        });
        if (node._component) doMount ? _mountComponent(node._component) : _unmountComponent(node._component);
    }
}

},{"./common":"8NUdO","./props":"bJNzu","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"bJNzu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "shallowPropsCompare", ()=>shallowPropsCompare);
parcelHelpers.export(exports, "_createPropsProxy", ()=>_createPropsProxy);
var _common = require("./common");
const shallowPropsCompare = (a, b, childrenCheck = true)=>// Same amount of properties ?
    Object.keys(a).length === Object.keys(b).length && Object.keys(a).every((key)=>// Check children
        key === "children" && childrenCheck ? // Same array instances -> we validate directly without browsing children
        a[key] === b[key] || // check if children props exists on props b
        b[key] && a[key].length === b[key].length && !a[key].find((c, i)=>{
            const d = b[key][i];
            // Here we inverted condition to match diff.ts checks
            // Condition is -> check if same nodes types
            // Find is -> halt when any node type differs (so, the inverse)
            return !(c.type === d.type && (c.type === (0, _common._VNodeTypes_ELEMENT) ? c.value === d.value : true));
        }) : b.hasOwnProperty(key) && a[key] === b[key]);
function _createPropsProxy(props) {
    // console.log("_createPropsProxy", props)
    return {
        proxy: new Proxy(props, {
            get (target, propName) {
                // if ( propName === _proxyPrivateAccess )
                // 	return props
                // TODO : Track dependencies like for state
                return propName in props ? props[propName] : void 0;
            },
            set () {
                return false;
            }
        }),
        // This method will set new props object (we override first argument of createPropsProxy)
        set (newProps) {
            props = newProps;
        },
        get () {
            return props;
        }
    };
}

},{"./common":"8NUdO","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"krTG7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// ----------------------------------------------------------------------------- RENDER
parcelHelpers.export(exports, "render", ()=>render);
parcelHelpers.export(exports, "invalidateComponent", ()=>invalidateComponent) // ----------------------------------------------------------------------------- REGISTER WEB-COMPONENTS
 // TODO : Web components ! Check how lit and preact webcomponents works
 //			- Register web-components with ComponentName to <component-name />
 //  		- Update properties when changed in DOM
 //  			- Need translation (detect numbers, maybe json for array and objects ?)
 //				- Maybe an API to set props with JS and with advanced type (like functions)
 //			- Children
 //			- DOM Find
 //			- Mount / Unmount
 // ----------------------------------------------------------------------------- HYDRATE
 // TODO : Hydrate
 // TODO : Render to string or render to web components to avoid expensive hydratation ?
;
var _common = require("./common");
var _diff = require("./diff");
var _jsx = require("./jsx");
function render(rootNode, parentElement) {
    // When using render, we create a new root node to detect new renders
    // This node is never rendered, we just attach it to the parentElement and render its children
    const root = (0, _jsx._createVNode)((0, _common._VNodeTypes_ROOT), null, {
        children: [
            rootNode
        ]
    });
    root.dom = parentElement;
    (0, _diff._diffNode)(root, parentElement[0, _diff._DOM_PRIVATE_VIRTUAL_NODE_KEY]);
    parentElement[0, _diff._DOM_PRIVATE_VIRTUAL_NODE_KEY] = root;
}
// ----------------------------------------------------------------------------- INVALIDATION
let componentsToUpdate = [];
function updateDirtyComponents() {
    let p;
    // TODO : Update with depth ! Deepest first ? Or last ?
    componentsToUpdate.forEach((component)=>{
        (0, _diff._diffNode)(component.vnode, component.vnode);
        // if ( component._affectedNodesByStates.length == 0 )
        // 	_diffNode( component.vnode, component.vnode )
        // else for ( let i = 0; i < component._affectedNodesByStates.length; ++i ) {
        // 	const oldNodes = component._affectedNodesByStates[ i ]
        // 	component._affectedNodesByStates[i] = []
        // 	renderComponentNode( component.vnode, component )
        // 	const newNodes = component._affectedNodesByStates[ i ]
        // 	for ( let j = 0; j < newNodes.length; ++j )
        // 		_diffNode( newNodes[j], oldNodes[j] )
        // }
        component._afterRenderHandlers.forEach((handler)=>handler());
        component._afterRenderHandlers = [];
        component._isDirty = false;
    });
    componentsToUpdate = [];
    p && p();
}
const _microtask = self.queueMicrotask ? self.queueMicrotask : (h)=>self.setTimeout(h, 0);
function invalidateComponent(dirtyComponent) {
    // Queue rendering before end of frame
    if (componentsToUpdate.length === 0) _microtask(updateDirtyComponents);
    // Invalidate this component once
    if (dirtyComponent._isDirty) return;
    dirtyComponent._isDirty = true;
    // Store it into the list of dirty components
    componentsToUpdate.push(dirtyComponent);
}

},{"./common":"8NUdO","./diff":"6sa8r","./jsx":"beq5O","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"fdaPH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ref", ()=>ref);
parcelHelpers.export(exports, "refs", ()=>refs) // FIXME : When using web components with original dom not from Reflex
 // FIXME : Move it in module web-components ?
 // export function find () {
 //
 // }
;
function ref() {
    const value = {
        component: null,
        dom: null,
        _setFromVNode (vnode) {
            value.dom = vnode.dom;
            value.component = vnode._component;
        }
    };
    return value;
}
function refs() {
    let _counter = 0;
    let _list = [];
    function registerAtIndex(vnode, index) {
        // Delete
        if (!vnode.dom) _list = _list.filter((_, i)=>i != index);
        else _list[index] = {
            dom: vnode.dom,
            component: vnode._component
        };
    }
    const value = {
        get list () {
            return _list;
        },
        _setFromVNode (vnode) {
            // Set vnode id from counter.
            // Node ids starts from 1 to be able to compress a bit
            if (!vnode._id) vnode._id = ++_counter;
            // Set back from starting 1 to 0
            registerAtIndex(vnode, vnode._id - 1);
        },
        // FIXME : Better api ?
        atIndex (index) {
            return {
                // TODO : Check if terser uses same mangled name
                _setFromVNode (vnode) {
                    registerAtIndex(vnode, index);
                }
            };
        }
    };
    return value;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"8Qw9Y":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// ----------------------------------------------------------------------------- MOUNT / UNMOUNT
parcelHelpers.export(exports, "mounted", ()=>mounted);
parcelHelpers.export(exports, "unmounted", ()=>unmounted);
parcelHelpers.export(exports, "changed", ()=>changed);
var _diff = require("./diff");
function mounted(handler) {
    // FIXME : In dev mode, maybe check if component is mounted ?
    (0, _diff.getCurrentComponent)()._mountHandlers.push(handler);
}
function unmounted(handler) {
    // FIXME : In dev mode, maybe check if component is mounted ?
    (0, _diff.getCurrentComponent)()._unmountHandlers.push(handler);
}
function changed(detectChanges, executeHandler) {
    const component = (0, _diff.getCurrentComponent)();
    // No executeHandler function means detectChanges has been omitted.
    // Do not check any change, just call executeHandler after every render.
    if (!executeHandler) {
        component._renderHandlers.push(detectChanges);
        return;
    }
    // Get first state
    let state = detectChanges();
    // Stored previous unmount handler
    let previousUnmountHandler;
    // Update new state and call handlers
    function updateState(oldState) {
        // Call previous handler with old state if it exists
        previousUnmountHandler && previousUnmountHandler.apply(null, oldState);
        // previousUnmountHandler && previousUnmountHandler( oldState );
        // Call executeHandler with new and old state
        const executeResult = executeHandler.apply(null, state.concat(oldState));
        // const executeResult = executeHandler( state, oldState )
        // Get previous unmount handler from return or cancel it
        previousUnmountHandler = // _typeof(executeResult, "f")
        typeof executeResult == "function" ? executeResult : null;
    }
    // After component just rendered
    let firstRender = true;
    component._renderHandlers.push(()=>{
        // Always execute handler at first render
        if (firstRender) {
            updateState(null);
            firstRender = false;
        } else {
            // Otherwise, detect changes
            const oldState = state;
            state = detectChanges();
            // Check if any part of state changed
            if (state.filter((e, i)=>oldState[i] != e).length) updateState(oldState);
        }
    });
}

},{"./diff":"6sa8r","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}]},[], null, "parcelRequirea1a1")

