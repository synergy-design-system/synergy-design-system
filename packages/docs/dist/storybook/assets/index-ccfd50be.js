import{r as f,M as m}from"./index-79fda27b.js";import{u as d}from"./index-e2af9e5c.js";import"./iframe-eb36bde4.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-725317a4.js";import"./index-d37d4223.js";import"./index-98c60cf8.js";import"./index-356e4a49.js";var p={exports:{}},o={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var y=f,g=Symbol.for("react.element"),x=Symbol.for("react.fragment"),h=Object.prototype.hasOwnProperty,j=y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,_={key:!0,ref:!0,__self:!0,__source:!0};function u(t,e,a){var n,s={},i=null,c=null;a!==void 0&&(i=""+a),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(c=e.ref);for(n in e)h.call(e,n)&&!_.hasOwnProperty(n)&&(s[n]=e[n]);if(t&&t.defaultProps)for(n in e=t.defaultProps,e)s[n]===void 0&&(s[n]=e[n]);return{$$typeof:g,type:t,key:i,ref:c,props:s,_owner:j.current}}o.Fragment=x;o.jsx=u;o.jsxs=u;p.exports=o;var r=p.exports;function l(t){const e=Object.assign({h1:"h1",p:"p"},d(),t.components);return r.jsxs(r.Fragment,{children:[r.jsx(m,{title:"Welcome"}),`
`,r.jsx(e.h1,{id:"synergy-design-system",children:"Synergy Design System"}),`
`,r.jsxs("div",{className:"syn-intro",children:[r.jsxs("div",{className:"left",children:[r.jsx(e.p,{children:"Our design system helps us both work together efficiently and build a great experience for our users."}),r.jsx(e.p,{children:"The Synergy Design System (SDS) provides a centralized, living source for look and feel of our digital products to create consistent user interfaces across all digital SICK products."}),r.jsx(e.p,{children:"This comprehensive guide and resource library contains everything you’ll need to design and develop digital interfaces with SICK. Here you’ll find resources for creating a unified, consistent experience with design foundations, basic design elements, patterns and best practices to help you focus on the unique parts of your work."})]}),r.jsx("img",{src:"/syn.png",alt:"Synergy Design System"})]}),`
`,r.jsx("style",{children:`
  .syn-intro {
    display: flex;
    gap: 3rem;
  }

  .syn-intro .left {
    flex: 1 1 auto;
  }

  .syn-intro img {
    object-fit: contain;
    max-width: 20%;
  }
`})]})}function R(t={}){const{wrapper:e}=Object.assign({},d(),t.components);return e?r.jsx(e,Object.assign({},t,{children:r.jsx(l,t)})):l(t)}export{R as default};
//# sourceMappingURL=index-ccfd50be.js.map
