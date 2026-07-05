import{d as l,j as e,r as n,L as c}from"./index-CdPGu-3J.js";import{C as d}from"./api-error-toast-DOuUi1pL.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=l("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]),u=({items:t,className:o})=>e.jsx("nav",{"aria-label":"Breadcrumb",className:o??"mb-6",children:e.jsx("ol",{className:"flex flex-wrap items-center gap-1.5 text-sm",children:t.map((r,s)=>{const a=s===t.length-1;return e.jsxs(n.Fragment,{children:[e.jsx("li",{children:r.to&&!a?e.jsx(c,{to:r.to,state:r.state,className:"text-muted-foreground transition-colors hover:text-foreground",children:r.label}):e.jsx("span",{className:a?"font-medium text-foreground":"text-muted-foreground","aria-current":a?"page":void 0,children:r.label})}),!a&&e.jsx("li",{"aria-hidden":"true",className:"flex items-center",children:e.jsx(d,{className:"h-3.5 w-3.5 text-muted-foreground"})})]},`${r.label}-${s}`)})})});export{m as A,u as B};
