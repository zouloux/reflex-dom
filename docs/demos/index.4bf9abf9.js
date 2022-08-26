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
// NOTE : Avoid glob exports from which insert a helper
// Unzipped is smaller with glob but bigger when zipped;
// ----------------------------------------------------------------------------- IMPORT / EXPORT
// Export public API
parcelHelpers.export(exports, "state", ()=>(0, _states.state));
parcelHelpers.export(exports, "getCurrentComponent", ()=>(0, _diff.getCurrentComponent));
parcelHelpers.export(exports, "ref", ()=>(0, _ref.ref));
parcelHelpers.export(exports, "refs", ()=>(0, _ref.refs));
parcelHelpers.export(exports, "defaultProps", ()=>(0, _props.defaultProps));
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
var _props = require("./props");
var _lifecycle = require("./lifecycle");
var _render = require("./render");
var _jsx = require("./jsx");

},{"./states":"jPtHd","./diff":"6sa8r","./ref":"fdaPH","./props":"bJNzu","./lifecycle":"8Qw9Y","./render":"krTG7","./jsx":"beq5O","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"jPtHd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_prepareInitialValue", ()=>_prepareInitialValue);
// ----------------------------------------------------------------------------- STATE
parcelHelpers.export(exports, "state", ()=>state);
var _diff = require("./diff");
var _render = require("./render");
const _prepareInitialValue = (initialValue, oldValue)=>typeof initialValue == "function" ? initialValue(oldValue) : initialValue;
function state(initialValue, stateOptions = {}) {
    // Prepare initial value if it's a function
    initialValue = _prepareInitialValue(initialValue);
    // Get current extended component
    const component = (0, _diff.getCurrentComponent)();
    // const affectedNodesIndex = component._affectedNodesByStates.push([]) - 1
    // Set value and invalidate or render component
    function _setAndInvalidate(newValue, resolve) {
        initialValue = stateOptions.filter ? stateOptions.filter(newValue, initialValue) : newValue;
        if (stateOptions.directInvalidation) {
            (0, _diff._diffNode)(component.vnode, component.vnode);
            resolve?.();
        } else {
            resolve && component._afterRenderHandlers.push(resolve);
            (0, _render.invalidateComponent)(component);
        }
    }
    // Return public API with value get/set and set function
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
            _setAndInvalidate(newValue);
        },
        set: (newValue)=>new Promise((resolve)=>_setAndInvalidate(_prepareInitialValue(newValue, initialValue), resolve)),
        // Changed knows if it's a state
        get _isState () {
            return true;
        }
    };
}

},{"./diff":"6sa8r","./render":"krTG7","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"6sa8r":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_DOM_PRIVATE_VIRTUAL_NODE_KEY", ()=>_DOM_PRIVATE_VIRTUAL_NODE_KEY);
parcelHelpers.export(exports, "_DOM_PRIVATE_LISTENERS_KEY", ()=>_DOM_PRIVATE_LISTENERS_KEY);
parcelHelpers.export(exports, "getCurrentComponent", ()=>getCurrentComponent);
// ----------------------------------------------------------------------------- DIFF ELEMENT
/**
 * TODO DOC
 * @param newNode
 * @param oldNode
 * @param nodeEnv
 */ parcelHelpers.export(exports, "_diffElement", ()=>_diffElement);
