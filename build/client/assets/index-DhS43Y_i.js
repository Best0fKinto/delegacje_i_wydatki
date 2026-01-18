import{x as h,q as e,y as m,v as f,a as j,z as y,w as b,O as v}from"./chunk-4WY6JWTD-DBnPwoI9.js";import{c as a,d as o,l as w}from"./colors-CR5HX9a0.js";import{r as i}from"./routes-Co3Hordx.js";import{d as $,B as k}from"./index-CiXxZgXT.js";import{u as x}from"./AuthContext-DQnsZs3F.js";import{a as L}from"./auth-BtFPvg-z.js";import{g as S}from"./apiClient-ctOkRHlj.js";const g=72,n={Sidebar:o.aside`
    position: sticky;
    height: calc(100vh - ${g+1}px);
    top: ${g+1}px;
    width: 231px;
    padding: 8px;
    box-sizing: border-box;
    background-color: ${a.navy[2]};
  `,Nav:o.nav`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,NavLink:o(m)`
    ${$};
    text-decoration: none;
    color: ${a.white};
    padding: 12px 4px;

    &:hover {
      color: ${a.white};
    }

    ${({isSelected:s})=>s&&w`
      background-color: ${a.blue[1]};
      &:hover {
        background-color: ${a.blue[1]};
      };

    `}
  `,LoadingText:o.div`
    color: ${a.white};
    padding: 12px 4px;
    font-size: 14px;
    opacity: 0.7;
  `},z=()=>{const s=h(),{user:t,isLoading:d}=x();if(d)return e.jsx(n.Sidebar,{children:e.jsx(n.Nav,{children:e.jsx(n.LoadingText,{children:"Ładowanie..."})})});if(!t)return e.jsx(n.Sidebar,{children:e.jsx(n.Nav,{})});let r=[];return t.role==="employee"?r=[{name:"Moje delegacje",path:i.delegations},{name:"Utwórz delegację",path:i.createDelegation}]:t.role==="manager"?r=[{name:"Dashboard",path:i.managerDashboard}]:t.role==="admin"&&(r=[{name:"Dashboard",path:i.adminDashboard},{name:"Utwórz Menedżera",path:i.adminCreateManager},{name:"Utwórz Pracownika",path:i.adminCreateEmployee}]),e.jsx(n.Sidebar,{children:e.jsx(n.Nav,{children:r.map(({name:l,path:c})=>e.jsx(n.NavLink,{to:c,isSelected:c===s.pathname,children:l},c))})})},u={Header:o.header`
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    height: 40px;
    background-color: #f5f5f5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: ${a.navy[2]};
    color: ${a.white};
  `,Heading:o.h1`
    margin: 0;
    font-size: 24px;
  `},N=()=>{const s=f(),{clearAuth:t}=x(),[d,r]=j.useState(!1),l=async()=>{r(!0);try{await L.logout()}catch(c){console.error("Unexpected logout error:",c)}finally{t(),s(i.login,{replace:!0})}};return e.jsxs(u.Header,{children:[e.jsx(u.Heading,{children:"Delegacje"}),e.jsx(k,{variant:"text",onClick:l,disabled:d,children:d?"Wylogowywanie...":"Wyloguj"})]})},M=o.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: ${a.grey[6]};
  font-size: 16px;
`;function W({children:s}){const t=h(),{user:d,isLoading:r,error:l}=x(),c=S();return r?e.jsx(M,{children:"Sprawdzanie autoryzacji..."}):!c||l||!d?e.jsx(y,{to:i.login,state:{from:t},replace:!0}):e.jsx(e.Fragment,{children:s})}const p={PageWrapper:o.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1px;
    background-color: ${a.grey[1]};
  `,MainContentWrapper:o.div`
    display: flex;
    flex: 1;
  `,Main:o.main`
    flex: 1;
  `};function C(){return e.jsx(W,{children:e.jsxs(p.PageWrapper,{children:[e.jsx(N,{}),e.jsxs(p.MainContentWrapper,{children:[e.jsx(z,{}),e.jsx(p.Main,{children:e.jsx(v,{})})]})]})})}const E=b(C);export{E as default};
