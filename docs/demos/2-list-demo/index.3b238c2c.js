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
})({"3p50b":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "8d7ecb8c3b238c2c";
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
        console.log("[parcel] \u2728 Error resolved");
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
function hmrDelete(bundle, id1) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id1][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
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

},{}],"5P6IF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "init", ()=>init);
var _reflex = require("../../src/reflex");
var _debug = require("../../src/reflex/debug");
var _listDemoApp = require("./ListDemoApp");
// -----------------------------------------------------------------------------
(0, _debug.setReflexDebug)(true);
let renderIndex = 0;
function init() {
    const p = (0, _debug.trackPerformances)("Root rendering");
    (0, _reflex.render)(/*#__PURE__*/ (0, _reflex.h)((0, _listDemoApp.ListDemoApp), {
        render: init,
        renderIndex: renderIndex++,
        __source: {
            fileName: "demos/2-list-demo/index.tsx",
            lineNumber: 12,
            columnNumber: 10
        },
        __self: this
    }), document.body);
    p();
}
init();

},{"../../src/reflex":"eG97A","../../src/reflex/debug":"6Xj7H","./ListDemoApp":"3qHlQ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eG97A":[function(require,module,exports) {
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

},{"./state":"bSelY","./ref":"kGKkC","./lifecycle":"7fq5C","./render":"gEzcf","./jsx":"iZFY4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bSelY":[function(require,module,exports) {
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

},{"./diff":"02gC6","./render":"gEzcf","./observable":"3iYOx","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"02gC6":[function(require,module,exports) {
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
    if (!_hookedComponent && true) // throw new ReflexError(`getHookedComponent // Cannot use a factory hook outside of a factory component.`)
    throw new Error(`Reflex - getHookedComponent // Cannot use a factory hook outside of a factory component.`);
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

},{"./common":"lIlR7","./jsx":"iZFY4","./component":"4N6a6","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lIlR7":[function(require,module,exports) {
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

},{}],"iZFY4":[function(require,module,exports) {
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

},{"./common":"lIlR7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4N6a6":[function(require,module,exports) {
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
            throw new Error(`Reflex - PropsProxy.set // Setting values to props manually is not allowed.`);
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

},{"./common":"lIlR7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gEzcf":[function(require,module,exports) {
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
    p = require("./debug").trackPerformances("Update dirty components");
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

},{"./common":"lIlR7","./diff":"02gC6","./jsx":"iZFY4","./debug":"6Xj7H","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6Xj7H":[function(require,module,exports) {
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
        const delta = ~~(performance.now() - start);
        console.info(subject, delta < 1000 ? `${delta}ms` : `${delta / 1000}s`);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3iYOx":[function(require,module,exports) {
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

},{"@zouloux/signal":"fx6pE","./common":"lIlR7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fx6pE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _signalEs2020Mjs = require("./signal.es2020.mjs");
parcelHelpers.exportAll(_signalEs2020Mjs, exports);
var _stateSignalEs2020Mjs = require("./state-signal.es2020.mjs");
parcelHelpers.exportAll(_stateSignalEs2020Mjs, exports);
var _observableEs2020Mjs = require("./observable.es2020.mjs");
parcelHelpers.exportAll(_observableEs2020Mjs, exports);

},{"./signal.es2020.mjs":"4fso3","./state-signal.es2020.mjs":"kDWjP","./observable.es2020.mjs":"h8Jze","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4fso3":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kDWjP":[function(require,module,exports) {
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

},{"./signal.es2020.mjs":"4fso3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"h8Jze":[function(require,module,exports) {
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

},{"./signal.es2020.mjs":"4fso3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kGKkC":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7fq5C":[function(require,module,exports) {
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

},{"./diff":"02gC6","./common":"lIlR7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3qHlQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ListDemoApp", ()=>ListDemoApp);
var _reflex = require("../../src/reflex");
var _demoHelpers = require("../demoHelpers");
// ----------------------------------------------------------------------------- DATA MODEL
// TODO : Convert to state then store
let _listItems = [];
const clearList = ()=>{
    _listItems = [];
};
const addItem = (position, item)=>{
    if (position === "bottom") _listItems.push(item);
    else _listItems.unshift(item);
};
const removeItem = (item)=>{
    _listItems = _listItems.filter((currentItem)=>currentItem != item);
};
const moveItem = (item, offset)=>{
    const index = _listItems.indexOf(item) + offset;
    if (index < 0 || index >= _listItems.length) return;
    removeItem(item);
    _listItems.splice(index, 0, item);
};
// ----------------------------------------------------------------------------- DEFAULT ITEMS
function addRandomItems(total = 0) {
    total ||= (0, _demoHelpers.rand)(5 + _listItems.length) + 1;
    for(let i = 0; i < total; i++)addItem("bottom", {
        id: (0, _demoHelpers.createUID)(),
        name: (0, _demoHelpers.pickRandom)((0, _demoHelpers.colorList)) + " " + (0, _demoHelpers.pickRandom)((0, _demoHelpers.foodList))
    });
}
function removeRandomItems() {
    const total = (0, _demoHelpers.rand)(_listItems.length) + 1;
    for(let i = 0; i < total; i++){
        const item = (0, _demoHelpers.pickRandom)(_listItems);
        removeItem(item);
    }
}
// ----------------------------------------------------------------------------- LIST ITEM
const listItemStyle = {
    border: `1px solid black`
};
function ListItem(props) {
    function removeClicked() {
        removeItem(props.item);
        props.render();
    }
    function moveUpClicked() {
        moveItem(props.item, -1);
        props.render();
    }
    function moveDownClicked() {
        moveItem(props.item, 1);
        props.render();
    }
    return /*#__PURE__*/ (0, _reflex.h)("tr", {
        class: "ListItem",
        "data-id": props.item.id,
        style: listItemStyle,
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 75,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ (0, _reflex.h)("td", {
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 76,
            columnNumber: 3
        },
        __self: this
    }, props.item.name), /*#__PURE__*/ (0, _reflex.h)("td", {
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 79,
            columnNumber: 3
        },
        __self: this
    }, /*#__PURE__*/ (0, _reflex.h)("button", {
        onClick: moveUpClicked,
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 79,
            columnNumber: 7
        },
        __self: this
    }, "\u2B06")), /*#__PURE__*/ (0, _reflex.h)("td", {
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 80,
            columnNumber: 3
        },
        __self: this
    }, /*#__PURE__*/ (0, _reflex.h)("button", {
        onClick: moveDownClicked,
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 80,
            columnNumber: 7
        },
        __self: this
    }, "\u2B07")), /*#__PURE__*/ (0, _reflex.h)("td", {
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 81,
            columnNumber: 3
        },
        __self: this
    }, /*#__PURE__*/ (0, _reflex.h)("button", {
        onClick: removeClicked,
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 81,
            columnNumber: 7
        },
        __self: this
    }, "Remove")));
}
function ListDemoApp(props) {
    function addRandomItemClicked(max = 0) {
        addRandomItems(max);
        props.render();
    }
    function removeRandomItemsClicked() {
        removeRandomItems();
        props.render();
    }
    function clearListClicked() {
        clearList();
        props.render();
    }
    function controlSubmitted(event) {
        event.preventDefault();
        // TODO : Implement refs
        const nameInput = document.getElementById("ListDemoApp_nameInput");
        if (!nameInput.value) return;
        addItem("top", {
            name: nameInput.value,
            id: (0, _demoHelpers.createUID)()
        });
        nameInput.value = "";
        props.render();
    }
    return /*#__PURE__*/ (0, _reflex.h)("div", {
        class: "ListDemoApp",
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 120,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ (0, _reflex.h)("div", {
        class: "ListDemoApp_controls",
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 121,
            columnNumber: 3
        },
        __self: this
    }, /*#__PURE__*/ (0, _reflex.h)("table", {
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 122,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reflex.h)("button", {
        onClick: (e)=>addRandomItemClicked(),
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 123,
            columnNumber: 5
        },
        __self: this
    }, "Add random items to bottom"), /*#__PURE__*/ (0, _reflex.h)("button", {
        onClick: (e)=>addRandomItemClicked(1000),
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 124,
            columnNumber: 5
        },
        __self: this
    }, "Add 1000 items to bottom"), /*#__PURE__*/ (0, _reflex.h)("button", {
        onClick: removeRandomItemsClicked,
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 125,
            columnNumber: 5
        },
        __self: this
    }, "Remove random items"), /*#__PURE__*/ (0, _reflex.h)("button", {
        onClick: clearListClicked,
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 126,
            columnNumber: 5
        },
        __self: this
    }, "Clear list")), /*#__PURE__*/ (0, _reflex.h)("form", {
        onSubmit: controlSubmitted,
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 128,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reflex.h)("table", {
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 129,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reflex.h)("input", {
        id: "ListDemoApp_nameInput",
        type: "text",
        name: "name",
        placeholder: "Name ...",
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 130,
            columnNumber: 6
        },
        __self: this
    }), /*#__PURE__*/ (0, _reflex.h)("button", {
        type: "submit",
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 134,
            columnNumber: 6
        },
        __self: this
    }, "Add to top")))), /*#__PURE__*/ (0, _reflex.h)("h3", {
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 138,
            columnNumber: 3
        },
        __self: this
    }, _listItems.length, " element", _listItems.length > 1 ? "s" : ""), /*#__PURE__*/ (0, _reflex.h)("table", {
        __source: {
            fileName: "demos/2-list-demo/ListDemoApp.tsx",
            lineNumber: 139,
            columnNumber: 3
        },
        __self: this
    }, _listItems.map((item)=>/*#__PURE__*/ (0, _reflex.h)(ListItem, {
            item: item,
            key: item.id,
            render: props.render,
            __source: {
                fileName: "demos/2-list-demo/ListDemoApp.tsx",
                lineNumber: 141,
                columnNumber: 5
            },
            __self: this
        }))));
}

},{"../../src/reflex":"eG97A","../demoHelpers":"cuPhT","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cuPhT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "toHex", ()=>toHex);
parcelHelpers.export(exports, "createUID", ()=>createUID);
parcelHelpers.export(exports, "pickRandom", ()=>pickRandom);
parcelHelpers.export(exports, "rand", ()=>rand);
parcelHelpers.export(exports, "randBoolean", ()=>randBoolean);
parcelHelpers.export(exports, "foodList", ()=>foodList);
parcelHelpers.export(exports, "colorList", ()=>colorList);
parcelHelpers.export(exports, "firstnameList", ()=>firstnameList);
parcelHelpers.export(exports, "lastnameList", ()=>lastnameList);
const toHex = (n)=>(~~n).toString(16);
const createUID = ()=>`${toHex(Date.now())}-${toHex(Math.random() * 999999999)}`;
const pickRandom = (array)=>array[~~(Math.random() * array.length)];
const rand = (max)=>~~(Math.random() * max);
const randBoolean = (threshold = .5)=>Math.random() > threshold;
const foodList = [
    "Cheese",
    "Carrots",
    "Pastas",
    "Pizza",
    "Burgers",
    "Ham",
    "Salad",
    "Mustard"
];
const colorList = [
    "Red",
    "Blue",
    "Yellow",
    "Purple",
    "Orange",
    "Black",
    "White",
    "Green"
];
const firstnameList = [
    "Alfred",
    "Jessica",
    "Gwen",
    "Jeanne"
];
const lastnameList = [
    "Dupont",
    "Smith",
    "Stevensen",
    "Odea"
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["3p50b","5P6IF"], "5P6IF", "parcelRequirea1a1")

//# sourceMappingURL=index.3b238c2c.js.map
