var Ft=Object.freeze,Me=Object.defineProperty;var jt=(n,t)=>Ft(Me(n,"raw",{value:Ft(t||n.slice())}));import{w as ut,u as Mt,T as ae,f as Oe,m as De,c as Be,s as Re,d as St,x,e as Ve,h as Ue}from"./chunk-757FFUVQ-567b5817.js";import"./index-356e4a49.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const O={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},le=n=>(...t)=>({_$litDirective$:n,values:t});let pe=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bt=le(class extends pe{constructor(n){if(super(n),n.type!==O.ATTRIBUTE||n.name!=="class"||n.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(n){return" "+Object.keys(n).filter(t=>n[t]).join(" ")+" "}update(n,[t]){if(this.it===void 0){this.it=new Set,n.strings!==void 0&&(this.st=new Set(n.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(const s in t)t[s]&&!this.st?.has(s)&&this.it.add(s);return this.render(t)}const e=n.element.classList;for(const s of this.it)s in t||(e.remove(s),this.it.delete(s));for(const s in t){const i=!!t[s];i===this.it.has(s)||this.st?.has(s)||(i?(e.add(s),this.it.add(s)):(e.remove(s),this.it.delete(s)))}return ut}}),He=(n="value")=>(t,e)=>{const s=t.constructor,i=s.prototype.attributeChangedCallback;s.prototype.attributeChangedCallback=function(r,o,l){const a=s.getPropertyOptions(n),p=typeof a.attribute=="string"?a.attribute:n;if(r===p){const u=a.converter||Mt,c=(typeof u=="function"?u:u?.fromAttribute??Mt.fromAttribute)(l,a.type);this[n]!==c&&(this[e]=c)}i.call(this,r,o,l)}},K=new WeakMap,Y=new WeakMap,zt=new WeakSet,gt=new WeakMap;class Fe{constructor(t,e){this.handleFormData=s=>{const i=this.options.disabled(this.host),r=this.options.name(this.host),o=this.options.value(this.host),l=this.host.tagName.toLowerCase()==="syn-button";!i&&!l&&typeof r=="string"&&r.length>0&&typeof o<"u"&&(Array.isArray(o)?o.forEach(a=>{s.formData.append(r,a.toString())}):s.formData.append(r,o.toString()))},this.handleFormSubmit=s=>{const i=this.options.disabled(this.host),r=this.options.reportValidity;this.form&&!this.form.noValidate&&K.get(this.form)?.forEach(o=>{this.setUserInteracted(o,!0)}),this.form&&!this.form.noValidate&&!i&&!r(this.host)&&(s.preventDefault(),s.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),gt.set(this.host,[])},this.handleInteraction=s=>{const i=gt.get(this.host);i.includes(s.type)||i.push(s.type),i.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const s=this.form.querySelectorAll("*");for(const i of s)if(typeof i.reportValidity=="function"&&!i.reportValidity())return!1}return!0},(this.host=t).addController(this),this.options={form:s=>{if(s.hasAttribute("form")&&s.getAttribute("form")!==""){const i=s.getRootNode(),r=s.getAttribute("form");if(r)return i.getElementById(r)}return s.closest("form")},name:s=>s.name,value:s=>s.value,defaultValue:s=>s.defaultValue,disabled:s=>s.disabled??!1,reportValidity:s=>typeof s.reportValidity=="function"?s.reportValidity():!0,setValue:(s,i)=>s.value=i,assumeInteractionOn:["syn-input"],...e}}hostConnected(){const t=this.options.form(this.host);t&&this.attachForm(t),gt.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction)})}hostDisconnected(){this.detachForm(),gt.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction)})}hostUpdated(){const t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(t){t?(this.form=t,K.has(this.form)?K.get(this.form).add(this.host):K.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),Y.has(this.form)||(Y.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity())):this.form=void 0}detachForm(){this.form&&(K.get(this.form)?.delete(this.host),this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),Y.has(this.form)&&(this.form.reportValidity=Y.get(this.form),Y.delete(this.form))),this.form=void 0}setUserInteracted(t,e){e?zt.add(t):zt.delete(t),t.requestUpdate()}doAction(t,e){if(this.form){const s=document.createElement("button");s.type=t,s.style.position="absolute",s.style.width="0",s.style.height="0",s.style.clipPath="inset(50%)",s.style.overflow="hidden",s.style.whiteSpace="nowrap",e&&(s.name=e.name,s.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(i=>{e.hasAttribute(i)&&s.setAttribute(i,e.getAttribute(i))})),this.form.append(s),s.click(),s.remove()}}getForm(){return this.form??null}reset(t){this.doAction("reset",t)}submit(t){this.doAction("submit",t)}setValidity(t){const e=this.host,s=!!zt.has(e),i=!!e.required;e.toggleAttribute("data-required",i),e.toggleAttribute("data-optional",!i),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&s),e.toggleAttribute("data-user-valid",t&&s)}updateValidity(){const t=this.host;this.setValidity(t.validity.valid)}emitInvalidEvent(t){const e=new CustomEvent("syn-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});t||e.preventDefault(),this.host.dispatchEvent(e)||t?.preventDefault()}}const ue=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1});Object.freeze({...ue,valid:!1,valueMissing:!0});Object.freeze({...ue,valid:!1,customError:!0});class je{constructor(t,...e){this.slotNames=[],this.handleSlotChange=s=>{const i=s.target;(this.slotNames.includes("[default]")&&!i.name||i.name&&this.slotNames.includes(i.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===t.ELEMENT_NODE){const e=t;if(e.tagName.toLowerCase()==="syn-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=n=>n??ae;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qe=le(class extends pe{constructor(n){if(super(n),n.type!==O.PROPERTY&&n.type!==O.ATTRIBUTE&&n.type!==O.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Oe(n))throw Error("`live` bindings can only contain a single expression")}render(n){return n}update(n,[t]){if(t===ut||t===ae)return t;const e=n.element,s=n.name;if(n.type===O.PROPERTY){if(t===e[s])return ut}else if(n.type===O.BOOLEAN_ATTRIBUTE){if(!!t===e.hasAttribute(s))return ut}else if(n.type===O.ATTRIBUTE&&e.getAttribute(s)===t+"")return ut;return De(n),t}}),Ot=new Set,We=new MutationObserver(he),H=new Map;let ce=document.documentElement.dir||"ltr",de=document.documentElement.lang||navigator.language,D;We.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]});function Qe(...n){n.map(t=>{const e=t.$code.toLowerCase();H.has(e)?H.set(e,Object.assign(Object.assign({},H.get(e)),t)):H.set(e,t),D||(D=t)}),he()}function he(){ce=document.documentElement.dir||"ltr",de=document.documentElement.lang||navigator.language,[...Ot.keys()].map(n=>{typeof n.requestUpdate=="function"&&n.requestUpdate()})}let Ke=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){Ot.add(this.host)}hostDisconnected(){Ot.delete(this.host)}dir(){return`${this.host.dir||ce}`.toLowerCase()}lang(){return`${this.host.lang||de}`.toLowerCase()}getTranslationData(t){var e,s;const i=new Intl.Locale(t.replace(/_/g,"-")),r=i?.language.toLowerCase(),o=(s=(e=i?.region)===null||e===void 0?void 0:e.toLowerCase())!==null&&s!==void 0?s:"",l=H.get(`${r}-${o}`),a=H.get(r);return{locale:i,language:r,region:o,primary:l,secondary:a}}exists(t,e){var s;const{primary:i,secondary:r}=this.getTranslationData((s=e.lang)!==null&&s!==void 0?s:this.lang());return e=Object.assign({includeFallback:!1},e),!!(i&&i[t]||r&&r[t]||e.includeFallback&&D&&D[t])}term(t,...e){const{primary:s,secondary:i}=this.getTranslationData(this.lang());let r;if(s&&s[t])r=s[t];else if(i&&i[t])r=i[t];else if(D&&D[t])r=D[t];else return console.error(`No translation found for: ${String(t)}`),String(t);return typeof r=="function"?r(...e):r}date(t,e){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),e).format(t)}number(t,e){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),e).format(t)}relativeTime(t,e,s){return new Intl.RelativeTimeFormat(this.lang(),s).format(t,e)}};const Ye={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(n,t)=>`Go to slide ${n} of ${t}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:n=>n===0?"No options selected":n===1?"1 option selected":`${n} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:n=>`Slide ${n}`,toggleColorFormat:"Toggle color format"};Qe(Ye);class Ze extends Ke{}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ge={attribute:!0,type:String,converter:Mt,reflect:!1,hasChanged:Be},Je=(n=Ge,t,e)=>{const{kind:s,metadata:i}=e;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),r.set(e.name,n),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,n)},init(l){return l!==void 0&&this.C(o,void 0,n),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,n)}}throw Error("Unsupported decorator location: "+s)};function f(n){return(t,e)=>typeof e=="object"?Je(n,t,e):((s,i,r)=>{const o=i.hasOwnProperty(r);return i.constructor.createProperty(r,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(i,r):void 0})(n,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function me(n){return f({...n,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qt=(n,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(n,t,e),e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Xe(n,t){return(e,s,i)=>{const r=o=>o.renderRoot?.querySelector(n)??null;if(t){const{get:o,set:l}=typeof s=="object"?e:i??(()=>{const a=Symbol();return{get(){return this[a]},set(p){this[a]=p}}})();return qt(e,s,{get(){if(t){let a=o.call(this);return a===void 0&&(a=r(this),l.call(this,a)),a}return r(this)}})}return qt(e,s,{get(){return r(this)}})}}function ft(n,t){const e={waitUntilFirstUpdate:!1,...t};return(s,i)=>{const{update:r}=s,o=Array.isArray(n)?n:[n];s.update=function(l){o.forEach(a=>{const p=a;if(l.has(p)){const u=l.get(p),m=this[p];u!==m&&(!e.waitUntilFirstUpdate||this.hasUpdated)&&this[i](u,m)}}),r.call(this,l)}}}var ts=Object.defineProperty,es=Object.getOwnPropertyDescriptor,fe=(n,t,e,s)=>{for(var i=s>1?void 0:s?es(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&ts(t,e,i),i};class W extends Re{constructor(){super(),Object.entries(this.constructor.dependencies).forEach(([t,e])=>{this.constructor.define(t,e)})}emit(t,e){const s=new CustomEvent(t,{bubbles:!0,cancelable:!1,composed:!0,detail:{},...e});return this.dispatchEvent(s),s}static define(t,e=this,s={}){const i=customElements.get(t);if(!i){customElements.define(t,class extends e{},s);return}let r=" (unknown version)",o=r;"version"in e&&e.version&&(r=" v"+e.version),"version"in i&&i.version&&(o=" v"+i.version),!(r&&o&&r===o)&&console.warn(`Attempted to register <${t}>${r}, but <${t}>${o} has already been registered.`)}}W.version="1.0.0-main.1";W.dependencies={};fe([f()],W.prototype,"dir",2);fe([f()],W.prototype,"lang",2);let Dt="";function Wt(n){Dt=n}function ss(n=""){if(!Dt){const t=[...document.getElementsByTagName("script")],e=t.find(s=>s.hasAttribute("data-synergy"));if(e)Wt(e.getAttribute("data-synergy"));else{const s=t.find(r=>/synergy(\.min)?\.js($|\?)/.test(r.src)||/synergy-autoloader(\.min)?\.js($|\?)/.test(r.src));let i="";s&&(i=s.getAttribute("src")),Wt(i.split("/").slice(0,-1).join("/"))}}return Dt.replace(/\/$/,"")+(n?`/${n.replace(/^\//,"")}`:"")}const ns={name:"default",resolver:n=>ss(`assets/icons/${n}.svg`)},Qt={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16" part="svg">
      <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"></path>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},is={name:"system",resolver:n=>n in Qt?`data:image/svg+xml,${encodeURIComponent(Qt[n])}`:""};let rs=[ns,is],Bt=[];function os(n){Bt.push(n)}function as(n){Bt=Bt.filter(t=>t!==n)}function Kt(n){return rs.find(t=>t.name===n)}const ge=St`
	/* stylelint-disable */
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,ls=St`
	/* stylelint-disable */
  ${ge}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;var ps=Object.defineProperty,us=Object.getOwnPropertyDescriptor,U=(n,t,e,s)=>{for(var i=s>1?void 0:s?us(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&ps(t,e,i),i};const Z=Symbol(),yt=Symbol();let Lt;const It=new Map;class k extends W{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){let s;if(e?.spriteSheet)return x`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`;try{if(s=await fetch(t,{mode:"cors"}),!s.ok)return s.status===410?Z:yt}catch{return yt}try{const i=document.createElement("div");i.innerHTML=await s.text();const r=i.firstElementChild;if(r?.tagName?.toLowerCase()!=="svg")return Z;Lt||(Lt=new DOMParser);const l=Lt.parseFromString(r.outerHTML,"text/html").body.querySelector("svg");return l?(l.part.add("svg"),document.adoptNode(l)):Z}catch{return Z}}connectedCallback(){super.connectedCallback(),os(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),as(this)}getIconSource(){const t=Kt(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){const{url:t,fromLibrary:e}=this.getIconSource(),s=e?Kt(this.library):void 0;if(!t){this.svg=null;return}let i=It.get(t);if(i||(i=this.resolveIcon(t,s),It.set(t,i)),!this.initialRender)return;const r=await i;if(r===yt&&It.delete(t),t===this.getIconSource().url){if(Ve(r)){this.svg=r;return}switch(r){case yt:case Z:this.svg=null,this.emit("syn-error");break;default:this.svg=r.cloneNode(!0),s?.mutator?.(this.svg),this.emit("syn-load")}}}render(){return this.svg}}k.styles=ls;U([me()],k.prototype,"svg",2);U([f({reflect:!0})],k.prototype,"name",2);U([f()],k.prototype,"src",2);U([f()],k.prototype,"label",2);U([f({reflect:!0})],k.prototype,"library",2);U([ft("label")],k.prototype,"handleLabelChange",1);U([ft(["name","src","library"])],k.prototype,"setIcon",1);const cs=St`
	/* stylelint-disable */
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--syn-input-label-color);
    margin-bottom: var(--syn-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--syn-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--syn-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--syn-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--syn-input-required-content);
    margin-inline-start: var(--syn-input-required-content-offset);
    color: var(--syn-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--syn-input-help-text-color);
    margin-top: var(--syn-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--syn-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--syn-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--syn-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--syn-spacing-2x-small);
  }
`,ds=St`
	/* stylelint-disable */
  ${ge}
  ${cs}

  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--syn-input-font-family);
    font-weight: var(--syn-input-font-weight);
    letter-spacing: var(--syn-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--syn-transition-fast) color,
      var(--syn-transition-fast) border,
      var(--syn-transition-fast) box-shadow,
      var(--syn-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--syn-input-background-color);
    border: solid var(--syn-input-border-width) var(--syn-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--syn-input-background-color-hover);
    border-color: var(--syn-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--syn-input-background-color-focus);
    border-color: var(--syn-input-border-color-focus);
    box-shadow: 0 0 0 var(--syn-focus-ring-width) var(--syn-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--syn-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--syn-input-background-color-disabled);
    border-color: var(--syn-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--syn-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--syn-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--syn-input-filled-background-color);
    color: var(--syn-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--syn-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--syn-input-filled-background-color-focus);
    outline: var(--syn-focus-ring);
    outline-offset: var(--syn-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--syn-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--syn-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--syn-input-height-large) var(--syn-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--syn-color-primary-500);
    caret-color: var(--syn-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--syn-input-height-large) var(--syn-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--syn-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--syn-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(syn-icon),
  .input__suffix ::slotted(syn-icon) {
    color: var(--syn-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--syn-input-border-radius-small);
    font-size: var(--syn-input-font-size-small);
    height: var(--syn-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--syn-input-height-small) - var(--syn-input-border-width) * 2);
    padding: 0 var(--syn-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--syn-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--syn-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--syn-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--syn-input-border-radius-medium);
    font-size: var(--syn-input-font-size-medium);
    height: var(--syn-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--syn-input-height-medium) - var(--syn-input-border-width) * 2);
    padding: 0 var(--syn-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--syn-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--syn-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--syn-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--syn-input-border-radius-large);
    font-size: var(--syn-input-font-size-large);
    height: var(--syn-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--syn-input-height-large) - var(--syn-input-border-width) * 2);
    padding: 0 var(--syn-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--syn-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--syn-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--syn-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--syn-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--syn-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--syn-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear:not(.input__clear--visible) {
    visibility: hidden;
  }

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--syn-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--syn-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--syn-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  .input--empty .input__clear {
    visibility: hidden;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`;var hs=Object.defineProperty,ms=Object.getOwnPropertyDescriptor,g=(n,t,e,s)=>{for(var i=s>1?void 0:s?ms(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&hs(t,e,i),i};class h extends W{constructor(){super(...arguments),this.formControlController=new Fe(this,{assumeInteractionOn:["syn-blur","syn-input"]}),this.hasSlotController=new je(this,"help-text","label"),this.localize=new Ze(this),this.hasFocus=!1,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){return this.__dateInput.type=this.type,this.__dateInput.value=this.value,this.input?.valueAsDate||this.__dateInput.valueAsDate}set valueAsDate(t){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=t,this.value=this.__dateInput.value}get valueAsNumber(){return this.__numberInput.value=this.value,this.input?.valueAsNumber||this.__numberInput.valueAsNumber}set valueAsNumber(t){this.__numberInput.valueAsNumber=t,this.value=this.__numberInput.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("syn-blur")}handleChange(){this.value=this.input.value,this.emit("syn-change")}handleClearClick(t){this.value="",this.emit("syn-clear"),this.emit("syn-input"),this.emit("syn-change"),this.input.focus(),t.stopPropagation()}handleFocus(){this.hasFocus=!0,this.emit("syn-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("syn-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleKeyDown(t){const e=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!e&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&this.formControlController.submit()})}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,s="none"){this.input.setSelectionRange(t,e,s)}setRangeText(t,e,s,i){this.input.setRangeText(t,e,s,i),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),s=this.label?!0:!!t,i=this.helpText?!0:!!e,r=this.clearable&&!this.disabled&&!this.readonly,o=r&&(typeof this.value=="number"||this.value.length>0);return x`
      <div
        part="form-control"
        class=${bt({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":s,"form-control--has-help-text":i})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${s?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${bt({input:!0,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type==="password"&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${C(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${C(this.placeholder)}
              minlength=${C(this.minlength)}
              maxlength=${C(this.maxlength)}
              min=${C(this.min)}
              max=${C(this.max)}
              step=${C(this.step)}
              .value=${qe(this.value)}
              autocapitalize=${C(this.autocapitalize)}
              autocomplete=${C(this.autocomplete)}
              autocorrect=${C(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${C(this.pattern)}
              enterkeyhint=${C(this.enterkeyhint)}
              inputmode=${C(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${r?x`
                  <button
                    part="clear-button"
                    class=${bt({input__clear:!0,"input__clear--visible":o})}
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <syn-icon name="x-circle-fill" library="system"></syn-icon>
                    </slot>
                  </button>
                `:""}
            ${this.passwordToggle&&!this.disabled?x`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?x`
                          <slot name="show-password-icon">
                            <syn-icon name="eye-slash" library="system"></syn-icon>
                          </slot>
                        `:x`
                          <slot name="hide-password-icon">
                            <syn-icon name="eye" library="system"></syn-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}}h.styles=ds;h.dependencies={"syn-icon":k};g([Xe(".input__control")],h.prototype,"input",2);g([me()],h.prototype,"hasFocus",2);g([f()],h.prototype,"title",2);g([f({reflect:!0})],h.prototype,"type",2);g([f()],h.prototype,"name",2);g([f()],h.prototype,"value",2);g([He()],h.prototype,"defaultValue",2);g([f({reflect:!0})],h.prototype,"size",2);g([f({type:Boolean,reflect:!0})],h.prototype,"filled",2);g([f({type:Boolean,reflect:!0})],h.prototype,"pill",2);g([f()],h.prototype,"label",2);g([f({attribute:"help-text"})],h.prototype,"helpText",2);g([f({type:Boolean})],h.prototype,"clearable",2);g([f({type:Boolean,reflect:!0})],h.prototype,"disabled",2);g([f()],h.prototype,"placeholder",2);g([f({type:Boolean,reflect:!0})],h.prototype,"readonly",2);g([f({attribute:"password-toggle",type:Boolean})],h.prototype,"passwordToggle",2);g([f({attribute:"password-visible",type:Boolean})],h.prototype,"passwordVisible",2);g([f({attribute:"no-spin-buttons",type:Boolean})],h.prototype,"noSpinButtons",2);g([f({reflect:!0})],h.prototype,"form",2);g([f({type:Boolean,reflect:!0})],h.prototype,"required",2);g([f()],h.prototype,"pattern",2);g([f({type:Number})],h.prototype,"minlength",2);g([f({type:Number})],h.prototype,"maxlength",2);g([f()],h.prototype,"min",2);g([f()],h.prototype,"max",2);g([f()],h.prototype,"step",2);g([f()],h.prototype,"autocapitalize",2);g([f()],h.prototype,"autocorrect",2);g([f()],h.prototype,"autocomplete",2);g([f({type:Boolean})],h.prototype,"autofocus",2);g([f()],h.prototype,"enterkeyhint",2);g([f({type:Boolean,converter:{fromAttribute:n=>!(!n||n==="false"),toAttribute:n=>n?"true":"false"}})],h.prototype,"spellcheck",2);g([f()],h.prototype,"inputmode",2);g([ft("disabled",{waitUntilFirstUpdate:!0})],h.prototype,"handleDisabledChange",1);g([ft("step",{waitUntilFirstUpdate:!0})],h.prototype,"handleStepChange",1);g([ft("value",{waitUntilFirstUpdate:!0})],h.prototype,"handleValueChange",1);h.define("syn-input");const fs={alert:{description:{value:"Alerts are used to display important messages inline or as toast notifications.",type:"text"},title:{value:"Alert",type:"text"}},"animated-image":{description:{value:"A component for displaying animated GIFs and WEBPs that play and pause on interaction.",type:"text"},title:{value:"Animated Image",type:"text"}},animation:{description:{value:"Animate elements declaratively with nearly 100 baked-in presets, or roll your own with custom keyframes.",type:"text"},title:{value:"Animation",type:"text"}},avatar:{description:{value:"Avatars are used to represent a person or object.",type:"text"},title:{value:"Avatar",type:"text"}},badge:{description:{value:"Badges are used to draw attention and display statuses or counts.",type:"text"},title:{value:"Badge",type:"text"}},"breadcrumb-item":{description:{value:"Breadcrumb Items are used inside breadcrumbs to represent different links.",type:"text"},title:{value:"Breadcrumb Item",type:"text"}},breadcrumb:{description:{value:"Breadcrumbs provide a group of links so users can easily navigate a website's hierarchy.",type:"text"},title:{value:"Breadcrumb",type:"text"}},"button-group":{description:{value:"Button groups can be used to group related buttons into sections.",type:"text"},title:{value:"Button Group",type:"text"}},button:{description:{value:"Buttons represent actions that are available to the user.",type:"text"},title:{value:"Button",type:"text"}},card:{description:{value:"Cards can be used to group related subjects in a container.",type:"text"},title:{value:"Card",type:"text"}},"carousel-item":{description:{value:"A carousel item represent a slide within a carousel.",type:"text"},title:{value:"Carousel Item",type:"text"}},carousel:{description:{value:"Carousels display an arbitrary number of content slides along a horizontal or vertical axis.",type:"text"},title:{value:"Carousel",type:"text"}},checkbox:{description:{value:"Checkboxes allow the user to toggle an option on or off.",type:"text"},title:{value:"Checkbox",type:"text"}},"color-picker":{description:{value:"Color pickers allow the user to select a color.",type:"text"},title:{value:"Color Picker",type:"text"}},"copy-button":{description:{value:"Copies data to the clipboard when the user clicks the button.",type:"text"},title:{value:"Copy Button",type:"text"}},details:{description:{value:"Details show a brief summary and expand to show additional content.",type:"text"},title:{value:"Details",type:"text"}},dialog:{description:{value:`Dialogs, sometimes called "modals", appear above the page and require the user's immediate attention.`,type:"text"},title:{value:"Dialog",type:"text"}},divider:{description:{value:"Dividers are used to visually separate or group elements.",type:"text"},title:{value:"Divider",type:"text"}},drawer:{description:{value:"Drawers slide in from a container to expose additional options and information.",type:"text"},title:{value:"Drawer",type:"text"}},dropdown:{description:{value:'Dropdowns expose additional content that "drops down" in a panel.',type:"text"},title:{value:"Dropdown",type:"text"}},"format-bytes":{description:{value:"Formats a number as a human readable bytes value.",type:"text"},title:{value:"Format Bytes",type:"text"}},"format-date":{description:{value:"Formats a date/time using the specified locale and options.",type:"text"},title:{value:"Format Date",type:"text"}},"format-number":{description:{value:"Formats a number using the specified locale and options.",type:"text"},title:{value:"Format Number",type:"text"}},"icon-button":{description:{value:"Icons buttons are simple, icon-only buttons that can be used for actions and in toolbars.",type:"text"},title:{value:"Icon Button",type:"text"}},icon:{description:{value:"Icons are symbols that can be used to represent various options within an application.",type:"text"},title:{value:"Icon",type:"text"}},"image-comparer":{description:{value:"Compare visual differences between similar photos with a sliding panel.",type:"text"},title:{value:"Image Comparer",type:"text"}},include:{description:{value:"Includes give you the power to embed external HTML files into the page.",type:"text"},title:{value:"Include",type:"text"}},input:{default:{description:{value:"Inputs collect data from the user.",type:"text"},title:{value:"Input",type:"text"}},label:{title:{value:"Labels",type:"text"},description:{value:"Use the label attribute to give the input an accessible label. For labels that contain HTML, use the label slot instead.",type:"text"}},"help-text":{title:{value:"help-text",type:"text"},description:{value:"Add descriptive help text to an input with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.",type:"text"}},placeholder:{title:{value:"Placeholder",type:"text"},description:{value:"Use the placeholder attribute to add a placeholder.",type:"text"}},clearable:{title:{value:"Clearable",type:"text"},description:{value:"Add the clearable attribute to add a clear button when the input has content.",type:"text"}},"password-toggle":{title:{value:"Toggle Password",type:"text"},description:{value:"Add the password-toggle attribute to add a toggle button that will show the password when activated.",type:"text"}},filled:{title:{value:"Filled Inputs",type:"text"},description:{value:"Add the filled attribute to draw a (pre-)filled input.",type:"text"}},disabled:{title:{value:"Disabled",type:"text"},description:{value:"Use the disabled attribute to disable an input.",type:"text"}},size:{title:{value:"Sizes",type:"text"},description:{value:"Use the size attribute to change an input's size.",type:"text"}},"prefix-suffix":{title:{value:"Prefix Suffix Icons",type:"text"},description:{value:"Use the prefix and suffix slots to add icons.",type:"text"}}},"menu-item":{description:{value:"Menu items provide options for the user to pick from in a menu.",type:"text"},title:{value:"Menu Item",type:"text"}},"menu-label":{description:{value:"Menu labels are used to describe a group of menu items.",type:"text"},title:{value:"Menu Label",type:"text"}},menu:{description:{value:"Menus provide a list of options for the user to choose from.",type:"text"},title:{value:"Menu",type:"text"}},"mutation-observer":{description:{value:"The Mutation Observer component offers a thin, declarative interface to the MutationObserver API.",type:"text"},title:{value:"Mutation Observer",type:"text"}},option:{description:{value:"Options define the selectable items within various form controls such as select.",type:"text"},title:{value:"Option",type:"text"}},popup:{description:{value:'Popup is a utility that lets you declaratively anchor "popup" containers to another element.',type:"text"},title:{value:"Popup",type:"text"}},"progress-bar":{description:{value:"Progress bars are used to show the status of an ongoing operation.",type:"text"},title:{value:"Progress Bar",type:"text"}},"progress-ring":{description:{value:"Progress rings are used to show the progress of a determinate operation in a circular fashion.",type:"text"},title:{value:"Progress Ring",type:"text"}},"qr-code":{description:{value:"Generates a QR code and renders it using the Canvas API.",type:"text"},title:{value:"QR Code",type:"text"}},"radio-button":{description:{value:"Radios buttons allow the user to select a single option from a group using a button-like control.",type:"text"},title:{value:"Radio Button",type:"text"}},"radio-group":{description:{value:"Radio groups are used to group multiple radios or radio buttons so they function as a single form control.",type:"text"},title:{value:"Radio Group",type:"text"}},radio:{description:{value:"Radios allow the user to select a single option from a group.",type:"text"},title:{value:"Radio",type:"text"}},range:{description:{value:"Ranges allow the user to select a single value within a given range using a slider.",type:"text"},title:{value:"Range",type:"text"}},rating:{description:{value:"Ratings give users a way to quickly view and provide feedback.",type:"text"},title:{value:"Rating",type:"text"}},"relative-time":{description:{value:"Outputs a localized time phrase relative to the current date and time.",type:"text"},title:{value:"Relative Time",type:"text"}},"resize-observer":{description:{value:"The Resize Observer component offers a thin, declarative interface to the ResizeObserver API.",type:"text"},title:{value:"Resize Observer",type:"text"}},select:{description:{value:"Selects allow you to choose items from a menu of predefined options.",type:"text"},title:{value:"Select",type:"text"}},skeleton:{description:{value:"Skeletons are used to provide a visual representation of where content will eventually be drawn.",type:"text"},title:{value:"Skeleton",type:"text"}},spinner:{description:{value:"Spinners are used to show the progress of an indeterminate operation.",type:"text"},title:{value:"Spinner",type:"text"}},"split-panel":{description:{value:"Split panels display two adjacent panels, allowing the user to reposition them.",type:"text"},title:{value:"Split Panel",type:"text"}},switch:{description:{value:"Switches allow the user to toggle an option on or off.",type:"text"},title:{value:"Switch",type:"text"}},"tab-group":{description:{value:"Tab groups organize content into a container that shows one section at a time.",type:"text"},title:{value:"Tab Group",type:"text"}},"tab-panel":{description:{value:"Tab panels are used inside tab groups to display tabbed content.",type:"text"},title:{value:"Tab Panel",type:"text"}},tab:{description:{value:"Tabs are used inside tab groups to represent and activate tab panels.",type:"text"},title:{value:"Tab",type:"text"}},tag:{description:{value:"Tags are used as labels to organize things or to indicate a selection.",type:"text"},title:{value:"Tag",type:"text"}},textarea:{description:{value:"Textareas collect data from the user and allow multiple lines of text.",type:"text"},title:{value:"Textarea",type:"text"}},tooltip:{description:{value:"Tooltips display additional information based on a specific action.",type:"text"},title:{value:"Tooltip",type:"text"}},"tree-item":{description:{value:"A tree item serves as a hierarchical node that lives inside a tree.",type:"text"},title:{value:"Tree Item",type:"text"}},tree:{description:{value:"Trees allow you to display a hierarchical list of selectable tree items. Items with children can be expanded and collapsed as desired by the user.",type:"text"},title:{value:"Tree",type:"text"}},"visually-hidden":{description:{value:"The visually hidden utility makes content accessible to assistive devices without displaying it on the screen.",type:"text"},title:{value:"Visually Hidden",type:"text"}}},gs={angular:{description:{value:"Tips for using Essential in your Angular app.",type:"text"},title:{value:"Angular",type:"text"}},react:{description:{value:"Tips for using Essential in your React app.",type:"text"},title:{value:"React",type:"text"}},"vue-2":{description:{value:"Tips for using Essential in your Vue 2 app.",type:"text"},title:{value:"Vue (version 2)",type:"text"}},vue:{description:{value:"Tips for using Essential in your Vue 3 app.",type:"text"},title:{value:"Vue",type:"text"}}},ys={accessibility:{description:{value:"Essential recognizes the need for all users to have undeterred access to the websites and applications that are created with it.",type:"text"},title:{value:"Accessibility Commitment",type:"text"}},changelog:{description:{value:"Changes to each version of the project are documented here.",type:"text"},title:{value:"Changelog",type:"text"}},community:{description:{value:"Essential has a growing community of designers and developers that are building amazing things with web components.",type:"text"},title:{value:"Community",type:"text"}},contributing:{description:{value:"Essential is an open source project, meaning everyone can use it and contribute to its development.",type:"text"},title:{value:"Contributing",type:"text"}}},vs={"border-radius":{description:{value:"Border radius tokens are used to give sharp edges a more subtle, rounded effect.",type:"text"},title:{value:"Border Radius",type:"text"}},color:{description:{value:"Color tokens help maintain consistent use of color throughout your app.",type:"text"},title:{value:"Color Tokens",type:"text"}},elevation:{description:{value:"Elevation tokens are used to give elements the appearance of being raised off the page.",type:"text"},title:{value:"Elevation",type:"text"}},more:{description:{value:"Additional design tokens can be found here.",type:"text"},title:{value:"More Design Tokens",type:"text"}},spacing:{description:{value:"Spacing tokens are used to provide consistent spacing between content in your app.",type:"text"},title:{value:"Spacing Tokens",type:"text"}},transition:{description:{value:"Transition tokens are used to provide consistent transitions throughout your app.",type:"text"},title:{value:"Transition Tokens",type:"text"}},typography:{description:{value:"Typography tokens are used to maintain a consistent set of font styles throughout your app.",type:"text"},title:{value:"Typography",type:"text"}},"z-index":{description:{value:"Z-indexes are used to stack components in a logical manner.",type:"text"},title:{value:"Z-Index Tokens",type:"text"}}},bs={"integrating-with-laravel":{description:{value:"This page explains how to integrate Essential with a Laravel app.",type:"text"},title:{value:"Integrating with Laravel",type:"text"}},"integrating-with-nextjs":{description:{value:"This page explains how to integrate Essential with a NextJS app.",type:"text"},title:{value:"Integrating with NextJS",type:"text"}},"integrating-with-rails":{description:{value:"This page explains how to integrate Essential with a Rails app.",type:"text"},title:{value:"Integrating with Rails",type:"text"}}},ye={components:fs,frameworks:gs,"getting-started":{customizing:{description:{value:"Learn how to customize Essential through parts and custom properties.",type:"text"},title:{value:"Customizing",type:"text"}},"form-controls":{description:{value:"Some things to note about Essential and forms.",type:"text"},title:{value:"Form Controls",type:"text"}},installation:{description:{value:"Choose the installation method that works best for you.",type:"text"},title:{value:"Installation",type:"text"}},localization:{description:{value:"Discover how to localize Essential with minimal effort.",type:"text"},title:{value:"Localization",type:"text"}},themes:{description:{value:"Everything you need to know about theming Essential.",type:"text"},title:{value:"Themes",type:"text"}},usage:{description:{value:"Learn more about using custom elements.",type:"text"},title:{value:"Usage",type:"text"}}},resources:ys,tokens:vs,tutorials:bs};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Nt;const wt=window,j=wt.trustedTypes,Yt=j?j.createPolicy("lit-html",{createHTML:n=>n}):void 0,Rt="$lit$",I=`lit$${(Math.random()+"").slice(9)}$`,ve="?"+I,ws=`<${ve}>`,V=document,$t=()=>V.createComment(""),dt=n=>n===null||typeof n!="object"&&typeof n!="function",be=Array.isArray,$s=n=>be(n)||typeof n?.[Symbol.iterator]=="function",Pt=`[ 	
\f\r]`,G=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Zt=/-->/g,Gt=/>/g,M=RegExp(`>|${Pt}(?:([^\\s"'>=/]+)(${Pt}*=${Pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Jt=/'/g,Xt=/"/g,we=/^(?:script|style|textarea|title)$/i,xs=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),_s=xs(1),ht=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),te=new WeakMap,B=V.createTreeWalker(V,129,null,!1);function $e(n,t){if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Yt!==void 0?Yt.createHTML(t):t}const As=(n,t)=>{const e=n.length-1,s=[];let i,r=t===2?"<svg>":"",o=G;for(let l=0;l<e;l++){const a=n[l];let p,u,m=-1,c=0;for(;c<a.length&&(o.lastIndex=c,u=o.exec(a),u!==null);)c=o.lastIndex,o===G?u[1]==="!--"?o=Zt:u[1]!==void 0?o=Gt:u[2]!==void 0?(we.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=M):u[3]!==void 0&&(o=M):o===M?u[0]===">"?(o=i??G,m=-1):u[1]===void 0?m=-2:(m=o.lastIndex-u[2].length,p=u[1],o=u[3]===void 0?M:u[3]==='"'?Xt:Jt):o===Xt||o===Jt?o=M:o===Zt||o===Gt?o=G:(o=M,i=void 0);const y=o===M&&n[l+1].startsWith("/>")?" ":"";r+=o===G?a+ws:m>=0?(s.push(p),a.slice(0,m)+Rt+a.slice(m)+I+y):a+I+(m===-2?(s.push(void 0),l):y)}return[$e(n,r+(n[e]||"<?>")+(t===2?"</svg>":"")),s]};class mt{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const l=t.length-1,a=this.parts,[p,u]=As(t,e);if(this.el=mt.createElement(p,s),B.currentNode=this.el.content,e===2){const m=this.el.content,c=m.firstChild;c.remove(),m.append(...c.childNodes)}for(;(i=B.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes()){const m=[];for(const c of i.getAttributeNames())if(c.endsWith(Rt)||c.startsWith(I)){const y=u[o++];if(m.push(c),y!==void 0){const S=i.getAttribute(y.toLowerCase()+Rt).split(I),T=/([.?@])?(.*)/.exec(y);a.push({type:1,index:r,name:T[2],strings:S,ctor:T[1]==="."?Ts:T[1]==="?"?Es:T[1]==="@"?ks:kt})}else a.push({type:6,index:r})}for(const c of m)i.removeAttribute(c)}if(we.test(i.tagName)){const m=i.textContent.split(I),c=m.length-1;if(c>0){i.textContent=j?j.emptyScript:"";for(let y=0;y<c;y++)i.append(m[y],$t()),B.nextNode(),a.push({type:2,index:++r});i.append(m[c],$t())}}}else if(i.nodeType===8)if(i.data===ve)a.push({type:2,index:r});else{let m=-1;for(;(m=i.data.indexOf(I,m+1))!==-1;)a.push({type:7,index:r}),m+=I.length-1}r++}}static createElement(t,e){const s=V.createElement("template");return s.innerHTML=t,s}}function q(n,t,e=n,s){var i,r,o,l;if(t===ht)return t;let a=s!==void 0?(i=e._$Co)===null||i===void 0?void 0:i[s]:e._$Cl;const p=dt(t)?void 0:t._$litDirective$;return a?.constructor!==p&&((r=a?._$AO)===null||r===void 0||r.call(a,!1),p===void 0?a=void 0:(a=new p(n),a._$AT(n,e,s)),s!==void 0?((o=(l=e)._$Co)!==null&&o!==void 0?o:l._$Co=[])[s]=a:e._$Cl=a),a!==void 0&&(t=q(n,a._$AS(n,t.values),a,s)),t}class Cs{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,r=((e=t?.creationScope)!==null&&e!==void 0?e:V).importNode(s,!0);B.currentNode=r;let o=B.nextNode(),l=0,a=0,p=i[0];for(;p!==void 0;){if(l===p.index){let u;p.type===2?u=new Et(o,o.nextSibling,this,t):p.type===1?u=new p.ctor(o,p.name,p.strings,this,t):p.type===6&&(u=new zs(o,this,t)),this._$AV.push(u),p=i[++a]}l!==p?.index&&(o=B.nextNode(),l++)}return B.currentNode=V,r}v(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Et{constructor(t,e,s,i){var r;this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=(r=i?.isConnected)===null||r===void 0||r}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),dt(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==ht&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):$s(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==$&&dt(this._$AH)?this._$AA.nextSibling.data=t:this.$(V.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=mt.createElement($e(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===r)this._$AH.v(s);else{const o=new Cs(r,this),l=o.u(this.options);o.v(s),this.$(l),this._$AH=o}}_$AC(t){let e=te.get(t.strings);return e===void 0&&te.set(t.strings,e=new mt(t)),e}T(t){be(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new Et(this.k($t()),this.k($t()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class kt{constructor(t,e,s,i,r){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(r===void 0)t=q(this,t,e,0),o=!dt(t)||t!==this._$AH&&t!==ht,o&&(this._$AH=t);else{const l=t;let a,p;for(t=r[0],a=0;a<r.length-1;a++)p=q(this,l[s+a],e,a),p===ht&&(p=this._$AH[a]),o||(o=!dt(p)||p!==this._$AH[a]),p===$?t=$:t!==$&&(t+=(p??"")+r[a+1]),this._$AH[a]=p}o&&!i&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ts extends kt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}}const Ss=j?j.emptyScript:"";class Es extends kt{constructor(){super(...arguments),this.type=4}j(t){t&&t!==$?this.element.setAttribute(this.name,Ss):this.element.removeAttribute(this.name)}}class ks extends kt{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){var s;if((t=(s=q(this,t,e,0))!==null&&s!==void 0?s:$)===ht)return;const i=this._$AH,r=t===$&&i!==$||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==$&&(i===$||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class zs{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}}const ee=wt.litHtmlPolyfillSupport;ee?.(mt,Et),((Nt=wt.litHtmlVersions)!==null&&Nt!==void 0?Nt:wt.litHtmlVersions=[]).push("2.8.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ls={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Is=n=>(...t)=>({_$litDirective$:n,values:t});let Ns=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ps=n=>n.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ct=(n,t)=>{var e,s;const i=n._$AN;if(i===void 0)return!1;for(const r of i)(s=(e=r)._$AO)===null||s===void 0||s.call(e,t,!1),ct(r,t);return!0},xt=n=>{let t,e;do{if((t=n._$AM)===void 0)break;e=t._$AN,e.delete(n),n=t}while(e?.size===0)},xe=n=>{for(let t;t=n._$AM;n=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(n))break;e.add(n),Ds(t)}};function Ms(n){this._$AN!==void 0?(xt(this),this._$AM=n,xe(this)):this._$AM=n}function Os(n,t=!1,e=0){const s=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(t)if(Array.isArray(s))for(let r=e;r<s.length;r++)ct(s[r],!1),xt(s[r]);else s!=null&&(ct(s,!1),xt(s));else ct(this,n)}const Ds=n=>{var t,e,s,i;n.type==Ls.CHILD&&((t=(s=n)._$AP)!==null&&t!==void 0||(s._$AP=Os),(e=(i=n)._$AQ)!==null&&e!==void 0||(i._$AQ=Ms))};class Bs extends Ns{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),xe(this),this.isConnected=t._$AU}_$AO(t,e=!0){var s,i;t!==this.isConnected&&(this.isConnected=t,t?(s=this.reconnected)===null||s===void 0||s.call(this):(i=this.disconnected)===null||i===void 0||i.call(this)),e&&(ct(this,t),xt(this))}setValue(t){if(Ps(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}class Rs extends Bs{constructor(){super(...arguments),this.prevData={}}render(t){return $}update(t,[e]){var s;this.element!==t.element&&(this.element=t.element),this.host=((s=t.options)===null||s===void 0?void 0:s.host)||this.element,this.apply(e),this.groom(e),this.prevData={...e}}apply(t){if(!t)return;const{prevData:e,element:s}=this;for(const i in t){const r=t[i];r!==e[i]&&(s[i]=r)}}groom(t){const{prevData:e,element:s}=this;if(e)for(const i in e)(!t||!(i in t)&&s[i]===e[i])&&(s[i]=void 0)}}class Vs extends Rs{constructor(){super(...arguments),this.eventData={}}apply(t){if(t)for(const e in t){const s=t[e];s!==this.eventData[e]&&this.applyEvent(e,s)}}applyEvent(t,e){const{prevData:s,element:i}=this;this.eventData[t]=e,s[t]&&i.removeEventListener(t,this,e),i.addEventListener(t,this,e)}groom(t){const{prevData:e,element:s}=this;if(e)for(const i in e)(!t||!(i in t)&&s[i]===e[i])&&this.groomEvent(i,e[i])}groomEvent(t,e){const{element:s}=this;delete this.eventData[t],s.removeEventListener(t,this,e)}handleEvent(t){const e=this.eventData[t.type];typeof e=="function"?e.call(this.host,t):e.handleEvent(t)}disconnected(){const{eventData:t,element:e}=this;for(const s in t){const i=s.slice(1),r=t[s];e.removeEventListener(i,this,r)}}reconnected(){const{eventData:t,element:e}=this;for(const s in t){const i=s.slice(1),r=t[s];e.addEventListener(i,this,r)}}}class Us extends Vs{apply(t){if(!t)return;const{prevData:e,element:s}=this;for(const i in t){const r=t[i];if(r===e[i])continue;const o=i.slice(1);switch(i[0]){case"@":this.eventData[o]=r,this.applyEvent(o,r);break;case".":s[o]=r;break;case"?":r?s.setAttribute(o,""):s.removeAttribute(o);break;default:r!=null?s.setAttribute(i,String(r)):s.removeAttribute(i);break}}}groom(t){const{prevData:e,element:s}=this;if(e)for(const i in e){const r=i.slice(1);if(!t||!(i in t)&&s[r]===e[i])switch(i[0]){case"@":this.groomEvent(r,e[i]);break;case".":s[r]=void 0;break;case"?":s.removeAttribute(r);break;default:s.removeAttribute(i);break}}}}const Hs=Is(Us);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _e=Symbol.for(""),Fs=n=>{if(n?.r===_e)return n?._$litStatic$},R=n=>({_$litStatic$:n,r:_e}),se=new Map,js=n=>(t,...e)=>{const s=e.length;let i,r;const o=[],l=[];let a,p=0,u=!1;for(;p<s;){for(a=t[p];p<s&&(r=e[p],(i=Fs(r))!==void 0);)a+=i+t[++p],u=!0;p!==s&&l.push(r),o.push(a),p++}if(p===s&&o.push(t[s]),u){const m=o.join("$$lit$$");(t=se.get(m))===void 0&&(o.raw=o,se.set(m,t=o)),e=l}return n(t,...e)},Vt=js(_s);function qs(n,t){return t.modules?.find(s=>s.declarations?.some(i=>i.tagName===n))?.declarations.find(s=>s.kind==="class"&&s.tagName===n)}function Ut(n,t){const e={};return n?.members?.forEach(s=>{if(s.kind!=="field"||(s.attribute&&(e[s.attribute]={name:s.attribute,table:{disable:!0}}),e[s.name]={name:s.name,table:{disable:!0}},s.privacy==="private"||s.privacy==="protected"||s.static))return;const i=Ee(s?.type?.text),r=s.attribute?`${s.attribute}-attr`:`${s.name}-prop`,o=_t(s.default);e[r]={name:s.attribute||s.name,description:Ht(s.description,t?.showArgRef?r:"",s.deprecated),defaultValue:o==="''"?"":o,control:{type:Se(i)},table:{category:s.attribute?"attributes":"properties",defaultValue:{summary:o},type:{summary:s?.type?.text}}};const l=i?.split("|");l&&l?.length>1&&(e[r].options=l.map(a=>_t(a)))}),e}function Ws(n){const t={};return n?.members?.forEach(e=>{if(e.kind!=="field"||(t[e.name]={name:e.name,table:{disable:!0}},e.privacy==="private"||e.privacy==="protected"||e.static))return;const s=Ee(e?.type?.text),i=`${e.name}`,r=_t(e.default);t[i]={name:e.name,description:e.description,defaultValue:r==="false"?!1:r==="''"?"":r,control:{type:Se(s)},table:{category:"properties",defaultValue:{summary:r},type:{summary:e?.type?.text}}};const o=s?.split("|");o&&o?.length>1&&(t[i].options=o.map(l=>_t(l)))}),t}function Qs(n){const t={};return n?.events?.forEach(e=>{const s=Ks(e.name);t[s]={name:s,description:e.description,table:{category:"events"}}}),t}function Ae(n){const t={};return n?.cssProperties?.forEach(e=>{t[e.name]={name:e.name,description:e.description,defaultValue:e.default,control:{type:"text"}}}),t}function Ce(n,t){const e={};return n?.cssParts?.forEach(s=>{e[s.name]={name:s.name,table:{disable:!0}},e[`${s.name}-part`]={name:s.name,description:Ht(s.description,t?.showArgRef?`${s.name}-part`:""),control:"text",defaultValue:`${n?.tagName}::part(${s.name}) {
}`,table:{category:"css shadow parts"}}}),e}function Te(n,t){const e={};return n?.slots?.forEach(s=>{e[s.name]={name:s.name,table:{disable:!0}};const i=s.name||"default";e[`${i}-slot`]={name:i,description:Ht(s.description,t?.showArgRef?`${i}-part`:""),control:"text",defaultValue:i==="default"?"":`<span slot="${i}"></span>`,table:{category:"slots"}}}),e}function Se(n){if(!n)return"text";if(n.includes("boolean"))return"boolean";if(n.includes("number")&&!n.includes("string"))return"number";if(n.includes("Date"))return"date";const t=n.split("|");return t.length>1?t.length<3?"inline-radio":t.length<=4?"radio":"select":"text"}function Ee(n){return n?n.replace(" | undefined","").replace(" | null",""):""}function _t(n){return n?.trim().replace(/^["'](.+(?=["']$))["']$/,"$1")}function Ht(n,t,e){let s="";return e&&(s+=`\`@deprecated\` ${e}`),n&&(s+=s?`


`:"",s+=n),t&&(s+=s?`

`:"",s+=`arg ref - \`${t}\``),s}const Ks=n=>`on${Zs(Ys(n))}`;function Ys(n=""){return n.split("-").map((s,i)=>i?s.charAt(0).toUpperCase()+s.slice(1).toLowerCase():s.toLowerCase()).join("")}function Zs(n){return n.charAt(0).toUpperCase()+n.slice(1)}const{useArgs:Gs}=__STORYBOOK_MODULE_CLIENT_API__;let At,ne;var oe;function Js(n,t,e){if(!t)return Vt`<${R(n.tagName)}></${R(n.tagName)}>`;n?.tagName!==ne&&(At=void 0,ne=n?.tagName);const s=Xs(n,t),i=sn(n,t);nn(n);const r=tn(n,t);return Vt(oe||(oe=jt(["",`
<`," "," ",">","","</",`>

<script>
  component = document.querySelector('`,`');
<\/script>
`])),ke(n,t),R(n.tagName),Hs(s),r,i,e||"",R(n.tagName),n.tagName)}function ke(n,t){const e=en(n,t);return`${e}`?.replaceAll(/\s+/g,"")!=""?Vt`<style>${e}</style>
`:""}function Xs(n,t){const e=Ut(n),s={};return Object.keys(e).filter(i=>i.endsWith("-attr")).forEach(i=>{const r=e[i],o=e[i].name,l=t[i];if(l){const a=r.control.type==="boolean"?`?${o}`:o;s[a]=l==="false"?!1:l}}),Object.keys(t).filter(i=>!i.endsWith("-attr")&&!i.endsWith("-part")&&!i.endsWith("-slot")).forEach(i=>{if(i.startsWith("on"))return;const r=t[i];r&&(s[`.${i}`]=r)}),s}function tn(n,t){const e=Ae(n);return Object.keys(e).some(r=>!!t[r])?R(`style="${Object.keys(e).map(r=>{const o=e[r].name,l=t[r];return l?`${o}: ${l||""}`:null}).filter(r=>r!==null).join(";")}"`):void 0}function en(n,t){const e=Ce(n);return Object.keys(e).some(r=>!!t[r])?R(`${Object.keys(e).filter(r=>r.endsWith("-part")).map(r=>{const o=e[r].name,l=t[r];return l?.replaceAll(/\s+/g,"")!==`${n?.tagName}::part(${o}){}`?`
${l}`:null}).filter(r=>r!==null).join(`
`)}
`):void 0}function sn(n,t){const e=Te(n);return R(`${Object.keys(e).filter(i=>i.endsWith("-slot")).map(i=>{const r=e[i].name,o=t[i];return r==="default"?o||null:o!==`<span slot="${r}"></span>`?o:null}).filter(i=>i!==null).join("")}`)}function nn(n){rn(n),setTimeout(()=>{const t=document.querySelector(n.tagName);At?.observe(t,{attributes:!0})})}function rn(n){let t=!1;const e=Gs()[1],s=Ut(n);At||(At=new MutationObserver(i=>{i.forEach(r=>{if(r.type!=="attributes"||r.attributeName==="class"&&t)return;t=!0;const o=s[`${r.attributeName}-attr`];o?.control==="boolean"||o?.control?.type==="boolean"?e({[`${r.attributeName}-attr`]:r.target?.hasAttribute(r.attributeName||"")}):e({[`${r.attributeName}-attr`]:r.target.getAttribute(r.attributeName||"")}),t=!1})}))}function ze(n,t){const e=window.__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__;if(!e)throw new Error(`Custom Elements Manifest not found. Be sure to follow the pre-install steps in this guide:
https://www.npmjs.com/package/wc-storybook-helpers#before-you-install`);const s=qs(n,e),i=s?.events?.map(r=>r.name)||[];return{argTypes:Le(s,{showArgRef:t?.showArgRef}),reactArgTypes:an(s),args:on(s),events:i,styleTemplate:r=>ke(s,r),template:(r,o)=>Js(s,r,o),manifest:s}}function Le(n,t){return{...Ut(n,{showArgRef:t?.showArgRef}),...Te(n,{showArgRef:t?.showArgRef}),...Ae(n),...Ce(n,{showArgRef:t?.showArgRef})}}function on(n){return Object.entries(Le(n)).filter(([,e])=>e?.control).map(([e,s])=>({[e]:s.defaultValue||""})).reduce((e,s)=>({...e,...s}),{})}function an(n){return{...Ws(n),...Qs(n)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ie=Symbol.for(""),ln=n=>{if(n?.r===Ie)return n?._$litStatic$},L=n=>({_$litStatic$:n,r:Ie}),ie=new Map,pn=n=>(t,...e)=>{const s=e.length;let i,r;const o=[],l=[];let a,p=0,u=!1;for(;p<s;){for(a=t[p];p<s&&(r=e[p],(i=ln(r))!==void 0);)a+=i+t[++p],u=!0;p!==s&&l.push(r),o.push(a),p++}if(p===s&&o.push(t[s]),u){const m=o.join("$$lit$$");(t=ie.get(m))===void 0&&(o.raw=o,ie.set(m,t=o)),e=l}return n(t,...e)},_=pn(x),re=String.raw`[A-Za-z][^/\s>]*`,un=String.raw`(?<!\w)"(?:\\[^<>\n]|[^\\"<>\n])*"(?!\w)`,cn=String.raw`(?<!\w)'(?:\\[^<>\n]|[^\\'<>\n])*'(?!\w)`,Ne=String.raw`${un}|${cn}`,dn=String.raw`"(?<quotedAttrValue>[^"]*)"`,hn=String.raw`'(?<singleQuotedAttrValue>[^']*)'`,mn=String.raw`(?<unquotedAttrValue>[^\s"'\`=<>]+)`,fn=String.raw`[^=\s>/"']+(?=[=>\s]|$)`,gn=String.raw`${dn}|${hn}|${mn}`,yn=String.raw`(?<attrName>${fn})(?:\s*=\s*(?:${gn}))?`,vn=String.raw`${Ne}|[^\s>]*[^\s>/]|[^\s>]*/(?!\s*>)`,Pe=String.raw`(?<attrSpace>\s*)(?:${yn}|(?<attrText>${vn}))`,bn={comment:String.raw`<!--.*?-->`,dtd:String.raw`<![^>]+>`,startTag:String.raw`<(?<startTagName>${re})(?<attrs>(?:${Pe})*)\s*(?<closingSlash>/?)\s*>`,endTag:String.raw`</(?<endTagName>${re})\s*>`,space:String.raw`\s+`,text:String.raw`[^<\s"']+|${Ne}|['"]`,wildcard:String.raw`.`},wn=Object.entries(bn).map(([n,t])=>`(?<${n}>${t})`).join("|");function*$n(n,t){let e,{lastIndex:s}=n;for(;e=n.exec(t);)yield e,{lastIndex:s}=n;if(s!=t.length)throw new Error("Failed to parse string")}const xn=new Set(["area","base","basefont","bgsound","br","col","command","embed","frame","hr","image","img","input","keygen","link","meta","param","source","track","wbr"]);function Ct(n,t="  ",e=80){const s=new RegExp(wn,"gys"),i=new RegExp(Pe,"gy"),r=[];let o=null,l=0,a=!1,p=0;const u=(...c)=>{for(const y of c){if(!o)if(y==`
`)a=!0;else{const T=y.indexOf(`
`),w=T==-1?y.length:T;p+w>e&&/^[ \t]+$/.test(r[r.length-1])&&(r.pop(),u(`
`)),a&&(a=!1,u(t.repeat(l)))}const S=y.lastIndexOf(`
`);S==-1?p+=y.length:p=y.length-S-1,r.push(y)}};for(const c of $n(s,n)){if(Ct.__strict&&c.groups.wildcard)throw new Error("Unexpected wildcard");if(c.groups.endTag){const y=c.groups.endTagName.toLowerCase();y==o&&(o=null),o||(--l,u(`</${y}>`))}if(o)u(c[0]);else if(c.groups.space)u(...c[0].match(/\n/g)?.slice(0,2)??[" "]);else if(c.groups.comment||c.groups.dtd||c.groups.text||c.groups.wildcard)u(c[0]);else if(c.groups.startTag){const y=c.groups.startTagName.toLowerCase();if(u(`<${y}`),++l,c.groups.attrs){let{lastIndex:T}=i,w,N;for(;w=i.exec(c.groups.attrs);){if({lastIndex:T}=i,Ct.__strict&&w.groups.attrText)throw new Error("Unexpected attr text");w.groups.attrText?(w.groups.attrSpace&&u(/\n/.test(w.groups.attrSpace)?`
`:" "),u(w.groups.attrText)):((w.groups.attrSpace||!N?.groups.attrText)&&u(/\n/.test(w.groups.attrSpace)?`
`:" "),u(`${w.groups.attrName}${w.groups.quotedAttrValue?`="${w.groups.quotedAttrValue}"`:w.groups.singleQuotedAttrValue?`='${w.groups.singleQuotedAttrValue}'`:w.groups.unquotedAttrValue?`=${w.groups.unquotedAttrValue}`:""}`)),N=w}if(T!=c.groups.attrs.length)throw new Error("Failed to parse attributes")}const S=!!c.groups.closingSlash;u(S?" />":">"),S||xn.has(y)?--l:["pre","script","style"].includes(y)&&(o=y)}}let m=!1;for(;/^\s+$/.test(r[r.length-1]);){const c=r.pop();/\n/.test(c)&&(m=!0)}return m&&r.push(`
`),r.join("")}Ct.default=Ct;async function _n(){await fetch("./custom-elements.json");const t=await(await fetch("./custom-elements.json")).json();Ue(t),console.log("Custom elements manifest loaded")}await _n();const Tt=n=>{const{args:t,events:e,argTypes:s,manifest:i}=ze(n),r=()=>({status:{styles:{backgroundColor:i?.status==="stable"?"#43b02a":"rgb(255, 131, 0)",borderColor:"white",color:"white"},title:`Status: ${i?.status}`},since:{styles:{backgroundColor:"#333",borderColor:"#fff",color:"#fff"},title:`Since: ${i?.since}`}});return{args:t,argTypes:(()=>{const l=()=>{const p=i?.members?.filter(c=>c.kind==="field"),u=new Set(i?.attributes?.map(c=>c.fieldName));return p?.filter(c=>!u.has(c.name)&&c?.privacy!=="private")?.map(c=>c.name)};return{...s,...i?.events?.reduce((p,u)=>(p[u.name]={...u,control:!1,table:{category:"Events"}},p),{}),...i?.members?.filter(p=>p.kind==="method"&&p?.privacy!=="private").reduce((p,u)=>(p[u.name]={...u,control:!1,table:{category:"Methods"}},p),{}),...l()?.reduce((p,u)=>(p[`${u}-prop`]={table:{disable:!0}},p[u]={control:!1,table:{category:"Properties"}},p),{})}})(),parameters:{badges:["status","since"],badgesConfig:r(),actions:{handles:e}}}},F=n=>({getSuffixFromType:t=>({attribute:"-attr",property:"-prop",slot:"-slot",cssPart:"-part",cssProperty:""})[t],getValuesFromAttribute:t=>{t.endsWith("-attr")||(t=`${t}-attr`);const{argTypes:e}=Tt(n);return e[t]?.control?.type==="boolean"?[!0,!1]:e[t].options},getValuesFromAttributes:t=>t?.map(e=>(e.endsWith("-attr")||(e=`${e}-attr`),{name:e,values:F(n).getValuesFromAttribute(e)})),overrideArgs:(t,e)=>{const s=e||Tt(n).args,i=Array.isArray(t)?t:[t];for(const r of i){const o=F(n).getSuffixFromType(r.type);s[`${r.name}${o}`]=r.value}return s}}),An=n=>{const{template:t,manifest:e}=ze(n),{args:s}=Tt(n),{getValuesFromAttribute:i}=F(n);return{generateTemplate:({axis:o,constants:l=[],options:a,args:p=s})=>{const u=d=>{if(!e?.style)return t(d);const v=Object.keys(d).filter(b=>b.endsWith("-attr")).reduce((b,E)=>{const A=E.substring(0,E.length-5);return d[E]===!0?b[A]=!0:d[E]==="false"||d[E]==="(default)"?b[A]=!1:d[E]&&(A.endsWith("...")?b[A.replace("...",d[E])]=!0:b[d[E]]=!0),b},{}),z=d["default-slot"]||"",P={[n]:!0,...v},Q=Object.keys(P).filter(b=>P[b]).join(" ");if(a?.templateContent){const b=a.templateContent.replaceAll("%SLOT%",z).replaceAll("%CLASSES%",Q);return L(b)}return _`<div class=${bt(P)}>${L(z)}</div>`},m=(Array.isArray(l)?l:[l]).reduce((d,v)=>({...d,[`${v.name}${F(n).getSuffixFromType(v.type)}`]:v.value}),{});if(!o?.x&&!o?.y&&!a?.title)return _`${u({...p,...m})}`;const c=d=>d?Array.isArray(d)?d.map(v=>({...v,values:v.values||i(v.name)})):[{...d,values:d.values||i(d.name)}]:[{}],y=c(o?.x),S=c(o?.y),w=(Array.isArray(l)?l:[l]).find(d=>d.type==="template")?.value,N=`uuid-${crypto.randomUUID()}`;return _`
      <style>
        table:not(:first-of-type).story-template {
          margin-top: 72px;
        }
        .story-template th {
          text-align: left;
        }
        .story-template td {
          text-align: center;
        }
        .story-template th,
        .story-template td {
          padding: 16px;
          font-size: 12px;
        }
        td.template {
          font-size: 16px;
        }
        .story-template thead tr th {
          text-align: center;
          border-bottom: 1px solid #e0e0e0;
        }
        .story-template thead th.title {
          background: #e0e0e0;
          text-align: left;
          font-size: 14px;
        }
        .story-template tbody tr th {
          font-weight: normal;
          text-align: center;
        }

        .story-template tbody tr:first-of-type th:first-of-type {
          width: 32px;
        }

        .story-template tbody tr th[rowspan] {
          text-align: center;
          padding-left: 0;
          border-right: 1px solid #e0e0e0;
          font-weight: bold;
        }

        .story-template tbody tr th span {
          -ms-writing-mode: tb-rl;
          -webkit-writing-mode: vertical-rl;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          white-space: nowrap;
        }

        ${a?.templateBackground&&`
          .${N}.story-template tbody tr.template-row td.template {
            background: ${a?.templateBackground};
          }
        `}

        ${a?.templateBackgrounds?.colors.map((d,v)=>{const z=P=>`${a?.templateBackgrounds?.colors.length}n + ${P+1}`;return a?.templateBackgrounds?.alternate==="y"?`
                .${N}.story-template tbody tr.template-row:nth-of-type(${z(v)}) td.template {
                  background: ${d};
                }
              `:`
                .${N}.story-template tbody tr.template-row td.template:nth-of-type(${z(v)}) {
                  background: ${d};
                }
              `})}
      </style>
      ${y.map(d=>_` ${S.map(v=>{let z=!0;const P=y.length>1||d.values,Q=(d&&v||S.length>1)&&v?.values;return _`
            <table class="story-template ${N} ${a?.classes}">
              <thead>
                ${a?.title&&_`<tr>
                  <th class="title" colspan=${(d.values?.length||0)+3}><code>${a?.title}</code></th>
                </tr>`}
                ${d&&d.values&&_`
                  <tr>
                    ${Q?_`<td></td>`:""} <td></td>
                    ${P&&_`<th colspan=${d.values?.length||0}><code>${d.title||d.name}</code></th>`}
                    </tr>
                  </tr>
                  ${_`
                    <tr>
                      ${Q?_`<td></td>`:""}
                      <td></td>
                      ${d?.values?.map(b=>_`<td><code>${b.title||b}</code></td>`)}
                    </tr>
                  `}
                `}
              </thead>
              <tbody>
                ${(v?.values||[""]).map(b=>{const E=_`
                    <tr class="template-row">
                      ${z&&Q?_`<th rowspan="${v?.values?.length}">
                            <span><code>${v.title||v.name}</code></span>
                          </th>`:""}
                      <th><code>${b.title||b}</code></th>
                      ${(d?.values||[""]).map(A=>_`
                          <td class="template template-x-${d?.values?.indexOf(A)||1} template-y-${v?.values?.indexOf(b.value||b)||1}">
                          ${d.type==="template"&&L((A.value||A).split("%TEMPLATE%")[0]||"")||""}
                          ${v.type==="template"&&L((b.value||b).split("%TEMPLATE%")[0]||"")||""}
                          ${w&&L(w.split("%TEMPLATE%")[0]||"")||""}
                            ${u({...p,...m,...d&&d.type!=="template"&&{[`${d.name}${F(n).getSuffixFromType(d.type)}`]:A.hasOwnProperty("value")?A.value:A},...v&&v.type!=="template"&&{[`${v.name}${F(n).getSuffixFromType(v.type)}`]:b.hasOwnProperty("value")?b.value:b}})}
                         ${v.type==="template"&&L((b.value||b).split("%TEMPLATE%")[1]||"")||""}
                         ${d.type==="template"&&L((A.value||A).split("%TEMPLATE%")[1]||"")||""}
                          ${w&&L(w.split("%TEMPLATE%")[1]||"")||""}</td></div>
                        `)}
                    </tr>
                  `;return z=!1,E})}
              </tbody>
            </table>
          `})}`)}
    `}}},{args:Cn,argTypes:Tn}=Tt("syn-input"),{generateTemplate:Sn}=An("syn-input"),Pn={component:"input",args:Cn,argTypes:Tn,title:"Components/syn-input",parameters:{docs:{description:{component:ye.components.input.description.value}}}},vt={render:n=>Sn({args:n}),parameters:{docs:{description:{story:ye.components.input.description.value}}}},J={render:()=>x`<syn-input label="What is your name?"></syn-input>`},X={render:()=>x`<syn-input label="Nickname" help-text="What would you like people to call you?"></syn-input>`},tt={render:()=>x`<syn-input placeholder="Type something"></syn-input>`},et={render:()=>x`<syn-input placeholder="Clearable" clearable></syn-input>`},st={render:()=>x`<syn-input type="password" placeholder="Password Toggle" password-toggle></syn-input>`},nt={render:()=>x`<syn-input placeholder="Type something" filled></syn-input>`},it={render:()=>x`<syn-input placeholder="Disabled" disabled></syn-input>`},rt={render:()=>x`<syn-input placeholder="Small" size="small"></syn-input>
<br />
<syn-input placeholder="Medium" size="medium"></syn-input>
<br />
<syn-input placeholder="Large" size="large"></syn-input>`},ot={render:()=>x`<syn-input placeholder="Small" size="small" pill></syn-input>
<br />
<syn-input placeholder="Medium" size="medium" pill></syn-input>
<br />
<syn-input placeholder="Large" size="large" pill></syn-input>`},at={render:()=>x`<syn-input type="email" placeholder="Email"></syn-input>
<br />
<syn-input type="number" placeholder="Number"></syn-input>
<br />
<syn-input type="date" placeholder="Date"></syn-input>`},lt={render:()=>x`<syn-input placeholder="Small" size="small">
  <syn-icon name="house" slot="prefix"></syn-icon>
  <syn-icon name="chat" slot="suffix"></syn-icon>
</syn-input>
<br />
<syn-input placeholder="Medium" size="medium">
  <syn-icon name="house" slot="prefix"></syn-icon>
  <syn-icon name="chat" slot="suffix"></syn-icon>
</syn-input>
<br />
<syn-input placeholder="Large" size="large">
  <syn-icon name="house" slot="prefix"></syn-icon>
  <syn-icon name="chat" slot="suffix"></syn-icon>
</syn-input>`},pt={render:()=>x`<syn-input class="label-on-left" label="Name" help-text="Enter your name"></syn-input>
<syn-input class="label-on-left" label="Email" type="email" help-text="Enter your email"></syn-input>
<syn-textarea class="label-on-left" label="Bio" help-text="Tell us something about yourself"></syn-textarea>

<style>
  .label-on-left {
    --label-width: 3.75rem;
    --gap-width: 1rem;
  }

  .label-on-left + .label-on-left {
    margin-top: var(--syn-spacing-medium);
  }

  .label-on-left::part(form-control) {
    display: grid;
    grid: auto / var(--label-width) 1fr;
    gap: var(--syn-spacing-3x-small) var(--gap-width);
    align-items: center;
  }

  .label-on-left::part(form-control-label) {
    text-align: right;
  }

  .label-on-left::part(form-control-help-text) {
    grid-column-start: 2;
  }
</style>`};vt.parameters={...vt.parameters,docs:{...vt.parameters?.docs,source:{originalSource:`{
  render: (args: any) => {
    return generateTemplate({
      args
    });
  },
  parameters: {
    docs: {
      description: {
        story: docsTokens.components['input'].description.value
      }
    }
  }
} as Story`,...vt.parameters?.docs?.source}}};J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:'{\n  render: () => html`<syn-input label="What is your name?"></syn-input>`\n}',...J.parameters?.docs?.source},description:{story:"Use the label attribute to give the input an accessible label. For labels that contain HTML, use the label slot instead.",...J.parameters?.docs?.description}}};X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:'{\n  render: () => html`<syn-input label="Nickname" help-text="What would you like people to call you?"></syn-input>`\n}',...X.parameters?.docs?.source},description:{story:"Add descriptive help text to an input with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.",...X.parameters?.docs?.description}}};tt.parameters={...tt.parameters,docs:{...tt.parameters?.docs,source:{originalSource:'{\n  render: () => html`<syn-input placeholder="Type something"></syn-input>`\n}',...tt.parameters?.docs?.source},description:{story:"Use the placeholder attribute to add a placeholder.",...tt.parameters?.docs?.description}}};et.parameters={...et.parameters,docs:{...et.parameters?.docs,source:{originalSource:'{\n  render: () => html`<syn-input placeholder="Clearable" clearable></syn-input>`\n}',...et.parameters?.docs?.source},description:{story:"Add the clearable attribute to add a clear button when the input has content.",...et.parameters?.docs?.description}}};st.parameters={...st.parameters,docs:{...st.parameters?.docs,source:{originalSource:'{\n  render: () => html`<syn-input type="password" placeholder="Password Toggle" password-toggle></syn-input>`\n}',...st.parameters?.docs?.source},description:{story:"Add the password-toggle attribute to add a toggle button that will show the password when activated.",...st.parameters?.docs?.description}}};nt.parameters={...nt.parameters,docs:{...nt.parameters?.docs,source:{originalSource:'{\n  render: () => html`<syn-input placeholder="Type something" filled></syn-input>`\n}',...nt.parameters?.docs?.source},description:{story:"Add the filled attribute to draw a filled input.",...nt.parameters?.docs?.description}}};it.parameters={...it.parameters,docs:{...it.parameters?.docs,source:{originalSource:'{\n  render: () => html`<syn-input placeholder="Disabled" disabled></syn-input>`\n}',...it.parameters?.docs?.source},description:{story:"Use the disabled attribute to disable an input.",...it.parameters?.docs?.description}}};rt.parameters={...rt.parameters,docs:{...rt.parameters?.docs,source:{originalSource:`{
  render: () => html\`<syn-input placeholder="Small" size="small"></syn-input>
<br />
<syn-input placeholder="Medium" size="medium"></syn-input>
<br />
<syn-input placeholder="Large" size="large"></syn-input>\`
}`,...rt.parameters?.docs?.source},description:{story:"Use the size attribute to change an input's size.",...rt.parameters?.docs?.description}}};ot.parameters={...ot.parameters,docs:{...ot.parameters?.docs,source:{originalSource:`{
  render: () => html\`<syn-input placeholder="Small" size="small" pill></syn-input>
<br />
<syn-input placeholder="Medium" size="medium" pill></syn-input>
<br />
<syn-input placeholder="Large" size="large" pill></syn-input>\`
}`,...ot.parameters?.docs?.source},description:{story:"Use the pill attribute to give inputs rounded edges.",...ot.parameters?.docs?.description}}};at.parameters={...at.parameters,docs:{...at.parameters?.docs,source:{originalSource:`{
  render: () => html\`<syn-input type="email" placeholder="Email"></syn-input>
<br />
<syn-input type="number" placeholder="Number"></syn-input>
<br />
<syn-input type="date" placeholder="Date"></syn-input>\`
}`,...at.parameters?.docs?.source},description:{story:"The type attribute controls the type of input the browser renders.",...at.parameters?.docs?.description}}};lt.parameters={...lt.parameters,docs:{...lt.parameters?.docs,source:{originalSource:`{
  render: () => html\`<syn-input placeholder="Small" size="small">
  <syn-icon name="house" slot="prefix"></syn-icon>
  <syn-icon name="chat" slot="suffix"></syn-icon>
</syn-input>
<br />
<syn-input placeholder="Medium" size="medium">
  <syn-icon name="house" slot="prefix"></syn-icon>
  <syn-icon name="chat" slot="suffix"></syn-icon>
</syn-input>
<br />
<syn-input placeholder="Large" size="large">
  <syn-icon name="house" slot="prefix"></syn-icon>
  <syn-icon name="chat" slot="suffix"></syn-icon>
</syn-input>\`
}`,...lt.parameters?.docs?.source},description:{story:"Use the prefix and suffix slots to add icons.",...lt.parameters?.docs?.description}}};pt.parameters={...pt.parameters,docs:{...pt.parameters?.docs,source:{originalSource:`{
  render: () => html\`<syn-input class="label-on-left" label="Name" help-text="Enter your name"></syn-input>
<syn-input class="label-on-left" label="Email" type="email" help-text="Enter your email"></syn-input>
<syn-textarea class="label-on-left" label="Bio" help-text="Tell us something about yourself"></syn-textarea>

<style>
  .label-on-left {
    --label-width: 3.75rem;
    --gap-width: 1rem;
  }

  .label-on-left + .label-on-left {
    margin-top: var(--syn-spacing-medium);
  }

  .label-on-left::part(form-control) {
    display: grid;
    grid: auto / var(--label-width) 1fr;
    gap: var(--syn-spacing-3x-small) var(--gap-width);
    align-items: center;
  }

  .label-on-left::part(form-control-label) {
    text-align: right;
  }

  .label-on-left::part(form-control-help-text) {
    grid-column-start: 2;
  }
</style>\`
}`,...pt.parameters?.docs?.source},description:{story:"Use  to customize the way form controls are drawn. This example uses CSS grid to position the label to the left of the control, but the possible orientations are nearly endless. The same technique works for inputs, textareas, radio groups, and similar form controls.",...pt.parameters?.docs?.description}}};const Mn=["Default","Labels","HelpText","Placeholders","Clearable","TogglePassword","FilledInputs","Disabled","Sizes","Pill","InputTypes","PrefixSuffixIcons","CustomizingLabelPosition"];export{et as Clearable,pt as CustomizingLabelPosition,vt as Default,it as Disabled,nt as FilledInputs,X as HelpText,at as InputTypes,J as Labels,ot as Pill,tt as Placeholders,lt as PrefixSuffixIcons,rt as Sizes,st as TogglePassword,Mn as __namedExportsOrder,Pn as default};
//# sourceMappingURL=input.stories-30fb1bc6.js.map
