import{v as j,a as o,q as e,w as M}from"./chunk-4WY6JWTD-DBnPwoI9.js";import{R as w}from"./RequireRole-D_4-C0G_.js";import{c as i,d as n}from"./colors-CR5HX9a0.js";import{a as b}from"./admin-BecAp--m.js";import{r as d}from"./routes-Co3Hordx.js";import{B as g}from"./index-CiXxZgXT.js";import"./apiClient-ctOkRHlj.js";import"./AuthContext-DQnsZs3F.js";import"./auth-BtFPvg-z.js";const r={Wrapper:n.section`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `,Header:n.div`
    width: 100%;
    max-width: 1200px;
    padding-inline: 60px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  `,Heading:n.h1`
    margin: 32px 0;
    color: ${i.grey[8]};
  `,Actions:n.div`
    display: flex;
    gap: 12px;
  `,ManagerList:n.div`
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    padding-inline: 60px;
    max-width: 1200px;
    box-sizing: border-box;
    gap: 16px;
  `,ManagerCard:n.div`
    background: ${i.white};
    border: 1px solid ${i.grey[2]};
    border-radius: 8px;
    padding: 24px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: ${i.blue[1]};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  `,ManagerName:n.h3`
    margin: 0 0 8px 0;
    color: ${i.navy[2]};
    font-size: 18px;
  `,ManagerEmail:n.p`
    margin: 0;
    color: ${i.grey[6]};
    font-size: 14px;
  `,LoadingMessage:n.p`
    color: ${i.grey[6]};
    font-size: 16px;
  `,ErrorMessage:n.p`
    color: ${i.red[1]};
    font-size: 16px;
  `};function C(){const s=j(),[l,m]=o.useState([]),[h,c]=o.useState(!0),[p,x]=o.useState(null);o.useEffect(()=>{(async()=>{try{c(!0);const t=await b.listManagers();m(t),x(null)}catch(t){x(t?.data?.message||"Nie udało się pobrać listy menedżerów"),console.error("Failed to fetch managers:",t)}finally{c(!1)}})()},[]);const f=a=>{s(d.adminManager.replace(":id",a.toString()))},u=()=>{s(d.adminCreateManager)},y=()=>{s(d.adminCreateEmployee)};return h?e.jsxs(r.Wrapper,{children:[e.jsx(r.Heading,{children:"Panel Administracyjny"}),e.jsx(r.LoadingMessage,{children:"Ładowanie..."})]}):p?e.jsxs(r.Wrapper,{children:[e.jsx(r.Heading,{children:"Panel Administracyjny"}),e.jsx(r.ErrorMessage,{children:p})]}):e.jsxs(r.Wrapper,{children:[e.jsx(r.Heading,{children:"Panel Administracyjny"}),e.jsxs(r.Header,{children:[e.jsx("h2",{style:{margin:0,color:i.grey[7],fontSize:"20px"},children:"Lista Menedżerów"}),e.jsxs(r.Actions,{children:[e.jsx(g,{onClick:u,children:"Utwórz Menedżera"}),e.jsx(g,{onClick:y,children:"Utwórz Pracownika"})]})]}),l.length===0?e.jsx(r.LoadingMessage,{children:"Brak menedżerów w systemie"}):e.jsx(r.ManagerList,{children:l.map(a=>e.jsxs(r.ManagerCard,{onClick:()=>f(a.id),children:[e.jsx(r.ManagerName,{children:a.first_name&&a.last_name?`${a.first_name} ${a.last_name}`:a.username}),e.jsx(r.ManagerEmail,{children:a.email})]},a.id))})]})}const P=M(function(){return e.jsx(w,{allowedRoles:["admin"],children:e.jsx(C,{})})});export{P as default};
