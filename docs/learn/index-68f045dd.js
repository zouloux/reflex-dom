(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function te(e,t){let n=e;return t==null&&(t=e,n=document.documentElement),[n,t]}function pe(e,t){const[n,r]=te(e,t);return n.querySelector(r)}function de(e,t){const[n,r]=te(e,t);return Array.from(n.querySelectorAll(r))}function U(e,t,n,r,i={}){const{dispatchAtInit:s}=i;delete i.dispatchAtInit;function o(c,u){e?u.addEventListener(c,r,i):u.removeEventListener(c,r,i)}t.map(c=>Array.isArray(n)?n.map(u=>o(u,c)):o(n,c)),s&&r(null)}function me(e){return typeof e=="string"?e=de(e):Array.isArray(e)||(e=[e]),e}function _e(e,t,n,r){const i=me(e),s=()=>U(!1,i,t,o,r);function o(...c){s(),n.apply(null,c)}return U(!0,i,t,o,r),s}async function he(){return new Promise(e=>{document.readyState=="loading"?_e(document,"DOMContentLoaded",e):e()})}const m=(e,t,...n)=>e.map(r=>r==null?void 0:r.apply(t,n));let b=[];function y(e,t=null,n={},r,i){return{type:e,value:t,props:n,key:r,_ref:i}}function ye(e){const t=Object.assign({},e);return t.props=Object.assign({},e.props),t}function h(e,t,...n){t==null&&(t={}),t.children??(t.children=n);const r=t.children.length;for(let s=0;s<r;++s){const o=t.children[s],c=typeof o;c==="string"||c==="number"?t.children[s]=y(1,o):c==="object"&&o!==null&&o.type===3?t.children[s]=y(3,o):Array.isArray(o)?t.children[s]=y(8,null,{children:o}):(c==="boolean"||o==null)&&(t.children[s]=y(0))}return y(typeof e=="function"?7:6,e,t,t.key,t.ref)}function ge(e){return{vnode:e,name:e.value.name,isMounted:!1,_render:e.value,_mountHandlers:[],_renderHandlers:[],_nextRenderHandlers:[],_unmountHandlers:[]}}function K(e){var t;(t=I())==null||t._mountHandlers.push(e)}function ne(e){var t;return(t=I())==null||t._unmountHandlers.push(e),e}function ve(e){var t;(t=I())==null||t._nextRenderHandlers.push(e)}const be=(e,t,n=!0)=>Object.keys(e).length===Object.keys(t).length&&Object.keys(e).every(r=>n&&r==="children"?e[r]===t[r]||e.length===0&&t.length===0||t[r]&&e[r].length===t[r].length&&!e[r].find((i,s)=>{const o=t[r][s];return!(i.type===o.type&&(i.type!==6||i.value===o.value))}):t.hasOwnProperty(r)&&e[r]===t[r]),C="__l",Ee=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,Se=/Capture$/,Ae="http://www.w3.org/2000/svg";let d=null;function I(){return d}function q(e,t){const n=e!==(e=e.replace(Se,"")),r=(e.toLowerCase()in t?e.toLowerCase():e).slice(2),i=r+(n?"C":"");return{eventName:r,eventKey:i,useCapture:n}}function Ce(e,t,n){t[0]==="-"?e.setProperty(t,n):n==null?e[t]="":typeof n!="number"||Ee.test(t)?e[t]=n:e[t]=n+"px"}function re(e){e._ref&&e._ref._setFromVNode(e)}let S;const xe=()=>S;function k(e,t,n){t=="className"&&(t="class"),n===!1||n===null?e.removeAttribute(t):n===!0?e.setAttribute(t,""):t=="style"&&typeof n=="object"?Object.keys(n).forEach(r=>Ce(e.style,r,n[r])):(t=="class"&&Array.isArray(n)&&(n=n.flat(1).filter(r=>r!==!0&&!!r).join(" ").trim()),e.setAttribute(t,n))}function je(e,t,n){let r;if(t)r=t.dom,(e.type===1&&t.value!==e.value||e.type===3)&&(r.nodeValue=e.value);else{const{document:i}=n;e.type===0?r=i.createComment(""):e.type===1||e.type===3?(S=e,r=i.createTextNode(e.value)):e.type===6&&(e.value==="svg"&&(n.isSVG=!0),r=n.isSVG?i.createElementNS(Ae,e.value):i.createElement(e.value))}if(e.type===0||e.type===1||e.type===3)return r;if(e.type===8)return se(e,t,n),r;if(r=r,t){for(let i in t.props)if(!(["children","key","ref"].includes(i)||i in e.props&&e.props[i]===t.props[i]))if(i=="innerHTML")r.innerHTML="";else if(i.startsWith("on")){const{eventName:s,eventKey:o,useCapture:c}=q(i,r);r.removeEventListener(s,r[C][o],c)}else r.removeAttribute(i)}for(let i in e.props){let s=e.props[i];if(!(s==null||i==="children"||i==="key"||i==="ref"||t&&i in t.props&&t.props[i]===s))if(i==="innerHTML")r.innerHTML=s;else if(i.startsWith("on")){const{eventName:o,eventKey:c,useCapture:u}=q(i,r);r[C]||(r[C]=new Map),r[C][c]=s,r.addEventListener(o,s,u)}else s!==null&&typeof s=="object"&&s.type===3&&(S=y(2,s,null,i),S.dom=r,s=s.value),k(r,i,s)}return r}function ie(e,t,n,r=!1){const i=m(b,null,2,e);e&&(_(e,t,n,r),E(e,!0),m(i))}function E(e,t){if((e==null?void 0:e.type)===7){const{component:n}=e;if(n)if(E(n.children,t),t&&!n.isMounted){if(n.isMounted=!0,e.value.isFactory!==!1){const r=n._mountHandlers.length;for(let i=0;i<r;++i){const s=n._mountHandlers[i].apply(n);typeof s=="function"?n._unmountHandlers.push(s):Array.isArray(s)&&s.filter(o=>o).map(o=>n._unmountHandlers.push(o))}n._mountHandlers=[],m(n._renderHandlers,n),m(n._nextRenderHandlers,n),n._nextRenderHandlers=[]}m(b,null,1,n,!0)}else!t&&n.isMounted&&(m(b,null,1,n,!1),m(n._unmountHandlers,n),n.isMounted=!1,delete e.component,delete n.vnode)}else if((e==null?void 0:e.type)>4){const n=e.props.children.length;for(let r=0;r<n;++r)E(e.props.children[r],t)}}function B(e,t){t.key&&(e._keys||(e._keys=new Map),e._keys.set(t.key,t))}let L,G;function se(e,t,n){let r=e.dom??G;L=e,G=L.dom;const i=e.props.children,s=i.length;if(!t||t.props.children.length===0){for(let f=0;f<s;++f){const l=i[f];_(l,null,n),B(e,l),l.dom&&r.appendChild(l.dom)}return}const o=t.props.children;if(e.type===8&&t&&L.props.children.length===0&&i.length===0&&o.length>0){E(t,!1),r.innerHTML="";return}if(!s)return;let c;for(c=0;c<s;++c)B(e,i[c]);const u=t._keys;let a=0;for(c=0;c<s;++c){const f=i[c];if(!f)continue;let l=o[c];if(l&&l.key&&e._keys&&!e._keys.has(l.key)&&++a,f.key&&(l=u==null?void 0:u.get(f.key))&&l.type===f.type&&(f.type!==6||l.value===f.value)){_(f,l,n),l._keep=!0;const A=c+a;o.indexOf(l)!==A&&r.insertBefore(f.dom,r.children[A+1])}else f.key&&u&&!u.get(f.key)?(_(f,null,n),r.insertBefore(f.dom,r.children[c]),--a):c in o&&(l=o[c])&&l.type===f.type&&(f.type!==6&&f.type!==7||l.value===f.value)?(_(f,l,n),l._keep=!0):(_(f,null,n),r.insertBefore(f.dom,r.children[c]),--a)}const p=o.length;for(c=0;c<p;++c){const f=o[c];if(f&&!f._keep){E(f,!1);const{dom:l}=f;f.dom=null,re(f),l&&r.removeChild(l)}}}function V(e){if(d=e.component,e.value.isFactory!==!1&&!d._proxy){const n=O(e.props,{_p:!0});d._propState=n;const r=Proxy.revocable({},{get:(i,s)=>Reflect.get(n.value,s)});d._proxy=r.proxy,d._unmountHandlers.push(r.revoke)}return d._render.apply(d,[d._proxy??e.props,d])}function _(e,t,n=e._nodeEnv,r=!1){if(t&&t===e&&(e=ye(t)),t&&t._id&&(e._id=t._id),e.type===0||e.type===1||e.type===3||e.type===6)n=Object.assign({},n),e.dom=je(e,t,n),S=null;else if(e.type===7){let i=t==null?void 0:t.component,s;if(i)e.component=i,i.vnode=e;else{i=ge(e),e.component=i,i._render=e.value;const c=V(e);typeof c=="function"?(e.value.isFactory=!0,i._render=c):typeof c=="object"&&"type"in c&&(e.value.isFactory=!1,i._render=e.value,s=c)}let o=!0;!r&&!s&&t&&(o=i._shouldUpdate?i._shouldUpdate(e.props,t.props):!be(e.props,t.props,!0),o&&i.vnode.value.isFactory===!0&&(i._propState.set({...i._defaultProps,...e.props}),o=!1),o||(e.dom=t.dom)),!s&&o&&(s=V(e)),s&&(_(s,i.children,n),i.children=s,e.dom=s.dom),d=null}e._nodeEnv||(e._nodeEnv=n),re(e),e.type>4&&se(e,t,n)}const Ie=self.queueMicrotask??(e=>self.setTimeout(e,0));function oe(e){const t=new Set,n=[];return(r,i)=>{t.size||Ie(()=>{for(const s of t)e(s);t.clear(),m(n)}),t.add(r),i&&n.push(i)}}const W=(e,t)=>typeof e=="function"?e(t):e,Te=oe(Oe),Le=oe(e=>ie(e.vnode,e.vnode,void 0,!0));let g,R=new Set;function O(e,t={}){e=W(e);const n=new Set,r=new Set,i=new Set;g&&n.add(g);async function s(u,a=!1){var f;if(!n||u===e&&!a)return;for(const l of n)(f=l._dispose)==null||f.call(l);e=u;for(const l of n)!l._dom&&M(l);for(const l of r)i.has(l.component)||(l.type===3?l.dom.nodeValue=e:(l.dom instanceof HTMLImageElement&&l.key==="src"&&k(l.dom,l.key,""),k(l.dom,l.key,e)),m(b,null,3,l,l.key));const p=[];for(const l of i)t.directInvalidation?(_(l.vnode,l.vnode),E(l.vnode,!0)):p.push(new Promise(A=>Le(l,A)));i.clear(),await Promise.all(p);for(const l of n)l._dom&&Te(()=>M(l))}const o=ne(()=>{n.clear(),r.clear(),i.clear()}),c={get value(){if(!n)return;const u=xe(),a=I();return g?(n.add(g),R.add(this)):u&&(u.type===3||u.type===2)&&u.value===this?(u.component=a,r.add(u)):a&&i.add(a),e},set value(u){s(u)},set:(u,a=!1)=>s(W(u),a),peek(){return e},sneak(u){e=u},get type(){return 3},toString(){return this.value+""},valueOf(){return this.value},dispose:o,_removeEffect(u){n==null||n.delete(u)}};return m(b,null,4,c,t),c}function De(e,t){for(const n of e)n._removeEffect(t)}function ke(){const e=Array.from(R);return R.clear(),e}function z(e,t){const n=e._handler(...e._values);e._values=t,e._dispose=typeof n=="function"?n:null}function M(e,t=!1){if(t&&(g=e),e._check){const n=e._check().map(r=>r&&r.type===3?r.value:r);t&&(g=null),(!e._values.length||n.find((r,i)=>e._values[i]!==r)!=null)&&z(e,n)}else z(e,[!1]),t&&(g=null)}function Re(e,t,n){return{_handler:e,_check:t,_dom:n,_values:t?[]:[!0],_dispose:null}}function ce(e,t,n){const r=Re(e,n,!1);let i;function s(){M(r,!0),i=ke()}return t?ve(s):s(),ne(()=>De(i,r))}function Oe(e){return ce(e,!1)}function Me(e){return ce(e,!0)}const X="__v";function Pe(e,t,n=document){const r=y(5,null,{children:[e]});r.dom=t;const i=t[X];ie(r,i,{isSVG:!1,document:n}),m(b,null,0,i,r),t[X]=r}const Fe=`<html>
<head>
    <title>Learn Reflex</title>
    <script src="index.tsx" type="module" async><\/script>
</head>
<body>
<div id="App"></div>
</body>
</html>`,He=`import * as CurrentStep from './steps/00.render'
import { h, render } from "reflex-dom";

console.log("INDEX TSX")

// import * as CurrentStep from './steps/00.render'
// console.log(">", CurrentStep['App'])
if ( CurrentStep['App'] ) {
	const App = CurrentStep['App']
	let AppContainer = document.getElementById("App")
	AppContainer.remove()
	AppContainer = document.createElement("div")
	AppContainer.setAttribute("id", "App")
	render(<App />, AppContainer);
}`,we=`{
	"name": "learn-reflex",
	"description": "Learn Reflex tutorial",
	"author": "Alexis Bouhet",
	"license": "MIT",
	"version": "1.0.0",
	"type": "module",
	"scripts": {
		"start": "vite"
	},
	"devDependencies": {
		"@types/node": "^20.2.1",
		"typescript": "^5.0.4",
		"vite": "^4.3.8"
	},
	"dependencies": {
		"reflex-dom": "^0.17.11"
	}
}
`,$e=`import { h, render } from 'reflex-dom';

function App(props) {
	return (
		<div>
			<h2>Hello {props.name}</h2>
		</div>
	);
}

render(<App name="world" />, document.getElementById("App"));`,Ue=`import { h } from 'reflex-dom';

export function App(props) {
	return (
		<div>

		</div>
	);
}

// NOTE : render() is now called outside this file for convenience
`,Ke=`import { h, state } from 'reflex-dom';

export function App(props) {
	const counter = state( 0 )
	const decrement = () => counter.value --
	const increment = () => counter.value ++
	return () => (
		<div>
			<div>Counter is {counter}</div>
			<button onClick={ decrement }>Decrement</button>
			<button onClick={ increment }>Increment</button>
		</div>
	);
}

// NOTE : render() is now called outside this file for convenience
`,qe=`{
	"compilerOptions": {
		"target" : "esnext",
		"module": "esnext",
		"isolatedModules": false,
		"useDefineForClassFields" : true,
		"types": ["vite/client", "node"],
		"jsxFactory": "h",
		"jsx": "react",
		"moduleResolution": "node",
		"lib": ["DOM", "ESNext"],
		"allowJs": true,
		"allowSyntheticDefaultImports": true
	}
}
`,Be=`import { defineConfig } from 'vite'
import { reflexRefresh } from "reflex-dom/hmr-plugin";
import { resolve } from "path"
import { writeFileSync } from "fs"

export default defineConfig( viteConfig => {
	writeFileSync( resolve('ready'), '' )
	return {
		build: {
			rollupOptions: {
				input: [ resolve('./index.html') ]
			},
		},
		plugins: [
			reflexRefresh()
		]
	}
})
`,Ge=500,Ve=20,We=300,ze="https://stackblitz.com",J=["angular-cli","create-react-app","html","javascript","node","polymer","typescript","vue"],Xe=["project","search","ports","settings"],Je=["light","dark"],Ye=["editor","preview"],Y={clickToLoad:e=>v("ctl",e),devToolsHeight:e=>Q("devtoolsheight",e),forceEmbedLayout:e=>v("embed",e),hideDevTools:e=>v("hidedevtools",e),hideExplorer:e=>v("hideExplorer",e),hideNavigation:e=>v("hideNavigation",e),openFile:e=>Z("file",e),showSidebar:e=>Qe("showSidebar",e),sidebarView:e=>D("sidebarView",e,Xe),startScript:e=>Z("startScript",e),terminalHeight:e=>Q("terminalHeight",e),theme:e=>D("theme",e,Je),view:e=>D("view",e,Ye),zenMode:e=>v("zenMode",e)};function le(e={}){const t=Object.entries(e).map(([n,r])=>r!=null&&Y.hasOwnProperty(n)?Y[n](r):"").filter(Boolean);return t.length?`?${t.join("&")}`:""}function v(e,t){return t===!0?`${e}=1`:""}function Qe(e,t){return typeof t=="boolean"?`${e}=${t?"1":"0"}`:""}function Q(e,t){if(typeof t=="number"&&!Number.isNaN(t)){const n=Math.min(100,Math.max(0,t));return`${e}=${encodeURIComponent(Math.round(n))}`}return""}function D(e,t="",n=[]){return n.includes(t)?`${e}=${encodeURIComponent(t)}`:""}function Z(e,t){return(Array.isArray(t)?t:[t]).filter(r=>typeof r=="string"&&r.trim()!=="").map(r=>`${e}=${encodeURIComponent(r)}`).join("&")}function ue(){return Math.random().toString(36).slice(2,6)+Math.random().toString(36).slice(2,6)}function P(e,t){return`${ae(t)}${e}${le(t)}`}function F(e,t){const n={forceEmbedLayout:!0};return t&&typeof t=="object"&&Object.assign(n,t),`${ae(n)}${e}${le(n)}`}function ae(e={}){return(typeof e.origin=="string"?e.origin:ze).replace(/\/$/,"")}function H(e,t,n){if(!t||!e||!e.parentNode)throw new Error("Invalid Element");e.id&&(t.id=e.id),e.className&&(t.className=e.className),Ze(t,n),e.replaceWith(t)}function w(e){if(typeof e=="string"){const t=document.getElementById(e);if(!t)throw new Error(`Could not find element with id '${e}'`);return t}else if(e instanceof HTMLElement)return e;throw new Error(`Invalid element: ${e}`)}function $(e){return e&&e.newWindow===!1?"_self":"_blank"}function Ze(e,t={}){const n=Object.hasOwnProperty.call(t,"height")?`${t.height}`:`${We}`,r=Object.hasOwnProperty.call(t,"width")?`${t.width}`:void 0;e.setAttribute("height",n),r?e.setAttribute("width",r):e.setAttribute("style","width:100%;")}class Ne{constructor(t){this.pending={},this.port=t,this.port.onmessage=this.messageListener.bind(this)}request({type:t,payload:n}){return new Promise((r,i)=>{const s=ue();this.pending[s]={resolve:r,reject:i},this.port.postMessage({type:t,payload:{...n,__reqid:s}})})}messageListener(t){var c;if(typeof((c=t.data.payload)==null?void 0:c.__reqid)!="string")return;const{type:n,payload:r}=t.data,{__reqid:i,__success:s,__error:o}=r;this.pending[i]&&(s?this.pending[i].resolve(this.cleanResult(r)):this.pending[i].reject(o?`${n}: ${o}`:n),delete this.pending[i])}cleanResult(t){const n={...t};return delete n.__reqid,delete n.__success,delete n.__error,Object.keys(n).length?n:null}}class et{constructor(t,n){this.editor={openFile:r=>this._rdc.request({type:"SDK_OPEN_FILE",payload:{path:r}}),setCurrentFile:r=>this._rdc.request({type:"SDK_SET_CURRENT_FILE",payload:{path:r}}),setTheme:r=>this._rdc.request({type:"SDK_SET_UI_THEME",payload:{theme:r}}),setView:r=>this._rdc.request({type:"SDK_SET_UI_VIEW",payload:{view:r}}),showSidebar:(r=!0)=>this._rdc.request({type:"SDK_TOGGLE_SIDEBAR",payload:{visible:r}})},this.preview={origin:"",getUrl:()=>this._rdc.request({type:"SDK_GET_PREVIEW_URL",payload:{}}).then(r=>(r==null?void 0:r.url)??null),setUrl:(r="/")=>{if(typeof r!="string"||!r.startsWith("/"))throw new Error(`Invalid argument: expected a path starting with '/', got '${r}'`);return this._rdc.request({type:"SDK_SET_PREVIEW_URL",payload:{path:r}})}},this._rdc=new Ne(t),Object.defineProperty(this.preview,"origin",{value:typeof n.previewOrigin=="string"?n.previewOrigin:null,writable:!1})}applyFsDiff(t){const n=r=>r!==null&&typeof r=="object";if(!n(t)||!n(t.create))throw new Error("Invalid diff object: expected diff.create to be an object.");if(!Array.isArray(t.destroy))throw new Error("Invalid diff object: expected diff.destroy to be an array.");return this._rdc.request({type:"SDK_APPLY_FS_DIFF",payload:t})}getDependencies(){return this._rdc.request({type:"SDK_GET_DEPS_SNAPSHOT",payload:{}})}getFsSnapshot(){return this._rdc.request({type:"SDK_GET_FS_SNAPSHOT",payload:{}})}}const x=[];class tt{constructor(t){this.id=ue(),this.element=t,this.pending=new Promise((n,r)=>{const i=({data:a,ports:p})=>{(a==null?void 0:a.action)==="SDK_INIT_SUCCESS"&&a.id===this.id&&(this.vm=new et(p[0],a.payload),n(this.vm),o())},s=()=>{var a;(a=this.element.contentWindow)==null||a.postMessage({action:"SDK_INIT",id:this.id},"*")};function o(){window.clearInterval(u),window.removeEventListener("message",i)}window.addEventListener("message",i),s();let c=0;const u=window.setInterval(()=>{if(this.vm){o();return}if(c>=Ve){o(),r("Timeout: Unable to establish a connection with the StackBlitz VM"),x.forEach((a,p)=>{a.id===this.id&&x.splice(p,1)});return}c++,s()},Ge)}),x.push(this)}}const nt=e=>{const t=e instanceof Element?"element":"id";return x.find(n=>n[t]===e)??null};function rt(e,t){const n=document.createElement("input");return n.type="hidden",n.name=e,n.value=t,n}function it(e){return e.replace(/\[/g,"%5B").replace(/\]/g,"%5D")}function fe({template:e,title:t,description:n,dependencies:r,files:i,settings:s}){if(!J.includes(e)){const a=J.map(p=>`'${p}'`).join(", ");console.warn(`Unsupported project.template: must be one of ${a}`)}const o=[],c=(a,p,f="")=>{o.push(rt(a,typeof p=="string"?p:f))};c("project[title]",t),typeof n=="string"&&n.length>0&&c("project[description]",n),c("project[template]",e,"javascript"),r&&(e==="node"?console.warn("Invalid project.dependencies: dependencies must be provided as a 'package.json' file when using the 'node' template."):c("project[dependencies]",JSON.stringify(r))),s&&c("project[settings]",JSON.stringify(s)),Object.entries(i).forEach(([a,p])=>{c(`project[files][${it(a)}]`,p)});const u=document.createElement("form");return u.method="POST",u.setAttribute("style","display:none!important;"),u.append(...o),u}function st(e,t){const n=fe(e);return n.action=F("/run",t),n.id="sb_run",`<!doctype html>
<html>
<head><title></title></head>
<body>
  ${n.outerHTML}
  <script>document.getElementById('${n.id}').submit();<\/script>
</body>
</html>`}function ot(e,t){const n=fe(e);n.action=P("/run",t),n.target=$(t),document.body.appendChild(n),n.submit(),document.body.removeChild(n)}function T(e){return e!=null&&e.contentWindow?(nt(e)??new tt(e)).pending:Promise.reject("Provided element is not an iframe.")}function ct(e,t){ot(e,t)}function lt(e,t){const n=P(`/edit/${e}`,t),r=$(t);window.open(n,r)}function ut(e,t){const n=P(`/github/${e}`,t),r=$(t);window.open(n,r)}function at(e,t,n){var o;const r=w(e),i=st(t,n),s=document.createElement("iframe");return H(r,s,n),(o=s.contentDocument)==null||o.write(i),T(s)}function ft(e,t,n){const r=w(e),i=document.createElement("iframe");return i.src=F(`/edit/${t}`,n),H(r,i,n),T(i)}function pt(e,t,n){const r=w(e),i=document.createElement("iframe");return i.src=F(`/github/${t}`,n),H(r,i,n),T(i)}const dt={connect:T,embedGithubProject:pt,embedProject:at,embedProjectId:ft,openGithubProject:ut,openProject:ct,openProjectId:lt},mt=(e,t,n)=>Math.max(e,Math.min(t,n)),_t="_App_ka7wa_1",ht="__iframe_ka7wa_5",N={App:_t,_iframe:ht},ee=Object.assign({"../stack/index.html":Fe,"../stack/index.tsx":He,"../stack/package.json":we,"../stack/steps/00.render.tsx":$e,"../stack/steps/01.props.tsx":Ue,"../stack/steps/02.state.tsx":Ke,"../stack/tsconfig.json":qe,"../stack/vite.config.js":Be}),j={};Object.keys(ee).map(e=>{const t=ee[e];e=e.substring(9,e.length),j[e]=t});function yt(e,t){let n,r=[];K(async()=>{r=Object.keys(j).filter(u=>u.startsWith("steps/")),n=await dt.embedProject("iframe",{title:"Learn Reflex",description:"Learn Reflex tutorial",template:"node",files:{...j,loading:"Stackblitz is loading"}},{clickToLoad:!1,openFile:"loading",terminalHeight:0,hideExplorer:!0,hideNavigation:!0,theme:"dark"})});const i=O(!1);K(()=>{const u=()=>clearInterval(a),a=setInterval(async()=>{!n||!("ready"in await n.getFsSnapshot())||(i.value=!0,s.value=0,u())},500);return u});const s=O(-1);let o=!0;Me(async()=>{const u=r[s.value];if(!n)return;if(await n.editor.openFile(u),o){o=!1;return}const a=j["index.tsx"].split(`
`);a.shift(),a.unshift(`import * as CurrentStep from './${u}'`);const p=a.join(`
`);await n.applyFsDiff({destroy:[],create:{"index.tsx":p}})});function c(u){s.value=mt(0,s.value+u,2)}return()=>h("div",{class:N.App},h("nav",null),h("iframe",{id:"iframe",class:N._iframe}),i.value&&h("div",null,h("button",{onClick:()=>c(-1)},"Prev"),h("button",{onClick:()=>c(1)},"Next")))}he().then(()=>{Pe(h(yt,null),pe("#App"))});
