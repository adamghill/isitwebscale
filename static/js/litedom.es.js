/** 
 * Litedom v0.12.1 
 * Copyright 2019 Mardix mcx2082@gmail.com
 * License: MIT
 * https://github.com/mardix/litedom
 * Build date: 11/27/2019, 11:33:17 PM
 * 
 */
const t=t=>t.replace(/[-_\s+]([a-z])/g,t=>t[1].toUpperCase()),e=(t,e,n)=>{let r=t;const o=e.split(".");for(;o.length;){const t=o.shift();r[t]=o.length?r[t]?r[t]:{}:n,r=r[t]}},n=(t,e)=>e.split(".").reduce((t,e)=>t&&t[e],t),r=t=>"function"==typeof t,o=(t,e)=>t&&r(t[e]),i=t=>"string"==typeof t?document.querySelector(t):t,s=t=>window.getComputedStyle(t),c=t=>"hidden"===s(t).visibility,l=t=>"none"===s(t).display,a=t=>(new DOMParser).parseFromString(t,"text/html").body,u=[["&lt;","<"],["&gt;",">"],["&amp;","&"]],d=(e,n=!1)=>Object.freeze(Array.from(e.attributes).map(e=>({[n?t(e.name):e.name]:e.value})).reduce((t,e)=>({...t,...e}),{})),f=(t,e)=>{let n=!1,r=!1;const o=new WeakMap,i=()=>{n?r||(r=!0):e()},s={get(t,e,n){if("#"===e)return t;const r=Reflect.get(t,e,n);if((t=>null===t||!["function","object"].includes(typeof t))(r)||"constructor"===e)return r;const i=((t,e)=>{let n=o.get(t);if(n)return n;n=new Map,o.set(t,n);let r=n.get(e);return r||(r=Reflect.getOwnPropertyDescriptor(t,e),n.set(e,r)),r})(t,e);if(i&&!i.configurable){if(i.set&&!i.get)return;if(!1===i.writable)return r}return new Proxy(r,s)},set(t,e,n,r){n&&void 0!==n["#"]&&(n=n["#"]);const o=Reflect.get(t,e,r),s=Reflect.set(t,e,n);return o!==n&&i(),s},defineProperty(t,e,n){const r=Reflect.defineProperty(t,e,n);return i(),r},deleteProperty(t,e){const n=Reflect.deleteProperty(t,e);return i(),n},apply(t,o,i){if(!n){n=!0;const s=Reflect.apply(t,o,i);return r&&e(),n=r=!1,s}return Reflect.apply(t,o,i)}};return new Proxy(t,s)};const p=t=>(function t(e){return null===e||"object"!=typeof e?e:(Object.keys(e).forEach(function(n){const r=e[n];null!==r&&"object"==typeof r&&t(r)}),Object.freeze(e))})(function(t){if(null===t||"object"!=typeof t)return t;var e=t.constructor();for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=p(t[n]));return e}(t)),h=[];for(const t in document){const e=null===document[t]||r(document[t]);t.startsWith("on")&&e&&h.push(t.substring(2))}const m="ld--elist",b=t=>`ld-on-${t}`;const y=(t,e)=>Array.from(t.childNodes).filter(t=>e(t)).map(t=>({[e(t)]:t})).reduce((t,e)=>({...t,...e}),{}),g=t=>(t=>t instanceof HTMLElement)(t)&&t.hasAttribute("ref-key")?t.getAttribute("ref-key"):t.id;const $={$key:function(t,e,n){t.setAttribute("ref-key",e),k(t,n)},$class:function(t,e,n){const r=e.split(";").map(t=>t.split(":",2).map(t=>t.trim())).map(t=>`\${${t[1]} ? '${t[0]}': ''}`).join(" "),o=t.getAttribute("class")||""+` ${r}`;t.setAttribute("class",o),k(t,n)},$style:function(t,e,n){const r=t.getAttribute("style")||"",o=`\${function() { return this.__$styleMap(${e});}.call(this)}`;t.setAttribute("style",(r?r+"; ":"")+o),k(t,n)},$for:function(t,e,n){const r=/(.*)\s+(in)\s+(.*)$/.exec(e);if(4===r.length){const e=r[1].replace("(","").replace(")",""),o=r[3];x(t,`\${${o}.map(function(${e}) { return \``,"`}.bind(this)).join('')}"),k(t,n)}},$if:function(t,e,n){k(t,n),N(t,`\${${e} ? `);const r=t.nextElementSibling;r&&v(r,"else")?(x(t,"`","`"),k(r,"else"),x(r,":`","`}")):x(t,"`","`:``}")}},A=t=>`:${t}`,v=(t,e)=>t.hasAttribute(A(e)),M=(t,e)=>t.getAttribute(A(e)),k=(t,e)=>t.removeAttribute(A(e)),w=(t,e)=>t.querySelectorAll(`[\\${A(e)}]`),N=(t,e)=>t.insertAdjacentText("beforebegin",e),x=(t,e,n)=>{N(t,e),((t,e)=>t.insertAdjacentText("afterend",e))(t,n)};const j=["data","el","shadowDOM","template","created","updated","removed","$store","prop","tagName"],T=t=>Object.keys(t).filter(t=>!j.includes(t)).filter(t=>!t.startsWith("$")).filter(e=>o(t,e)).reduce((e,n)=>({...e,[n]:t[n]}),{}),E=t=>Object.keys(t).filter(e=>!o(t,e)).reduce((e,n)=>({...e,[n]:t[n]}),{}),O=t=>Object.keys(t).filter(e=>o(t,e)).map(e=>((t,e)=>n=>n[t]=e({...n}))(e,t[e])),_=t=>Object.keys(t).filter(t=>t.startsWith("$")).filter(t=>!j.includes(t)).reduce((e,n)=>({...e,[n]:t[n]}),{}),C=t=>e=>(e.$store=t.getState(),t.subscribe(n=>e.$store={...t.getState()})),L=(t,e,n)=>{Object.keys(e).filter(t=>!t.startsWith("_")).map(r=>t[r]=e[r].bind(n))},S=t=>{const e=a((t=>t.replace(/\$?\{([^\;\{]+)\}/g,(t,e)=>`\${${e}}`))(t));!function(t,e={}){const n={...e,...$};for(const e in n){const r=e.replace("$","");for(const o of w(t,r))if(v(o,r)){const t=M(o,r);n[e](o,t,r)}}}(e),function(t){for(const e of t.querySelectorAll("[\\@call], [\\@bind]")){let t=e.getAttribute("@call");const n=e.hasAttribute("@bind");e.removeAttribute("@call"),n&&(e.setAttribute("ld--bind",e.getAttribute("@bind")),e.removeAttribute("@bind"),t="__$bindInput");let r=["click"];e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement?r=["input","paste"]:e instanceof HTMLSelectElement?r=["change"]:e instanceof HTMLFormElement?r=["submit"]:e instanceof HTMLAnchorElement&&e.setAttribute("href","javascript:void(0);");let o=(e.getAttribute(m)||"").split(",").filter(t=>t);o=o.concat(r),e.setAttribute(m,o.join(","));for(const n of r)e.setAttribute(b(n),t)}for(const e of h)for(const n of t.querySelectorAll(`[\\@${e}]`)){const t=(n.getAttribute(m)||"").split(",").filter(t=>t);t.push(e),n.setAttribute(m,t.join(",")),n.setAttribute(b(e),n.getAttribute(`@${e}`)),n.removeAttribute(`@${e}`),n instanceof HTMLAnchorElement&&n.setAttribute("href","javascript:void(0);")}}(e);const n=(t=>u.reduce((t,e)=>t.replace(new RegExp(e[0],"g"),e[1]),t))(e.innerHTML),r=(t=>e=>new Function(`return \`${t}\``).call(e))(n);return{html:n,render:(t,e)=>{const n=a(r(e));return!t.isEqualNode(n)&&function t(e,n,r={}){if(r={key:t=>g(t),...r},"string"==typeof n){const t=n;(n=document.createElement(e.nodeName)).innerHTML=t}const o=y(e,r.key);let i;for(i=0;n.firstChild;i++){const s=n.removeChild(n.firstChild);if(i>=e.childNodes.length){e.appendChild(s);continue}let c=e.childNodes[i];const l=r.key(s);if(r.key(c)||l){const t=l&&l in o?o[l]:s;t!==c&&(c=e.insertBefore(t,c))}if(c.nodeType!==s.nodeType||c.tagName!==s.tagName)e.replaceChild(s,c);else if([Node.TEXT_NODE,Node.COMMENT_NODE].indexOf(c.nodeType)>=0)c.textContent!==s.textContent&&(c.textContent=s.textContent);else if(c!==s){const e=d(c),n=d(s);for(const t in e)t in n||c.removeAttribute(t);for(const t in n)t in e&&e[t]===n[t]||c.setAttribute(t,n[t]);t(c,s)}}for(;e.childNodes.length>i;)e.removeChild(e.lastChild);return!0}(t,n)}}};function H(t){const r=t.target,o=r.getAttribute("ld--bind");if("checkbox"===r.type){const t=n(this.data,o)||[];e(this.data,o,r.checked?t.concat(r.value):t.filter(t=>t!=r.value))}else r.options&&r.multiple?e(this.data,o,[].reduce.call(r,(t,e)=>e.selected?t.concat(e.value):t,[])):e(this.data,o,r.value)}const P={__$styleMap:t=>Object.keys(t).map(e=>`${(t=>t.replace(/([a-zA-Z])(?=[A-Z])/g,"$1-").toLowerCase())(e)}: ${t[e]};`).join(" ")};function D(t={}){const e={shadowDOM:!1,tagName:null,data:{},template:null,$store:{getState:()=>void 0,subscribe:()=>()=>{}},created(){},updated(){},removed(){},...t},r=C(e.$store),o=S(e.template),i=T(e),s=E(e.data),c=O(e.data),l=_(e),a=t=>c.forEach(e=>e(t));window.customElements.define(e.tagName.toLowerCase(),class extends HTMLElement{constructor(){super(),this.$root=e.shadowDOM?this.attachShadow({mode:"open"}):this}connectedCallback(){this.$eventHooks={updated:[],removed:[]},this._state={...this._state,...s,prop:d(this,!0)};const t=f(this._state,()=>{a(this._state),o.render(this.$root,{...this._state,...P})&&e.updated.call(this.context)});this.disconnectStore=r(t),this.$root.innerHTML=o.html,this.context={...i,...l,data:t,el:this.$root,prop:this._state.prop,$store:e.$store},function(t,e){function r(t){Array.from(t.querySelectorAll(`[${m}]`)).map(t=>{(t.getAttribute(m)||"").split(",").filter(t=>t).map(n=>{t[`on${n}`]=(r=>{r.preventDefault();const o=t.getAttribute(b(n));e[o].call(e,r)})})})}Array.from(t.querySelectorAll("[ld--bind]")).map(t=>{const r=n(e.data,t.getAttribute("ld--bind"));try{"INPUT"===t.tagName&&["radio","checkbox"].includes(t.type)?r.includes(t.value)&&(t.checked=!0):t.value=r}catch(t){}});const o=new MutationObserver(t=>{[...t].filter(t=>t.addedNodes.length>0).map(t=>t.target).map(t=>r(t))});o.observe(t,{attributes:!0,childList:!0,subtree:!0}),r(t)}(this.$root,{...this.context,__$bindInput:H}),L(this,i,this.context),a(this._state),o.render(this.$root,{...this._state,...P}),e.created.call(this.context)}disconnectedCallback(){e.removed.call(this.context),this.disconnectStore(),this.$eventHooks=[]}get data(){return p(this._state)}})}const R=t=>new Error(`Litedom Error: ${t}`),q=()=>`litedom-${((t=7)=>Math.random().toString(36).substr(2,t).toLowerCase())()}`;function I(t){const e={el:null,refId:null,template:null,tagName:null,shadowDOM:!1,...t};let n=null;const r=!!e.tagName;if(e.tagName=e.tagName||q(),e.el&&(n=i(e.el),c(n)&&(n.style.visibility="visible"),l(n)&&(n.style.display=""),e.template||(e.template=n.innerHTML),n.innerHTML="",!r)){const t=document.createElement(e.tagName);e.refId&&t.setAttribute("ref-id",e.refId),n.parentNode.replaceChild(t,n)}if(!e.template)throw R("missing 'template' option or 'el' are not valid elements");D(e)}export default(t,e={})=>{Array.isArray(t)?t.map(t=>I({...e,...t})):I(t)};
