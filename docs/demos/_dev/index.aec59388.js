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
})({"fbtN8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "init", ()=>init);
var _reflex = require("../../src/reflex");
var _debug = require("../../src/reflex/debug");
var _demoHelpers = require("../common/demoHelpers");
var _renderToString = require("../../src/reflex/renderToString");
function ListItem(props) {
    const item = props.item;
    return /*#__PURE__*/ (0, _reflex.h)("li", null, item.id, " : ", item.name);
}
function TestComponent() {
    const list = (0, _reflex.state)([]);
    function addItems() {
        const items = [];
        for(let i = 0; i < 10; i++)items.push({
            id: (0, _demoHelpers.createUID)(),
            name: (0, _demoHelpers.pickRandom)((0, _demoHelpers.colorList)) + " " + (0, _demoHelpers.pickRandom)((0, _demoHelpers.foodList))
        });
        list.value = [
            ...list.value,
            ...items
        ];
    }
    // addItems();
    // FIXME : Does not target correct node (it target first child)
    // return () => <div class={["TestComponent", list.value.length]}>
    return ()=>/*#__PURE__*/ (0, _reflex.h)("div", {
            class: [
                "TestComponent"
            ]
        }, /*#__PURE__*/ (0, _reflex.h)("button", {
            onClick: addItems
        }, "Add Items"), /*#__PURE__*/ (0, _reflex.h)("ul", null, list.value.map((item)=>/*#__PURE__*/ (0, _reflex.h)(ListItem, {
                key: item.id,
                item: item
            }))), /*#__PURE__*/ (0, _reflex.h)("span", null, "Length: ", list.value.length), /*#__PURE__*/ (0, _reflex.h)("div", null, "Has children :\xa0", list.value.length > 0 ? /*#__PURE__*/ (0, _reflex.h)("span", null, "YES") : null));
}
function TestSVG() {
    //return <div class={["test"]} nope onClick={e => {}}> {"ok"}</div>
    return /*#__PURE__*/ (0, _reflex.h)("svg", {
        height: "210",
        width: "500"
    }, /*#__PURE__*/ (0, _reflex.h)("polygon", {
        points: "200,10 250,190 160,210",
        style: "fill:lime;stroke:purple;stroke-width:1"
    }));
}
function DevApp() {
    const r = (0, _reflex.ref)();
    (0, _reflex.mounted)(()=>{
        console.log("DOM", r.dom);
    });
    return ()=>/*#__PURE__*/ (0, _reflex.h)("div", {
            ref: r
        }, /*#__PURE__*/ (0, _reflex.h)("h1", null, "Hello"), /*#__PURE__*/ (0, _reflex.h)(TestComponent, null), /*#__PURE__*/ (0, _reflex.h)(TestSVG, null), /*#__PURE__*/ (0, _reflex.h)("div", null, "After SVG ", 12));
}
// -----------------------------------------------------------------------------
(0, _debug.setReflexDebug)(true);
function init() {
    const p = (0, _debug.trackPerformances)("Root rendering");
    // console.log(<div><h1>Test</h1></div>)
    const a = /*#__PURE__*/ (0, _reflex.h)(DevApp, null);
    console.log("A", a);
    (0, _reflex.render)(a, document.getElementById("App"));
    const string = (0, _renderToString.renderToString)(a);
    console.log(string);
    // render( a, document.getElementById('App') )
    p();
}
init();

},{"../../src/reflex":"cuBJf","../../src/reflex/debug":"7uUcT","../common/demoHelpers":"7ZAOq","../../src/reflex/renderToString":"koXhz","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"7uUcT":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"7ZAOq":[function(require,module,exports) {
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
parcelHelpers.export(exports, "delay", ()=>delay);
parcelHelpers.export(exports, "randomDelay", ()=>randomDelay);
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
const delay = (durationInSeconds)=>new Promise((resolve)=>window.setTimeout(resolve, durationInSeconds * 1000));
const randomDelay = (min, max)=>delay(min + rand(max - min));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"koXhz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderToString", ()=>renderToString);
var _index = require("./index");
/**
 * TODO : Missing async components and a lot of other stuff ...
 */ function renderAbstractNodeToString(node) {
    if (node.abstractType === "comment") return `<!--${node.data}-->`;
    if (node.abstractType === "text") return node.nodeValue;
    if (node.abstractType === "element") {
        const nodeElement = node;
        const type = nodeElement.type.toLowerCase();
        let buffer = `<${type}`;
        Object.keys(nodeElement.attributes).forEach((key)=>{
            // FIXME : Replace all ?
            const value = nodeElement.attributes[key];
            if (value) buffer += ` ${key}="${(value + "").replace(/"/g, "&quot;")}"`;
        });
        if (nodeElement.children.length === 0) return buffer + "/>";
        buffer += ">";
        buffer += nodeElement.innerHTML;
        return `${buffer}</${type}>`;
    }
}
const abstractDocument = {
    createComment (data) {
        return {
            abstractType: "comment",
            data
        };
    },
    createTextNode (nodeValue) {
        return {
            abstractType: "text",
            nodeValue
        };
    },
    createElement (type) {
        return abstractDocument.createElementNS(null, type);
    },
    createElementNS (namespace, type) {
        let innerHTML = "";
        let attributes = {};
        let children = [];
        return {
            /** Get components */ get attributes () {
                return attributes;
            },
            get children () {
                return children;
            },
            /** Base element type */ abstractType: "element",
            type,
            namespace,
            /** Events are useless here */ // FIXME : Will become useful for hydrate
            addEventListener (...rest) {},
            removeEventListener (...rest) {},
            /** Attributes */ setAttribute (name, value) {
                attributes[name] = value;
            },
            getAttribute (name) {
                return attributes[name];
            },
            removeAttribute (name) {
                delete attributes[name];
            },
            /** Children */ removeChild (child) {
                children = children.filter((c)=>c !== child);
            },
            appendChild (child) {
                children.push(child);
            },
            insertBefore (child, before) {
                children.splice(children.indexOf(before), 0, child);
            },
            /** innerHTML */ get innerHTML () {
                return innerHTML != "" ? innerHTML : children.map((child)=>renderAbstractNodeToString(child)).join("");
            },
            set innerHTML (value){
                if (value == "") children = [];
                innerHTML = value;
            },
            /** toString */ toString () {
                return renderAbstractNodeToString(this);
            }
        };
    }
};
function renderToString(rootNode) {
    const rootElement = abstractDocument.createElement("body");
    (0, _index.render)(rootNode, rootElement, abstractDocument);
    return rootElement.innerHTML;
}

},{"./index":"cuBJf","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}]},["fbtN8"], "fbtN8", "parcelRequirea1a1")

