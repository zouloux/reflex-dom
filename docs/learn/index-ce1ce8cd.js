(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();function re(e,t){let n=e;return t==null&&(t=e,n=document.documentElement),[n,t]}function de(e,t){const[n,r]=re(e,t);return n.querySelector(r)}function me(e,t){const[n,r]=re(e,t);return Array.from(n.querySelectorAll(r))}function V(e,t,n,r,i){function o(s,c){e?c.addEventListener(s,r,i):c.removeEventListener(s,r,i)}t.map(s=>Array.isArray(n)?n.map(c=>o(c,s)):o(n,s))}function he(e){return typeof e=="string"?e=me(e):Array.isArray(e)||(e=[e]),e}function _e(e,t,n,r){const i=he(e),o=()=>V(!1,i,t,s,r);function s(...c){o(),n.apply(null,c)}return V(!0,i,t,s,r),o}async function ye(){return new Promise(e=>{document.readyState=="loading"?_e(document,"DOMContentLoaded",e):e()})}const h=(e,t,...n)=>e.map(r=>r==null?void 0:r.apply(t,n));let b=[];function g(e,t=null,n={},r,i){return{type:e,value:t,props:n,key:r,_ref:i}}function ve(e){const t=Object.assign({},e);return t.props=Object.assign({},e.props),t}function v(e,t,...n){t==null&&(t={}),t.children??(t.children=n);const r=t.children.length;for(let o=0;o<r;++o){const s=t.children[o],c=typeof s;c==="string"||c==="number"?t.children[o]=g(1,s):c==="object"&&s!==null&&s.type===3?t.children[o]=g(3,s):Array.isArray(s)?t.children[o]=g(8,null,{children:s}):(c==="boolean"||s==null)&&(t.children[o]=g(0))}return g(typeof e=="function"?7:6,e,t,t.key,t.ref)}function ge(e){return{vnode:e,name:e.value.name,isMounted:!1,_render:e.value,_mountHandlers:[],_renderHandlers:[],_nextRenderHandlers:[],_unmountHandlers:[]}}function B(e){var t;(t=R())==null||t._mountHandlers.push(e)}function ie(e){var t;return(t=R())==null||t._unmountHandlers.push(e),e}function Ee(e){var t;(t=R())==null||t._nextRenderHandlers.push(e)}const be=(e,t,n=!0)=>Object.keys(e).length===Object.keys(t).length&&Object.keys(e).every(r=>n&&r==="children"?e[r]===t[r]||e.length===0&&t.length===0||t[r]&&e[r].length===t[r].length&&!e[r].find((i,o)=>{const s=t[r][o];return!(i.type===s.type&&(i.type!==6||i.value===s.value))}):t.hasOwnProperty(r)&&e[r]===t[r]),L="__l",Se=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,je=/Capture$/,Ce="http://www.w3.org/2000/svg";let m=null;function R(){return m}function G(e,t){const n=e!==(e=e.replace(je,"")),r=(e.toLowerCase()in t?e.toLowerCase():e).slice(2),i=r+(n?"C":"");return{eventName:r,eventKey:i,useCapture:n}}function Ae(e,t,n){t[0]==="-"?e.setProperty(t,n):n==null?e[t]="":typeof n!="number"||Se.test(t)?e[t]=n:e[t]=n+"px"}function oe(e){e._ref&&e._ref._setFromVNode(e)}let A;const Le=()=>A;function F(e,t,n){if(t=="className"&&(t="class"),t=="class"&&Array.isArray(n))n=n.flat(1).filter(r=>r!==!0&&!!r).join(" ").trim();else if(t=="style"&&typeof n=="object"){Object.keys(n).forEach(r=>Ae(e.style,r,n[r]));return}e.setAttribute(t,n===!0?"":n)}function Ie(e,t,n){let r;if(t)r=t.dom,e.type===1&&t.value!==e.value&&(r.nodeValue=e.value);else{const{document:i}=n;e.type===0?r=i.createComment(""):e.type===1||e.type===3?(A=e,r=i.createTextNode(e.value)):e.type===6&&(e.value==="svg"&&(n.isSVG=!0),r=n.isSVG?i.createElementNS(Ce,e.value):i.createElement(e.value))}if(e.type===0||e.type===1||e.type===3)return r;if(e.type===8)return ce(e,t,n),r;if(r=r,t){for(let i in t.props)if(!(["children","key","ref"].includes(i)||i in e.props&&e.props[i]===t.props[i]))if(i=="innerHTML")r.innerHTML="";else if(i.startsWith("on")){const{eventName:o,eventKey:s,useCapture:c}=G(i,r);r.removeEventListener(o,r[L][s],c)}else r.removeAttribute(i)}for(let i in e.props){let o=e.props[i];if(!(i==="children"||i==="key"||i==="ref"||!o||t&&i in t.props&&t.props[i]===o))if(i==="innerHTML")r.innerHTML=o;else if(i.startsWith("on")){const{eventName:s,eventKey:c,useCapture:f}=G(i,r);r[L]||(r[L]=new Map),r[L][c]=o,r.addEventListener(s,o,f)}else typeof o=="object"&&o.type===3&&(A=g(2,o,null,i),A.dom=r,o=o.value),F(r,i,o)}return r}function se(e,t,n,r=!1){const i=h(b,null,2,e);y(e,t,n,r),S(e,!0),h(i)}function S(e,t){if(e.type===7){const{component:n}=e;if(n)if(S(n.children,t),t&&!n.isMounted){if(n.vnode.value.isFactory!==!1){const r=n._mountHandlers.length;for(let i=0;i<r;++i){const o=n._mountHandlers[i].apply(n);typeof o=="function"?n._unmountHandlers.push(o):Array.isArray(o)&&o.filter(s=>s).map(s=>n._unmountHandlers.push(s))}n._mountHandlers=[],n.isMounted=!0,h(n._renderHandlers,n),h(n._nextRenderHandlers,n),n._nextRenderHandlers=[]}h(b,null,1,n,!0)}else!t&&n.isMounted&&(h(b,null,1,n,!1),h(n._unmountHandlers,n),n.isMounted=!1,delete n.vnode.component,delete n.vnode)}else if(e.type>4){const n=e.props.children.length;for(let r=0;r<n;++r)S(e.props.children[r],t)}}function W(e,t){t.key&&(e._keys||(e._keys=new Map),e._keys.set(t.key,t))}let w,$;function ce(e,t,n){let r=e.dom??$;w=e,$=w.dom;const i=e.props.children,o=i.length;if(!t||t.props.children.length===0){for(let u=0;u<o;++u){const a=i[u];y(a,null,n),W(e,a),a.dom&&r.appendChild(a.dom)}return}const s=t.props.children;if(e.type===8&&t&&w.props.children.length===0&&i.length===0&&s.length>0){S(t,!1),r.innerHTML="";return}if(!o)return;let c;for(c=0;c<o;++c)W(e,i[c]);const f=t._keys;let l=0;for(c=0;c<o;++c){const u=i[c];if(!u)continue;let a=s[c];if(a&&a.key&&e._keys&&!e._keys.has(a.key)&&++l,u.key&&(a=f==null?void 0:f.get(u.key))&&a.type===u.type&&(u.type!==6||a.value===u.value)){y(u,a,n),a._keep=!0;const j=c+l;s.indexOf(a)!==j&&r.insertBefore(u.dom,r.children[j+1])}else u.key&&f&&!f.get(u.key)?(y(u,null,n),r.insertBefore(u.dom,r.children[c]),--l):c in s&&(a=s[c])&&a.type===u.type&&(u.type!==6&&u.type!==7||a.value===u.value)?(y(u,a,n),a._keep=!0):(y(u,null,n),r.insertBefore(u.dom,r.children[c]),--l)}const p=s.length;for(c=0;c<p;++c){const u=s[c];if(u&&!u._keep){S(u,!1);const{dom:a}=u;u.dom=null,oe(u),r.removeChild(a)}}}function z(e){if(m=e.component,e.value.isFactory!==!1&&!m._proxy){const n=K(e.props,{_p:!0});m._propState=n;const r=Proxy.revocable({},{get:(i,o)=>Reflect.get(n.value,o)});m._proxy=r.proxy,m._unmountHandlers.push(r.revoke)}return m._render.apply(m,[m._proxy??e.props,m])}function y(e,t,n=e._nodeEnv,r=!1){if(t&&t===e&&(e=ve(t)),t&&t._id&&(e._id=t._id),e.type===0||e.type===1||e.type===3||e.type===6)n=Object.assign({},n),e.dom=Ie(e,t,n),A=null;else if(e.type===7){let i=t==null?void 0:t.component,o;if(i)e.component=i,i.vnode=e;else{i=ge(e),e.component=i,i._render=e.value;const c=z(e);typeof c=="function"?(e.value.isFactory=!0,i._render=c):typeof c=="object"&&"type"in c&&(e.value.isFactory=!1,i._render=e.value,o=c)}let s=!0;!r&&!o&&t&&(s=i._shouldUpdate?i._shouldUpdate(e.props,t.props):!be(e.props,t.props,!0),s&&i.vnode.value.isFactory===!0&&(i._propState.set({...i._defaultProps,...e.props}),s=!1),s||(e.dom=t.dom)),!o&&s&&(o=z(e)),o&&(y(o,i.children,n),i.children=o,e.dom=o.dom),m=null}e._nodeEnv||(e._nodeEnv=n),oe(e),e.type>4&&ce(e,t,n)}const Oe=self.queueMicrotask??(e=>self.setTimeout(e,0));function ue(e){const t=new Set,n=[];return(r,i)=>{t.size||Oe(()=>{e(t),t.clear(),h(n)}),t.add(r),i&&n.push(i)}}const Y=(e,t)=>typeof e=="function"?e(t):e,Te=ue(e=>{for(const t of e)t()}),Pe=ue(e=>{for(const t of e)se(t.vnode,t.vnode,void 0,!0)});let T,q=new Set;function K(e,t={}){e=Y(e);const n=new Set,r=new Set,i=new Set,o=new Set,s=new Set;function c(u){typeof u=="function"&&(r==null||r.add(u))}async function f(u,a=!1){if(!n||u===e&&!a)return;for(const d of r)d();r.clear(),e=u;for(const d of n)c(d());for(const d of o)s.has(d.component)||(d.type===3?d.dom.nodeValue=e:(d.dom instanceof HTMLImageElement&&d.key==="src"&&F(d.dom,d.key,""),F(d.dom,d.key,e)),h(b,null,3,d,d.key));const j=[];for(const d of s)t.directInvalidation?(y(d.vnode,d.vnode),S(d.vnode,!0)):j.push(new Promise(pe=>Pe(d,pe)));s.clear(),await Promise.all(j),i.forEach(d=>Te(d))}const l=ie(()=>{n.clear(),r.clear(),i.clear(),o.clear(),s.clear()}),p={get value(){if(!n)return;const u=Le(),a=R();return T?(i.add(T),q.add(this)):u&&(u.type===3||u.type===2)&&u.value===this?(u.component=a,o.add(u)):a&&s.add(a),e},set value(u){f(u)},set:(u,a=!1)=>f(Y(u),a),peek(){return e},sneak(u){e=u},get type(){return 3},toString(){return this.value+""},valueOf(){return this.value},dispose:l,_addEffectDispose:c,_removeEffect(u){n==null||n.delete(u),i==null||i.delete(u)}};return h(b,null,4,p,t),p}function Re(e,t){if(e)for(const n of e)n._removeEffect(t)}function we(){const e=Array.from(q);return q.clear(),e}function ke(e){let t;return Ee(()=>{T=e,e(),t=we(),T=null}),ie(()=>Re(t,e))}const J="__v";function xe(e,t,n=document){const r=g(5,null,{children:[e]});r.dom=t;const i=t[J];se(r,i,{isSVG:!1,document:n}),h(b,null,0,i,r),t[J]=r}const De="modulepreload",He=function(e){return"/reflex/learn/"+e},X={},_=function(t,n,r){if(!n||n.length===0)return t();const i=document.getElementsByTagName("link");return Promise.all(n.map(o=>{if(o=He(o),o in X)return;X[o]=!0;const s=o.endsWith(".css"),c=s?'[rel="stylesheet"]':"";if(!!r)for(let p=i.length-1;p>=0;p--){const u=i[p];if(u.href===o&&(!s||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${c}`))return;const l=document.createElement("link");if(l.rel=s?"stylesheet":De,s||(l.as="script",l.crossOrigin=""),l.href=o,document.head.appendChild(l),s)return new Promise((p,u)=>{l.addEventListener("load",p),l.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>t())};var Q=["angular-cli","create-react-app","html","javascript","node","polymer","typescript","vue"],Z={clickToLoad:function(e){return C("ctl",e)},devToolsHeight:function(e){return N("devtoolsheight",e)},forceEmbedLayout:function(e){return C("embed",e)},hideDevTools:function(e){return C("hidedevtools",e)},hideExplorer:function(e){return C("hideExplorer",e)},hideNavigation:function(e){return C("hideNavigation",e)},showSidebar:function(e){return function(t,n){return typeof n=="boolean"?"showSidebar="+(n?"1":"0"):""}(0,e)},openFile:function(e){return function(t,n){return(Array.isArray(n)?n:[n]).filter(function(r){return typeof r=="string"&&r.trim()!==""}).map(function(r){return"file="+encodeURIComponent(r.trim())})}(0,e).join("&")},terminalHeight:function(e){return N("terminalHeight",e)},theme:function(e){return ee("theme",["light","dark"],e)},view:function(e){return ee("view",["preview","editor"],e)}};function le(e){e===void 0&&(e={});var t=Object.entries(e).map(function(n){var r=n[0],i=n[1];return i!=null&&Z.hasOwnProperty(r)?Z[r](i):""}).filter(Boolean);return t.length?"?"+t.join("&"):""}function C(e,t){return t===!0?e+"=1":""}function N(e,t){return typeof t=="number"&&t>=0&&t<=100?e+"="+Math.round(t):""}function ee(e,t,n){return typeof n=="string"&&t.includes(n)?e+"="+n:""}function ae(){return Math.random().toString(36).slice(2,6)+Math.random().toString(36).slice(2,6)}function k(e,t){return""+fe(t)+e+le(t)}function x(e,t){var n={forceEmbedLayout:!0};return t&&typeof t=="object"&&Object.assign(n,t),""+fe(n)+e+le(n)}function fe(e){return e===void 0&&(e={}),typeof e.origin=="string"?e.origin:"https://stackblitz.com"}function D(e,t,n){if(!t||!e||!e.parentNode)throw new Error("Invalid Element");e.id&&(t.id=e.id),e.className&&(t.className=e.className),function(r,i){i&&typeof i=="object"&&(Object.hasOwnProperty.call(i,"height")&&(r.height=""+i.height),Object.hasOwnProperty.call(i,"width")&&(r.width=""+i.width)),r.height||(r.height="300"),r.width||r.setAttribute("style","width:100%;")}(t,n),e.parentNode.replaceChild(t,e)}function H(e){if(typeof e=="string"){var t=document.getElementById(e);if(!t)throw new Error("Could not find element with id '"+e+"'");return t}if(e instanceof HTMLElement)return e;throw new Error("Invalid element: "+e)}function M(e){return e&&e.newWindow===!1?"_self":"_blank"}function P(){return P=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},P.apply(this,arguments)}var Me=function(){function e(n){this.port=void 0,this.pending={},this.port=n,this.port.onmessage=this.messageListener.bind(this)}var t=e.prototype;return t.request=function(n){var r=this,i=n.type,o=n.payload,s=ae();return new Promise(function(c,f){r.pending[s]={resolve:c,reject:f},r.port.postMessage({type:i,payload:P({},o,{__reqid:s})})})},t.messageListener=function(n){var r;if(typeof((r=n.data.payload)==null?void 0:r.__reqid)=="string"){var i=n.data,o=i.type,s=i.payload,c=s.__reqid,f=s.__error;this.pending[c]&&(s.__success?this.pending[c].resolve(function(l){var p=P({},l);return delete p.__reqid,delete p.__success,delete p.__error,Object.keys(p).length?p:null}(s)):this.pending[c].reject(f?o+": "+f:o),delete this.pending[c])}},e}(),Fe=function(){function e(n,r){var i=this;this._rdc=void 0,this.editor={openFile:function(o){return i._rdc.request({type:"SDK_OPEN_FILE",payload:{path:o}})},setCurrentFile:function(o){return i._rdc.request({type:"SDK_SET_CURRENT_FILE",payload:{path:o}})},setTheme:function(o){return i._rdc.request({type:"SDK_SET_UI_THEME",payload:{theme:o}})},setView:function(o){return i._rdc.request({type:"SDK_SET_UI_VIEW",payload:{view:o}})},showSidebar:function(o){return o===void 0&&(o=!0),i._rdc.request({type:"SDK_TOGGLE_SIDEBAR",payload:{visible:o}})}},this.preview={origin:"",getUrl:function(){return i._rdc.request({type:"SDK_GET_PREVIEW_URL",payload:{}}).then(function(o){var s;return(s=o==null?void 0:o.url)!=null?s:null})},setUrl:function(o){if(o===void 0&&(o="/"),typeof o!="string"||!o.startsWith("/"))throw new Error("Invalid argument: expected a path starting with '/', got '"+o+"'");return i._rdc.request({type:"SDK_SET_PREVIEW_URL",payload:{path:o}})}},this._rdc=new Me(n),Object.defineProperty(this.preview,"origin",{value:typeof r.previewOrigin=="string"?r.previewOrigin:null,writable:!1})}var t=e.prototype;return t.applyFsDiff=function(n){var r=function(i){return i!==null&&typeof i=="object"};if(!r(n)||!r(n.create))throw new Error("Invalid diff object: expected diff.create to be an object.");if(!Array.isArray(n.destroy))throw new Error("Invalid diff object: expected diff.create to be an array.");return this._rdc.request({type:"SDK_APPLY_FS_DIFF",payload:n})},t.getDependencies=function(){return this._rdc.request({type:"SDK_GET_DEPS_SNAPSHOT",payload:{}})},t.getFsSnapshot=function(){return this._rdc.request({type:"SDK_GET_FS_SNAPSHOT",payload:{}})},e}(),O=[],qe=function(e){var t=this;this.element=void 0,this.id=void 0,this.pending=void 0,this.vm=void 0,this.id=ae(),this.element=e,this.pending=new Promise(function(n,r){var i=function(l){var p=l.data;(p==null?void 0:p.action)==="SDK_INIT_SUCCESS"&&p.id===t.id&&(t.vm=new Fe(l.ports[0],p.payload),n(t.vm),s())},o=function(){var l;(l=t.element.contentWindow)==null||l.postMessage({action:"SDK_INIT",id:t.id},"*")};function s(){window.clearInterval(f),window.removeEventListener("message",i)}window.addEventListener("message",i),o();var c=0,f=window.setInterval(function(){if(t.vm)s();else{if(c>=20)return s(),r("Timeout: Unable to establish a connection with the StackBlitz VM"),void O.forEach(function(l,p){l.id===t.id&&O.splice(p,1)});c++,o()}},500)}),O.push(this)};function E(e,t){var n=document.createElement("input");return n.type="hidden",n.name=e,n.value=t,n}function te(e){if(!Q.includes(e.template)){var t=Q.map(function(i){return"'"+i+"'"}).join(", ");console.warn("Unsupported project.template: must be one of "+t)}var n=e.template==="node",r=document.createElement("form");return r.method="POST",r.setAttribute("style","display:none!important;"),r.appendChild(E("project[title]",e.title)),r.appendChild(E("project[description]",e.description)),r.appendChild(E("project[template]",e.template)),e.dependencies&&(n?console.warn("Invalid project.dependencies: dependencies must be provided as a 'package.json' file when using the 'node' template."):r.appendChild(E("project[dependencies]",JSON.stringify(e.dependencies)))),e.settings&&r.appendChild(E("project[settings]",JSON.stringify(e.settings))),Object.keys(e.files).forEach(function(i){var o="project[files]"+function(c){return"["+c.replace(/\[/g,"%5B").replace(/\]/g,"%5D")+"]"}(i),s=e.files[i];typeof s=="string"&&r.appendChild(E(o,s))}),r}function I(e){var t,n,r,i;return e!=null&&e.contentWindow?(i=(n=e)instanceof Element?"element":"id",(t=(r=O.find(function(o){return o[i]===n}))!=null?r:null)!=null?t:new qe(e)).pending:Promise.reject("Provided element is not an iframe.")}var Ke={connect:I,embedGithubProject:function(e,t,n){var r=H(e),i=document.createElement("iframe");return i.src=x("/github/"+t,n),D(r,i,n),I(i)},embedProject:function(e,t,n){var r,i=H(e),o=function(c,f){var l=te(c);return l.action=x("/run",f),l.id="sb","<html><head><title></title></head><body>"+l.outerHTML+"<script>document.getElementById('"+l.id+"').submit();<\/script></body></html>"}(t,n),s=document.createElement("iframe");return D(i,s,n),(r=s.contentDocument)==null||r.write(o),I(s)},embedProjectId:function(e,t,n){var r=H(e),i=document.createElement("iframe");return i.src=x("/edit/"+t,n),D(r,i,n),I(i)},openGithubProject:function(e,t){var n=k("/github/"+e,t),r=M(t);window.open(n,r)},openProject:function(e,t){(function(n,r){var i=te(n);i.action=k("/run",r),i.target=M(r),document.body.appendChild(i),i.submit(),document.body.removeChild(i)})(e,t)},openProjectId:function(e,t){var n=k("/edit/"+e,t),r=M(t);window.open(n,r)}};const Ue=(e,t,n)=>Math.max(e,Math.min(t,n)),Ve="_App_ka7wa_1",Be="__iframe_ka7wa_5",ne={App:Ve,_iframe:Be},U={"index.html":()=>_(()=>import("./index-baf17d17.js"),[]),"index.tsx":()=>_(()=>import("./index-d96ba6d8.js"),[]),"package.json":()=>_(()=>import("./package-e6a548d8.js"),[]),"package-lock.json":()=>_(()=>import("./package-lock-409bb638.js"),[]),"tsconfig.json":()=>_(()=>import("./tsconfig-d0416cf7.js"),[]),"vite.config.js":()=>_(()=>import("./vite.config-70b30b3c.js"),[]),"steps/00.render.tsx":()=>_(()=>import("./00.render-bb8e2342.js"),[]),"steps/01.props.tsx":()=>_(()=>import("./01.props-56a93c4d.js"),[]),"steps/02.state.tsx":()=>_(()=>import("./02.state-3be48001.js"),[])},Ge=Object.keys(U).filter(e=>e.startsWith("steps/"));async function We(){const e={},t=Object.keys(U);for(const n of t){const r=U[n],i=await r();e[n]=i.default}return e}function $e(e,t){let n,r;B(async()=>{r=await We(),n=await Ke.embedProject("iframe",{title:"Learn Reflex",description:"Learn Reflex tutorial",template:"node",files:{...r,loading:"Stackblitz is loading"}},{clickToLoad:!1,openFile:"loading",terminalHeight:0,hideExplorer:!0,hideNavigation:!0,theme:"dark"})});const i=K(!1);B(()=>{const f=()=>clearInterval(l),l=setInterval(async()=>{!n||!("ready"in await n.getFsSnapshot())||(i.value=!0,o.value=0,f())},500);return f});const o=K(-1);let s=!0;ke(async()=>{const f=Ge[o.value];if(!n)return;if(await n.editor.openFile(f),s){s=!1;return}const l=r["index.tsx"].split(`
`);l.shift(),l.unshift(`import * as CurrentStep from './${f}'`);const p=l.join(`
`);await n.applyFsDiff({destroy:[],create:{"index.tsx":p}})});function c(f){o.value=Ue(0,o.value+f,2)}return()=>v("div",{class:ne.App},v("nav",null),v("iframe",{id:"iframe",class:ne._iframe}),i.value&&v("div",null,v("button",{onClick:()=>c(-1)},"Prev"),v("button",{onClick:()=>c(1)},"Next")))}ye().then(()=>{xe(v($e,null),de("#App"))});
