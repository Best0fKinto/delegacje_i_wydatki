import{a as g}from"./apiClient-ctOkRHlj.js";import{a as h,q as a}from"./chunk-4WY6JWTD-DBnPwoI9.js";import{c as p,d as t}from"./colors-CR5HX9a0.js";import{B as ce}from"./index-CiXxZgXT.js";import{h as de,g as ue,i as ge,A as xe,C as M,F as $,n as he,q as x,j as B,s as m,k as c,l as me,M as be,D as ye,m as fe}from"./Modal-BugdIcMr.js";function De(e){return ue("MuiDialog",e)}const w=de("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]),ke=h.createContext({}),Se=m(ye,{name:"MuiDialog",slot:"Backdrop",overrides:(e,o)=>o.backdrop})({zIndex:-1}),we=e=>{const{classes:o,scroll:r,maxWidth:i,fullWidth:s,fullScreen:b}=e,y={root:["root"],container:["container",`scroll${c(r)}`],paper:["paper",`paperScroll${c(r)}`,`paperWidth${c(String(i))}`,s&&"paperFullWidth",b&&"paperFullScreen"]};return me(y,De,o)},ve=m(be,{name:"MuiDialog",slot:"Root"})({"@media print":{position:"absolute !important"}}),Ce=m("div",{name:"MuiDialog",slot:"Container",overridesResolver:(e,o)=>{const{ownerState:r}=e;return[o.container,o[`scroll${c(r.scroll)}`]]}})({height:"100%","@media print":{height:"auto"},outline:0,variants:[{props:{scroll:"paper"},style:{display:"flex",justifyContent:"center",alignItems:"center"}},{props:{scroll:"body"},style:{overflowY:"auto",overflowX:"hidden",textAlign:"center","&::after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}}}]}),Pe=m(M,{name:"MuiDialog",slot:"Paper",overridesResolver:(e,o)=>{const{ownerState:r}=e;return[o.paper,o[`scrollPaper${c(r.scroll)}`],o[`paperWidth${c(String(r.maxWidth))}`],r.fullWidth&&o.paperFullWidth,r.fullScreen&&o.paperFullScreen]}})(fe(({theme:e})=>({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"},variants:[{props:{scroll:"paper"},style:{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"}},{props:{scroll:"body"},style:{display:"inline-block",verticalAlign:"middle",textAlign:"initial"}},{props:({ownerState:o})=>!o.maxWidth,style:{maxWidth:"calc(100% - 64px)"}},{props:{maxWidth:"xs"},style:{maxWidth:e.breakpoints.unit==="px"?Math.max(e.breakpoints.values.xs,444):`max(${e.breakpoints.values.xs}${e.breakpoints.unit}, 444px)`,[`&.${w.paperScrollBody}`]:{[e.breakpoints.down(Math.max(e.breakpoints.values.xs,444)+64)]:{maxWidth:"calc(100% - 64px)"}}}},...Object.keys(e.breakpoints.values).filter(o=>o!=="xs").map(o=>({props:{maxWidth:o},style:{maxWidth:`${e.breakpoints.values[o]}${e.breakpoints.unit}`,[`&.${w.paperScrollBody}`]:{[e.breakpoints.down(e.breakpoints.values[o]+64)]:{maxWidth:"calc(100% - 64px)"}}}})),{props:({ownerState:o})=>o.fullWidth,style:{width:"calc(100% - 64px)"}},{props:({ownerState:o})=>o.fullScreen,style:{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,[`&.${w.paperScrollBody}`]:{margin:0,maxWidth:"100%"}}}]}))),je=h.forwardRef(function(o,r){const i=ge({props:o,name:"MuiDialog"}),s=xe(),b={enter:s.transitions.duration.enteringScreen,exit:s.transitions.duration.leavingScreen},{"aria-describedby":y,"aria-labelledby":R,"aria-modal":F=!0,BackdropComponent:N,BackdropProps:A,children:U,className:E,disableEscapeKeyDown:v=!1,fullScreen:H=!1,fullWidth:L=!1,maxWidth:z="sm",onClick:C,onClose:f,open:P,PaperComponent:I=M,PaperProps:j={},scroll:X="paper",slots:Y={},slotProps:q={},TransitionComponent:K=$,transitionDuration:W=b,TransitionProps:G,...O}=i,l={...i,disableEscapeKeyDown:v,fullScreen:H,fullWidth:L,maxWidth:z,scroll:X},D=we(l),k=h.useRef(),V=u=>{k.current=u.target===u.currentTarget},Z=u=>{C&&C(u),k.current&&(k.current=null,f&&f(u,"backdropClick"))},S=he(R),J=h.useMemo(()=>({titleId:S}),[S]),Q={transition:K,...Y},_={transition:G,paper:j,backdrop:A,...q},d={slots:Q,slotProps:_},[ee,oe]=x("root",{elementType:ve,shouldForwardComponentProp:!0,externalForwardedProps:d,ownerState:l,className:B(D.root,E),ref:r}),[ae,re]=x("backdrop",{elementType:Se,shouldForwardComponentProp:!0,externalForwardedProps:d,ownerState:l}),[te,se]=x("paper",{elementType:Pe,shouldForwardComponentProp:!0,externalForwardedProps:d,ownerState:l,className:B(D.paper,j.className)}),[ne,ie]=x("container",{elementType:Ce,externalForwardedProps:d,ownerState:l,className:D.container}),[le,pe]=x("transition",{elementType:$,externalForwardedProps:d,ownerState:l,additionalProps:{appear:!0,in:P,timeout:W,role:"presentation"}});return a.jsx(ee,{closeAfterTransition:!0,slots:{backdrop:ae},slotProps:{backdrop:{transitionDuration:W,as:N,...re}},disableEscapeKeyDown:v,onClose:f,open:P,onClick:Z,...oe,...O,children:a.jsx(le,{...pe,children:a.jsx(ne,{onMouseDown:V,...ie,children:a.jsx(te,{as:I,elevation:24,role:"dialog","aria-describedby":y,"aria-labelledby":S,"aria-modal":F,...se,children:a.jsx(ke.Provider,{value:J,children:U})})})})})}),Fe={async getDelegations(){return g.get("/delegations")},async getDelegation(e){return(await g.get(`/delegations/${e}`)).delegation},async createDelegation(e){return g.post("/delegations",e)},async updateDelegation(e,o){return g.put(`/delegations/${e}`,o)},async deleteDelegation(e){return g.delete(`/delegations/${e}`)}},T={DialogHeader:t.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
  `,DialogTitle:t.h2`
    color: ${p.grey[8]};
    margin: 0;
  `},Ne=({title:e,onClose:o})=>a.jsxs(T.DialogHeader,{children:[a.jsx(T.DialogTitle,{children:e}),o&&a.jsx(ce,{onClick:o,children:"Zamknij"})]}),Ae=t.div`
  padding: 16px;
  box-sizing: border-box;
`,Ue=({children:e,open:o,onClose:r})=>a.jsx(je,{open:o,onClose:r,children:e}),We="0 2px 4px rgba(0, 0, 0, 0.1)",n={Wrapper:t.div`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    box-shadow: ${We};
    padding: 16px;
    gap: 16px;
    border: 1px solid ${p.grey[1]};
    color: ${p.grey[8]};
    position: relative;
  `,Title:t.h3`
    margin: 0;
    color: ${p.grey[8]};
    padding-right: 32px;
  `,DataWrapper:t.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,DataRow:t.div`
    display: flex;
    gap: 8px;
    justify-content: space-between;
  `,DeleteButton:t.button`
    position: absolute;
    top: 12px;
    right: 12px;
    background: ${p.grey[1]};
    color: white;
    border: none;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    transition: background-color 0.2s;
    padding: 0;
    line-height: 1;

    &:hover {
      background: ${p.red[1]};
    }

    &:active {
      transform: scale(0.95);
    }
  `},Ee=({title:e,amount:o,currency:r,date:i,onDelete:s})=>a.jsxs(n.Wrapper,{children:[s&&a.jsx(n.DeleteButton,{onClick:s,type:"button",title:"Usuń wydatek",children:"×"}),a.jsx(n.Title,{children:e}),a.jsxs(n.DataWrapper,{children:[a.jsxs(n.DataRow,{children:[a.jsx("span",{children:"Kwota"}),a.jsx("span",{children:o})]}),a.jsxs(n.DataRow,{children:[a.jsx("span",{children:"Waluta"}),a.jsx("span",{children:r})]}),a.jsxs(n.DataRow,{children:[a.jsx("span",{children:"Data"}),a.jsx("span",{children:i})]})]})]}),He=e=>({1:"PLN",2:"EUR",3:"USD",4:"GBP"})[e]||"PLN";export{Ue as D,Ee as E,Ne as a,Ae as b,je as c,Fe as d,w as e,He as g};
