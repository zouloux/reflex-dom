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
})({"g8Ueu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "init", ()=>init);
var _reflex = require("../../src/reflex");
var _storeListDemoApp = require("./StoreListDemoApp");
var _debug = require("../../src/reflex/debug");
// -----------------------------------------------------------------------------
(0, _debug.setReflexDebug)(true);
let renderIndex = 0;
function init() {
    const p = (0, _debug.trackPerformances)("Root rendering");
    (0, _reflex.render)(/*#__PURE__*/ (0, _reflex.h)((0, _storeListDemoApp.StoreListDemoApp), {
        render: init,
        renderIndex: renderIndex++
    }), document.body);
    p();
}
init();

},{"../../src/reflex":"cuBJf","./StoreListDemoApp":"cjD7G","../../src/reflex/debug":"7uUcT","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"cjD7G":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// ----------------------------------------------------------------------------- LIST APP
parcelHelpers.export(exports, "StoreListDemoApp", ()=>StoreListDemoApp);
var _reflex = require("../../src/reflex");
var _store = require("../../src/store/store");
var _reflexStoreState = require("../../src/store/reflexStoreState");
var _demoHelpers = require("../common/demoHelpers");
const getInitialListState = ()=>[];
const listStore = (0, _store.createStore)(getInitialListState(), {
    clearList () {
        return getInitialListState();
    },
    addItem (state, position, item) {
        return position === "bottom" ? [
            ...state,
            item
        ] : [
            item,
            ...state
        ];
    },
    removeItem (state, item) {
        return state.filter((currentItem)=>currentItem != item);
    },
    moveItem (state, item, offset) {
        const index = state.indexOf(item) + offset;
        if (index < 0 || index >= state.length) return;
        state = this.removeItem(state, item);
        state.splice(index, 0, item);
        return state;
    },
    swapItems (state, indexA, indexB) {
        if (state.length < indexA || state.length < indexB) return state;
        state = Array.from(state);
        const a = state[indexA];
        state[indexA] = state[indexB];
        state[indexB] = a;
        return state;
    },
    addRandomItems (state, total = 0) {
        total ||= (0, _demoHelpers.rand)(5 + state.length) + 1;
        for(let i = 0; i < total; ++i)state = this.addItem(state, "bottom", {
            id: (0, _demoHelpers.createUID)(),
            name: state.length + " " + (0, _demoHelpers.pickRandom)((0, _demoHelpers.colorList)) + " " + (0, _demoHelpers.pickRandom)((0, _demoHelpers.foodList))
        });
        return state;
    },
    removeRandomItems (state) {
        const total = (0, _demoHelpers.rand)(state.length) + 1;
        for(let i = 0; i < total; ++i){
            const item = (0, _demoHelpers.pickRandom)(state);
            state = this.removeItem(state, item);
        }
        return state;
    }
});
// ----------------------------------------------------------------------------- LIST ITEM
const listItemStyle = {
    border: `1px solid black`
};
ListItem.isFactory = false;
function ListItem(props, component) {
    // console.log("ListItem");
    component.shouldUpdate = (n, o)=>n.item !== o.item;
    const { item  } = props;
    return /*#__PURE__*/ (0, _reflex.h)("tr", {
        class: "ListItem",
        "data-id": item.id,
        style: listItemStyle
    }, /*#__PURE__*/ (0, _reflex.h)("td", null, item.name), /*#__PURE__*/ (0, _reflex.h)("td", null, /*#__PURE__*/ (0, _reflex.h)("button", {
        onClick: (e)=>listStore.dispatch("moveItem", item, -1)
    }, "\u2B06")), /*#__PURE__*/ (0, _reflex.h)("td", null, /*#__PURE__*/ (0, _reflex.h)("button", {
        onClick: (e)=>listStore.dispatch("moveItem", item, 1)
    }, "\u2B07")), /*#__PURE__*/ (0, _reflex.h)("td", null, /*#__PURE__*/ (0, _reflex.h)("button", {
        onClick: (e)=>listStore.dispatch("removeItem", item)
    }, "Remove")));
}
function StoreListDemoApp(props) {
    const list = (0, _reflexStoreState.storeState)(listStore);
    const nameInput = (0, _reflex.ref)();
    function controlSubmitted(event) {
        event.preventDefault();
        if (!nameInput.dom.value) return;
        listStore.dispatch("addItem", "top", {
            name: nameInput.dom.value,
            id: (0, _demoHelpers.createUID)()
        });
        nameInput.dom.value = "";
    }
    function Controls() {
        console.log("Controls");
        return /*#__PURE__*/ (0, _reflex.h)("div", {
            className: "StatefulDemoApp_controls"
        }, /*#__PURE__*/ (0, _reflex.h)("table", null, /*#__PURE__*/ (0, _reflex.h)("button", {
            onClick: (e)=>listStore.dispatch("addRandomItems")
        }, "Add random items to bottom"), /*#__PURE__*/ (0, _reflex.h)("button", {
            onClick: (e)=>listStore.dispatch("addRandomItems", 1000)
        }, "Add 1.000 items to bottom"), /*#__PURE__*/ (0, _reflex.h)("button", {
            onClick: (e)=>listStore.dispatch("addRandomItems", 10000)
        }, "Add 10.000 items to bottom"), /*#__PURE__*/ (0, _reflex.h)("button", {
            onClick: (e)=>listStore.dispatch("swapItems", 2, 5)
        }, "Switch item 2 and 5"), /*#__PURE__*/ (0, _reflex.h)("button", {
            onClick: (e)=>listStore.dispatch("removeRandomItems")
        }, "Remove random items"), /*#__PURE__*/ (0, _reflex.h)("button", {
            onClick: (e)=>listStore.dispatch("clearList")
        }, "Clear list")), /*#__PURE__*/ (0, _reflex.h)("form", {
            onSubmit: controlSubmitted
        }, /*#__PURE__*/ (0, _reflex.h)("table", null, /*#__PURE__*/ (0, _reflex.h)("input", {
            id: "StatefulDemoApp_nameInput",
            ref: nameInput,
            type: "text",
            name: "name",
            placeholder: "Name ..."
        }), /*#__PURE__*/ (0, _reflex.h)("button", {
            type: "submit"
        }, "Add to top"))));
    }
    return ()=>/*#__PURE__*/ (0, _reflex.h)("div", {
            class: "StatefulDemoApp"
        }, /*#__PURE__*/ (0, _reflex.h)("span", null, "Root render index : ", props.renderIndex), /*#__PURE__*/ (0, _reflex.h)(Controls, null), /*#__PURE__*/ (0, _reflex.h)("h3", null, list.value.length, " element", list.value.length > 1 ? "s" : ""), /*#__PURE__*/ (0, _reflex.h)("table", null, list.value.map((item)=>/*#__PURE__*/ (0, _reflex.h)(ListItem, {
                item: item,
                key: item.id
            }))));
}

},{"../../src/reflex":"cuBJf","../../src/store/store":"bonrN","../../src/store/reflexStoreState":"lTIuh","../common/demoHelpers":"7ZAOq","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"bonrN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// ----------------------------------------------------------------------------- CREATE STORE
parcelHelpers.export(exports, "createStore", ()=>createStore);
var _signal = require("@zouloux/signal");
function createStore(state = null, reducers = null, actions) {
    // Init signals
    const onBefore = (0, _signal.Signal)();
    const onAfter = (0, _signal.Signal)();
    const onCanceled = (0, _signal.Signal)();
    // Init properties
    let isLocked = false;
    // let _isDispatching = false
    let isUpdating = false;
    let lockUpdated = false;
    // Update state and call listeners
    // Will be synchronous if there are no asynchronous before listeners
    const update = async (newState = state)=>{
        // Dispatch are locked, just save new state
        // without dispatching before or after listeners
        if (isLocked) {
            // Remember that state has been updated while locked
            // To dispatch new state when unlocking
            lockUpdated = true;
            // Save new state
            state = newState;
            return;
        }
        // Prevent dispatches
        isUpdating = true;
        // Dispatch all asynchronous before listeners
        let oldState = state;
        // Only if we have some listeners, otherwise keep it synchronous
        if (onBefore.listeners.length > 0) // Start all promises in parallel
        try {
            await Promise.all(onBefore.listeners.map(async (l)=>await l(newState, oldState)));
        // FIXME : Add sequential option ?
        // for ( const listener of _beforeListeners )
        // 	await listener( newState, oldState )
        } // Stop update if any of those middlewares trows rejection
        catch (e) {
            onCanceled.dispatch(e);
            isUpdating = false;
            return;
        }
        // All listeners validated state change, save new state
        state = newState;
        // Unlock right before after listeners so they can dispatch if needed
        isUpdating = false;
        // Notify all after listeners that state changed
        onAfter.dispatch(newState, oldState);
    };
    // Expose public API
    return {
        // Get and set state
        getState: ()=>state,
        setState: (newState)=>update(typeof newState === "function" ? newState(state) : newState),
        // Dispatch reducer
        dispatch: (reducerName, ...rest)=>new Promise(async (resolve, reject)=>{
                // FIXME -> Dispatch should be able to override updating state
                // FIXME -> And kill current onBefore listeners
                // Already updating state asynchronously
                if (isUpdating) return reject("updating");
                // Call reducer synchronously and update reduced data
                await update(reducers[reducerName](state, ...rest));
                // Everything has been dispatched successfully
                resolve();
            }),
        // Expose signals
        onBefore,
        onAfter,
        onCanceled,
        // Lock or unlock updates
        async lock (locked) {
            isLocked = locked;
            // If unlocking and state has changed while locked
            if (!isLocked && lockUpdated) {
                // Dispatch new state
                lockUpdated = false;
                await update(state);
            }
        },
        // Get locked states
        get locked () {
            return isLocked;
        },
        // get isDispatching () { return _isDispatching },
        get isUpdating () {
            return isUpdating;
        },
        // Expose actions
        actions
    };
}

},{"@zouloux/signal":"kuTKe","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"kuTKe":[function(require,module,exports) {
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

},{"./signal.es2020.mjs":"kBbw3","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"lTIuh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "storeState", ()=>storeState);
var _reflex = require("../reflex");
function storeState(store) {
    const data = (0, _reflex.state)(store.getState());
    (0, _reflex.mounted)(()=>store.onAfter.add(()=>data.set(store.getState())));
    return data;
}

},{"../reflex":"cuBJf","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"7ZAOq":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"7uUcT":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}]},["g8Ueu"], "g8Ueu", "parcelRequirea1a1")

