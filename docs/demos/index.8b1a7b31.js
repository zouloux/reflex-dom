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
parcelHelpers.export(exports, "state", ()=>(0, _state.state));
parcelHelpers.export(exports, "asyncState", ()=>(0, _state.asyncState));
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
var _state = require("./state");
var _ref = require("./ref");
var _lifecycle = require("./lifecycle");
var _render = require("./render");
var _jsx = require("./jsx");

},{"./state":"5nTfq","./ref":"fdaPH","./lifecycle":"8Qw9Y","./render":"krTG7","./jsx":"beq5O","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"5nTfq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// ----------------------------------------------------------------------------- STATE
parcelHelpers.export(exports, "state", ()=>state);
// ----------------------------------------------------------------------------- ASTNC STATE
parcelHelpers.export(exports, "asyncState", ()=>asyncState);
var _diff = require("./diff");
var _render = require("./render");
var _observable = require("./observable");
function state(initialValue) {
    const component = (0, _diff.getHookedComponent)();
    const observable = (0, _observable.createStateObservable)(initialValue, ()=>(0, _render.invalidateComponent)(component));
    component._observables.push(observable);
    return observable;
}
function asyncState(initialValue) {
    const component = (0, _diff.getHookedComponent)();
    // TODO : Implement this
    const observable = (0, _observable.createAsyncObservable)(initialValue, ()=>(0, _render.invalidateComponent)(component));
    // TODO : We may need cancellable Promises. Maybe just use reject ? And throw errors in legacy mode.
    component._observables.push(observable);
    return observable;
}

},{"./diff":"6sa8r","./render":"krTG7","./observable":"6ChQY","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"6sa8r":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_DOM_PRIVATE_VIRTUAL_NODE_KEY", ()=>_DOM_PRIVATE_VIRTUAL_NODE_KEY);
parcelHelpers.export(exports, "_DOM_PRIVATE_LISTENERS_KEY", ()=>_DOM_PRIVATE_LISTENERS_KEY);
parcelHelpers.export(exports, "getHookedComponent", ()=>getHookedComponent);
// ----------------------------------------------------------------------------- DIFF ELEMENT
parcelHelpers.export(exports, "diffElement", ()=>diffElement);
// ----------------------------------------------------------------------------- DIFF CHILDREN
/**
 * Note about performances
 * - Very important, avoid loops in loops ! Prefer 4 static loops at top level
 *   rather than 2 nested loops. n*4 is lower than n^n !
 */ parcelHelpers.export(exports, "diffChildren", ()=>diffChildren);
parcelHelpers.export(exports, "diffNode", ()=>diffNode);
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
    else if ((typeof value)[0] != "n" || _IS_NON_DIMENSIONAL_REGEX.test(key)) style[key] = value;
    else style[key] = value + "px";
}
function updateNodeRef(node) {
    if (!node._ref) return;
    // Ref as refs
    if ("list" in node._ref) // FIXME : Type
    // FIXME : Keep track of index ? Do it from diffChildren maybe ?
    node._ref.setFromVNode(0, node);
    else // FIXME : Type
    node._ref.setFromVNode(node);
}
// Shallow compare two objects, applied only for props between new and old virtual nodes.
// Will not compare "children" which is always different
// https://esbench.com/bench/62a138846c89f600a5701904
const shallowPropsCompare = (a, b)=>// Same amount of properties ?
    Object.keys(a).length === Object.keys(b).length && Object.keys(a).every((key)=>key === "children" || b.hasOwnProperty(key) && a[key] === b[key]);
