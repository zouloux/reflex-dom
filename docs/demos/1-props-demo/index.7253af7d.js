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
})({"4xApz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "init", ()=>init);
var _reflex = require("../../src/reflex");
var _debug = require("../../src/reflex-more/debug");
var _propsDemoApp = require("./PropsDemoApp");
var _codeViewerHelpers = require("../common/codeViewerHelpers");
// -----------------------------------------------------------------------------
(0, _debug.setReflexDebug)(true);
function init() {
    const p = (0, _debug.trackPerformances)("Root rendering");
    (0, _reflex.render)(/*#__PURE__*/ (0, _reflex.h)((0, _propsDemoApp.PropsDemoApp), null), document.body);
    p();
}
(0, _codeViewerHelpers.injectCodeViewer)([
    "demos/1-props-demo/index.tsx",
    "demos/1-props-demo/PropsDemoApp.tsx",
    "demos/1-props-demo/UserComponent.tsx"
], 1);
init();

},{"../../src/reflex":"cuBJf","../../src/reflex-more/debug":"2vfjB","./PropsDemoApp":"53gkc","../common/codeViewerHelpers":"ca3Po","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"2vfjB":[function(require,module,exports) {
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
    return ()=>{};
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"53gkc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PropsDemoApp", ()=>PropsDemoApp);
var _reflex = require("../../src/reflex");
var _demoHelpers = require("../common/demoHelpers");
var _userComponent = require("./UserComponent");
/**
 * In this demo we will see how
 */ function getRandomUser() {
    return {
        firstname: (0, _demoHelpers.pickRandom)((0, _demoHelpers.firstnameList)),
        lastname: (0, _demoHelpers.pickRandom)((0, _demoHelpers.lastnameList)),
        isAdmin: (0, _demoHelpers.randBoolean)(),
        id: (0, _demoHelpers.createUID)()
    };
}
function PropsDemoApp() {
    // Create a state attached to "PropsDemoApp".
    // Initial state is gathered at init from "getRandomUser" function.
    const currentUser = (0, _reflex.state)(getRandomUser);
    // With factory pattern, we have to return a render function.
    return ()=>/*#__PURE__*/ (0, _reflex.h)("div", null, /*#__PURE__*/ (0, _reflex.h)("button", {
            onClick: (e)=>currentUser.set(getRandomUser)
        }, "Change user"), /*#__PURE__*/ (0, _reflex.h)("br", null), /*#__PURE__*/ (0, _reflex.h)((0, _userComponent.UserComponent), {
            user: currentUser.value
        }));
}

},{"../../src/reflex":"cuBJf","../common/demoHelpers":"7ZAOq","./UserComponent":"elNhi","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"elNhi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// -----------------------------------------------------------------------------
parcelHelpers.export(exports, "UserComponent", ()=>UserComponent);
var _reflex = require("../../src/reflex");
function UserComponent(props) {
    // Here "props" is a proxy, so it's values can be updated dynamically
    // The main tradeoff is that destructuring props is not possible
    // PATTERN #1 - Detect prop changes
    // Will show a log if isAdmin is changing on props.user
    (0, _reflex.changed)(// To detect changes, we simply use an anonymous function which return
    // the state to check after each render.
    ()=>[
            props.user.isAdmin
        ], // Result of test function is given as first argument
    (isAdmin, wereAdmin)=>{
        console.log(`PATTERN #1 - User ${props.user.firstname} ${isAdmin ? "is" : "is not"} admin`);
    });
    // PATTERN #2 - Attach and detach from prop changes
    // Will disconnect previous user from chat, and connect new user
    (0, _reflex.changed)(()=>[
            props.user.id
        ], (newId)=>{
        console.log(`PATTERN #2 - Connect user ${newId} to chat panel`);
        return (oldId)=>{
            console.log(`PATTERN #2 - Disconnect user ${oldId} from chat`);
        };
    });
    // REFS - Refs are updated just after dom has been updated.
    // This proves that after render, refs are updated correctly and available right after
    const root = (0, _reflex.ref)();
    const image = (0, _reflex.ref)();
    (0, _reflex.changed)(()=>{
        // FIXME : root.component should be this component instance
        console.log("REFS - UserComponent just rendered", root.component, image.dom.getAttribute("src"));
    });
    // With factory pattern, we have to return a render function.
    return ()=>/*#__PURE__*/ (0, _reflex.h)("div", {
            ref: root,
            class: "UserComponent"
        }, "Hello ", props.user.firstname, " ", props.user.lastname, /*#__PURE__*/ (0, _reflex.h)("br", null), /*#__PURE__*/ (0, _reflex.h)("img", {
            src: `https://i.pravatar.cc/150?u=${props.user.id}`,
            ref: image,
            style: {
                width: 150,
                height: 150,
                backgroundColor: "#333",
                borderRadius: 10
            }
        }));
}

},{"../../src/reflex":"cuBJf","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}]},["4xApz"], "4xApz", "parcelRequirea1a1")

