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
})({"9aBe1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "init", ()=>init);
var _reflex = require("../../src/reflex");
var _stateChangedDemo = require("./StateChangedDemo");
var _debug = require("../../src/reflex/debug");
// -----------------------------------------------------------------------------
(0, _debug.setReflexDebug)(true);
let renderIndex = 0;
function init() {
    const p = (0, _debug.trackPerformances)("Root rendering");
    (0, _reflex.render)(/*#__PURE__*/ (0, _reflex.h)((0, _stateChangedDemo.StateChangedDemo), {
        render: init,
        renderIndex: renderIndex++
    }), document.body);
    p();
}
init();

},{"../../src/reflex":"cuBJf","./StateChangedDemo":"9wHiL","../../src/reflex/debug":"7uUcT","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"9wHiL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "StateChangedDemo", ()=>StateChangedDemo);
var _reflex = require("../../src/reflex");
function ChangedTest(props) {
    const stateA = (0, _reflex.state)(0);
    const stateB = (0, _reflex.state)(0);
    const stateC = (0, _reflex.state)(0);
    // Listen stateA, stateB, and props.total.
    // Do not listen stateC
    // API 1, with an array of dependencies
    (0, _reflex.changed)([
        stateA,
        stateB,
        ()=>props.total
    ], (newA, newB, newTotal /*, oldA, oldB, oldTotal*/ )=>{
        console.log("Updated 1", {
            newA,
            newB,
            newTotal
        });
    });
    // Listen stateA, stateB, and props.total.
    // Do not listen stateC
    // API 2, with a handler which will check all values of the array
    (0, _reflex.changed)(()=>[
            stateA.value,
            stateB.value,
            props.total
        ], (newA, newB, newTotal /*, oldA, oldB, oldTotal*/ )=>{
        console.log("Updated 2", {
            newA,
            newB,
            newTotal
        });
    });
    // Listen stateC and props.total
    // Dispatch when stateC is different than props.total
    (0, _reflex.changed)([
        stateC,
        ()=>props.total
    ], (a, b)=>{
        if (a !== b) console.log("StateC is different than props.total");
    });
    return ()=>/*#__PURE__*/ (0, _reflex.h)("div", null, /*#__PURE__*/ (0, _reflex.h)("button", {
            onClick: (e)=>stateA.value++
        }, "State A ", stateA.value), /*#__PURE__*/ (0, _reflex.h)("button", {
            onClick: (e)=>stateB.value++
        }, "State B ", stateB.value), /*#__PURE__*/ (0, _reflex.h)("button", {
            onClick: (e)=>stateC.value++
        }, "State C ", stateC.value));
}
function StateChangedDemo() {
    const propState = (0, _reflex.state)(0);
    return ()=>/*#__PURE__*/ (0, _reflex.h)("div", null, /*#__PURE__*/ (0, _reflex.h)("button", {
            onClick: (e)=>propState.value++
        }, "Props ", propState.value), /*#__PURE__*/ (0, _reflex.h)(ChangedTest, {
            total: propState.value
        }));
}

},{"../../src/reflex":"cuBJf","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"7uUcT":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}]},["9aBe1"], "9aBe1", "parcelRequirea1a1")