function diffElement(newNode, oldNode) {
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
    oldNode && Object.keys(oldNode.props).map((name)=>{
        // Do not process children and remove only if not in new node
        if (name == "children") return;
        if (name in newNode.props && newNode.props[name] === oldNode.props[name]) return;
        // Insert HTML directly without warning
        if (name == "innerHTML") dom.innerHTML = "" // FIXME : Maybe use delete or null ?
        ;
        else if (name.startsWith("on")) {
            const { eventName , eventKey , useCapture  } = getEventNameAndKey(name, dom);
            dom.removeEventListener(eventName, dom[_DOM_PRIVATE_LISTENERS_KEY][eventKey], useCapture);
        } else dom.removeAttribute(name);
    });
    // Update props
    Object.keys(newNode.props).map((name)=>{
        if (name == "children") return;
        let value = newNode.props[name];
        // Do not continue if attribute or event did not change
        if (oldNode && name in oldNode.props && oldNode.props[name] === value) return;
        // Insert HTML directly without warning
        if (name == "innerHTML") dom.innerHTML = value;
        else if (name.startsWith("on")) {
            const { eventName , eventKey , useCapture  } = getEventNameAndKey(name, dom);
            // Init a collection of handlers on the dom object as private property
            dom[_DOM_PRIVATE_LISTENERS_KEY] ??= new Map();
            // Store original listener to be able to remove it later
            dom[_DOM_PRIVATE_LISTENERS_KEY][eventKey] = value;
            // And attach listener
            dom.addEventListener(eventName, value, useCapture);
        } else {
            // className as class for non jsx components
            if (name == "className") name = "class";
            // Manage class as arrays
            if (name == "class" && Array.isArray(value)) value = value.filter((v)=>v !== true && !!v).join(" ").trim();
            else if (name == "style" && (typeof value)[0] == "o") // FIXME : Can it be optimized ? Maybe only setStyle when needed ?
            return Object.keys(value).map((k)=>setStyle(dom.style, k, value[k]));
            else if (value == false) return;
            // FIXME : What about checked / disabled / autoplay ...
            // Set new attribute value
            dom.setAttribute(name, value);
        }
    });
    return dom;
}
function diffChildren(newParentNode, oldParentNode) {
    // console.log("Diff children", newParentNode, oldParentNode)
    // Target new and old children.
    const newChildren = newParentNode.props.children?.flat();
    const oldChildren = oldParentNode?.props.children?.flat();
    // FIXME : If new does not have children but old does, we need to destroy old children components instances
    if (!newChildren) return;
    const parentDom = newParentNode.dom;
    // Create key array on parent node to register keyed children
    // This will allow us to find any child by its key directly without
    // having to search for it
    newParentNode._keys = new Map();
    const registerKey = (c)=>{
        if (c?.key) newParentNode._keys[c.key] = c;
    };
    // This is a new parent node (no old), so no diffing
    // we juste process and add every child node
    if (!oldChildren) {
        newChildren.map((newChildNode)=>{
            if (!newChildNode) return;
            diffNode(newChildNode);
            parentDom.appendChild(newChildNode.dom);
            // Register this child with its key on its parent
            registerKey(newChildNode);
        });
        return;
    }
    // Map all new children keys into the keys register to avoid to use find
    // when searching for removed nodes
    // NOTE : About performances : 1st non-nested loop
    newChildren.map(registerKey);
    // Check if an old keyed node has been removed and get which index are offset after removal
    // NOTE : About performances : 2nd non-nested loop
    const lostIndexes = oldChildren.map((oldChild)=>!!(oldChild?.key && !newParentNode._keys[oldChild.key]));
    // Otherwise we need to compare between old and new tree
    const oldParentKeys = oldParentNode._keys;
    let collapseCount = 0;
    // NOTE : About performances : 3rd non-nested loop
    newChildren.map((newChildNode, i)=>{
        // Collapsed corresponding index between old and new nodes
        // To be able to detect moves or if just collapsing because a top sibling
        // has been removed
        if (lostIndexes[i]) collapseCount++;
        /** REMOVED **/ // If falsy, it's surely a child that has been removed with a ternary or a boolean
        // Do nothing else and do not mark old node to keep, so it will be removed
        if (!newChildNode) return;
        // Has key, same key found in old, same type on both
        /** MOVE & UPDATE KEYED CHILD **/ if (newChildNode.key && oldParentKeys[newChildNode.key] && oldParentKeys[newChildNode.key].type == newChildNode.type) {
            const oldNode = oldParentKeys[newChildNode.key];
            diffNode(newChildNode, oldNode);
            oldNode._keep = true;
            // Check if index changed, compare with collapsed index to detect moves
            const collapsedIndex = i + collapseCount;
            // FIXME : Should do 1 operation when swapping positions, not 2
            // FIXME : Perf, is indexOf quick ? Maybe store every indexes in an array ?
            if (oldChildren.indexOf(oldNode) != collapsedIndex) parentDom.insertBefore(newChildNode.dom, parentDom.children[i]);
        } else if (newChildNode.key && !oldParentKeys[newChildNode.key]) {
            diffNode(newChildNode);
            parentDom.insertBefore(newChildNode.dom, parentDom.children[i]);
            collapseCount--;
        } else if (i in oldChildren && oldChildren[i] && oldChildren[i].type == newChildNode.type) {
            const oldNode = oldChildren[i];
            diffNode(newChildNode, oldNode);
            oldNode._keep = true;
        } else {
            diffNode(newChildNode);
            parentDom.insertBefore(newChildNode.dom, parentDom.children[i]);
            collapseCount--;
        }
    });
    // Remove old children which are not reused
    // NOTE : About performances : 4th non-nested loop
    oldChildren.map((oldChildNode)=>{
        if (oldChildNode && !oldChildNode._keep) {
            // Call unmount handlers
            (0, _component.recursivelyUpdateMountState)(oldChildNode, false);
            // Remove ref
            const { dom  } = oldChildNode;
            oldChildNode.dom = null;
            updateNodeRef(oldChildNode);
            parentDom.removeChild(dom);
        }
    });
}
// ----------------------------------------------------------------------------- DIFF NODE
function renderComponentNode(node, component) {
    // Tie component and virtual node
    component.vnode = node;
    node._component = component;
    // Select hooked component
    _hookedComponent = component;
    // FIXME: Before render handlers ?
    // FIXME: Optimize rendering with a hook ?
    // Execute rendering
    const result = (component._render ?? node.type).apply(component, [
        component._propsProxy.value
    ]);
    // Unselect hooked component
    _hookedComponent = null;
    return result;
}
function diffNode(newNode, oldNode) {
    // IMPORTANT : Here we clone node if we got the same instance
    // 			   Otherwise, altering props.children after render will fuck everything up
    // Clone identical nodes to be able to diff them
    if (oldNode && oldNode === newNode) newNode = (0, _jsx.cloneVNode)(oldNode);
    // Transfer component instance from old node to new node
    let component = oldNode?._component;
    // We may need a new component instance
    let renderResult;
    if (!component && (0, _common._isFunction)(newNode.type)) {
        // Create component instance (without new keyword for better performances)
        component = (0, _component.createComponentInstance)(newNode);
        // Execute component's function and check what is returned
        const result = renderComponentNode(newNode, component);
        // This is a factory component which return a render function
        if ((0, _common._isFunction)(result)) {
            component._render = result;
            component.isFactory = true;
        } else if ((typeof result)[0] == "o" && "type" in result) {
            component._render = newNode.type;
            component.isFactory = false;
            renderResult = result;
        }
    }
    let dom;
    // Virtual node is a dom element
    if (!component) newNode.dom = dom = diffElement(newNode, oldNode);
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
            newNode.props.children = (0, _common._flattenChildren)(renderResult);
            // Diff rendered element
            newNode.dom = dom = diffElement(renderResult, oldNode);
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
    if (dom instanceof Element) diffChildren(newNode, oldNode);
    // If component is not mounted yet, mount it recursively
    if (component && !component.isMounted) (0, _component.recursivelyUpdateMountState)(newNode, true);
    // Execute after render handlers
    component?._renderHandlers.map((h)=>h());
}

},{"./common":"8NUdO","./jsx":"beq5O","./component":"jK9Qg","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"8NUdO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_TEXT_NODE_TYPE_NAME", ()=>_TEXT_NODE_TYPE_NAME);
parcelHelpers.export(exports, "_ROOT_NODE_TYPE_NAME", ()=>_ROOT_NODE_TYPE_NAME);
parcelHelpers.export(exports, "_microtask", ()=>_microtask);
parcelHelpers.export(exports, "_forceArray", ()=>_forceArray);
parcelHelpers.export(exports, "_isFunction", ()=>_isFunction);
parcelHelpers.export(exports, "_flattenChildren", ()=>_flattenChildren);
const _TEXT_NODE_TYPE_NAME = "#T";
const _ROOT_NODE_TYPE_NAME = "#R";
const _microtask = window.queueMicrotask ?? ((h)=>window.setTimeout(h, 0));
const _forceArray = (item)=>Array.isArray(item) ? item : [
        item
    ];
const _isFunction = (fn)=>(typeof fn)[0] == "f";
function _flattenChildren(vnode) {
    // Re-assign flattened array to the original virtual node, and return it
    return vnode.props.children = vnode.props?.children?.flat() ?? [];
}

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

},{}],"beq5O":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// NOTE : Keep it in a function and do not inline this
// It seems to be V8 optimized. @see Preact source code
parcelHelpers.export(exports, "createVNode", ()=>createVNode);
parcelHelpers.export(exports, "cloneVNode", ()=>cloneVNode);
parcelHelpers.export(exports, "h", ()=>h) // export function h ( type, props, ...children ) {
 // 	// Remove debug properties
 // 	// FIXME : Keep them in debug mode ? But in vnode not in props.
 // 	delete props.__self
 // 	delete props.__source
 // 	// Extract key and ref from props
 // 	const { key, ref, ...nodeProps } = props
 // 	// Inject children in props
 // 	nodeProps.children = ( children ?? [] ).map( child => (
 // 		// Convert string and number children to text virtual nodes
 // 		( ["string", "number"].indexOf( typeof child ) !== -1 )
 // 			? createVNode( _TEXT_NODE_TYPE_NAME, { value: child + '' })
 // 			// Otherwise keep child generated by JSX
 // 			: child
 // 	))
 // 	return createVNode( type, nodeProps, key, ref )
 // }