/**
 * TODO DOC
 * @param newParentNode
 * @param oldParentNode
 * @param nodeEnv
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
// Namespace for SVG elements
const _svgNS = "http://www.w3.org/2000/svg";
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
function _diffElement(newNode, oldNode, nodeEnv) {
    // TODO : DOC
    let dom;
    if (oldNode) {
        dom = oldNode.dom;
        if (newNode.type === (0, _common._VNodeTypes_TEXT) && oldNode.value !== newNode.value) dom.nodeValue = newNode.value;
    } else {
        const document = nodeEnv.document;
        if (newNode.type === (0, _common._VNodeTypes_NULL)) dom = document.createComment("");
        else if (newNode.type === (0, _common._VNodeTypes_TEXT)) dom = document.createTextNode(newNode.value);
        else if (newNode.type === (0, _common._VNodeTypes_ELEMENT)) {
            if (newNode.value === "svg") nodeEnv.isSVG = true;
            dom = nodeEnv.isSVG ? document.createElementNS(_svgNS, newNode.value) : document.createElement(newNode.value);
        }
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
        if (name === "children" || name === "key" || name === "ref" || name in newNode.props && newNode.props[name] === oldNode.props[name]) continue;
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
        // Do not continue if attribute or event did not change
        if (name1 === "children" || name1 === "key" || name1 === "ref" || !value || oldNode && name1 in oldNode.props && oldNode.props[name1] === value) continue;
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
            if (name1 == "class" && Array.isArray(value)) value = value.flat(1).filter((v)=>v !== true && !!v).join(" ").trim();
            else if (name1 == "style" && typeof value == "object") {
                // https://esbench.com/bench/62ecb9866c89f600a5701b47
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
 * @param nodeEnv
 */ function injectChildren(parentDom, node, nodeEnv) {
    const totalChildren = node.props.children.length;
    for(let i = 0; i < totalChildren; ++i){
        const child = node.props.children[i];
        _diffNode(child, null, nodeEnv);
        registerKey(node, child);
        if (child.dom) parentDom.appendChild(child.dom);
    }
}
// TODO : DOC
let previousParentContainer;
let previousParentContainerDom;
function _diffChildren(newParentNode, oldParentNode, nodeEnv) {
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
    if (!oldParentNode || oldParentNode.props.children.length === 0) return injectChildren(parentDom, newParentNode, nodeEnv);
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
    const total = newChildren.length;
    if (!total) return;
    let i;
    for(i = 0; i < total; ++i)registerKey(newParentNode, newChildren[i]);
    // Browse all new nodes
    const oldParentKeys = oldParentNode._keys;
    let collapseCount = 0;
    for(i = 0; i < total; ++i){
        // Collapsed corresponding index between old and new nodes
        // To be able to detect moves or if just collapsing because a top sibling
        // has been removed
        const newChildNode = newChildren[i];
        if (!newChildNode) continue;
        let oldChildNode = oldChildren[i];
        if (oldChildNode && oldChildNode.key && newParentNode._keys && !newParentNode._keys.has(oldChildNode.key)) collapseCount++;
        // Has key, same key found in old, same type on both
        /** MOVE & UPDATE KEYED CHILD **/ if (newChildNode.key && (oldChildNode = oldParentKeys?.get(newChildNode.key)) && oldChildNode.type === newChildNode.type && (newChildNode.type !== (0, _common._VNodeTypes_ELEMENT) || oldChildNode.value === newChildNode.value)) {
            // console.log("move keyed", newChildNode, oldChildNode)
            _diffNode(newChildNode, oldChildNode, nodeEnv);
            oldChildNode._keep = true;
            // Check if index changed, compare with collapsed index to detect moves
            const collapsedIndex = i + collapseCount;
            // FIXME : Should do 1 operation when swapping positions, not 2
            // FIXME : Perf, is indexOf quick ? Maybe store every indexes in an array ?
            if (oldChildren.indexOf(oldChildNode) !== collapsedIndex) parentDom.insertBefore(newChildNode.dom, parentDom.children[collapsedIndex + 1]);
        } else if (newChildNode.key && oldParentKeys && !oldParentKeys.get(newChildNode.key)) {
            // console.log("create from key", newChildNode)
            _diffNode(newChildNode, null, nodeEnv);
            parentDom.insertBefore(newChildNode.dom, parentDom.children[i]);
            collapseCount--;
        } else if (i in oldChildren && (oldChildNode = oldChildren[i]) && oldChildNode.type === newChildNode.type && (newChildNode.type !== (0, _common._VNodeTypes_ELEMENT) || oldChildNode.value === newChildNode.value)) {
            // console.log("update in place", newChildNode, oldChildNode)
            _diffNode(newChildNode, oldChildNode, nodeEnv);
            oldChildNode._keep = true;
        } else {
            // console.log("create no key", newChildNode)
            _diffNode(newChildNode, null, nodeEnv);
            parentDom.insertBefore(newChildNode.dom, parentDom.children[i]);
            collapseCount--;
        }
    }
    // Remove old children which are not reused
    const totalOld = oldChildren.length;
    for(i = 0; i < totalOld; ++i){
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
    }
}
function _renderComponentNode(node) {
    // Select current component before rendering
    _currentComponent = node._component;
    // FIXME: Before render handlers ?
    // Execute rendering
    _currentComponent._isRendering = true;
    // Use instance of props created with the component
    // We can use v-node props directly if we know this component is stateless
    const { isFactory  } = node.value;
    const props = isFactory === false ? node.props : _currentComponent._props;
    // Inject new props into props instance
    if (isFactory !== false) {
        Object.assign(props, node.props);
        // On updates, for factory components, prune props
        if (isFactory) {
            for(let i in props)if (!(i in node.props)) delete props[i];
        }
    }
    // Inject default props after prune
    // FIXME : Optim : Since default props is set once, can't we juste not prune default props ?
    if (_currentComponent._defaultProps) (0, _props.injectDefaults)(props, _currentComponent._defaultProps);
    // Render component with props instance and component API instance
    // FIXME : Add ref as second argument ? Is it useful ?
    const result = _currentComponent._render.apply(_currentComponent, [
        props,
        _currentComponent._componentAPI
    ]);
    _currentComponent._isRendering = false;
    // Unselect current component
    _currentComponent = null;
    return result;
}
function _diffNode(newNode, oldNode, nodeEnv = newNode._nodeEnv) {
    // IMPORTANT : Here we clone node if we got the same instance
    // 			   Otherwise, altering props.children after render will fuck everything up
    // Clone identical nodes to be able to diff them
    if (oldNode && oldNode === newNode) newNode = (0, _jsx._cloneVNode)(oldNode);
    // Transfer id for refs
    if (oldNode && oldNode._id) newNode._id = oldNode._id;
    // Create / update DOM element for those node types
    if (// FIXME : Create a set of number ? Or bitwise checking ? check perfs
    newNode.type === (0, _common._VNodeTypes_TEXT) || newNode.type === (0, _common._VNodeTypes_ELEMENT) || newNode.type === (0, _common._VNodeTypes_NULL)) {
        // Clone node env for children, to avoid env to propagate on siblings
        nodeEnv = Object.assign({}, nodeEnv);
        // Compute dom element for this node
        newNode.dom = _diffElement(newNode, oldNode, nodeEnv);
    } else if (newNode.type === (0, _common._VNodeTypes_COMPONENT)) {
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
            if (typeof result === "function") {
                newNode.value.isFactory = true;
                component._render = result;
            } else if (typeof result === "object" && "type" in result) {
                newNode.value.isFactory = false;
                component._render = newNode.value;
                renderResult = result;
            }
        } else {
            newNode._component = component;
            component.vnode = newNode;
        }
        // Here we check if this component should update
        // By default, we always update component on refreshes
        let shouldUpdate = true;
        // If this component hasn't rendered yet ( functional components only )
        if (!renderResult && oldNode && !component.vnode.value.isFactory) {
            shouldUpdate = // Use shouldUpdate function on component API
            component._componentAPI.shouldUpdate ? component._componentAPI.shouldUpdate(newNode.props, oldNode.props) : !(0, _props.shallowPropsCompare)(newNode.props, oldNode.props, true);
            // Keep dom reference from old node
            if (!shouldUpdate) newNode.dom = oldNode.dom;
        }
        // If this component needs a render (factory function), render it
        if (!renderResult && shouldUpdate) renderResult = _renderComponentNode(newNode);
        // We rendered something (not reusing old component)
        if (renderResult) {
            _diffNode(renderResult, component.children, nodeEnv);
            component.children = renderResult;
            newNode.dom = renderResult.dom;
        }
    }
    // Inject node env into node, now that it has been diffed and rendered
    if (!newNode._nodeEnv) newNode._nodeEnv = nodeEnv;
    // Update ref on node
    updateNodeRef(newNode);
    // Now that component and its children are ready
    if (newNode.type === (0, _common._VNodeTypes_COMPONENT)) {
        // If component is not mounted yet, mount it recursively
        if (!newNode._component.isMounted) (0, _component._recursivelyUpdateMountState)(newNode, true);
        // Execute after render handlers
        if (newNode.value.isFactory !== false) (0, _common._dispatch)(newNode._component._renderHandlers, newNode._component, []);
    } else if (newNode.type > (0, _common._VNodeTypes_CONTAINERS)) _diffChildren(newNode, oldNode, nodeEnv);
}

},{"./common":"8NUdO","./jsx":"beq5O","./component":"jK9Qg","./props":"bJNzu","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"8NUdO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_VNodeTypes_NULL", ()=>_VNodeTypes_NULL);
parcelHelpers.export(exports, "_VNodeTypes_TEXT", ()=>_VNodeTypes_TEXT);
parcelHelpers.export(exports, "_VNodeTypes_CONTAINERS", ()=>_VNodeTypes_CONTAINERS);
parcelHelpers.export(exports, "_VNodeTypes_ROOT", ()=>_VNodeTypes_ROOT);
parcelHelpers.export(exports, "_VNodeTypes_ELEMENT", ()=>_VNodeTypes_ELEMENT);
parcelHelpers.export(exports, "_VNodeTypes_COMPONENT", ()=>_VNodeTypes_COMPONENT);
parcelHelpers.export(exports, "_VNodeTypes_LIST", ()=>_VNodeTypes_LIST);
parcelHelpers.export(exports, "_dispatch", ()=>_dispatch);
const _VNodeTypes_NULL = 0;
const _VNodeTypes_TEXT = 1;
const _VNodeTypes_CONTAINERS = 4;
const _VNodeTypes_ROOT = 5;
const _VNodeTypes_ELEMENT = 6;
const _VNodeTypes_COMPONENT = 7;
const _VNodeTypes_LIST = 8;
function _dispatch(handlers, scope, args) {
    const total = handlers.length;
    for(let i = 0; i < total; ++i)handlers[i].apply(scope, args);
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
// FIXME : Is it an array ? Maybe its working as single prop
// let _dataListenersForNextNode = []
//
// export function addDataListenerForNextNode ( listener ) {
// 	_dataListenersForNextNode.push( listener )
// }
//
// function triggerDataListenerForNode ( node:VNode ) {
// 	_dataListenersForNextNode.forEach( handler => handler( node ) )
// 	_dataListenersForNextNode = []
// }
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
function _createVNode(type, value = null, props = {}, key, _ref) {
    return {
        type,
        value,
        props,
        key,
        _ref
    };
// const node:VNode = { type, value, props, key, _ref }
// triggerDataListenerForNode( node )
// return node;
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
    const total = props.children.length;
    for(let i = 0; i < total; ++i){
        const child = props.children[i];
        const typeofChild = typeof child;
        // Detect text nodes
        if (typeofChild === "string" || typeofChild === "number") props.children[i] = _createVNode((0, _common._VNodeTypes_TEXT), child);
        else if (Array.isArray(child)) props.children[i] = _createVNode((0, _common._VNodeTypes_LIST), null, {
            children: child
        });
        else if (child === null) props.children[i] = _createVNode((0, _common._VNodeTypes_NULL));
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
function _createComponentInstance(vnode) {
    return {
        vnode,
        name: vnode.value.name,
        isMounted: false,
        _isDirty: false,
        _render: vnode.value,
        _mountHandlers: [],
        _renderHandlers: [],
        _unmountHandlers: [],
        _props: {},
        _afterRenderHandlers: [],
        //_affectedNodesByStates: [],
        _isRendering: false,
        // Component API is given to every functional or factory component
        _componentAPI: {}
    };
}
function _mountComponent(component) {
    // Call every mount handler and store returned unmount handlers
    const total = component._mountHandlers.length;
    for(let i = 0; i < total; ++i){
        const mountedReturn = component._mountHandlers[i].apply(component, []);
        if (typeof mountedReturn === "function") component._unmountHandlers.push(mountedReturn);
    }
    // Reset mount handlers, no need to keep them
    component._mountHandlers = [];
    component.isMounted = true;
}
function _unmountComponent(component) {
    (0, _common._dispatch)(component._unmountHandlers, component, []);
    component.isMounted = false;
    // Cut component branch from virtual node to allow GC to destroy component
    delete component.vnode._component;
    delete component.vnode;
// FIXME : Do we need to do this ? Is it efficient or is it just noise ?
// delete component.vnode
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
        const total = node.props.children.length;
        for(let i = 0; i < total; ++i){
            const child = node.props.children[i];
            _recursivelyUpdateMountState(child, doMount);
        // FIXME : Is it necessary ?
        // Remove all event listeners
        // if ( child.type === VNodeTypes.ELEMENT ) {
        // 	const listeners = child.dom[ _DOM_PRIVATE_LISTENERS_KEY ]
        // 	Object.keys( listeners ).forEach( event => {
        // 		console.log( event )
        // 		child.dom.removeEventListener
        // 	})
        // }
        }
        if (node._component) doMount ? _mountComponent(node._component) : _unmountComponent(node._component);
    }
}

},{"./common":"8NUdO","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"bJNzu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "injectDefaults", ()=>injectDefaults);
parcelHelpers.export(exports, "defaultProps", ()=>defaultProps);
parcelHelpers.export(exports, "shallowPropsCompare", ()=>shallowPropsCompare);
var _common = require("./common");
var _diff = require("./diff");
function injectDefaults(props, defaults) {
    for(let i in defaults)if (!(i in props)) props[i] = defaults[i];
}
function defaultProps(props, defaults) {
    (0, _diff.getCurrentComponent)()._defaultProps = defaults;
    injectDefaults(props, defaults);
    return props;
}
const shallowPropsCompare = (a, b, childrenCheck = true)=>// Same amount of properties ?
    Object.keys(a).length === Object.keys(b).length && Object.keys(a).every((key)=>childrenCheck && key === "children" ? // Same array instances -> we validate directly without browsing children
        a[key] === b[key] || a.length === 0 && b.length === 0 || // check if children props exists on props b
        b[key] && a[key].length === b[key].length && !a[key].find((c, i)=>{
            const d = b[key][i];
            // Here we inverted condition to match diff.ts checks
            // Condition is -> check if same nodes types
            // Find is -> halt when any node type differs (so, the inverse)
            return !(c.type === d.type && (c.type !== (0, _common._VNodeTypes_ELEMENT) || c.value === d.value));
        }) : b.hasOwnProperty(key) && a[key] === b[key]);

},{"./common":"8NUdO","./diff":"6sa8r","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"krTG7":[function(require,module,exports) {
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
function render(rootNode, parentElement, documentInterface = document) {
    // When using render, we create a new root node to detect new renders
    // This node is never rendered, we just attach it to the parentElement and render its children
    const root = (0, _jsx._createVNode)((0, _common._VNodeTypes_ROOT), null, {
        children: [
            rootNode
        ]
    });
    root.dom = parentElement;
    (0, _diff._diffNode)(root, parentElement[0, _diff._DOM_PRIVATE_VIRTUAL_NODE_KEY], {
        isSVG: false,
        document: documentInterface
    });
    parentElement[0, _diff._DOM_PRIVATE_VIRTUAL_NODE_KEY] = root;
}
// ----------------------------------------------------------------------------- INVALIDATION
let componentsToUpdate = [];
function updateDirtyComponents() {
    let p;
    // TODO : Update with depth ! Deepest first ? Or last ?
    const total = componentsToUpdate.length;
    for(let i = 0; i < total; ++i){
        const component = componentsToUpdate[i];
        (0, _diff._diffNode)(component.vnode, component.vnode);
        (0, _common._dispatch)(component._afterRenderHandlers, component, []);
        component._afterRenderHandlers = [];
        component._isDirty = false;
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
    }
    componentsToUpdate = [];
    p?.();
}
// Internal fast microtask polyfill
const _microtask = self.queueMicrotask ? self.queueMicrotask : (h)=>self.setTimeout(h, 0);
function invalidateComponent(component) {
    // Queue rendering before end of frame
    if (!componentsToUpdate.length) _microtask(updateDirtyComponents);
    // Invalidate this component once
    if (!component._isDirty) {
        component._isDirty = true;
        // Store it into the list of dirty components
        componentsToUpdate.push(component);
    }
}

},{"./common":"8NUdO","./diff":"6sa8r","./jsx":"beq5O","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"fdaPH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ref", ()=>ref);
parcelHelpers.export(exports, "refs", ()=>refs);
function ref() {
    const value = {
        component: null,
        dom: null,
        _setFromVNode (vNode) {
            value.dom = vNode.dom;
            value.component = vNode._component;
        }
    };
    return value;
}
function refs() {
    let _counter = 0;
    let _list = [];
    function registerAtIndex(vNode, index) {
        // Delete
        if (!vNode.dom) _list = _list.filter((_, i)=>i !== index);
        else _list[index] = {
            dom: vNode.dom,
            component: vNode._component
        };
    }
    const value = {
        get list () {
            return _list;
        },
        _setFromVNode (vNode) {
            // Set vNode id from counter.
            // Node ids starts from 1 to be able to compress a bit
            if (!vNode._id) vNode._id = ++_counter;
            // Set back from starting 1 to 0
            registerAtIndex(vNode, vNode._id - 1);
        },
        // FIXME : Better api ?
        atIndex (index) {
            return {
                // TODO : Check if terser uses same mangled name
                _setFromVNode (vNode) {
                    registerAtIndex(vNode, index);
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
    // Do not continue if we use changed into a functional component
    // Because changed() is called at each render, it would cause handler to be
    // added at each render. Here we have only one listener
    // if ( component.vnode.value.isFactory === false )
    // 	return
    // No executeHandler function means detectChanges has been omitted.
    // Do not check any change, just call executeHandler after every render.
    if (!executeHandler) {
        component._renderHandlers.push(detectChanges);
        return;
    }
    // Get first state
    if (Array.isArray(detectChanges)) {
        let _detectChanges = detectChanges;
        detectChanges = ()=>_detectChanges.map((dependency)=>{
                // Custom change function
                if (typeof dependency === "function") return dependency();
                else if (typeof dependency === "object" && dependency._isState) return dependency.value;
            });
    }
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
        previousUnmountHandler = typeof executeResult == "function" ? executeResult : null;
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

