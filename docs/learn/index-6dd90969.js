(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const o of c.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(s){if(s.ep)return;s.ep=!0;const c=n(s);fetch(s.href,c)}})();function se(e,t){let n=e;return t==null&&(t=e,n=document.documentElement),[n,t]}function me(e,t){const[n,r]=se(e,t);return n.querySelector(r)}function _e(e,t){const[n,r]=se(e,t);return Array.from(n.querySelectorAll(r))}function q(e,t,n,r,s={}){const{dispatchAtInit:c}=s;delete s.dispatchAtInit;function o(i,u){e?u.addEventListener(i,r,s):u.removeEventListener(i,r,s)}t.map(i=>Array.isArray(n)?n.map(u=>o(u,i)):o(n,i)),c&&r(null)}function he(e){return typeof e=="string"?e=_e(e):Array.isArray(e)||(e=[e]),e}function ye(e,t,n,r){const s=he(e),c=()=>q(!1,s,t,o,r);function o(...i){c(),n.apply(null,i)}return q(!0,s,t,o,r),c}async function ge(){return new Promise(e=>{document.readyState=="loading"?ye(document,"DOMContentLoaded",e):e()})}const h=(e,...t)=>e.map(n=>n==null?void 0:n(...t)),ve=queueMicrotask??(e=>setTimeout(e,0));function ie(e){const t=new Set;let n=[];function r(){for(const s of t)e(s);h(n),t.clear(),n=[]}return(s,c)=>{t.size||ve(r),t.add(s),n.push(c)}}let T=[];function B(e){var t;(t=D())==null||t._mountHandlers.push(e)}function oe(e){var t;return(t=D())==null||t._unmountHandlers.push(e),e}const be=(e,t)=>Object.keys(e).length===Object.keys(t).length&&Object.keys(e).every(n=>t.hasOwnProperty(n)&&e[n]===t[n]),I="_l",Ee=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,Se=/Capture$/,xe="http://www.w3.org/2000/svg";let _=null;function D(){return _}function W(e,t){const n=e!==(e=e.replace(Se,"")),r=e.toLowerCase(),s=(r in t?r:e).slice(2),c=s+(n?"C":"");return{eventName:s,eventKey:c,useCapture:n}}function Ae(e,t,n){t[0]==="-"?e.setProperty(t,n):n==null?e[t]="":typeof n!="number"||Ee.test(t)?e[t]=n:e[t]=n+"px"}function ce(e){var t,n;(n=(t=e==null?void 0:e.props)==null?void 0:t.ref)==null||n._setFromVNode(e)}let w;const Te=()=>w;function P(e,t,n){t=="className"&&(t="class"),n===!1||n===null?e.removeAttribute(t):n===!0?e.setAttribute(t,""):t=="style"&&typeof n=="object"?Object.keys(n).forEach(r=>Ae(e.style,r,n[r])):(t=="class"&&Array.isArray(n)&&(n=n.flat(1).filter(r=>r!==!0&&!!r).join(" ").trim()),e.setAttribute(t,n))}function we(e,t,n){const{type:r,value:s}=e,c=r===1||r===3;let o;if(n)o=n,c&&(w=e,n.nodeValue!=s&&(n.nodeValue=s));else if(t)o=t.dom,c&&t.value!==s&&(o.nodeValue=s);else{s==="svg"&&(e._isSVG=!0);const i=e._document;r===0?o=i.createComment(""):c?(w=e,o=i.createTextNode(s)):r===6&&(o=e._isSVG?i.createElementNS(xe,s):i.createElement(s))}if(r===0||r===1||r===3)return o;if(r===8)return ue(e,t,o),o;t&&Object.keys(t.props).filter(i=>i!=="children"&&i!=="key"&&i!=="ref"&&!(i in e.props&&e.props[i]===t.props[i])).forEach(i=>{if(i=="innerHTML")o.innerHTML="";else if(i.startsWith("on")){const{eventName:u,eventKey:l,useCapture:p}=W(i,o);o.removeEventListener(u,o[I].get(l),p)}else o.removeAttribute(i)});for(let i in e.props){let u=e.props[i];if(!(u==null||i==="children"||i==="key"||i==="ref"||t&&i in t.props&&t.props[i]===u))if(i==="innerHTML")o.innerHTML=u;else if(i.startsWith("on")){const{eventName:l,eventKey:p,useCapture:a}=W(i,o);o[I]??(o[I]=new Map),o[I].set(p,u),o.addEventListener(l,u,a)}else u!==null&&typeof u=="object"&&u.type===3&&(w={type:2,value:u,_propertyName:i,dom:o},u=u.value),n||P(o,i,u)}return o}function le(e,t,n,r=!1){const s=h(T,2,e,t,n,r);e&&(b(e,t,n,r),j(e,!0),h(s))}function j(e,t){if(e.type===7){const{component:n}=e;if(n)if(j(n.children,t),t&&!n.isMounted){if(n.isMounted=!0,e.value.isFactory!==!1){const r=n._mountHandlers.length;for(let s=0;s<r;++s){const c=n._mountHandlers[s].apply(n);typeof c=="function"?n._unmountHandlers.push(c):Array.isArray(c)&&c.filter(o=>o).map(o=>n._unmountHandlers.push(o))}n._mountHandlers=[],h(n._renderHandlers),h(n._nextRenderHandlers),n._nextRenderHandlers=[]}h(T,1,n,!0)}else!t&&n.isMounted&&(h(T,1,!1),h(n._unmountHandlers),n.isMounted=!1,delete e.component,delete n.vnode)}else if(e.type>4){const n=e.props.children.length;for(let r=0;r<n;++r)j(e.props.children[r],t)}}function z(e,t){if(t._isSVG=e._isSVG,t._document=e._document,t.props){const n=t.props.key;n&&(e.keys||(e.keys={}),e.keys[n]=t)}}let J;function ue(e,t,n){var y,G;const r=e.type===8,s=r?J.dom:e.dom;J=e;const c=e.props.children,o=c.length,i=t==null?void 0:t.props.children,u=i?i.length:0;if(r&&o===0&&u>0){j(t,!1),s.innerHTML="";return}if(o===0)return;let l;if(!t||u===0){let f=!1;for(l=0;l<o;++l){const d=c[l];z(e,d);let v;if(n){const S=d.type===1||d.type===3;S&&f?(v=document.createTextNode("​"),n.insertBefore(v,n.childNodes[l])):v=n.childNodes[l],f=S}b(d,null,v),!n&&d.dom&&s.appendChild(d.dom)}return}for(l=0;l<o;++l)z(e,c[l]);const p=t.keys,a=new Set;let m=0;for(l=0;l<o;++l){const f=c[l],d=i[l],v=(y=d==null?void 0:d.props)==null?void 0:y.key,S=(G=f.props)==null?void 0:G.key,x=p?p[S]:null;if(v!=null&&e.keys&&!(v in e.keys)&&++m,S!=null&&x&&x.type===f.type){b(f,x),a.add(x);const V=l+m;i.indexOf(x)!==V&&s.insertBefore(f.dom,s.children[V+1])}else S!=null&&p&&!x?(b(f),s.insertBefore(f.dom,s.children[l]),--m):d&&d.type===f.type&&(f.type!==6&&f.type!==7||d.value===f.value)?(b(f,d),a.add(d)):(b(f),s.insertBefore(f.dom,s.children[l]),--m)}for(l=0;l<u;++l){const f=i[l];a.has(f)||(j(f,!1),f.dom.remove(),f.dom=null,ce(f))}}function X(e){if(_=e.component,e.value.isFactory!==!1&&!_._proxy){const t=k(e.props);_._propState=t;const n=Proxy.revocable({},{get:(r,s)=>Reflect.get(t.value,s)});_._proxy=n.proxy,_._unmountHandlers.push(n.revoke)}return _._render.apply(_,[_._proxy??e.props,_])}function b(e,t,n,r=!1){t&&t===e&&(e={...t},e.props={...t.props}),t&&(e._isSVG=t._isSVG,e._document=t._document,e._id=t._id);const s=e.type;if(s>=0&&s<=3||s===6)e.dom=we(e,t,n),w=null;else if(s===7){const c=e.value;let o=t==null?void 0:t.component,i;if(o)e.component=o,o.vnode=e;else{o={vnode:e,isMounted:!1,_render:c,_mountHandlers:[],_renderHandlers:[],_nextRenderHandlers:[],_unmountHandlers:[],_shouldUpdate:c.shouldUpdate},e.component=o,o._render=c;const l=X(e),p=typeof l=="function";c.isFactory=p,o._render=p?l:c,p||(i=l)}let u=!0;!r&&!i&&t&&(u=o._shouldUpdate?o._shouldUpdate(e.props,t.props):!be(e.props,t.props),u&&c.isFactory&&(o._propState.set({...o._defaultProps,...e.props}),u=!1),u||(e.dom=t.dom)),!i&&u&&(i=X(e)),i&&(i._isSVG=e._isSVG,i._document=e._document,b(i,o.children,n),o.children=i,e.dom=i.dom),_=null}ce(e),e.type>=5&&ue(e,t,n)}const Y=(e,t)=>typeof e=="function"?e(t):e,je=ie(H),Ie=ie(e=>le(e.vnode,e.vnode,null,!0));function Ce(e,t){let n;e.type===3?e.dom.nodeValue=t:(n=e._propertyName,e.dom instanceof HTMLImageElement&&n==="src"&&P(e.dom,n,""),P(e.dom,n,t)),h(T,3,e,n)}let E,R=new Set;function k(e){e=Y(e);let t=new Set,n=new Set,r=new Set;E&&t.add(E);async function s(i,u=!1){var p;if(i===e&&!u)return;for(const a of t)(p=a._dispose)==null||p.call(a);e=i;for(const a of t)!a._dom&&H(a);for(const a of n)r.has(a.component)||Ce(a,e);const l=[];for(const a of r)l.push(new Promise(m=>Ie(a,m)));r.clear(),await Promise.all(l);for(const a of t)a._dom&&je(a)}const c=oe(()=>{t.clear(),n.clear(),r.clear(),t=null,n=null,r=null}),o={get value(){const i=Te(),u=D();return E?(t.add(E),R.add(this)):i&&(i.type===3||i.type===2)&&i.value===this?(i.component=u,n.add(i)):u&&r.add(u),e},set value(i){s(i)},set:(i,u=!1)=>s(Y(i,e),u),peek(){return e},sneak(i){e=i},get type(){return 3},toString(){return this.value+""},valueOf(){return this.value},dispose:c,_removeEffect(i){t==null||t.delete(i)}};return h(T,4,o),o}function De(e,t){for(const n of e)n._removeEffect(t)}function Fe(){const e=Array.from(R);return R.clear(),e}function Q(e,t){const n=e._handler(...e._values);e._values=t,e._dispose=typeof n=="function"?n:null}function H(e,t=!1){if(t&&(E=e),e._check){const n=e._check().map(r=>r&&r.type===3?r.value:r);t&&(E=null),(!e._values.length||n.find((r,s)=>e._values[s]!==r)!=null)&&Q(e,n)}else Q(e,[!1]),t&&(E=null)}function Le(e,t,n){const r={_handler:e,_check:n,_dom:t,_values:n?[]:[!0],_dispose:null};let s;function c(){H(r,!0),s=Fe()}return t?D()._nextRenderHandlers.push(c):c(),oe(()=>De(s,r))}function Pe(e){return Le(e,!0)}const Z="__v";function Re(e,t,n=document,r=null){const s={type:5,value:null,props:{children:[e]},_isSVG:!1,_document:n};s.dom=t;const c=t[Z];le(s,c,r),h(T,0,c,s),t[Z]=s}function ke(e,t,n=document){Re(e,t,n)}function g(e,t,...n){t==null&&(t={}),t.children??(t.children=n);const r=t.children,s=r.length;for(let o=0;o<s;++o){const i=r[o];typeof i=="string"||typeof i=="number"?r[o]={type:1,value:i}:Array.isArray(i)?r[o]={type:8,props:{children:i}}:typeof i=="object"&&i!==null&&i.type===3?r[o]={type:3,value:i}:(typeof i=="boolean"||i==null)&&(r[o]={type:0})}return{type:typeof e=="function"?7:6,value:e,props:t}}const He=`<html>
<head>
    <title>Learn Reflex</title>
    <script src="index.tsx" type="module" async><\/script>
</head>
<body>
</body>
</html>`,Oe=`document.body.children[0]?.remove();
import('./steps/00.render');`,Me=`{
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
		"@types/node": "^20.8.9",
		"typescript": "^5.2.2",
		"vite": "^4.5.0"
	},
	"dependencies": {
		"reflex-dom": "^0.18.0"
	}
}
`,$e=`import { h, render } from 'reflex-dom';

function App (props) {
	return (
		<div>
			<h2>Hello { props.name }</h2>
		</div>
	);
}

render( <App name="world" />, document.body );`,Ke=`import { h, render } from 'reflex-dom';

function App (props) {
	// TODO
	return (
		<div>
			<h2>Hello PROPS { props.name }</h2>
		</div>
	);
}

render( <App name="world" />, document.body );`,Ue=`import { h, render, state } from 'reflex-dom';

function App (props) {
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

render( <App name="world" />, document.body );`,Ge=`{
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
`,Ve=`import { defineConfig } from 'vite'
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
			//reflexRefresh()
		]
	}
})
`,qe=500,Be=20,We=300,ze="https://stackblitz.com",N=["angular-cli","create-react-app","html","javascript","node","polymer","typescript","vue"],Je=["project","search","ports","settings"],Xe=["light","dark"],Ye=["editor","preview"],ee={clickToLoad:e=>A("ctl",e),devToolsHeight:e=>te("devtoolsheight",e),forceEmbedLayout:e=>A("embed",e),hideDevTools:e=>A("hidedevtools",e),hideExplorer:e=>A("hideExplorer",e),hideNavigation:e=>A("hideNavigation",e),openFile:e=>ne("file",e),showSidebar:e=>Qe("showSidebar",e),sidebarView:e=>L("sidebarView",e,Je),startScript:e=>ne("startScript",e),terminalHeight:e=>te("terminalHeight",e),theme:e=>L("theme",e,Xe),view:e=>L("view",e,Ye),zenMode:e=>A("zenMode",e)};function ae(e={}){const t=Object.entries(e).map(([n,r])=>r!=null&&ee.hasOwnProperty(n)?ee[n](r):"").filter(Boolean);return t.length?`?${t.join("&")}`:""}function A(e,t){return t===!0?`${e}=1`:""}function Qe(e,t){return typeof t=="boolean"?`${e}=${t?"1":"0"}`:""}function te(e,t){if(typeof t=="number"&&!Number.isNaN(t)){const n=Math.min(100,Math.max(0,t));return`${e}=${encodeURIComponent(Math.round(n))}`}return""}function L(e,t="",n=[]){return n.includes(t)?`${e}=${encodeURIComponent(t)}`:""}function ne(e,t){return(Array.isArray(t)?t:[t]).filter(r=>typeof r=="string"&&r.trim()!=="").map(r=>`${e}=${encodeURIComponent(r)}`).join("&")}function pe(){return Math.random().toString(36).slice(2,6)+Math.random().toString(36).slice(2,6)}function O(e,t){return`${fe(t)}${e}${ae(t)}`}function M(e,t){const n={forceEmbedLayout:!0};return t&&typeof t=="object"&&Object.assign(n,t),`${fe(n)}${e}${ae(n)}`}function fe(e={}){return(typeof e.origin=="string"?e.origin:ze).replace(/\/$/,"")}function $(e,t,n){if(!t||!e||!e.parentNode)throw new Error("Invalid Element");e.id&&(t.id=e.id),e.className&&(t.className=e.className),Ze(t,n),e.replaceWith(t)}function K(e){if(typeof e=="string"){const t=document.getElementById(e);if(!t)throw new Error(`Could not find element with id '${e}'`);return t}else if(e instanceof HTMLElement)return e;throw new Error(`Invalid element: ${e}`)}function U(e){return e&&e.newWindow===!1?"_self":"_blank"}function Ze(e,t={}){const n=Object.hasOwnProperty.call(t,"height")?`${t.height}`:`${We}`,r=Object.hasOwnProperty.call(t,"width")?`${t.width}`:void 0;e.setAttribute("height",n),r?e.setAttribute("width",r):e.setAttribute("style","width:100%;")}class Ne{constructor(t){this.pending={},this.port=t,this.port.onmessage=this.messageListener.bind(this)}request({type:t,payload:n}){return new Promise((r,s)=>{const c=pe();this.pending[c]={resolve:r,reject:s},this.port.postMessage({type:t,payload:{...n,__reqid:c}})})}messageListener(t){var i;if(typeof((i=t.data.payload)==null?void 0:i.__reqid)!="string")return;const{type:n,payload:r}=t.data,{__reqid:s,__success:c,__error:o}=r;this.pending[s]&&(c?this.pending[s].resolve(this.cleanResult(r)):this.pending[s].reject(o?`${n}: ${o}`:n),delete this.pending[s])}cleanResult(t){const n={...t};return delete n.__reqid,delete n.__success,delete n.__error,Object.keys(n).length?n:null}}class et{constructor(t,n){this.editor={openFile:r=>this._rdc.request({type:"SDK_OPEN_FILE",payload:{path:r}}),setCurrentFile:r=>this._rdc.request({type:"SDK_SET_CURRENT_FILE",payload:{path:r}}),setTheme:r=>this._rdc.request({type:"SDK_SET_UI_THEME",payload:{theme:r}}),setView:r=>this._rdc.request({type:"SDK_SET_UI_VIEW",payload:{view:r}}),showSidebar:(r=!0)=>this._rdc.request({type:"SDK_TOGGLE_SIDEBAR",payload:{visible:r}})},this.preview={origin:"",getUrl:()=>this._rdc.request({type:"SDK_GET_PREVIEW_URL",payload:{}}).then(r=>(r==null?void 0:r.url)??null),setUrl:(r="/")=>{if(typeof r!="string"||!r.startsWith("/"))throw new Error(`Invalid argument: expected a path starting with '/', got '${r}'`);return this._rdc.request({type:"SDK_SET_PREVIEW_URL",payload:{path:r}})}},this._rdc=new Ne(t),Object.defineProperty(this.preview,"origin",{value:typeof n.previewOrigin=="string"?n.previewOrigin:null,writable:!1})}applyFsDiff(t){const n=r=>r!==null&&typeof r=="object";if(!n(t)||!n(t.create))throw new Error("Invalid diff object: expected diff.create to be an object.");if(!Array.isArray(t.destroy))throw new Error("Invalid diff object: expected diff.destroy to be an array.");return this._rdc.request({type:"SDK_APPLY_FS_DIFF",payload:t})}getDependencies(){return this._rdc.request({type:"SDK_GET_DEPS_SNAPSHOT",payload:{}})}getFsSnapshot(){return this._rdc.request({type:"SDK_GET_FS_SNAPSHOT",payload:{}})}}const C=[];class tt{constructor(t){this.id=pe(),this.element=t,this.pending=new Promise((n,r)=>{const s=({data:l,ports:p})=>{(l==null?void 0:l.action)==="SDK_INIT_SUCCESS"&&l.id===this.id&&(this.vm=new et(p[0],l.payload),n(this.vm),o())},c=()=>{var l;(l=this.element.contentWindow)==null||l.postMessage({action:"SDK_INIT",id:this.id},"*")};function o(){window.clearInterval(u),window.removeEventListener("message",s)}window.addEventListener("message",s),c();let i=0;const u=window.setInterval(()=>{if(this.vm){o();return}if(i>=Be){o(),r("Timeout: Unable to establish a connection with the StackBlitz VM"),C.forEach((l,p)=>{l.id===this.id&&C.splice(p,1)});return}i++,c()},qe)}),C.push(this)}}const nt=e=>{const t=e instanceof Element?"element":"id";return C.find(n=>n[t]===e)??null};function rt(e,t){const n=document.createElement("input");return n.type="hidden",n.name=e,n.value=t,n}function st(e){return e.replace(/\[/g,"%5B").replace(/\]/g,"%5D")}function de({template:e,title:t,description:n,dependencies:r,files:s,settings:c}){if(!N.includes(e)){const l=N.map(p=>`'${p}'`).join(", ");console.warn(`Unsupported project.template: must be one of ${l}`)}const o=[],i=(l,p,a="")=>{o.push(rt(l,typeof p=="string"?p:a))};i("project[title]",t),typeof n=="string"&&n.length>0&&i("project[description]",n),i("project[template]",e,"javascript"),r&&(e==="node"?console.warn("Invalid project.dependencies: dependencies must be provided as a 'package.json' file when using the 'node' template."):i("project[dependencies]",JSON.stringify(r))),c&&i("project[settings]",JSON.stringify(c)),Object.entries(s).forEach(([l,p])=>{i(`project[files][${st(l)}]`,p)});const u=document.createElement("form");return u.method="POST",u.setAttribute("style","display:none!important;"),u.append(...o),u}function it(e,t){const n=de(e);return n.action=M("/run",t),n.id="sb_run",`<!doctype html>
<html>
<head><title></title></head>
<body>
  ${n.outerHTML}
  <script>document.getElementById('${n.id}').submit();<\/script>
</body>
</html>`}function ot(e,t){const n=de(e);n.action=O("/run",t),n.target=U(t),document.body.appendChild(n),n.submit(),document.body.removeChild(n)}function F(e){return e!=null&&e.contentWindow?(nt(e)??new tt(e)).pending:Promise.reject("Provided element is not an iframe.")}function ct(e,t){ot(e,t)}function lt(e,t){const n=O(`/edit/${e}`,t),r=U(t);window.open(n,r)}function ut(e,t){const n=O(`/github/${e}`,t),r=U(t);window.open(n,r)}function at(e,t,n){var o;const r=K(e),s=it(t,n),c=document.createElement("iframe");return $(r,c,n),(o=c.contentDocument)==null||o.write(s),F(c)}function pt(e,t,n){const r=K(e),s=document.createElement("iframe");return s.src=M(`/edit/${t}`,n),$(r,s,n),F(s)}function ft(e,t,n){const r=K(e),s=document.createElement("iframe");return s.src=M(`/github/${t}`,n),$(r,s,n),F(s)}const dt={connect:F,embedGithubProject:ft,embedProject:at,embedProjectId:pt,openGithubProject:ut,openProject:ct,openProjectId:lt},mt=(e,t,n)=>Math.max(e,Math.min(t,n)),_t="_App_ka7wa_1",ht="__iframe_ka7wa_5",re={App:_t,_iframe:ht};function yt(){const e=Object.assign({"../stack/index.html":He,"../stack/index.tsx":Oe,"../stack/package.json":Me,"../stack/steps/00.render.tsx":$e,"../stack/steps/01.props.tsx":Ke,"../stack/steps/02.state.tsx":Ue,"../stack/tsconfig.json":Ge,"../stack/vite.config.js":Ve}),t={};return Object.keys(e).map(n=>{const r=e[n];n=n.substring(9,n.length),t[n]=r}),t}function gt(e){let t,n=[],r=yt();B(async()=>{n=Object.keys(r).filter(a=>a.startsWith("steps/")),t=await dt.embedProject("iframe",{title:"Learn Reflex",description:"Learn Reflex tutorial",template:"node",files:{...r,loading:"Stackblitz is loading"}},{clickToLoad:!1,openFile:"loading",terminalHeight:6,hideExplorer:!0,hideNavigation:!0,theme:"dark",showSidebar:!1,devToolsHeight:0,hideDevTools:!0})});const s=k(!1);B(()=>{const a=()=>clearInterval(m),m=setInterval(async()=>{!t||!("ready"in await t.getFsSnapshot())||(s.value=!0,c.value=0,a())},500);return a});const c=k(-1);let o=!0;Pe(async()=>{let a=n[c.value];if(!t)return;if(await t.editor.openFile(a),o){o=!1;return}const m=r["index.tsx"].split(`
`);a=a.split(".tsx")[0],m[1]=`import('./${a}');`;const y=m.join(`
`);await t.applyFsDiff({destroy:[],create:{"index.tsx":y}})});function i(a){c.value=mt(0,c.value+a,2)}const u=()=>i(-1),l=()=>i(1),p=async()=>{const a=n[c.value],m=r[a],y={};y[a]=m,await t.applyFsDiff({destroy:[],create:y})};return()=>g("div",{class:re.App},g("nav",null),g("iframe",{id:"iframe",class:re._iframe}),s.value&&g("div",null,g("button",{onClick:u},"Prev"),g("button",{onClick:l},"Next"),g("button",{onClick:p},"Reset current file")))}ge().then(()=>{ke(g(gt,null),me("#App"))});