;
var _common = require("./common");
function createVNode(type, props, key, ref) {
    return {
        type: type,
        props: props,
        key: key,
        _ref: ref
    };
}
function cloneVNode(vnode) {
    return {
        ...vnode,
        // IMPORTANT : also clone props object
        props: {
            ...vnode.props
        }
    };
}
function h(type, props, ...children) {
    // Remove debug properties
    // FIXME : Keep them in debug mode ? But in vnode not in props.
    let nodeProps = {};
    let key, ref;
    for(let i in props){
        const value = props[i];
        // Set apart key and ref
        if (i == "key") key = value;
        else if (i == "ref") ref = value;
        else if (!i.startsWith("__")) nodeProps[i] = value;
    }
    // Inject children in props
    nodeProps.children = children.map((child)=>// Convert string and number children to text virtual nodes
        [
            "s",
            "n"
        ].indexOf((typeof child)[0]) != -1 ? createVNode((0, _common._TEXT_NODE_TYPE_NAME), {
            value: "" + child
        }) : child);
    return createVNode(type, nodeProps, key, ref);
}

},{"./common":"8NUdO","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"jK9Qg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// ----------------------------------------------------------------------------- CREATE COMPONENT INSTANCE
// Optimize it in a function @see jsx.ts/createVNode()
parcelHelpers.export(exports, "createComponentInstance", ()=>createComponentInstance);
// ----------------------------------------------------------------------------- MOUNT / UNMOUNT
parcelHelpers.export(exports, "mountComponent", ()=>mountComponent);
parcelHelpers.export(exports, "unmountComponent", ()=>unmountComponent);
parcelHelpers.export(exports, "recursivelyUpdateMountState", ()=>recursivelyUpdateMountState);
var _common = require("./common");
function createComponentInstance(vnode) {
    return {
        vnode,
        _propsProxy: createPropsProxy(vnode.props),
        _isDirty: false,
        isMounted: false,
        name: vnode.type.name,
        _mountHandlers: [],
        _renderHandlers: [],
        _unmountHandlers: [],
        _observables: []
    };
}
function createPropsProxy(props) {
    const proxy = new Proxy({}, {
        // When request a prop, check on props object if it exists
        get (target, propName) {
            return propName in props ? props[propName] : void 0;
        },
        // Disallow set on props
        set () {
            return false;
        }
    });
    return {
        // Get the proxy object typed as a GProps object
        get value () {
            return proxy;
        },
        // This method will set new props object (we override first argument of createPropsProxy)
        set (newProps) {
            props = newProps;
        }
    };
}
function mountComponent(component) {
    // Call every mount handler and store returned unmount handlers
    component._mountHandlers.map((handler)=>{
        const mountedReturn = handler.apply(component, []);
        if ((0, _common._isFunction)(mountedReturn)) component._unmountHandlers.push(mountedReturn);
    });
    // Reset mount handlers, no need to keep them
    component._mountHandlers = [];
    component.isMounted = true;
}
function unmountComponent(component) {
    component._unmountHandlers.map((h)=>h.apply(component, []));
    component._observables.map((o)=>o.dispose());
    // FIXME : Do we need to do this ? Is it efficient or is it just noise ?
    //delete component.vnode
    // delete component.propsProxy
    delete component._mountHandlers;
    delete component._renderHandlers;
    delete component._unmountHandlers;
    delete component._observables;
    component.isMounted = false;
}
function recursivelyUpdateMountState(node, doMount) {
    if (node.type == (0, _common._TEXT_NODE_TYPE_NAME)) return;
    (0, _common._flattenChildren)(node).map((c)=>c && recursivelyUpdateMountState(c, doMount));
    if (node._component) doMount ? mountComponent(node._component) : unmountComponent(node._component);
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
    const root = (0, _jsx.createVNode)((0, _common._ROOT_NODE_TYPE_NAME), {
        children: (0, _common._forceArray)(rootNode)
    });
    root.dom = parentElement;
    (0, _diff.diffChildren)(root, parentElement[0, _diff._DOM_PRIVATE_VIRTUAL_NODE_KEY]);
    parentElement[0, _diff._DOM_PRIVATE_VIRTUAL_NODE_KEY] = root;
}
// ----------------------------------------------------------------------------- INVALIDATION
let componentsToUpdate = [];
function updateDirtyComponents() {
    let p;
    // TODO : Update with depth ! Deepest first ? Or last ?
    componentsToUpdate.map((component)=>{
        (0, _diff.diffNode)(component.vnode, component.vnode);
    });
    componentsToUpdate = [];
    p && p();
}
function invalidateComponent(component) {
    // Queue rendering before end of frame
    if (componentsToUpdate.length === 0) (0, _common._microtask)(updateDirtyComponents);
    // Invalidate this component once
    if (component._isDirty) return;
    component._isDirty = true;
    // Store it into the list of dirty components
    componentsToUpdate.push(component);
}

},{"./common":"8NUdO","./diff":"6sa8r","./jsx":"beq5O","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"6ChQY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A bit is a piece of data associated to a signal, a getter and a setter.
 * A raw bit does not dispatch the signal when set on purpose. It's meant to be
 * used by an upper function which holds dispatch as a private member.
 * @param initialValue Initial value or initial value generator.
 */ parcelHelpers.export(exports, "createBit", ()=>createBit);
parcelHelpers.export(exports, "createStateObservable", ()=>createStateObservable);
parcelHelpers.export(exports, "createAsyncObservable", ()=>createAsyncObservable);
var _signal = require("@zouloux/signal");
var _common = require("./common");
const prepareInitialValue = (initialValue)=>(0, _common._isFunction)(initialValue) ? initialValue() : initialValue;
const executeSetter = (currentValue, setter)=>(0, _common._isFunction)(setter) ? setter(currentValue) : setter;
function createBit(initialValue) {
    // Init and store the value in this scope
    let value = prepareInitialValue(initialValue);
    // Create signal and extract dispatch method from it
    // So code accessing signal externally would not be able to dispatch and mess
    const onChanged = (0, _signal.Signal)();
    const { dispatch  } = onChanged;
    delete onChanged.dispatch;
    // Return bit API
    return {
        onChanged,
        dispatch,
        get () {
            return value;
        },
        set (newValue) {
            value = executeSetter(value, newValue);
        },
        dispose () {
            onChanged.clear();
            value = null;
        }
    };
}
function createStateObservable(initialValue, beforeChanged) {
    // Create the bit and extract private dispatch and setter
    // TODO : IMPORTANT : Weirdly, we can destruct like this with tsc
    // 	get value () { return get() } will not work and always return initial value
    // const { get, set, dispatch, ...bit } = createBit<GType>( initialValue );
    const bit = createBit(initialValue);
    return {
        // ...bit,
        onChanged: bit.onChanged,
        dispose: bit.dispose,
        get value () {
            return bit.get();
        },
        async set (newValue) {
            const oldValue = bit.get();
            newValue = executeSetter(oldValue, newValue);
            bit.set(newValue);
            if (beforeChanged) {
                // isLocked = true;
                const haltChange = await beforeChanged(newValue, oldValue);
                if (haltChange === true) {
                    bit.set(oldValue);
                    // isLocked = false;
                    return;
                }
            }
            // isLocked = false;
            bit.dispatch(newValue, oldValue);
        }
    };
}
function createAsyncObservable(initialValue, beforeChanged) {
    // Create the bit and extract private dispatch and setter
    // const { get, set, dispatch, ...bit } = createBit<GType>( initialValue );
    const bit = createBit(initialValue);
    let isChanging = false;
    let wasAlreadyChanging = false;
    return {
        // ...bit,
        onChanged: bit.onChanged,
        dispose: bit.dispose,
        get value () {
            return bit.get();
        },
        get isChanging () {
            return isChanging;
        },
        get wasAlreadyChanging () {
            return wasAlreadyChanging;
        },
        async set (newValue) {
            // Keep old to check changes
            const oldValue = bit.get();
            newValue = executeSetter(oldValue, newValue);
            bit.set(newValue);
            // Call private changed as async (may change state asynchronously)
            if (beforeChanged) {
                if (isChanging) wasAlreadyChanging = true;
                isChanging = true;
                const haltChange = await beforeChanged(newValue, oldValue);
                if (haltChange === true) {
                    bit.set(oldValue);
                    isChanging = false;
                    wasAlreadyChanging = false;
                    return;
                }
                isChanging = false;
                if (wasAlreadyChanging) {
                    wasAlreadyChanging = false;
                    return;
                }
            }
            // Call public onChange signal with new and old values
            bit.dispatch(newValue, oldValue);
        }
    };
}

},{"@zouloux/signal":"kuTKe","./common":"8NUdO","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"kuTKe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _signalEs2020Mjs = require("./signal.es2020.mjs");
parcelHelpers.exportAll(_signalEs2020Mjs, exports);
var _stateSignalEs2020Mjs = require("./state-signal.es2020.mjs");
parcelHelpers.exportAll(_stateSignalEs2020Mjs, exports);
var _observableEs2020Mjs = require("./observable.es2020.mjs");
parcelHelpers.exportAll(_observableEs2020Mjs, exports);

},{"./signal.es2020.mjs":"kBbw3","./state-signal.es2020.mjs":"74ZV8","./observable.es2020.mjs":"49l5Z","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"kBbw3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// TODO v1.1 RC
// -> Better generic types that can leak from dispatch, without generic set at init
// -> Better generic types which respect type order for GHP
// ----------------------------------------------------------------------------- CLASSIC SIGNAL
parcelHelpers.export(exports, "Signal", ()=>Signal);
function Signal() {
    // List of attached listeners
    let _listeners = [];
    // Remove a listener by its reference
    const remove = (handler)=>_listeners = _listeners.filter((l)=>l[0] !== handler);
    // Add a listener with once and call at init parameters
    function add(handler, once, callAtInit = false) {
        // Add listener
        _listeners.push([
            handler,
            once
        ]);
        // Call at init with parameters if callAtInit is an array of parameters
        // Just call without parameters if callAtInit is true
        callAtInit && handler.apply(null, Array.isArray(callAtInit) ? callAtInit : null);
        // Return a handler which will remove this listener
        // Very handy with React hooks like useLayoutEffect
        return ()=>remove(handler);
    }
    // Return public API
    return {
        // Add and return a remove thunk
        add (handler, callAtInit = false) {
            return add(handler, false, callAtInit);
        },
        // Add once and return a remove thunk
        once (handler) {
            return add(handler, true);
        },
        remove,
        dispatch: (...rest)=>_listeners.map((listener)=>{
                // Remove listener if this is a once
                listener[1] && remove(listener[0]);
                // Execute with parameters
                return listener[0](...rest);
            }),
        clear () {
            _listeners = [];
        },
        get listeners () {
            return _listeners.map((l)=>l[0]);
        }
    };
}
exports.default = Signal;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"74ZV8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// ----------------------------------------------------------------------------- STATE SIGNAL
parcelHelpers.export(exports, "StateSignal", ()=>StateSignal);
var _signalEs2020Mjs = require("./signal.es2020.mjs");
function StateSignal(_state = null, _signal = (0, _signalEs2020Mjs.Signal)()) {
    return {
        ..._signal,
        get state () {
            return _state;
        },
        // Add and return a remove thunk
        add (handler, callAtInit = false) {
            // Call at init will dispatch current state and not a configurable array of props
            return _signal.add(handler, callAtInit === true ? [
                _state
            ] : false);
        },
        // Add once and return a remove thunk
        once (handler) {
            return _signal.once(handler);
        },
        dispatch (state) {
            _state = state;
            return _signal.dispatch(state);
        },
        // Remove listeners and stored state
        clear () {
            _signal.clear();
            _state = null;
        }
    };
}

},{"./signal.es2020.mjs":"kBbw3","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"49l5Z":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A bit is a piece of data associated to a signal, a getter and a setter.
 * A raw bit does not dispatch the signal when set on purpose. It's meant to be
 * used by an upper function which holds dispatch as a private member.
 * @param initialValue Initial value or initial value generator.
 */ parcelHelpers.export(exports, "createBit", ()=>createBit);
/**
 * The simplest observable, holds a value a	and dispatch when mutated.
 * No shallow check, no invalidation step, not cancellable.
 * Everything is synchronous.
 * Has a private _dispose method to destroy it from memory.
 * @param initialValue Initial value or initial value generator.
 */ parcelHelpers.export(exports, "createBasicObservable", ()=>createBasicObservable);
parcelHelpers.export(exports, "createStateObservable", ()=>createStateObservable);
parcelHelpers.export(exports, "createAsyncObservable", ()=>createAsyncObservable);
var _signalEs2020Mjs = require("./signal.es2020.mjs");
function prepareInitialValue(initialValue) {
    return typeof initialValue === "function" ? initialValue() : initialValue;
}
function createBit(initialValue) {
    // Init and store the value in this scope
    let value = prepareInitialValue(initialValue);
    // Create signal and extract dispatch method from it
    // So code accessing signal externally would not be able to dispatch and mess
    const onChanged = (0, _signalEs2020Mjs.Signal)();
    const { dispatch  } = onChanged;
    onChanged.dispatch = null;
    // Return bit API
    return {
        onChanged,
        dispatch,
        get () {
            return value;
        },
        set (newValue) {
            value = newValue;
        },
        dispose () {
            onChanged.clear();
            value = null;
        }
    };
}
function createBasicObservable(initialValue) {
    // Create the bit and extract private dispatch and setter
    const { get , set , dispatch , ...bit } = createBit(initialValue);
    return {
        ...bit,
        get value () {
            return get();
        },
        set (newValue) {
            const oldValue = get();
            set(newValue);
            dispatch(newValue, oldValue);
        }
    };
}
function createStateObservable(initialValue, beforeChanged) {
    // Create the bit and extract private dispatch and setter
    const { get , set , dispatch , ...bit } = createBit(initialValue);
    return {
        ...bit,
        get value () {
            return get();
        },
        async set (newValue) {
            const oldValue = get();
            set(newValue);
            if (beforeChanged) {
                // isLocked = true;
                const haltChange = await beforeChanged(newValue, oldValue);
                if (haltChange === true) {
                    set(oldValue);
                    // isLocked = false;
                    return;
                }
            }
            // isLocked = false;
            dispatch(newValue, oldValue);
        }
    };
}
function createAsyncObservable(initialValue, beforeChanged) {
    // Create the bit and extract private dispatch and setter
    const { get , set , dispatch , ...bit } = createBit(initialValue);
    let isChanging = false;
    let wasAlreadyChanging = false;
    return {
        ...bit,
        get value () {
            return get();
        },
        get isChanging () {
            return isChanging;
        },
        get wasAlreadyChanging () {
            return wasAlreadyChanging;
        },
        async set (newValue) {
            // Keep old to check changes
            const oldValue = get();
            set(newValue);
            // Call private changed as async (may change state asynchronously)
            if (beforeChanged) {
                if (isChanging) wasAlreadyChanging = true;
                isChanging = true;
                const haltChange = await beforeChanged(newValue, oldValue);
                if (haltChange === true) {
                    set(oldValue);
                    isChanging = false;
                    wasAlreadyChanging = false;
                    return;
                }
                isChanging = false;
                if (wasAlreadyChanging) {
                    wasAlreadyChanging = false;
                    return;
                }
            }
            // Call public onChange signal with new and old values
            dispatch(newValue, oldValue);
        }
    };
}

},{"./signal.es2020.mjs":"kBbw3","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"fdaPH":[function(require,module,exports) {
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
        setFromVNode (vnode) {
            value.dom = vnode.dom;
            value.component = vnode._component;
        }
    };
    return value;
}
function refs() {
    const value = {
        list: [],
        setFromVNode (index, vnode) {
            // Delete
            if (vnode == null) {
                delete value.list[index];
                value.list.length--;
            // Update
            } else if (index in value.list) {
                value.list[index].component = vnode._component;
                value.list[index].dom = vnode.dom;
            // Create
            } else value.list[index] = {
                dom: vnode.dom,
                component: vnode._component
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
var _common = require("./common");
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
        previousUnmountHandler && previousUnmountHandler(oldState);
        // Call executeHandler with new and old state
        const executeResult = executeHandler(state, oldState);
        // Get previous unmount handler from return or cancel it
        previousUnmountHandler = (0, _common._isFunction)(executeResult) ? executeResult : null;
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
            if (oldState != state) updateState(oldState);
        }
    });
}

},{"./diff":"6sa8r","./common":"8NUdO","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}]},[], null, "parcelRequirea1a1")

