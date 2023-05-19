/*! For license information please see UseConfirm-stories.dea1cf8c.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunklmw_ui=self.webpackChunklmw_ui||[]).push([[403],{"./packages/hooks/use-confirm/stories/UseConfirm.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:()=>Basic,__namedExportsOrder:()=>__namedExportsOrder,default:()=>UseConfirm_stories});var react=__webpack_require__("./node_modules/.pnpm/react@18.2.0/node_modules/react/index.js"),jsx_runtime=__webpack_require__("./node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js");const ConfirmContext=(0,react.createContext)(void 0);function ConfirmContextProvider({children}){const[message,setMessage]=(0,react.useState)(null),[resolve,setResolve]=(0,react.useState)(null);return(0,jsx_runtime.jsx)(ConfirmContext.Provider,{value:{message,setMessage,resolve,setResolve},children})}ConfirmContextProvider.displayName="ConfirmContextProvider";try{ConfirmContextProvider.displayName="ConfirmContextProvider",ConfirmContextProvider.__docgenInfo={description:"",displayName:"ConfirmContextProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/hooks/use-confirm/src/ConfirmContext.tsx#ConfirmContextProvider"]={docgenInfo:ConfirmContextProvider.__docgenInfo,name:"ConfirmContextProvider",path:"packages/hooks/use-confirm/src/ConfirmContext.tsx#ConfirmContextProvider"})}catch(__react_docgen_typescript_loader_error){}function useConfirm(){const{message,setMessage,resolve,setResolve}=function useConfirmContext(){const context=(0,react.useContext)(ConfirmContext);if(!context)throw new Error("ConfirmContextProvider not found");return context}(),isYield=(0,react.useMemo)((()=>null!==message),[message]);return{message,isYield,ask:async msg=>new Promise((resolve=>{setMessage?.(msg),setResolve?.((()=>value=>resolve(value)))})),confirm:()=>{resolve?.(!0),setMessage?.(null)},deny:()=>{resolve?.(!1),setMessage?.(null)}}}var react_dom=__webpack_require__("./node_modules/.pnpm/react-dom@18.2.0_react@18.2.0/node_modules/react-dom/index.js");const UseConfirm_stories={title:"hooks/useConfirm",parameters:{controls:{expanded:!0}},argTypes:{message:{control:"text",description:"input confirm message."}},args:{message:"confirm"},render:HooksRender};function HooksRender({message}){return(0,jsx_runtime.jsx)("div",{children:(0,jsx_runtime.jsxs)(ConfirmContextProvider,{children:[(0,jsx_runtime.jsx)(ConfirmDialog,{}),(0,jsx_runtime.jsx)(Confirm,{message})]})})}function ConfirmDialog(){const{confirm,isYield,message,deny}=useConfirm();return isYield?(0,react_dom.createPortal)((0,jsx_runtime.jsxs)("dialog",{open:!0,style:{width:"550px"},children:[(0,jsx_runtime.jsx)("h4",{children:message}),(0,jsx_runtime.jsx)("hr",{}),(0,jsx_runtime.jsx)("button",{type:"button",onClick:deny,children:"취소"}),(0,jsx_runtime.jsx)("button",{type:"button",onClick:confirm,children:"확인"})]}),document.body):null}function Confirm({message}){const{ask}=useConfirm();return(0,jsx_runtime.jsx)("div",{children:(0,jsx_runtime.jsx)("button",{style:{padding:"1rem"},type:"button",onClick:async()=>{const ok=await ask(message);alert(ok)},children:"컨펌"})})}HooksRender.displayName="HooksRender",Confirm.displayName="Confirm";const Basic={};Basic.parameters={...Basic.parameters,docs:{...Basic.parameters?.docs,source:{originalSource:"{}",...Basic.parameters?.docs?.source}}};const __namedExportsOrder=["Basic"]},"./node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{var f=__webpack_require__("./node_modules/.pnpm/react@18.2.0/node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.jsx=q,exports.jsxs=q},"./node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);