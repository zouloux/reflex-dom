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
})({"eJHQY":[function(require,module,exports) {
// Import it like any other v-dom lib
var _reflex = require("../src/reflex");
// Reflex components can be pure functions or factory functions
function ReflexApp(props) {
    // How basic state works
    const counter = (0, _reflex.state)(0);
    const increment = ()=>counter.value++;
    const reset = ()=>counter.value = 0;
    // No need to use ref for locally scoped variables
    let firstUpdate = true;
    // Detect changes of states or props
    (0, _reflex.changed)(()=>[
            counter.value
        ], (newValue)=>{
        console.log(`Counter just updated to ${newValue}`, firstUpdate);
        firstUpdate = false;
    });
    // How refs of dom elements works
    const title = (0, _reflex.ref)();
    (0, _reflex.mounted)(()=>console.log(title.dom.innerHTML));
    // Returns a render function
    // Classes can be arrays ! Falsy elements of the array will be discarded
    return ()=>/*#__PURE__*/ (0, _reflex.h)("div", {
            class: [
                "ReflexApp",
                props.modifier,
                false
            ]
        }, /*#__PURE__*/ (0, _reflex.h)("h1", {
            ref: title
        }, "Hello from Reflex ", props.emoji), /*#__PURE__*/ (0, _reflex.h)("button", {
            onClick: increment
        }, "Increment"), "\xa0", /*#__PURE__*/ (0, _reflex.h)("button", {
            onClick: reset
        }, "Reset"), "\xa0", /*#__PURE__*/ (0, _reflex.h)("span", null, "Counter : ", counter.value));
}
// Render it like any other v-dom library
(0, _reflex.render)(/*#__PURE__*/ (0, _reflex.h)(ReflexApp, {
    modifier: "ReflexApp-lightMode",
    emoji: "\uD83D\uDC4B"
}), document.body);

},{"../src/reflex":"cuBJf"}],"cuBJf":[function(require,module,exports) {
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
parcelHelpers.export(exports, "getHookedComponent", ()=>(0, _diff.getHookedComponent));
parcelHelpers.export(exports, "ref", ()=>(0, _ref.ref));
parcelHelpers.export(exports, "refs", ()=>(0, _ref.refs));
parcelHelpers.export(exports, "IRef", ()=>(0, _ref.IRef));
parcelHelpers.export(exports, "IRefs", ()=>(0, _ref.IRefs));
parcelHelpers.export(exports, "mounted", ()=>(0, _lifecycle.mounted));
parcelHelpers.export(exports, "unmounted", ()=>(0, _lifecycle.unmounted));
parcelHelpers.export(exports, "changed", ()=>(0, _lifecycle.changed));
parcelHelpers.export(exports, "render", ()=>(0, _render.render));
parcelHelpers.export(exports, "invalidateComponent", ()=>(0, _render.invalidateComponent));
// Also export createElement for JSX pragma React
parcelHelpers.export(exports, "h", ()=>(0, _jsx.h));
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
parcelHelpers.export(exports, "state", ()=>state);
var _common = require("./common");
var _diff = require("./diff");
// import { addDataListenerForNextNode } from "./jsx";
var _render = require("./render");
function state(initialValue, filter, afterChange) {
    initialValue = (0, _common.prepareInitialValue)(initialValue);
    const component = (0, _diff.getHookedComponent)();
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
                newValue = (0, _common.prepareInitialValue)(newValue, initialValue);
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

},{"./common":"8NUdO","./diff":"6sa8r","./render":"krTG7","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"8NUdO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_TEXT_NODE_TYPE_NAME", ()=>_TEXT_NODE_TYPE_NAME);
parcelHelpers.export(exports, "_ROOT_NODE_TYPE_NAME", ()=>_ROOT_NODE_TYPE_NAME);
parcelHelpers.export(exports, "prepareInitialValue", ()=>prepareInitialValue);
const _TEXT_NODE_TYPE_NAME = "#T";
const _ROOT_NODE_TYPE_NAME = "#R";
const prepareInitialValue = (initialValue, oldValue)=>typeof initialValue == "function" ? initialValue(oldValue) : initialValue;

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
parcelHelpers.export(exports, "getHookedComponent", ()=>getHookedComponent);
// ----------------------------------------------------------------------------- DIFF ELEMENT
parcelHelpers.export(exports, "_diffElement", ()=>_diffElement);
// ----------------------------------------------------------------------------- DIFF CHILDREN
/**
 * Note about performances
 * - Very important, avoid loops in loops ! Prefer 4 static loops at top level
 *   rather than 2 nested loops. n*4 is lower than n^n !
 */ parcelHelpers.export(exports, "_diffChildren", ()=>_diffChildren);
// ----------------------------------------------------------------------------- DIFF NODE
parcelHelpers.export(exports, "renderComponentNode", ()=>renderComponentNode);
parcelHelpers.export(exports, "_diffNode", ()=>_diffNode);
var _common = require("./common");
var _jsx = require("./jsx");
var _component = require("./component");
const _DOM_PRIVATE_VIRTUAL_NODE_KEY = "__v";
const _DOM_PRIVATE_LISTENERS_KEY = "__l";
// Stolen from Preact, to check if a style props is non-dimensional (does not need to add a unit)
const _IS_NON_DIMENSIONAL_REGEX = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
// Check if an event is a capture one
const _CAPTURE_REGEX = /Capture$/;
// ----------------------------------------------------------------------------- CURRENT SCOPED COMPONENT
// We store current component in factory phase for hooks
let _hookedComponent = null;
function getHookedComponent() {
    return _hookedComponent;
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
// Shallow compare two objects, applied only for props between new and old virtual nodes.
// Will not compare "children" which is always different
// https://esbench.com/bench/62a138846c89f600a5701904
const shallowPropsCompare = (a, b)=>// Same amount of properties ?
    Object.keys(a).length === Object.keys(b).length && Object.keys(a).every((key)=>key === "children" || b.hasOwnProperty(key) && a[key] === b[key]);
function _diffElement(newNode, oldNode) {
    // console.log("diffElement", newNode, oldNode)
    const isTextNode = newNode.type == (0, _common._TEXT_NODE_TYPE_NAME);
    // Get dom element from oldNode or create it
    const dom = oldNode ? oldNode.dom : isTextNode ? document.createTextNode(newNode.props.value) : document.createElement(newNode.type);
    // Update text contents
    if (isTextNode && oldNode) {
        const { value  } = newNode.props;
        // Only when content has changed
        if (value != dom.nodeValue) dom.nodeValue = value;
    }
    // Text nodes does not have attributes or events
    if (isTextNode) return dom;
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
                Object.keys(value).map((k)=>setStyle(dom.style, k, value[k]));
                continue;
            }
            // FIXME : What about checked / disabled / autoplay ...
            dom.setAttribute(name1, value === true ? "" : value);
        }
    }
    return dom;
}
function _diffChildren(newParentNode, oldParentNode) {
    // Create key array on parent node to register keyed children
    // This will allow us to find any child by its key directly without
    // having to search for it
    function registerKey(c) {
        if (!newParentNode._keys) newParentNode._keys = new Map();
        newParentNode._keys[c.key] = c;
    }
    // Faster .flat
    // @see https://stackoverflow.com/questions/61411776/is-js-native-array-flat-slow-for-depth-1
    newParentNode.props.children = [].concat(...newParentNode.props.children);
    // Faster for each loop
    let childIndex = -1;
    const totalChildren = newParentNode.props.children.length;
    while(++childIndex < totalChildren){
        let child = newParentNode.props.children[childIndex];
        // Convert string and numbers to text type nodes
        // We do it here because this is the first time we have to browse children
        // So it's not made into h() (later is better)
        if (typeof child == "string" || typeof child == "number") newParentNode.props.children[childIndex] = child = (0, _jsx._createVNode)((0, _common._TEXT_NODE_TYPE_NAME), {
            value: "" + child
        });
        // If child is valid, register its keys
        if (child) {
            child.key && registerKey(child);
            // If no old parent node, add right now into dom
            if (!oldParentNode) {
                _diffNode(child);
                newParentNode.dom.appendChild(child.dom);
            }
        }
    }
    // Next, we check differences with old node.
    // So do not continue if there are no changes to check
    if (!oldParentNode) return;
    const oldChildren = oldParentNode.props.children;
    // Otherwise we need to compare between old and new tree
    const oldParentKeys = oldParentNode._keys;
    let collapseCount = 0;
    const parentDom = newParentNode.dom;
    // newParentNode.props.children.forEach( (newChildNode, i) => {
    const total = newParentNode.props.children.length;
    for(let i = 0; i < total; ++i){
        // Collapsed corresponding index between old and new nodes
        // To be able to detect moves or if just collapsing because a top sibling
        // has been removed
        // if ( lostIndexes[i] )
        const newChildNode = newParentNode.props.children[i];
        const oldAtSameIndex = oldChildren[i];
        if (oldAtSameIndex && newParentNode._keys && oldAtSameIndex.key && !newParentNode._keys[oldAtSameIndex.key]) collapseCount++;
        /** REMOVED **/ // If falsy, it's surely a child that has been removed with a ternary or a boolean
        // Do nothing else and do not mark old node to keep, so it will be removed
        if (!newChildNode) return;
        // Has key, same key found in old, same type on both
        /** MOVE & UPDATE KEYED CHILD **/ if (newChildNode.key && oldParentKeys && oldParentKeys[newChildNode.key] && oldParentKeys[newChildNode.key].type == newChildNode.type) {
            const oldNode = oldParentKeys[newChildNode.key];
            _diffNode(newChildNode, oldNode);
            oldNode._keep = true;
            // Check if index changed, compare with collapsed index to detect moves
            const collapsedIndex = i + collapseCount;
            // FIXME : Should do 1 operation when swapping positions, not 2
            // FIXME : Perf, is indexOf quick ? Maybe store every indexes in an array ?
            if (oldChildren.indexOf(oldNode) != collapsedIndex) parentDom.insertBefore(newChildNode.dom, parentDom.children[collapsedIndex + 1]);
        } else if (oldParentKeys && newChildNode.key && !oldParentKeys[newChildNode.key]) {
            _diffNode(newChildNode);
            parentDom.insertBefore(newChildNode.dom, parentDom.children[i]);
            collapseCount--;
        } else if (i in oldChildren && oldChildren[i] && oldChildren[i].type == newChildNode.type) {
            const oldNode = oldChildren[i];
            _diffNode(newChildNode, oldNode);
            oldNode._keep = true;
        } else {
            _diffNode(newChildNode);
            parentDom.insertBefore(newChildNode.dom, parentDom.children[i]);
            collapseCount--;
        }
    }
    // Remove old children which are not reused
    for (const oldChildNode of oldChildren)if (oldChildNode && !oldChildNode._keep) {
        // Call unmount handlers
        (0, _component._recursivelyUpdateMountState)(oldChildNode, false);
        // Remove ref
        const { dom  } = oldChildNode;
        oldChildNode.dom = null;
        updateNodeRef(oldChildNode);
        parentDom.removeChild(dom);
    }
}
function renderComponentNode(node, component) {
    // Tie component and virtual node
    component.vnode = node;
    node._component = component;
    // Select hooked component
    _hookedComponent = component;
    // FIXME: Before render handlers ?
    // FIXME: Optimize rendering with a hook ?
    // Execute rendering
    component._isRendering = true;
    const render = component._render ? component._render : node.type;
    const result = render.apply(component, [
        component._propsProxy.proxy
    ]);
    component._isRendering = false;
    // Unselect hooked component
    _hookedComponent = null;
    return result;
}
function _diffNode(newNode, oldNode) {
    // IMPORTANT : Here we clone node if we got the same instance
    // 			   Otherwise, altering props.children after render will fuck everything up
    // Clone identical nodes to be able to diff them
    if (oldNode && oldNode === newNode) newNode = (0, _jsx._cloneVNode)(oldNode);
    // Transfer component instance from old node to new node
    let component = oldNode?._component;
    // Transfer id
    if (oldNode && oldNode._id) newNode._id = oldNode._id;
    // We may need a new component instance
    let renderResult;
    // if ( !component && _typeof(newNode.type, "f") ) {
    if (!component && typeof newNode.type == "function") {
        // Create component instance (without new keyword for better performances)
        component = (0, _component._createComponentInstance)(newNode);
        // Execute component's function and check what is returned
        const result = renderComponentNode(newNode, component);
        // This is a factory component which return a render function
        // if ( _typeof(result, "f") ) {
        if (typeof result == "function") {
            component._render = result;
            component.isFactory = true;
        } else if (typeof result == "object" && "type" in result) {
            component._render = newNode.type;
            component.isFactory = false;
            renderResult = result;
        }
    }
    let dom;
    // Virtual node is a dom element
    if (!component) newNode.dom = dom = _diffElement(newNode, oldNode);
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
        if (// If pure functional component has not already been rendered
        !renderResult && oldNode && !component.isFactory // && !component.isDirty
         && newNode.props.pure !== false // FIXME : Rename it forceRefresh={ true } ?
         && newNode.props.children.length === 0 && shallowPropsCompare(newNode.props, oldNode.props)) {
            // FIXME : Weirdly, it seems to optimize not all components
            //			Ex : click on create 1000 several times and watch next console log
            // console.log("OPTIMIZE")
            // Do not re-render, just get children and dom from old node
            // newNode.props.children = [ ...oldNode.props.children ]
            newNode.props.children = oldNode.props.children;
            newNode.dom = dom = oldNode.dom;
        } else if (!renderResult) {
            component._propsProxy.set(newNode.props);
            renderResult = renderComponentNode(newNode, component);
        }
        // We rendered something (not reusing old component)
        if (renderResult) {
            // Apply new children list to the parent component node
            // FIXME :
            newNode.props.children = renderResult.props.children;
            // newNode.props.children = _flattenChildren( renderResult )
            // Diff rendered element
            newNode.dom = dom = _diffElement(renderResult, oldNode);
            // Assign ref of first virtual node to the component's virtual node
            newNode._ref = renderResult._ref;
        }
        // Tie up node and component
        newNode._component = component;
        component.vnode = newNode;
        // Component is clean and rendered now
        component._isDirty = false;
    }
    // Update ref on node
    updateNodeRef(newNode);
    // Diff children of this element (do not process text nodes)
    if (dom instanceof Element) _diffChildren(newNode, oldNode);
    // If component is not mounted yet, mount it recursively
    if (component && !component.isMounted) (0, _component._recursivelyUpdateMountState)(newNode, true);
    // Execute after render handlers
    component?._renderHandlers.map((h)=>h());
}

},{"./common":"8NUdO","./jsx":"beq5O","./component":"jK9Qg","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"beq5O":[function(require,module,exports) {
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
// FIXME : Is it an array ? Maybe its working as single prop
let _dataListenersForNextNode = [];
function addDataListenerForNextNode(listener) {
    _dataListenersForNextNode.push(listener);
}
function triggerDataListenerForNode(node) {
    _dataListenersForNextNode.forEach((handler)=>handler(node));
    _dataListenersForNextNode = [];
}
function _createVNode(type, props, key, _ref) {
    const node = {
        type,
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
function h(type, props, ...children) {
    if (props == null) props = {};
    props.children = props.children ? props.children : children;
    const node = _createVNode(type, props, props.key, props.ref);
    triggerDataListenerForNode(node);
    return node;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"jK9Qg":[function(require,module,exports) {
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
    return {
        vnode,
        _propsProxy: (0, _props.createPropsProxy)(vnode.props),
        _isDirty: false,
        isMounted: false,
        name: vnode.type.name,
        _mountHandlers: [],
        _renderHandlers: [],
        _unmountHandlers: [],
        // _observables: [],
        _affectedNodesByStates: [],
        _isRendering: false,
        _afterRenderHandlers: []
    };
}
function _mountComponent(component) {
    // Call every mount handler and store returned unmount handlers
    component._mountHandlers.map((handler)=>{
        const mountedReturn = handler.apply(component, []);
        // if ( _typeof(mountedReturn, "f") )
        if (typeof mountedReturn == "function") component._unmountHandlers.push(mountedReturn);
    });
    // Reset mount handlers, no need to keep them
    component._mountHandlers = [];
    component.isMounted = true;
}
function _unmountComponent(component) {
    component._unmountHandlers.map((h)=>h.apply(component, []));
    // component._observables.map( o => o.dispose() )
    // FIXME : Do we need to do this ? Is it efficient or is it just noise ?
    //delete component.vnode
    // delete component.propsProxy
    delete component._mountHandlers;
    delete component._renderHandlers;
    delete component._unmountHandlers;
    delete component._afterRenderHandlers;
    // delete component._observables
    component.isMounted = false;
}
function _recursivelyUpdateMountState(node, doMount) {
    if (node.type != (0, _common._TEXT_NODE_TYPE_NAME)) {
        node.props.children.forEach((c)=>{
            if (c) _recursivelyUpdateMountState(c, doMount);
        });
        if (node._component) doMount ? _mountComponent(node._component) : _unmountComponent(node._component);
    }
}

},{"./common":"8NUdO","./props":"bJNzu","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"bJNzu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createPropsProxy", ()=>createPropsProxy);
function createPropsProxy(props) {
    return {
        proxy: new Proxy({}, {
            get (target, propName) {
                // TODO : Track dependencies like for state
                return propName in props ? props[propName] : void 0;
            },
            set () {
                return false;
            }
        }),
        // This method will set new props object (we override first argument of createPropsProxy)
        set: (newProps)=>props = newProps
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"krTG7":[function(require,module,exports) {
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
    const root = (0, _jsx._createVNode)((0, _common._ROOT_NODE_TYPE_NAME), {
        children: [
            rootNode
        ]
    });
    root.dom = parentElement;
    (0, _diff._diffChildren)(root, parentElement[0, _diff._DOM_PRIVATE_VIRTUAL_NODE_KEY]);
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
    });
    componentsToUpdate = [];
    p && p();
}
const __microtask = self.queueMicrotask ? self.queueMicrotask : (h)=>self.setTimeout(h, 0);
function invalidateComponent(dirtyComponent) {
    // Queue rendering before end of frame
    if (componentsToUpdate.length === 0) __microtask(updateDirtyComponents);
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
    (0, _diff.getHookedComponent)()._mountHandlers.push(handler);
}
function unmounted(handler) {
    // FIXME : In dev mode, maybe check if component is mounted ?
    (0, _diff.getHookedComponent)()._unmountHandlers.push(handler);
}
function changed(detectChanges, executeHandler) {
    const component = (0, _diff.getHookedComponent)();
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

},{"./diff":"6sa8r","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}]},["eJHQY"], "eJHQY", "parcelRequirea1a1")

