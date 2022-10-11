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
})({"49Hhc":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "7b86521a65ad9167";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"9qmIX":[function(require,module,exports) {
var _src = require("../src");
// Reflex components can be pure functions or factory functions
function ReflexApp(props) {
    // How basic state works
    const counter = (0, _src.state)(0);
    const increment = ()=>counter.value++;
    const reset = ()=>counter.value = 0;
    // No need to use ref for locally scoped variables
    let firstUpdate = true;
    // Detect changes of states or props
    (0, _src.changed)([
        counter
    ], (newValue)=>{
        console.log(`Counter just updated to ${newValue}`, firstUpdate);
        firstUpdate = false;
    });
    // How refs of dom elements works
    const title = (0, _src.ref)();
    (0, _src.mounted)(()=>console.log(title.dom.innerHTML));
    // Returns a render function
    // Classes can be arrays ! Falsy elements of the array will be discarded
    return ()=>/*#__PURE__*/ (0, _src.h)("div", {
            class: [
                "ReflexApp",
                props.modifier,
                false
            ],
            __source: {
                fileName: "example/example.tsx",
                lineNumber: 24,
                columnNumber: 15
            },
            __self: this
        }, /*#__PURE__*/ (0, _src.h)("h1", {
            ref: title,
            __source: {
                fileName: "example/example.tsx",
                lineNumber: 25,
                columnNumber: 3
            },
            __self: this
        }, "Hello from Reflex ", props.emoji), /*#__PURE__*/ (0, _src.h)("button", {
            onClick: increment,
            __source: {
                fileName: "example/example.tsx",
                lineNumber: 26,
                columnNumber: 3
            },
            __self: this
        }, "Increment"), "\xa0", /*#__PURE__*/ (0, _src.h)("button", {
            onClick: reset,
            __source: {
                fileName: "example/example.tsx",
                lineNumber: 27,
                columnNumber: 3
            },
            __self: this
        }, "Reset"), "\xa0", /*#__PURE__*/ (0, _src.h)("span", {
            __source: {
                fileName: "example/example.tsx",
                lineNumber: 28,
                columnNumber: 3
            },
            __self: this
        }, "Counter : ", counter.value));
}
// Render it like any other v-dom library
(0, _src.render)(/*#__PURE__*/ (0, _src.h)(ReflexApp, {
    modifier: "ReflexApp-lightMode",
    emoji: "\uD83D\uDC4B",
    __source: {
        fileName: "example/example.tsx",
        lineNumber: 33,
        columnNumber: 9
    },
    __self: undefined
}), document.body);

},{"../src":"h7u1C"}],"h7u1C":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/// <reference lib="dom" />
// NOTE : Avoid glob exports from which insert a helper
// Unzipped is smaller with glob but bigger when zipped;
// ----------------------------------------------------------------------------- IMPORT / EXPORT
// Export public API
parcelHelpers.export(exports, "state", ()=>(0, _states.state));
parcelHelpers.export(exports, "getCurrentComponent", ()=>(0, _diff.getCurrentComponent));
parcelHelpers.export(exports, "diffNode", ()=>(0, _diff.diffNode));
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

},{"./states":"6Fw3p","./diff":"fkaOW","./ref":"9qC9x","./props":"8RVhR","./lifecycle":"hrlGh","./render":"9AS2t","./jsx":"a1r5c","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6Fw3p":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_prepareInitialValue", ()=>_prepareInitialValue);
// ----------------------------------------------------------------------------- STATE
parcelHelpers.export(exports, "state", ()=>state);
var _diff = require("./diff");
var _render = require("./render");
var _common = require("./common");
const _prepareInitialValue = (initialValue, oldValue)=>typeof initialValue == "function" ? initialValue(oldValue) : initialValue;
function state(initialValue, stateOptions = {}) {
    // Prepare initial value if it's a function
    initialValue = _prepareInitialValue(initialValue);
    // Get current extended component
    const component = (0, _diff.getCurrentComponent)();
    let invalidatedNodes = [];
    // const affectedNodesIndex = component._affectedNodesByStates.push([]) - 1
    // Set value and invalidate or render component
    function _setAndInvalidate(newValue1, resolve) {
        initialValue = stateOptions.filter ? stateOptions.filter(newValue1, initialValue) : newValue1;
        /*		if ( stateOptions.atomic ) {
			console.log('Invalidated nodes:')
			invalidatedNodes.forEach( n => console.log(n))
			invalidatedNodes.map( node => {
				//diffNode( node,  )
			})
			invalidatedNodes = []
			resolve?.();
		}*/ if (stateOptions.directInvalidation) {
            (0, _diff.diffNode)(component.vnode, component.vnode);
            resolve?.();
        } else {
            resolve && component._afterRenderHandlers.push(resolve);
            (0, _render.invalidateComponent)(component);
        }
    }
    // Return public API with value get/set and set function
    const stateObject = {
        get value () {
            // if ( component._isRendering && stateOptions.atomic ) {
            // 	_trackNextNode( stateObject )
            // const nodes = _getTrackedNode()
            // console.log( nodes )
            // invalidatedNodes.push( _getCurrentNode() )
            // _trackNode( node => {
            // 	invalidatedNodes.push( node )
            // console.log("Affected node", node)
            // console.log('>', component._affectedNodesByStates[affectedNodesIndex].length, node)
            // component._affectedNodesByStates[affectedNodesIndex].push( node )
            // })
            // }
            return initialValue;
        },
        pushInvalidatedNode (node) {
            invalidatedNodes.push(node);
        },
        set value (newValue){
            _setAndInvalidate(newValue);
        },
        set: (newValue1)=>new Promise((resolve)=>_setAndInvalidate(_prepareInitialValue(newValue1, initialValue), resolve)),
        // changed() knows if it's a state
        get type () {
            return 0, _common._VNodeTypes_STATE;
        },
        // Use state as a getter without .value
        toString () {
            return stateObject.value + "";
        }
    };
    return stateObject;
}

},{"./diff":"fkaOW","./render":"9AS2t","./common":"eZRPe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fkaOW":[function(require,module,exports) {
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
parcelHelpers.export(exports, "diffNode", ()=>diffNode);
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
    if (!_currentComponent && true) throw new Error(`Reflex - getHookedComponent // Cannot use a factory hook outside of a factory component.`);
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
            const { eventName: eventName1 , eventKey: eventKey1 , useCapture: useCapture1  } = getEventNameAndKey(name1, dom);
            // Init a collection of handlers on the dom object as private property
            if (!dom[_DOM_PRIVATE_LISTENERS_KEY]) dom[_DOM_PRIVATE_LISTENERS_KEY] = new Map();
            // Store original listener to be able to remove it later
            dom[_DOM_PRIVATE_LISTENERS_KEY][eventKey1] = value;
            // And attach listener
            dom.addEventListener(eventName1, value, useCapture1);
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
        diffNode(child, null, nodeEnv);
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
            diffNode(newChildNode, oldChildNode, nodeEnv);
            oldChildNode._keep = true;
            // Check if index changed, compare with collapsed index to detect moves
            const collapsedIndex = i + collapseCount;
            // FIXME : Should do 1 operation when swapping positions, not 2
            // FIXME : Perf, is indexOf quick ? Maybe store every indexes in an array ?
            if (oldChildren.indexOf(oldChildNode) !== collapsedIndex) parentDom.insertBefore(newChildNode.dom, parentDom.children[collapsedIndex + 1]);
        } else if (newChildNode.key && oldParentKeys && !oldParentKeys.get(newChildNode.key)) {
            // console.log("create from key", newChildNode)
            diffNode(newChildNode, null, nodeEnv);
            parentDom.insertBefore(newChildNode.dom, parentDom.children[i]);
            collapseCount--;
        } else if (i in oldChildren && (oldChildNode = oldChildren[i]) && oldChildNode.type === newChildNode.type && (newChildNode.type !== (0, _common._VNodeTypes_ELEMENT) || oldChildNode.value === newChildNode.value)) {
            // console.log("update in place", newChildNode, oldChildNode)
            diffNode(newChildNode, oldChildNode, nodeEnv);
            oldChildNode._keep = true;
        } else {
            // console.log("create no key", newChildNode)
            diffNode(newChildNode, null, nodeEnv);
            parentDom.insertBefore(newChildNode.dom, parentDom.children[i]);
            collapseCount--;
        }
    }
    // Remove old children which are not reused
    const totalOld = oldChildren.length;
    for(i = 0; i < totalOld; ++i){
        const oldChildNode1 = oldChildren[i];
        if (oldChildNode1 && !oldChildNode1._keep) {
            // Call unmount handlers
            (0, _component._recursivelyUpdateMountState)(oldChildNode1, false);
            // Remove ref
            const { dom  } = oldChildNode1;
            oldChildNode1.dom = null;
            updateNodeRef(oldChildNode1);
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
        // BENCH : https://esbench.com/bench/630b6f6c6c89f600a5701bc4
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
function diffNode(newNode, oldNode, nodeEnv = newNode._nodeEnv) {
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
            diffNode(renderResult, component.children, nodeEnv);
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

},{"./common":"eZRPe","./jsx":"a1r5c","./component":"5VXDN","./props":"8RVhR","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eZRPe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_VNodeTypes_NULL", ()=>_VNodeTypes_NULL);
parcelHelpers.export(exports, "_VNodeTypes_TEXT", ()=>_VNodeTypes_TEXT);
parcelHelpers.export(exports, "_VNodeTypes_STATE", ()=>_VNodeTypes_STATE);
parcelHelpers.export(exports, "_VNodeTypes_CONTAINERS", ()=>_VNodeTypes_CONTAINERS);
parcelHelpers.export(exports, "_VNodeTypes_ROOT", ()=>_VNodeTypes_ROOT);
parcelHelpers.export(exports, "_VNodeTypes_ELEMENT", ()=>_VNodeTypes_ELEMENT);
parcelHelpers.export(exports, "_VNodeTypes_COMPONENT", ()=>_VNodeTypes_COMPONENT);
parcelHelpers.export(exports, "_VNodeTypes_LIST", ()=>_VNodeTypes_LIST);
parcelHelpers.export(exports, "_dispatch", ()=>_dispatch);
const _VNodeTypes_NULL = 0;
const _VNodeTypes_TEXT = 1;
const _VNodeTypes_STATE = 3;
const _VNodeTypes_CONTAINERS = 4;
const _VNodeTypes_ROOT = 5;
const _VNodeTypes_ELEMENT = 6;
const _VNodeTypes_COMPONENT = 7;
const _VNodeTypes_LIST = 8;
function _dispatch(handlers, scope, args) {
    const total = handlers.length;
    for(let i = 0; i < total; ++i)handlers[i].apply(scope, args);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
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

},{}],"a1r5c":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// import { IState } from "./states";
// let _trackedNodesBySignals:IState<any>[] = []
//
// export function _trackNextNode ( stateObject:IState<any> ) {
// 	_trackedNodesBySignals.push( stateObject )
// }
//
// export function _resetTrackedNode ( stateID:number ) {
//
// }
//
// function afterNode (node:VNode) {
// 	if ( _trackedNodesBySignals.length > 0 ) {
// 		_trackedNodesBySignals.forEach( s => s.pushInvalidatedNode(node) )
// 		_trackedNodesBySignals = []
// 	}
// }
// NOTE : Keep it in a function and do not inline this
// It seems to be V8 optimized. @see Preact source code
parcelHelpers.export(exports, "_createVNode", ()=>_createVNode);
parcelHelpers.export(exports, "_cloneVNode", ()=>_cloneVNode);
parcelHelpers.export(exports, "h", ()=>h) // TRACKING TEST
 /*
let $ = []
let a = 0
let st = state()

h('div', {}, [
	h('h1', {className: $}, [ 	// -> h1
		"Content ", st			// -> text[1]
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
    delete props.__source;
    delete props.__self;
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
        else if (child === null || typeofChild === "boolean") props.children[i] = _createVNode((0, _common._VNodeTypes_NULL));
    }
    // Virtual node type here can be only component or element
    // Other types are created elsewhere
    const type = typeof value === "function" ? (0, _common._VNodeTypes_COMPONENT) : (0, _common._VNodeTypes_ELEMENT);
    // Create and return the virtual node
    return _createVNode(type, value, props, props.key, props.ref);
}

},{"./common":"eZRPe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5VXDN":[function(require,module,exports) {
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

},{"./common":"eZRPe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8RVhR":[function(require,module,exports) {
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

},{"./common":"eZRPe","./diff":"fkaOW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9AS2t":[function(require,module,exports) {
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
    (0, _diff.diffNode)(root, parentElement[0, _diff._DOM_PRIVATE_VIRTUAL_NODE_KEY], {
        isSVG: false,
        document: documentInterface
    });
    parentElement[0, _diff._DOM_PRIVATE_VIRTUAL_NODE_KEY] = root;
}
// ----------------------------------------------------------------------------- INVALIDATION
let componentsToUpdate = [];
function updateDirtyComponents() {
    let p;
    p = require("./debug").trackPerformances("Update dirty components");
    // TODO : Update with depth ! Deepest first ? Or last ?
    const total = componentsToUpdate.length;
    for(let i = 0; i < total; ++i){
        const component = componentsToUpdate[i];
        (0, _diff.diffNode)(component.vnode, component.vnode);
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

},{"./common":"eZRPe","./diff":"fkaOW","./jsx":"a1r5c","./debug":"eaW0r","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eaW0r":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getReflexDebug", ()=>getReflexDebug);
parcelHelpers.export(exports, "setReflexDebug", ()=>setReflexDebug);
// ----------------------------------------------------------------------------- TRACK PERFORMANCES
parcelHelpers.export(exports, "trackPerformances", ()=>trackPerformances);
// ----------------------------------------------------------------------------- ENABLE / DISABLE
let _enableReflexDebug = false;
function getReflexDebug() {
    return _enableReflexDebug;
}
function setReflexDebug(value) {
    _enableReflexDebug = value;
}
function trackPerformances(subject) {
    if (!_enableReflexDebug) return ()=>{};
    const start = performance.now();
    return ()=>{
        const delta = ~~((performance.now() - start) / 10);
        console.info(subject, delta < 1000 ? `${delta * 10}ms` : `${delta / 100}s`);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9qC9x":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hrlGh":[function(require,module,exports) {
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
                else if (typeof dependency === "object" && dependency.type === (0, _common._VNodeTypes_STATE)) return dependency.value;
                throw new Error("Reflex - Changed can track states or functions only. changed([state, () => prop.value], ...)");
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

},{"./diff":"fkaOW","./common":"eZRPe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["49Hhc","9qmIX"], "9qmIX", "parcelRequirea1a1")

//# sourceMappingURL=example.65ad9167.js.map
