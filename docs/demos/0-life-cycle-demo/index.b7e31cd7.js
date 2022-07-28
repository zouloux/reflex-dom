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
})({"ca3Po":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "injectCodeViewer", ()=>injectCodeViewer);
var _reflex = require("../../src/reflex");
var _codeViewer = require("./CodeViewer/CodeViewer");
function injectCodeViewer(files, defaultIndex = 0) {
    // Load typescript and tsx highlighters
    require("prismjs") // needed to expose Prism as global.Prism 🫠
    ;
    require("prismjs/components/prism-typescript.js");
    require("prismjs/components/prism-jsx.js");
    require("prismjs/components/prism-tsx.js");
    // Load prism line numbers plugin
    require("prismjs/plugins/line-numbers/prism-line-numbers.js");
    require("prismjs/plugins/line-numbers/prism-line-numbers.css");
    // Load prism CSS
    require("prismjs/themes/prism.css");
    // Load code highlight theme
    require("prismjs/themes/prism-coy.css");
    // require("prismjs/themes/prism-dark.css")
    // require("prismjs/themes/prism-funky.css")
    // require("prismjs/themes/prism-okaidia.css")
    // require("prismjs/themes/prism-solarizedlight.css")
    // require("prismjs/themes/prism-tomorrow.css")
    // require("prismjs/themes/prism-twilight.css")
    // Create container
    const codeViewerContainer = document.createElement("div");
    codeViewerContainer.setAttribute("id", "codeViewer");
    document.body.append(codeViewerContainer);
    // Render into container
    (0, _reflex.render)(/*#__PURE__*/ (0, _reflex.h)((0, _codeViewer.CodeViewer), {
        files: files,
        defaultIndex: defaultIndex
    }), codeViewerContainer);
}

},{"../../src/reflex":"cuBJf","./CodeViewer/CodeViewer":"2jiFk","prismjs":"53vMd","prismjs/components/prism-typescript.js":"7JKWE","prismjs/components/prism-jsx.js":"cu9OL","prismjs/components/prism-tsx.js":"e5FAq","prismjs/plugins/line-numbers/prism-line-numbers.js":"jPYLy","prismjs/plugins/line-numbers/prism-line-numbers.css":"leqaQ","prismjs/themes/prism.css":"jJdb1","prismjs/themes/prism-coy.css":"gZ1sw","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"2jiFk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CodeViewer", ()=>CodeViewer);
var _prismjs = require("prismjs");
var _prismjsDefault = parcelHelpers.interopDefault(_prismjs);
var _reflex = require("../../../src/reflex");
var _path = require("path");
// @ts-ignore
var _codeViewerModuleLess = require("./CodeViewer.module.less");
var _codeViewerModuleLessDefault = parcelHelpers.interopDefault(_codeViewerModuleLess);
var _demoHelpers = require("../demoHelpers");
// import loadLanguages from 'prismjs/components/'
const repoBase = `https://raw.githubusercontent.com/zouloux/reflex/main/`;
function CodeViewer(props) {
    const loadedFiles = (0, _reflex.state)(props.files.map((f)=>false));
    const selectedTabIndex = (0, _reflex.state)(props.defaultIndex ?? 1);
    const codeElements = (0, _reflex.refs)();
    (0, _reflex.mounted)(()=>props.files.map(async (file, i)=>{
            // Load file content from github
            const loadedFile = await fetch(`${repoBase}${file}`);
            await (0, _demoHelpers.randomDelay)(0, 2);
            // console.log('R', i)
            loadedFiles.value[i] = await loadedFile.text();
            // Update state (clone array to force state change)
            await loadedFiles.set([
                ...loadedFiles.value
            ]);
            // Target code element from ref, and highlight syntax with Prism
            const codeElement = codeElements.list[i].dom;
            (0, _prismjsDefault.default).highlightElement(codeElement);
        }));
    // changed(() => loadedFiles.value, () => {
    // 	console.log('Changed', loadedFiles.value)
    // })
    // const testRef = refs<never, HTMLSpanElement>();
    // changed(() => { console.log('TEST REF', testRef.list.map( el => el.dom.innerHTML )) })
    return ()=>/*#__PURE__*/ (0, _reflex.h)("div", {
            class: [
                (0, _codeViewerModuleLessDefault.default).CodeViewer,
                "line-numbers"
            ]
        }, /*#__PURE__*/ (0, _reflex.h)("div", {
            class: (0, _codeViewerModuleLessDefault.default)._header
        }, props.files.map((file, i)=>/*#__PURE__*/ (0, _reflex.h)("button", {
                class: [
                    (0, _codeViewerModuleLessDefault.default)._tab,
                    i == selectedTabIndex.value && `${(0, _codeViewerModuleLessDefault.default)._tab}-selected`
                ],
                onClick: (e)=>selectedTabIndex.set(i),
                children: [
                    _path.basename(file)
                ]
            }))), /*#__PURE__*/ (0, _reflex.h)("div", {
            class: (0, _codeViewerModuleLessDefault.default)._files
        }, loadedFiles.value.map((file, i)=>/*#__PURE__*/ (0, _reflex.h)("pre", {
                class: (0, _codeViewerModuleLessDefault.default)._file,
                hidden: i != selectedTabIndex.value
            }, !file ? /*#__PURE__*/ (0, _reflex.h)("div", {
                class: (0, _codeViewerModuleLessDefault.default)._spinner
            }) : /*#__PURE__*/ (0, _reflex.h)("code", {
                ref: codeElements.atIndex(i),
                class: [
                    (0, _codeViewerModuleLessDefault.default)._code,
                    `language-typescript`
                ],
                children: [
                    file
                ]
            })))));
}

},{"prismjs":"53vMd","../../../src/reflex":"cuBJf","path":"k2fhP","./CodeViewer.module.less":"jPxNL","../demoHelpers":"7ZAOq","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"53vMd":[function(require,module,exports) {
var global = arguments[3];
/* **********************************************
     Begin prism-core.js
********************************************** */ /// <reference lib="WebWorker"/>
var _self = typeof window !== "undefined" ? window // if in browser
 : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self // if in worker
 : {} // if in node js
;
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */ var Prism = function(_self1) {
    // Private helper vars
    var lang1 = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
    var uniqueId = 0;
    // The grammar object for plaintext
    var plainTextGrammar = {};
    var _ = {
        /**
		 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
		 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
		 * additional languages or plugins yourself.
		 *
		 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
		 *
		 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.manual = true;
		 * // add a new <script> to load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */ manual: _self1.Prism && _self1.Prism.manual,
        /**
		 * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
		 * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
		 * own worker, you don't want it to do this.
		 *
		 * By setting this value to `true`, Prism will not add its own listeners to the worker.
		 *
		 * You obviously have to change this value before Prism executes. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.disableWorkerMessageHandler = true;
		 * // Load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */ disableWorkerMessageHandler: _self1.Prism && _self1.Prism.disableWorkerMessageHandler,
        /**
		 * A namespace for utility methods.
		 *
		 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
		 * change or disappear at any time.
		 *
		 * @namespace
		 * @memberof Prism
		 */ util: {
            encode: function encode(tokens) {
                if (tokens instanceof Token) return new Token(tokens.type, encode(tokens.content), tokens.alias);
                else if (Array.isArray(tokens)) return tokens.map(encode);
                else return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
            },
            /**
			 * Returns the name of the type of the given value.
			 *
			 * @param {any} o
			 * @returns {string}
			 * @example
			 * type(null)      === 'Null'
			 * type(undefined) === 'Undefined'
			 * type(123)       === 'Number'
			 * type('foo')     === 'String'
			 * type(true)      === 'Boolean'
			 * type([1, 2])    === 'Array'
			 * type({})        === 'Object'
			 * type(String)    === 'Function'
			 * type(/abc+/)    === 'RegExp'
			 */ type: function(o) {
                return Object.prototype.toString.call(o).slice(8, -1);
            },
            /**
			 * Returns a unique number for the given object. Later calls will still return the same number.
			 *
			 * @param {Object} obj
			 * @returns {number}
			 */ objId: function(obj) {
                if (!obj["__id"]) Object.defineProperty(obj, "__id", {
                    value: ++uniqueId
                });
                return obj["__id"];
            },
            /**
			 * Creates a deep clone of the given object.
			 *
			 * The main intended use of this function is to clone language definitions.
			 *
			 * @param {T} o
			 * @param {Record<number, any>} [visited]
			 * @returns {T}
			 * @template T
			 */ clone: function deepClone(o, visited) {
                visited = visited || {};
                var clone;
                var id;
                switch(_.util.type(o)){
                    case "Object":
                        id = _.util.objId(o);
                        if (visited[id]) return visited[id];
                        clone = {};
                        visited[id] = clone;
                        for(var key in o)if (o.hasOwnProperty(key)) clone[key] = deepClone(o[key], visited);
                        return clone;
                    case "Array":
                        id = _.util.objId(o);
                        if (visited[id]) return visited[id];
                        clone = [];
                        visited[id] = clone;
                        o.forEach(function(v, i) {
                            clone[i] = deepClone(v, visited);
                        });
                        return clone;
                    default:
                        return o;
                }
            },
            /**
			 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
			 *
			 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
			 *
			 * @param {Element} element
			 * @returns {string}
			 */ getLanguage: function(element) {
                while(element){
                    var m = lang1.exec(element.className);
                    if (m) return m[1].toLowerCase();
                    element = element.parentElement;
                }
                return "none";
            },
            /**
			 * Sets the Prism `language-xxxx` class of the given element.
			 *
			 * @param {Element} element
			 * @param {string} language
			 * @returns {void}
			 */ setLanguage: function(element, language) {
                // remove all `language-xxxx` classes
                // (this might leave behind a leading space)
                element.className = element.className.replace(RegExp(lang1, "gi"), "");
                // add the new `language-xxxx` class
                // (using `classList` will automatically clean up spaces for us)
                element.classList.add("language-" + language);
            },
            /**
			 * Returns the script element that is currently executing.
			 *
			 * This does __not__ work for line script element.
			 *
			 * @returns {HTMLScriptElement | null}
			 */ currentScript: function() {
                if (typeof document === "undefined") return null;
                if ("currentScript" in document && true /* hack to trip TS' flow analysis */ ) return document.currentScript;
                // IE11 workaround
                // we'll get the src of the current script by parsing IE11's error stack trace
                // this will not work for inline scripts
                try {
                    throw new Error();
                } catch (err) {
                    // Get file src url from stack. Specifically works with the format of stack traces in IE.
                    // A stack will look like this:
                    //
                    // Error
                    //    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
                    //    at Global code (http://localhost/components/prism-core.js:606:1)
                    var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
                    if (src) {
                        var scripts = document.getElementsByTagName("script");
                        for(var i in scripts){
                            if (scripts[i].src == src) return scripts[i];
                        }
                    }
                    return null;
                }
            },
            /**
			 * Returns whether a given class is active for `element`.
			 *
			 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
			 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
			 * given class is just the given class with a `no-` prefix.
			 *
			 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
			 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
			 * ancestors have the given class or the negated version of it, then the default activation will be returned.
			 *
			 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
			 * version of it, the class is considered active.
			 *
			 * @param {Element} element
			 * @param {string} className
			 * @param {boolean} [defaultActivation=false]
			 * @returns {boolean}
			 */ isActive: function(element, className, defaultActivation) {
                var no = "no-" + className;
                while(element){
                    var classList = element.classList;
                    if (classList.contains(className)) return true;
                    if (classList.contains(no)) return false;
                    element = element.parentElement;
                }
                return !!defaultActivation;
            }
        },
        /**
		 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
		 *
		 * @namespace
		 * @memberof Prism
		 * @public
		 */ languages: {
            /**
			 * The grammar for plain, unformatted text.
			 */ plain: plainTextGrammar,
            plaintext: plainTextGrammar,
            text: plainTextGrammar,
            txt: plainTextGrammar,
            /**
			 * Creates a deep copy of the language with the given id and appends the given tokens.
			 *
			 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
			 * will be overwritten at its original position.
			 *
			 * ## Best practices
			 *
			 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
			 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
			 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
			 *
			 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
			 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
			 *
			 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
			 * @param {Grammar} redef The new tokens to append.
			 * @returns {Grammar} The new language created.
			 * @public
			 * @example
			 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
			 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
			 *     // at its original position
			 *     'comment': { ... },
			 *     // CSS doesn't have a 'color' token, so this token will be appended
			 *     'color': /\b(?:red|green|blue)\b/
			 * });
			 */ extend: function(id, redef) {
                var lang = _.util.clone(_.languages[id]);
                for(var key in redef)lang[key] = redef[key];
                return lang;
            },
            /**
			 * Inserts tokens _before_ another token in a language definition or any other grammar.
			 *
			 * ## Usage
			 *
			 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
			 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
			 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
			 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
			 * this:
			 *
			 * ```js
			 * Prism.languages.markup.style = {
			 *     // token
			 * };
			 * ```
			 *
			 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
			 * before existing tokens. For the CSS example above, you would use it like this:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'cdata', {
			 *     'style': {
			 *         // token
			 *     }
			 * });
			 * ```
			 *
			 * ## Special cases
			 *
			 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
			 * will be ignored.
			 *
			 * This behavior can be used to insert tokens after `before`:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'comment', {
			 *     'comment': Prism.languages.markup.comment,
			 *     // tokens after 'comment'
			 * });
			 * ```
			 *
			 * ## Limitations
			 *
			 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
			 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
			 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
			 * deleting properties which is necessary to insert at arbitrary positions.
			 *
			 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
			 * Instead, it will create a new object and replace all references to the target object with the new one. This
			 * can be done without temporarily deleting properties, so the iteration order is well-defined.
			 *
			 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
			 * you hold the target object in a variable, then the value of the variable will not change.
			 *
			 * ```js
			 * var oldMarkup = Prism.languages.markup;
			 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
			 *
			 * assert(oldMarkup !== Prism.languages.markup);
			 * assert(newMarkup === Prism.languages.markup);
			 * ```
			 *
			 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
			 * object to be modified.
			 * @param {string} before The key to insert before.
			 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
			 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
			 * object to be modified.
			 *
			 * Defaults to `Prism.languages`.
			 * @returns {Grammar} The new grammar object.
			 * @public
			 */ insertBefore: function(inside, before, insert, root) {
                root = root || _.languages;
                var grammar = root[inside];
                /** @type {Grammar} */ var ret = {};
                for(var token in grammar)if (grammar.hasOwnProperty(token)) {
                    if (token == before) {
                        for(var newToken in insert)if (insert.hasOwnProperty(newToken)) ret[newToken] = insert[newToken];
                    }
                    // Do not insert token which also occur in insert. See #1525
                    if (!insert.hasOwnProperty(token)) ret[token] = grammar[token];
                }
                var old = root[inside];
                root[inside] = ret;
                // Update references in other language definitions
                _.languages.DFS(_.languages, function(key, value) {
                    if (value === old && key != inside) this[key] = ret;
                });
                return ret;
            },
            // Traverse a language definition with Depth First Search
            DFS: function DFS(o, callback, type, visited) {
                visited = visited || {};
                var objId = _.util.objId;
                for(var i in o)if (o.hasOwnProperty(i)) {
                    callback.call(o, i, o[i], type || i);
                    var property = o[i];
                    var propertyType = _.util.type(property);
                    if (propertyType === "Object" && !visited[objId(property)]) {
                        visited[objId(property)] = true;
                        DFS(property, callback, null, visited);
                    } else if (propertyType === "Array" && !visited[objId(property)]) {
                        visited[objId(property)] = true;
                        DFS(property, callback, i, visited);
                    }
                }
            }
        },
        plugins: {},
        /**
		 * This is the most high-level function in Prism’s API.
		 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
		 * each one of them.
		 *
		 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
		 *
		 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
		 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
		 * @memberof Prism
		 * @public
		 */ highlightAll: function(async, callback) {
            _.highlightAllUnder(document, async, callback);
        },
        /**
		 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
		 * {@link Prism.highlightElement} on each one of them.
		 *
		 * The following hooks will be run:
		 * 1. `before-highlightall`
		 * 2. `before-all-elements-highlight`
		 * 3. All hooks of {@link Prism.highlightElement} for each element.
		 *
		 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
		 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
		 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
		 * @memberof Prism
		 * @public
		 */ highlightAllUnder: function(container, async, callback) {
            var env = {
                callback: callback,
                container: container,
                selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };
            _.hooks.run("before-highlightall", env);
            env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
            _.hooks.run("before-all-elements-highlight", env);
            for(var i = 0, element; element = env.elements[i++];)_.highlightElement(element, async === true, env.callback);
        },
        /**
		 * Highlights the code inside a single element.
		 *
		 * The following hooks will be run:
		 * 1. `before-sanity-check`
		 * 2. `before-highlight`
		 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
		 * 4. `before-insert`
		 * 5. `after-highlight`
		 * 6. `complete`
		 *
		 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
		 * the element's language.
		 *
		 * @param {Element} element The element containing the code.
		 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
		 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
		 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
		 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
		 *
		 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
		 * asynchronous highlighting to work. You can build your own bundle on the
		 * [Download page](https://prismjs.com/download.html).
		 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
		 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
		 * @memberof Prism
		 * @public
		 */ highlightElement: function(element, async, callback) {
            // Find language
            var language = _.util.getLanguage(element);
            var grammar = _.languages[language];
            // Set language on the element, if not present
            _.util.setLanguage(element, language);
            // Set language on the parent, for styling
            var parent = element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === "pre") _.util.setLanguage(parent, language);
            var code = element.textContent;
            var env = {
                element: element,
                language: language,
                grammar: grammar,
                code: code
            };
            function insertHighlightedCode(highlightedCode) {
                env.highlightedCode = highlightedCode;
                _.hooks.run("before-insert", env);
                env.element.innerHTML = env.highlightedCode;
                _.hooks.run("after-highlight", env);
                _.hooks.run("complete", env);
                callback && callback.call(env.element);
            }
            _.hooks.run("before-sanity-check", env);
            // plugins may change/add the parent/element
            parent = env.element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) parent.setAttribute("tabindex", "0");
            if (!env.code) {
                _.hooks.run("complete", env);
                callback && callback.call(env.element);
                return;
            }
            _.hooks.run("before-highlight", env);
            if (!env.grammar) {
                insertHighlightedCode(_.util.encode(env.code));
                return;
            }
            if (async && _self1.Worker) {
                var worker = new Worker(_.filename);
                worker.onmessage = function(evt) {
                    insertHighlightedCode(evt.data);
                };
                worker.postMessage(JSON.stringify({
                    language: env.language,
                    code: env.code,
                    immediateClose: true
                }));
            } else insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
        },
        /**
		 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
		 * and the language definitions to use, and returns a string with the HTML produced.
		 *
		 * The following hooks will be run:
		 * 1. `before-tokenize`
		 * 2. `after-tokenize`
		 * 3. `wrap`: On each {@link Token}.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @param {string} language The name of the language definition passed to `grammar`.
		 * @returns {string} The highlighted HTML.
		 * @memberof Prism
		 * @public
		 * @example
		 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
		 */ highlight: function(text, grammar, language) {
            var env = {
                code: text,
                grammar: grammar,
                language: language
            };
            _.hooks.run("before-tokenize", env);
            if (!env.grammar) throw new Error('The language "' + env.language + '" has no grammar.');
            env.tokens = _.tokenize(env.code, env.grammar);
            _.hooks.run("after-tokenize", env);
            return Token.stringify(_.util.encode(env.tokens), env.language);
        },
        /**
		 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
		 * and the language definitions to use, and returns an array with the tokenized code.
		 *
		 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
		 *
		 * This method could be useful in other contexts as well, as a very crude parser.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @returns {TokenStream} An array of strings and tokens, a token stream.
		 * @memberof Prism
		 * @public
		 * @example
		 * let code = `var foo = 0;`;
		 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
		 * tokens.forEach(token => {
		 *     if (token instanceof Prism.Token && token.type === 'number') {
		 *         console.log(`Found numeric literal: ${token.content}`);
		 *     }
		 * });
		 */ tokenize: function(text, grammar) {
            var rest = grammar.rest;
            if (rest) {
                for(var token in rest)grammar[token] = rest[token];
                delete grammar.rest;
            }
            var tokenList = new LinkedList();
            addAfter(tokenList, tokenList.head, text);
            matchGrammar(text, tokenList, grammar, tokenList.head, 0);
            return toArray(tokenList);
        },
        /**
		 * @namespace
		 * @memberof Prism
		 * @public
		 */ hooks: {
            all: {},
            /**
			 * Adds the given callback to the list of callbacks for the given hook.
			 *
			 * The callback will be invoked when the hook it is registered for is run.
			 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
			 *
			 * One callback function can be registered to multiple hooks and the same hook multiple times.
			 *
			 * @param {string} name The name of the hook.
			 * @param {HookCallback} callback The callback function which is given environment variables.
			 * @public
			 */ add: function(name, callback) {
                var hooks = _.hooks.all;
                hooks[name] = hooks[name] || [];
                hooks[name].push(callback);
            },
            /**
			 * Runs a hook invoking all registered callbacks with the given environment variables.
			 *
			 * Callbacks will be invoked synchronously and in the order in which they were registered.
			 *
			 * @param {string} name The name of the hook.
			 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
			 * @public
			 */ run: function(name, env) {
                var callbacks = _.hooks.all[name];
                if (!callbacks || !callbacks.length) return;
                for(var i = 0, callback; callback = callbacks[i++];)callback(env);
            }
        },
        Token: Token
    };
    _self1.Prism = _;
    // Typescript note:
    // The following can be used to import the Token type in JSDoc:
    //
    //   @typedef {InstanceType<import("./prism-core")["Token"]>} Token
    /**
	 * Creates a new token.
	 *
	 * @param {string} type See {@link Token#type type}
	 * @param {string | TokenStream} content See {@link Token#content content}
	 * @param {string|string[]} [alias] The alias(es) of the token.
	 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
	 * @class
	 * @global
	 * @public
	 */ function Token(type, content, alias, matchedStr) {
        /**
		 * The type of the token.
		 *
		 * This is usually the key of a pattern in a {@link Grammar}.
		 *
		 * @type {string}
		 * @see GrammarToken
		 * @public
		 */ this.type = type;
        /**
		 * The strings or tokens contained by this token.
		 *
		 * This will be a token stream if the pattern matched also defined an `inside` grammar.
		 *
		 * @type {string | TokenStream}
		 * @public
		 */ this.content = content;
        /**
		 * The alias(es) of the token.
		 *
		 * @type {string|string[]}
		 * @see GrammarToken
		 * @public
		 */ this.alias = alias;
        // Copy of the full string this token was created from
        this.length = (matchedStr || "").length | 0;
    }
    /**
	 * A token stream is an array of strings and {@link Token Token} objects.
	 *
	 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
	 * them.
	 *
	 * 1. No adjacent strings.
	 * 2. No empty strings.
	 *
	 *    The only exception here is the token stream that only contains the empty string and nothing else.
	 *
	 * @typedef {Array<string | Token>} TokenStream
	 * @global
	 * @public
	 */ /**
	 * Converts the given token or token stream to an HTML representation.
	 *
	 * The following hooks will be run:
	 * 1. `wrap`: On each {@link Token}.
	 *
	 * @param {string | Token | TokenStream} o The token or token stream to be converted.
	 * @param {string} language The name of current language.
	 * @returns {string} The HTML representation of the token or token stream.
	 * @memberof Token
	 * @static
	 */ Token.stringify = function stringify(o, language) {
        if (typeof o == "string") return o;
        if (Array.isArray(o)) {
            var s = "";
            o.forEach(function(e) {
                s += stringify(e, language);
            });
            return s;
        }
        var env = {
            type: o.type,
            content: stringify(o.content, language),
            tag: "span",
            classes: [
                "token",
                o.type
            ],
            attributes: {},
            language: language
        };
        var aliases = o.alias;
        if (aliases) {
            if (Array.isArray(aliases)) Array.prototype.push.apply(env.classes, aliases);
            else env.classes.push(aliases);
        }
        _.hooks.run("wrap", env);
        var attributes = "";
        for(var name in env.attributes)attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
        return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
    };
    /**
	 * @param {RegExp} pattern
	 * @param {number} pos
	 * @param {string} text
	 * @param {boolean} lookbehind
	 * @returns {RegExpExecArray | null}
	 */ function matchPattern(pattern, pos, text, lookbehind) {
        pattern.lastIndex = pos;
        var match = pattern.exec(text);
        if (match && lookbehind && match[1]) {
            // change the match to remove the text matched by the Prism lookbehind group
            var lookbehindLength = match[1].length;
            match.index += lookbehindLength;
            match[0] = match[0].slice(lookbehindLength);
        }
        return match;
    }
    /**
	 * @param {string} text
	 * @param {LinkedList<string | Token>} tokenList
	 * @param {any} grammar
	 * @param {LinkedListNode<string | Token>} startNode
	 * @param {number} startPos
	 * @param {RematchOptions} [rematch]
	 * @returns {void}
	 * @private
	 *
	 * @typedef RematchOptions
	 * @property {string} cause
	 * @property {number} reach
	 */ function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
        for(var token in grammar){
            if (!grammar.hasOwnProperty(token) || !grammar[token]) continue;
            var patterns = grammar[token];
            patterns = Array.isArray(patterns) ? patterns : [
                patterns
            ];
            for(var j = 0; j < patterns.length; ++j){
                if (rematch && rematch.cause == token + "," + j) return;
                var patternObj = patterns[j];
                var inside = patternObj.inside;
                var lookbehind = !!patternObj.lookbehind;
                var greedy = !!patternObj.greedy;
                var alias = patternObj.alias;
                if (greedy && !patternObj.pattern.global) {
                    // Without the global flag, lastIndex won't work
                    var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
                    patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
                }
                /** @type {RegExp} */ var pattern = patternObj.pattern || patternObj;
                for(var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next){
                    if (rematch && pos >= rematch.reach) break;
                    var str = currentNode.value;
                    if (tokenList.length > text.length) // Something went terribly wrong, ABORT, ABORT!
                    return;
                    if (str instanceof Token) continue;
                    var removeCount = 1; // this is the to parameter of removeBetween
                    var match;
                    if (greedy) {
                        match = matchPattern(pattern, pos, text, lookbehind);
                        if (!match || match.index >= text.length) break;
                        var from = match.index;
                        var to = match.index + match[0].length;
                        var p = pos;
                        // find the node that contains the match
                        p += currentNode.value.length;
                        while(from >= p){
                            currentNode = currentNode.next;
                            p += currentNode.value.length;
                        }
                        // adjust pos (and p)
                        p -= currentNode.value.length;
                        pos = p;
                        // the current node is a Token, then the match starts inside another Token, which is invalid
                        if (currentNode.value instanceof Token) continue;
                        // find the last node which is affected by this match
                        for(var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next){
                            removeCount++;
                            p += k.value.length;
                        }
                        removeCount--;
                        // replace with the new match
                        str = text.slice(pos, p);
                        match.index -= pos;
                    } else {
                        match = matchPattern(pattern, 0, str, lookbehind);
                        if (!match) continue;
                    }
                    // eslint-disable-next-line no-redeclare
                    var from = match.index;
                    var matchStr = match[0];
                    var before = str.slice(0, from);
                    var after = str.slice(from + matchStr.length);
                    var reach = pos + str.length;
                    if (rematch && reach > rematch.reach) rematch.reach = reach;
                    var removeFrom = currentNode.prev;
                    if (before) {
                        removeFrom = addAfter(tokenList, removeFrom, before);
                        pos += before.length;
                    }
                    removeRange(tokenList, removeFrom, removeCount);
                    var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
                    currentNode = addAfter(tokenList, removeFrom, wrapped);
                    if (after) addAfter(tokenList, currentNode, after);
                    if (removeCount > 1) {
                        // at least one Token object was removed, so we have to do some rematching
                        // this can only happen if the current pattern is greedy
                        /** @type {RematchOptions} */ var nestedRematch = {
                            cause: token + "," + j,
                            reach: reach
                        };
                        matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
                        // the reach might have been extended because of the rematching
                        if (rematch && nestedRematch.reach > rematch.reach) rematch.reach = nestedRematch.reach;
                    }
                }
            }
        }
    }
    /**
	 * @typedef LinkedListNode
	 * @property {T} value
	 * @property {LinkedListNode<T> | null} prev The previous node.
	 * @property {LinkedListNode<T> | null} next The next node.
	 * @template T
	 * @private
	 */ /**
	 * @template T
	 * @private
	 */ function LinkedList() {
        /** @type {LinkedListNode<T>} */ var head = {
            value: null,
            prev: null,
            next: null
        };
        /** @type {LinkedListNode<T>} */ var tail = {
            value: null,
            prev: head,
            next: null
        };
        head.next = tail;
        /** @type {LinkedListNode<T>} */ this.head = head;
        /** @type {LinkedListNode<T>} */ this.tail = tail;
        this.length = 0;
    }
    /**
	 * Adds a new node with the given value to the list.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {T} value
	 * @returns {LinkedListNode<T>} The added node.
	 * @template T
	 */ function addAfter(list, node, value) {
        // assumes that node != list.tail && values.length >= 0
        var next = node.next;
        var newNode = {
            value: value,
            prev: node,
            next: next
        };
        node.next = newNode;
        next.prev = newNode;
        list.length++;
        return newNode;
    }
    /**
	 * Removes `count` nodes after the given node. The given node will not be removed.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {number} count
	 * @template T
	 */ function removeRange(list, node, count) {
        var next = node.next;
        for(var i = 0; i < count && next !== list.tail; i++)next = next.next;
        node.next = next;
        next.prev = node;
        list.length -= i;
    }
    /**
	 * @param {LinkedList<T>} list
	 * @returns {T[]}
	 * @template T
	 */ function toArray(list) {
        var array = [];
        var node = list.head.next;
        while(node !== list.tail){
            array.push(node.value);
            node = node.next;
        }
        return array;
    }
    if (!_self1.document) {
        if (!_self1.addEventListener) // in Node.js
        return _;
        if (!_.disableWorkerMessageHandler) // In worker
        _self1.addEventListener("message", function(evt) {
            var message = JSON.parse(evt.data);
            var lang = message.language;
            var code = message.code;
            var immediateClose = message.immediateClose;
            _self1.postMessage(_.highlight(code, _.languages[lang], lang));
            if (immediateClose) _self1.close();
        }, false);
        return _;
    }
    // Get current script and highlight
    var script = _.util.currentScript();
    if (script) {
        _.filename = script.src;
        if (script.hasAttribute("data-manual")) _.manual = true;
    }
    function highlightAutomaticallyCallback() {
        if (!_.manual) _.highlightAll();
    }
    if (!_.manual) {
        // If the document state is "loading", then we'll use DOMContentLoaded.
        // If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
        // DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
        // might take longer one animation frame to execute which can create a race condition where only some plugins have
        // been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
        // See https://github.com/PrismJS/prism/issues/2102
        var readyState = document.readyState;
        if (readyState === "loading" || readyState === "interactive" && script && script.defer) document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
        else if (window.requestAnimationFrame) window.requestAnimationFrame(highlightAutomaticallyCallback);
        else window.setTimeout(highlightAutomaticallyCallback, 16);
    }
    return _;
}(_self);
if (module.exports) module.exports = Prism;
// hack for components to work correctly in node.js
if (typeof global !== "undefined") global.Prism = Prism;
// some additional documentation/types
/**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * @typedef GrammarToken
 * @property {RegExp} pattern The regular expression of the token.
 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
 * @property {boolean} [greedy=false] Whether the token is greedy.
 * @property {string|string[]} [alias] An optional alias or list of aliases.
 * @property {Grammar} [inside] The nested grammar of this token.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 * @global
 * @public
 */ /**
 * @typedef Grammar
 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
 * @global
 * @public
 */ /**
 * A function which will invoked after an element was successfully highlighted.
 *
 * @callback HighlightCallback
 * @param {Element} element The element successfully highlighted.
 * @returns {void}
 * @global
 * @public
 */ /**
 * @callback HookCallback
 * @param {Object<string, any>} env The environment variables of the hook.
 * @returns {void}
 * @global
 * @public
 */ /* **********************************************
     Begin prism-markup.js
********************************************** */ Prism.languages.markup = {
    "comment": {
        pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
        greedy: true
    },
    "prolog": {
        pattern: /<\?[\s\S]+?\?>/,
        greedy: true
    },
    "doctype": {
        // https://www.w3.org/TR/xml/#NT-doctypedecl
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: true,
        inside: {
            "internal-subset": {
                pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
                lookbehind: true,
                greedy: true,
                inside: null // see below
            },
            "string": {
                pattern: /"[^"]*"|'[^']*'/,
                greedy: true
            },
            "punctuation": /^<!|>$|[[\]]/,
            "doctype-tag": /^DOCTYPE/i,
            "name": /[^\s<>'"]+/
        }
    },
    "cdata": {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        greedy: true
    },
    "tag": {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: true,
        inside: {
            "tag": {
                pattern: /^<\/?[^\s>\/]+/,
                inside: {
                    "punctuation": /^<\/?/,
                    "namespace": /^[^\s>\/:]+:/
                }
            },
            "special-attr": [],
            "attr-value": {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                inside: {
                    "punctuation": [
                        {
                            pattern: /^=/,
                            alias: "attr-equals"
                        },
                        /"|'/
                    ]
                }
            },
            "punctuation": /\/?>/,
            "attr-name": {
                pattern: /[^\s>\/]+/,
                inside: {
                    "namespace": /^[^\s>\/:]+:/
                }
            }
        }
    },
    "entity": [
        {
            pattern: /&[\da-z]{1,8};/i,
            alias: "named-entity"
        },
        /&#x?[\da-f]{1,8};/i
    ]
};
Prism.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism.languages.markup["entity"];
Prism.languages.markup["doctype"].inside["internal-subset"].inside = Prism.languages.markup;
// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add("wrap", function(env) {
    if (env.type === "entity") env.attributes["title"] = env.content.replace(/&amp;/, "&");
});
Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    /**
	 * Adds an inlined language to markup.
	 *
	 * An example of an inlined language is CSS with `<style>` tags.
	 *
	 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addInlined('style', 'css');
	 */ value: function addInlined(tagName, lang) {
        var includedCdataInside = {};
        includedCdataInside["language-" + lang] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: true,
            inside: Prism.languages[lang]
        };
        includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
        var inside = {
            "included-cdata": {
                pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                inside: includedCdataInside
            }
        };
        inside["language-" + lang] = {
            pattern: /[\s\S]+/,
            inside: Prism.languages[lang]
        };
        var def = {};
        def[tagName] = {
            pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
                return tagName;
            }), "i"),
            lookbehind: true,
            greedy: true,
            inside: inside
        };
        Prism.languages.insertBefore("markup", "cdata", def);
    }
});
Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
    /**
	 * Adds an pattern to highlight languages embedded in HTML attributes.
	 *
	 * An example of an inlined language is CSS with `style` attributes.
	 *
	 * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addAttribute('style', 'css');
	 */ value: function(attrName, lang) {
        Prism.languages.markup.tag.inside["special-attr"].push({
            pattern: RegExp(/(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, "i"),
            lookbehind: true,
            inside: {
                "attr-name": /^[^\s=]+/,
                "attr-value": {
                    pattern: /=[\s\S]+/,
                    inside: {
                        "value": {
                            pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                            lookbehind: true,
                            alias: [
                                lang,
                                "language-" + lang
                            ],
                            inside: Prism.languages[lang]
                        },
                        "punctuation": [
                            {
                                pattern: /^=/,
                                alias: "attr-equals"
                            },
                            /"|'/
                        ]
                    }
                }
            }
        });
    }
});
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;
Prism.languages.xml = Prism.languages.extend("markup", {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;
/* **********************************************
     Begin prism-css.js
********************************************** */ (function(Prism1) {
    var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
    Prism1.languages.css = {
        "comment": /\/\*[\s\S]*?\*\//,
        "atrule": {
            pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
            inside: {
                "rule": /^@[\w-]+/,
                "selector-function-argument": {
                    pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                    lookbehind: true,
                    alias: "selector"
                },
                "keyword": {
                    pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                    lookbehind: true
                }
            }
        },
        "url": {
            // https://drafts.csswg.org/css-values-3/#urls
            pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
            greedy: true,
            inside: {
                "function": /^url/i,
                "punctuation": /^\(|\)$/,
                "string": {
                    pattern: RegExp("^" + string.source + "$"),
                    alias: "url"
                }
            }
        },
        "selector": {
            pattern: RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + string.source + ")*(?=\\s*\\{)"),
            lookbehind: true
        },
        "string": {
            pattern: string,
            greedy: true
        },
        "property": {
            pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
            lookbehind: true
        },
        "important": /!important\b/i,
        "function": {
            pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
            lookbehind: true
        },
        "punctuation": /[(){};:,]/
    };
    Prism1.languages.css["atrule"].inside.rest = Prism1.languages.css;
    var markup = Prism1.languages.markup;
    if (markup) {
        markup.tag.addInlined("style", "css");
        markup.tag.addAttribute("style", "css");
    }
})(Prism);
/* **********************************************
     Begin prism-clike.js
********************************************** */ Prism.languages.clike = {
    "comment": [
        {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: true,
            greedy: true
        },
        {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true,
            greedy: true
        }
    ],
    "string": {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
    },
    "class-name": {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: true,
        inside: {
            "punctuation": /[.\\]/
        }
    },
    "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
    "boolean": /\b(?:false|true)\b/,
    "function": /\b\w+(?=\()/,
    "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    "punctuation": /[{}[\];(),.:]/
};
/* **********************************************
     Begin prism-javascript.js
********************************************** */ Prism.languages.javascript = Prism.languages.extend("clike", {
    "class-name": [
        Prism.languages.clike["class-name"],
        {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
            lookbehind: true
        }
    ],
    "keyword": [
        {
            pattern: /((?:^|\})\s*)catch\b/,
            lookbehind: true
        },
        {
            pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: true
        }, 
    ],
    // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
    "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    "number": {
        pattern: RegExp(/(^|[^\w$])/.source + "(?:" + // constant
        (/NaN|Infinity/.source + "|" + // binary integer
        /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
        /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
        /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
        /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
        /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source),
        lookbehind: true
    },
    "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});
Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
Prism.languages.insertBefore("javascript", "keyword", {
    "regex": {
        pattern: RegExp(// lookbehind
        // eslint-disable-next-line regexp/no-dupe-characters-character-class
        /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
        // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
        // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
        // with the only syntax, so we have to define 2 different regex patterns.
        /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
        /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
        /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),
        lookbehind: true,
        greedy: true,
        inside: {
            "regex-source": {
                pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                lookbehind: true,
                alias: "language-regex",
                inside: Prism.languages.regex
            },
            "regex-delimiter": /^\/|\/$/,
            "regex-flags": /^[a-z]+$/
        }
    },
    // This must be declared before keyword because we use "function" inside the look-forward
    "function-variable": {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function"
    },
    "parameter": [
        {
            pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: true,
            inside: Prism.languages.javascript
        },
        {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            lookbehind: true,
            inside: Prism.languages.javascript
        },
        {
            pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: true,
            inside: Prism.languages.javascript
        },
        {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: true,
            inside: Prism.languages.javascript
        }
    ],
    "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});
Prism.languages.insertBefore("javascript", "string", {
    "hashbang": {
        pattern: /^#!.*/,
        greedy: true,
        alias: "comment"
    },
    "template-string": {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: true,
        inside: {
            "template-punctuation": {
                pattern: /^`|`$/,
                alias: "string"
            },
            "interpolation": {
                pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
                lookbehind: true,
                inside: {
                    "interpolation-punctuation": {
                        pattern: /^\$\{|\}$/,
                        alias: "punctuation"
                    },
                    rest: Prism.languages.javascript
                }
            },
            "string": /[\s\S]+/
        }
    },
    "string-property": {
        pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: true,
        greedy: true,
        alias: "property"
    }
});
Prism.languages.insertBefore("javascript", "operator", {
    "literal-property": {
        pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: true,
        alias: "property"
    }
});
if (Prism.languages.markup) {
    Prism.languages.markup.tag.addInlined("script", "javascript");
    // add attribute support for all DOM events.
    // https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
    Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, "javascript");
}
Prism.languages.js = Prism.languages.javascript;
/* **********************************************
     Begin prism-file-highlight.js
********************************************** */ (function() {
    if (typeof Prism === "undefined" || typeof document === "undefined") return;
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
    if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    var LOADING_MESSAGE = "Loading\u2026";
    var FAILURE_MESSAGE = function(status, message) {
        return "\u2716 Error " + status + " while fetching file: " + message;
    };
    var FAILURE_EMPTY_MESSAGE = "\u2716 Error: File does not exist or is empty";
    var EXTENSIONS = {
        "js": "javascript",
        "py": "python",
        "rb": "ruby",
        "ps1": "powershell",
        "psm1": "powershell",
        "sh": "bash",
        "bat": "batch",
        "h": "c",
        "tex": "latex"
    };
    var STATUS_ATTR = "data-src-status";
    var STATUS_LOADING = "loading";
    var STATUS_LOADED = "loaded";
    var STATUS_FAILED = "failed";
    var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + '="' + STATUS_LOADED + '"])' + ":not([" + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
    /**
	 * Loads the given file.
	 *
	 * @param {string} src The URL or path of the source file to load.
	 * @param {(result: string) => void} success
	 * @param {(reason: string) => void} error
	 */ function loadFile(src, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", src, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status < 400 && xhr.responseText) success(xhr.responseText);
                else if (xhr.status >= 400) error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
                else error(FAILURE_EMPTY_MESSAGE);
            }
        };
        xhr.send(null);
    }
    /**
	 * Parses the given range.
	 *
	 * This returns a range with inclusive ends.
	 *
	 * @param {string | null | undefined} range
	 * @returns {[number, number | undefined] | undefined}
	 */ function parseRange(range) {
        var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || "");
        if (m) {
            var start = Number(m[1]);
            var comma = m[2];
            var end = m[3];
            if (!comma) return [
                start,
                start
            ];
            if (!end) return [
                start,
                undefined
            ];
            return [
                start,
                Number(end)
            ];
        }
        return undefined;
    }
    Prism.hooks.add("before-highlightall", function(env) {
        env.selector += ", " + SELECTOR;
    });
    Prism.hooks.add("before-sanity-check", function(env) {
        var pre = env.element;
        if (pre.matches(SELECTOR)) {
            env.code = ""; // fast-path the whole thing and go to complete
            pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading
            // add code element with loading message
            var code = pre.appendChild(document.createElement("CODE"));
            code.textContent = LOADING_MESSAGE;
            var src = pre.getAttribute("data-src");
            var language = env.language;
            if (language === "none") {
                // the language might be 'none' because there is no language set;
                // in this case, we want to use the extension as the language
                var extension = (/\.(\w+)$/.exec(src) || [
                    ,
                    "none"
                ])[1];
                language = EXTENSIONS[extension] || extension;
            }
            // set language classes
            Prism.util.setLanguage(code, language);
            Prism.util.setLanguage(pre, language);
            // preload the language
            var autoloader = Prism.plugins.autoloader;
            if (autoloader) autoloader.loadLanguages(language);
            // load file
            loadFile(src, function(text) {
                // mark as loaded
                pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
                // handle data-range
                var range = parseRange(pre.getAttribute("data-range"));
                if (range) {
                    var lines = text.split(/\r\n?|\n/g);
                    // the range is one-based and inclusive on both ends
                    var start = range[0];
                    var end = range[1] == null ? lines.length : range[1];
                    if (start < 0) start += lines.length;
                    start = Math.max(0, Math.min(start - 1, lines.length));
                    if (end < 0) end += lines.length;
                    end = Math.max(0, Math.min(end, lines.length));
                    text = lines.slice(start, end).join("\n");
                    // add data-start for line numbers
                    if (!pre.hasAttribute("data-start")) pre.setAttribute("data-start", String(start + 1));
                }
                // highlight code
                code.textContent = text;
                Prism.highlightElement(code);
            }, function(error) {
                // mark as failed
                pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
                code.textContent = error;
            });
        }
    });
    Prism.plugins.fileHighlight = {
        /**
		 * Executes the File Highlight plugin for all matching `pre` elements under the given container.
		 *
		 * Note: Elements which are already loaded or currently loading will not be touched by this method.
		 *
		 * @param {ParentNode} [container=document]
		 */ highlight: function highlight(container) {
            var elements = (container || document).querySelectorAll(SELECTOR);
            for(var i = 0, element; element = elements[i++];)Prism.highlightElement(element);
        }
    };
    var logged = false;
    /** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */ Prism.fileHighlight = function() {
        if (!logged) {
            console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
            logged = true;
        }
        Prism.plugins.fileHighlight.highlight.apply(this, arguments);
    };
})();

},{}],"k2fhP":[function(require,module,exports) {
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
var process = require("process");
function assertPath(path) {
    if (typeof path !== "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(path));
}
// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
    var res = "";
    var lastSegmentLength = 0;
    var lastSlash = -1;
    var dots = 0;
    var code;
    for(var i = 0; i <= path.length; ++i){
        if (i < path.length) code = path.charCodeAt(i);
        else if (code === 47 /*/*/ ) break;
        else code = 47 /*/*/ ;
        if (code === 47 /*/*/ ) {
            if (lastSlash === i - 1 || dots === 1) ;
            else if (lastSlash !== i - 1 && dots === 2) {
                if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/  || res.charCodeAt(res.length - 2) !== 46 /*.*/ ) {
                    if (res.length > 2) {
                        var lastSlashIndex = res.lastIndexOf("/");
                        if (lastSlashIndex !== res.length - 1) {
                            if (lastSlashIndex === -1) {
                                res = "";
                                lastSegmentLength = 0;
                            } else {
                                res = res.slice(0, lastSlashIndex);
                                lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                            }
                            lastSlash = i;
                            dots = 0;
                            continue;
                        }
                    } else if (res.length === 2 || res.length === 1) {
                        res = "";
                        lastSegmentLength = 0;
                        lastSlash = i;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    if (res.length > 0) res += "/..";
                    else res = "..";
                    lastSegmentLength = 2;
                }
            } else {
                if (res.length > 0) res += "/" + path.slice(lastSlash + 1, i);
                else res = path.slice(lastSlash + 1, i);
                lastSegmentLength = i - lastSlash - 1;
            }
            lastSlash = i;
            dots = 0;
        } else if (code === 46 /*.*/  && dots !== -1) ++dots;
        else dots = -1;
    }
    return res;
}
function _format(sep, pathObject) {
    var dir = pathObject.dir || pathObject.root;
    var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) return base;
    if (dir === pathObject.root) return dir + base;
    return dir + sep + base;
}
var posix = {
    // path.resolve([from ...], to)
    resolve: function resolve() {
        var resolvedPath = "";
        var resolvedAbsolute = false;
        var cwd;
        for(var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--){
            var path;
            if (i >= 0) path = arguments[i];
            else {
                if (cwd === undefined) cwd = process.cwd();
                path = cwd;
            }
            assertPath(path);
            // Skip empty entries
            if (path.length === 0) continue;
            resolvedPath = path + "/" + resolvedPath;
            resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/ ;
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        // Normalize the path
        resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
        if (resolvedAbsolute) {
            if (resolvedPath.length > 0) return "/" + resolvedPath;
            else return "/";
        } else if (resolvedPath.length > 0) return resolvedPath;
        else return ".";
    },
    normalize: function normalize(path) {
        assertPath(path);
        if (path.length === 0) return ".";
        var isAbsolute = path.charCodeAt(0) === 47 /*/*/ ;
        var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/ ;
        // Normalize the path
        path = normalizeStringPosix(path, !isAbsolute);
        if (path.length === 0 && !isAbsolute) path = ".";
        if (path.length > 0 && trailingSeparator) path += "/";
        if (isAbsolute) return "/" + path;
        return path;
    },
    isAbsolute: function isAbsolute(path) {
        assertPath(path);
        return path.length > 0 && path.charCodeAt(0) === 47 /*/*/ ;
    },
    join: function join() {
        if (arguments.length === 0) return ".";
        var joined;
        for(var i = 0; i < arguments.length; ++i){
            var arg = arguments[i];
            assertPath(arg);
            if (arg.length > 0) {
                if (joined === undefined) joined = arg;
                else joined += "/" + arg;
            }
        }
        if (joined === undefined) return ".";
        return posix.normalize(joined);
    },
    relative: function relative(from, to) {
        assertPath(from);
        assertPath(to);
        if (from === to) return "";
        from = posix.resolve(from);
        to = posix.resolve(to);
        if (from === to) return "";
        // Trim any leading backslashes
        var fromStart = 1;
        for(; fromStart < from.length; ++fromStart){
            if (from.charCodeAt(fromStart) !== 47 /*/*/ ) break;
        }
        var fromEnd = from.length;
        var fromLen = fromEnd - fromStart;
        // Trim any leading backslashes
        var toStart = 1;
        for(; toStart < to.length; ++toStart){
            if (to.charCodeAt(toStart) !== 47 /*/*/ ) break;
        }
        var toEnd = to.length;
        var toLen = toEnd - toStart;
        // Compare paths to find the longest common path from root
        var length = fromLen < toLen ? fromLen : toLen;
        var lastCommonSep = -1;
        var i = 0;
        for(; i <= length; ++i){
            if (i === length) {
                if (toLen > length) {
                    if (to.charCodeAt(toStart + i) === 47 /*/*/ ) // We get here if `from` is the exact base path for `to`.
                    // For example: from='/foo/bar'; to='/foo/bar/baz'
                    return to.slice(toStart + i + 1);
                    else if (i === 0) // We get here if `from` is the root
                    // For example: from='/'; to='/foo'
                    return to.slice(toStart + i);
                } else if (fromLen > length) {
                    if (from.charCodeAt(fromStart + i) === 47 /*/*/ ) // We get here if `to` is the exact base path for `from`.
                    // For example: from='/foo/bar/baz'; to='/foo/bar'
                    lastCommonSep = i;
                    else if (i === 0) // We get here if `to` is the root.
                    // For example: from='/foo'; to='/'
                    lastCommonSep = 0;
                }
                break;
            }
            var fromCode = from.charCodeAt(fromStart + i);
            var toCode = to.charCodeAt(toStart + i);
            if (fromCode !== toCode) break;
            else if (fromCode === 47 /*/*/ ) lastCommonSep = i;
        }
        var out = "";
        // Generate the relative path based on the path difference between `to`
        // and `from`
        for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i)if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/ ) {
            if (out.length === 0) out += "..";
            else out += "/..";
        }
        // Lastly, append the rest of the destination (`to`) path that comes after
        // the common path parts
        if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
        else {
            toStart += lastCommonSep;
            if (to.charCodeAt(toStart) === 47 /*/*/ ) ++toStart;
            return to.slice(toStart);
        }
    },
    _makeLong: function _makeLong(path) {
        return path;
    },
    dirname: function dirname(path) {
        assertPath(path);
        if (path.length === 0) return ".";
        var code = path.charCodeAt(0);
        var hasRoot = code === 47 /*/*/ ;
        var end = -1;
        var matchedSlash = true;
        for(var i = path.length - 1; i >= 1; --i){
            code = path.charCodeAt(i);
            if (code === 47 /*/*/ ) {
                if (!matchedSlash) {
                    end = i;
                    break;
                }
            } else // We saw the first non-path separator
            matchedSlash = false;
        }
        if (end === -1) return hasRoot ? "/" : ".";
        if (hasRoot && end === 1) return "//";
        return path.slice(0, end);
    },
    basename: function basename(path, ext) {
        if (ext !== undefined && typeof ext !== "string") throw new TypeError('"ext" argument must be a string');
        assertPath(path);
        var start = 0;
        var end = -1;
        var matchedSlash = true;
        var i;
        if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
            if (ext.length === path.length && ext === path) return "";
            var extIdx = ext.length - 1;
            var firstNonSlashEnd = -1;
            for(i = path.length - 1; i >= 0; --i){
                var code = path.charCodeAt(i);
                if (code === 47 /*/*/ ) // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                {
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                } else {
                    if (firstNonSlashEnd === -1) {
                        // We saw the first non-path separator, remember this index in case
                        // we need it if the extension ends up not matching
                        matchedSlash = false;
                        firstNonSlashEnd = i + 1;
                    }
                    if (extIdx >= 0) {
                        // Try to match the explicit extension
                        if (code === ext.charCodeAt(extIdx)) {
                            if (--extIdx === -1) // We matched the extension, so mark this as the end of our path
                            // component
                            end = i;
                        } else {
                            // Extension does not match, so our result is the entire path
                            // component
                            extIdx = -1;
                            end = firstNonSlashEnd;
                        }
                    }
                }
            }
            if (start === end) end = firstNonSlashEnd;
            else if (end === -1) end = path.length;
            return path.slice(start, end);
        } else {
            for(i = path.length - 1; i >= 0; --i){
                if (path.charCodeAt(i) === 47 /*/*/ ) // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                {
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                } else if (end === -1) {
                    // We saw the first non-path separator, mark this as the end of our
                    // path component
                    matchedSlash = false;
                    end = i + 1;
                }
            }
            if (end === -1) return "";
            return path.slice(start, end);
        }
    },
    extname: function extname(path) {
        assertPath(path);
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        var preDotState = 0;
        for(var i = path.length - 1; i >= 0; --i){
            var code = path.charCodeAt(i);
            if (code === 47 /*/*/ ) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === 46 /*.*/ ) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) startDot = i;
                else if (preDotState !== 1) preDotState = 1;
            } else if (startDot !== -1) // We saw a non-dot and non-path separator before our dot, so we should
            // have a good chance at having a non-empty extension
            preDotState = -1;
        }
        if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) return "";
        return path.slice(startDot, end);
    },
    format: function format(pathObject) {
        if (pathObject === null || typeof pathObject !== "object") throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
        return _format("/", pathObject);
    },
    parse: function parse(path) {
        assertPath(path);
        var ret = {
            root: "",
            dir: "",
            base: "",
            ext: "",
            name: ""
        };
        if (path.length === 0) return ret;
        var code = path.charCodeAt(0);
        var isAbsolute = code === 47 /*/*/ ;
        var start;
        if (isAbsolute) {
            ret.root = "/";
            start = 1;
        } else start = 0;
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var i = path.length - 1;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        var preDotState = 0;
        // Get non-dir info
        for(; i >= start; --i){
            code = path.charCodeAt(i);
            if (code === 47 /*/*/ ) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === 46 /*.*/ ) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) startDot = i;
                else if (preDotState !== 1) preDotState = 1;
            } else if (startDot !== -1) // We saw a non-dot and non-path separator before our dot, so we should
            // have a good chance at having a non-empty extension
            preDotState = -1;
        }
        if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
            if (end !== -1) {
                if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);
                else ret.base = ret.name = path.slice(startPart, end);
            }
        } else {
            if (startPart === 0 && isAbsolute) {
                ret.name = path.slice(1, startDot);
                ret.base = path.slice(1, end);
            } else {
                ret.name = path.slice(startPart, startDot);
                ret.base = path.slice(startPart, end);
            }
            ret.ext = path.slice(startDot, end);
        }
        if (startPart > 0) ret.dir = path.slice(0, startPart - 1);
        else if (isAbsolute) ret.dir = "/";
        return ret;
    },
    sep: "/",
    delimiter: ":",
    win32: null,
    posix: null
};
posix.posix = posix;
module.exports = posix;

},{"process":"gq3cc"}],"gq3cc":[function(require,module,exports) {
// shim for using process in browser
var process = module.exports = {};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
}
(function() {
    try {
        if (typeof setTimeout === "function") cachedSetTimeout = setTimeout;
        else cachedSetTimeout = defaultSetTimout;
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === "function") cachedClearTimeout = clearTimeout;
        else cachedClearTimeout = defaultClearTimeout;
    } catch (e1) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) //normal enviroments in sane situations
    return setTimeout(fun, 0);
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) //normal enviroments in sane situations
    return clearTimeout(marker);
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
    if (!draining || !currentQueue) return;
    draining = false;
    if (currentQueue.length) queue = currentQueue.concat(queue);
    else queueIndex = -1;
    if (queue.length) drainQueue();
}
function drainQueue() {
    if (draining) return;
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while(len){
        currentQueue = queue;
        queue = [];
        while(++queueIndex < len)if (currentQueue) currentQueue[queueIndex].run();
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) for(var i = 1; i < arguments.length; i++)args[i - 1] = arguments[i];
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) runTimeout(drainQueue);
};
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function() {
    this.fun.apply(null, this.array);
};
process.title = "browser";
process.browser = true;
process.env = {};
process.argv = [];
process.version = ""; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function(name) {
    return [];
};
process.binding = function(name) {
    throw new Error("process.binding is not supported");
};
process.cwd = function() {
    return "/";
};
process.chdir = function(dir) {
    throw new Error("process.chdir is not supported");
};
process.umask = function() {
    return 0;
};

},{}],"jPxNL":[function(require,module,exports) {
module.exports["_tab-selected"] = `gKCiPq__tab-selected`;
module.exports["_files"] = `gKCiPq__files`;
module.exports["CodeViewer"] = `gKCiPq_CodeViewer`;
module.exports["_file"] = `gKCiPq__file`;
module.exports["_tab"] = `gKCiPq__tab`;

},{}],"7ZAOq":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"7JKWE":[function(require,module,exports) {
(function(Prism) {
    Prism.languages.typescript = Prism.languages.extend("javascript", {
        "class-name": {
            pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
            lookbehind: true,
            greedy: true,
            inside: null // see below
        },
        "builtin": /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/
    });
    // The keywords TypeScript adds to JavaScript
    Prism.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/, // keywords that have to be followed by an identifier
    /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/, // This is for `import type *, {}`
    /\btype\b(?=\s*(?:[\{*]|$))/);
    // doesn't work with TS because TS is too complex
    delete Prism.languages.typescript["parameter"];
    delete Prism.languages.typescript["literal-property"];
    // a version of typescript specifically for highlighting types
    var typeInside = Prism.languages.extend("typescript", {});
    delete typeInside["class-name"];
    Prism.languages.typescript["class-name"].inside = typeInside;
    Prism.languages.insertBefore("typescript", "function", {
        "decorator": {
            pattern: /@[$\w\xA0-\uFFFF]+/,
            inside: {
                "at": {
                    pattern: /^@/,
                    alias: "operator"
                },
                "function": /^[\s\S]+/
            }
        },
        "generic-function": {
            // e.g. foo<T extends "bar" | "baz">( ...
            pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
            greedy: true,
            inside: {
                "function": /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
                "generic": {
                    pattern: /<[\s\S]+/,
                    alias: "class-name",
                    inside: typeInside
                }
            }
        }
    });
    Prism.languages.ts = Prism.languages.typescript;
})(Prism);

},{}],"cu9OL":[function(require,module,exports) {
(function(Prism) {
    var javascript = Prism.util.clone(Prism.languages.javascript);
    var space = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source;
    var braces = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source;
    var spread = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;
    /**
	 * @param {string} source
	 * @param {string} [flags]
	 */ function re(source, flags) {
        source = source.replace(/<S>/g, function() {
            return space;
        }).replace(/<BRACES>/g, function() {
            return braces;
        }).replace(/<SPREAD>/g, function() {
            return spread;
        });
        return RegExp(source, flags);
    }
    spread = re(spread).source;
    Prism.languages.jsx = Prism.languages.extend("markup", javascript);
    Prism.languages.jsx.tag.pattern = re(/<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source);
    Prism.languages.jsx.tag.inside["tag"].pattern = /^<\/?[^\s>\/]*/;
    Prism.languages.jsx.tag.inside["attr-value"].pattern = /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/;
    Prism.languages.jsx.tag.inside["tag"].inside["class-name"] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/;
    Prism.languages.jsx.tag.inside["comment"] = javascript["comment"];
    Prism.languages.insertBefore("inside", "attr-name", {
        "spread": {
            pattern: re(/<SPREAD>/.source),
            inside: Prism.languages.jsx
        }
    }, Prism.languages.jsx.tag);
    Prism.languages.insertBefore("inside", "special-attr", {
        "script": {
            // Allow for two levels of nesting
            pattern: re(/=<BRACES>/.source),
            alias: "language-javascript",
            inside: {
                "script-punctuation": {
                    pattern: /^=(?=\{)/,
                    alias: "punctuation"
                },
                rest: Prism.languages.jsx
            }
        }
    }, Prism.languages.jsx.tag);
    // The following will handle plain text inside tags
    var stringifyToken = function(token) {
        if (!token) return "";
        if (typeof token === "string") return token;
        if (typeof token.content === "string") return token.content;
        return token.content.map(stringifyToken).join("");
    };
    var walkTokens = function(tokens) {
        var openedTags = [];
        for(var i = 0; i < tokens.length; i++){
            var token = tokens[i];
            var notTagNorBrace = false;
            if (typeof token !== "string") {
                if (token.type === "tag" && token.content[0] && token.content[0].type === "tag") {
                    // We found a tag, now find its kind
                    if (token.content[0].content[0].content === "</") // Closing tag
                    {
                        if (openedTags.length > 0 && openedTags[openedTags.length - 1].tagName === stringifyToken(token.content[0].content[1])) // Pop matching opening tag
                        openedTags.pop();
                    } else {
                        if (token.content[token.content.length - 1].content === "/>") ;
                        else // Opening tag
                        openedTags.push({
                            tagName: stringifyToken(token.content[0].content[1]),
                            openedBraces: 0
                        });
                    }
                } else if (openedTags.length > 0 && token.type === "punctuation" && token.content === "{") // Here we might have entered a JSX context inside a tag
                openedTags[openedTags.length - 1].openedBraces++;
                else if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces > 0 && token.type === "punctuation" && token.content === "}") // Here we might have left a JSX context inside a tag
                openedTags[openedTags.length - 1].openedBraces--;
                else notTagNorBrace = true;
            }
            if (notTagNorBrace || typeof token === "string") {
                if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces === 0) {
                    // Here we are inside a tag, and not inside a JSX context.
                    // That's plain text: drop any tokens matched.
                    var plainText = stringifyToken(token);
                    // And merge text with adjacent text
                    if (i < tokens.length - 1 && (typeof tokens[i + 1] === "string" || tokens[i + 1].type === "plain-text")) {
                        plainText += stringifyToken(tokens[i + 1]);
                        tokens.splice(i + 1, 1);
                    }
                    if (i > 0 && (typeof tokens[i - 1] === "string" || tokens[i - 1].type === "plain-text")) {
                        plainText = stringifyToken(tokens[i - 1]) + plainText;
                        tokens.splice(i - 1, 1);
                        i--;
                    }
                    tokens[i] = new Prism.Token("plain-text", plainText, null, plainText);
                }
            }
            if (token.content && typeof token.content !== "string") walkTokens(token.content);
        }
    };
    Prism.hooks.add("after-tokenize", function(env) {
        if (env.language !== "jsx" && env.language !== "tsx") return;
        walkTokens(env.tokens);
    });
})(Prism);

},{}],"e5FAq":[function(require,module,exports) {
(function(Prism) {
    var typescript = Prism.util.clone(Prism.languages.typescript);
    Prism.languages.tsx = Prism.languages.extend("jsx", typescript);
    // doesn't work with TS because TS is too complex
    delete Prism.languages.tsx["parameter"];
    delete Prism.languages.tsx["literal-property"];
    // This will prevent collisions between TSX tags and TS generic types.
    // Idea by https://github.com/karlhorky
    // Discussion: https://github.com/PrismJS/prism/issues/2594#issuecomment-710666928
    var tag = Prism.languages.tsx.tag;
    tag.pattern = RegExp(/(^|[^\w$]|(?=<\/))/.source + "(?:" + tag.pattern.source + ")", tag.pattern.flags);
    tag.lookbehind = true;
})(Prism);

},{}],"jPYLy":[function(require,module,exports) {
(function() {
    if (typeof Prism === "undefined" || typeof document === "undefined") return;
    /**
	 * Plugin name which is used as a class name for <pre> which is activating the plugin
	 *
	 * @type {string}
	 */ var PLUGIN_NAME = "line-numbers";
    /**
	 * Regular expression used for determining line breaks
	 *
	 * @type {RegExp}
	 */ var NEW_LINE_EXP = /\n(?!$)/g;
    /**
	 * Global exports
	 */ var config = Prism.plugins.lineNumbers = {
        /**
		 * Get node for provided line number
		 *
		 * @param {Element} element pre element
		 * @param {number} number line number
		 * @returns {Element|undefined}
		 */ getLine: function(element, number) {
            if (element.tagName !== "PRE" || !element.classList.contains(PLUGIN_NAME)) return;
            var lineNumberRows = element.querySelector(".line-numbers-rows");
            if (!lineNumberRows) return;
            var lineNumberStart = parseInt(element.getAttribute("data-start"), 10) || 1;
            var lineNumberEnd = lineNumberStart + (lineNumberRows.children.length - 1);
            if (number < lineNumberStart) number = lineNumberStart;
            if (number > lineNumberEnd) number = lineNumberEnd;
            var lineIndex = number - lineNumberStart;
            return lineNumberRows.children[lineIndex];
        },
        /**
		 * Resizes the line numbers of the given element.
		 *
		 * This function will not add line numbers. It will only resize existing ones.
		 *
		 * @param {HTMLElement} element A `<pre>` element with line numbers.
		 * @returns {void}
		 */ resize: function(element) {
            resizeElements([
                element
            ]);
        },
        /**
		 * Whether the plugin can assume that the units font sizes and margins are not depended on the size of
		 * the current viewport.
		 *
		 * Setting this to `true` will allow the plugin to do certain optimizations for better performance.
		 *
		 * Set this to `false` if you use any of the following CSS units: `vh`, `vw`, `vmin`, `vmax`.
		 *
		 * @type {boolean}
		 */ assumeViewportIndependence: true
    };
    /**
	 * Resizes the given elements.
	 *
	 * @param {HTMLElement[]} elements
	 */ function resizeElements(elements) {
        elements = elements.filter(function(e) {
            var codeStyles = getStyles(e);
            var whiteSpace = codeStyles["white-space"];
            return whiteSpace === "pre-wrap" || whiteSpace === "pre-line";
        });
        if (elements.length == 0) return;
        var infos = elements.map(function(element) {
            var codeElement = element.querySelector("code");
            var lineNumbersWrapper = element.querySelector(".line-numbers-rows");
            if (!codeElement || !lineNumbersWrapper) return undefined;
            /** @type {HTMLElement} */ var lineNumberSizer = element.querySelector(".line-numbers-sizer");
            var codeLines = codeElement.textContent.split(NEW_LINE_EXP);
            if (!lineNumberSizer) {
                lineNumberSizer = document.createElement("span");
                lineNumberSizer.className = "line-numbers-sizer";
                codeElement.appendChild(lineNumberSizer);
            }
            lineNumberSizer.innerHTML = "0";
            lineNumberSizer.style.display = "block";
            var oneLinerHeight = lineNumberSizer.getBoundingClientRect().height;
            lineNumberSizer.innerHTML = "";
            return {
                element: element,
                lines: codeLines,
                lineHeights: [],
                oneLinerHeight: oneLinerHeight,
                sizer: lineNumberSizer
            };
        }).filter(Boolean);
        infos.forEach(function(info) {
            var lineNumberSizer = info.sizer;
            var lines = info.lines;
            var lineHeights = info.lineHeights;
            var oneLinerHeight = info.oneLinerHeight;
            lineHeights[lines.length - 1] = undefined;
            lines.forEach(function(line, index) {
                if (line && line.length > 1) {
                    var e = lineNumberSizer.appendChild(document.createElement("span"));
                    e.style.display = "block";
                    e.textContent = line;
                } else lineHeights[index] = oneLinerHeight;
            });
        });
        infos.forEach(function(info) {
            var lineNumberSizer = info.sizer;
            var lineHeights = info.lineHeights;
            var childIndex = 0;
            for(var i = 0; i < lineHeights.length; i++)if (lineHeights[i] === undefined) lineHeights[i] = lineNumberSizer.children[childIndex++].getBoundingClientRect().height;
        });
        infos.forEach(function(info) {
            var lineNumberSizer = info.sizer;
            var wrapper = info.element.querySelector(".line-numbers-rows");
            lineNumberSizer.style.display = "none";
            lineNumberSizer.innerHTML = "";
            info.lineHeights.forEach(function(height, lineNumber) {
                wrapper.children[lineNumber].style.height = height + "px";
            });
        });
    }
    /**
	 * Returns style declarations for the element
	 *
	 * @param {Element} element
	 */ function getStyles(element) {
        if (!element) return null;
        return window.getComputedStyle ? getComputedStyle(element) : element.currentStyle || null;
    }
    var lastWidth = undefined;
    window.addEventListener("resize", function() {
        if (config.assumeViewportIndependence && lastWidth === window.innerWidth) return;
        lastWidth = window.innerWidth;
        resizeElements(Array.prototype.slice.call(document.querySelectorAll("pre." + PLUGIN_NAME)));
    });
    Prism.hooks.add("complete", function(env) {
        if (!env.code) return;
        var code = env.element;
        var pre = code.parentNode;
        // works only for <code> wrapped inside <pre> (not inline)
        if (!pre || !/pre/i.test(pre.nodeName)) return;
        // Abort if line numbers already exists
        if (code.querySelector(".line-numbers-rows")) return;
        // only add line numbers if <code> or one of its ancestors has the `line-numbers` class
        if (!Prism.util.isActive(code, PLUGIN_NAME)) return;
        // Remove the class 'line-numbers' from the <code>
        code.classList.remove(PLUGIN_NAME);
        // Add the class 'line-numbers' to the <pre>
        pre.classList.add(PLUGIN_NAME);
        var match = env.code.match(NEW_LINE_EXP);
        var linesNum = match ? match.length + 1 : 1;
        var lineNumbersWrapper;
        var lines = new Array(linesNum + 1).join("<span></span>");
        lineNumbersWrapper = document.createElement("span");
        lineNumbersWrapper.setAttribute("aria-hidden", "true");
        lineNumbersWrapper.className = "line-numbers-rows";
        lineNumbersWrapper.innerHTML = lines;
        if (pre.hasAttribute("data-start")) pre.style.counterReset = "linenumber " + (parseInt(pre.getAttribute("data-start"), 10) - 1);
        env.element.appendChild(lineNumbersWrapper);
        resizeElements([
            pre
        ]);
        Prism.hooks.run("line-numbers", env);
    });
    Prism.hooks.add("line-numbers", function(env) {
        env.plugins = env.plugins || {};
        env.plugins.lineNumbers = true;
    });
})();

},{}],"leqaQ":[function() {},{}],"jJdb1":[function() {},{}],"gZ1sw":[function() {},{}]},[], null, "parcelRequirea1a1")

