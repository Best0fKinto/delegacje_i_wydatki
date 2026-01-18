import{v as y,a as n,q as e,w as h}from"./chunk-4WY6JWTD-DBnPwoI9.js";import{R as f}from"./RequireRole-D_4-C0G_.js";import{c as s,d as a}from"./colors-CR5HX9a0.js";import{m as u}from"./manager-Bj-g3NEy.js";import{r as E}from"./routes-Co3Hordx.js";import"./apiClient-ctOkRHlj.js";import"./AuthContext-DQnsZs3F.js";import"./auth-BtFPvg-z.js";const r={Wrapper:a.section`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `,Heading:a.h1`
    margin-block: 32px;
    color: ${s.grey[8]};
  `,EmployeeList:a.div`
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    padding-inline: 60px;
    max-width: 1200px;
    box-sizing: border-box;
    gap: 16px;
  `,EmployeeCard:a.div`
    background: ${s.white};
    border: 1px solid ${s.grey[2]};
    border-radius: 8px;
    padding: 24px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: ${s.blue[1]};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  `,EmployeeName:a.h3`
    margin: 0 0 8px 0;
    color: ${s.navy[2]};
    font-size: 18px;
  `,EmployeeEmail:a.p`
    margin: 0;
    color: ${s.grey[6]};
    font-size: 14px;
  `,LoadingMessage:a.p`
    color: ${s.grey[6]};
    font-size: 16px;
  `,ErrorMessage:a.p`
    color: ${s.red[1]};
    font-size: 16px;
  `};function j(){const l=y(),[t,m]=n.useState([]),[x,p]=n.useState(!0),[d,c]=n.useState(null);n.useEffect(()=>{(async()=>{try{p(!0);const i=await u.listMyEmployees();m(i),c(null)}catch(i){c(i?.data?.message||"Failed to load employees"),console.error("Failed to fetch employees:",i)}finally{p(!1)}})()},[]);const g=o=>{l(E.managerEmployee.replace(":id",o.toString()))};return x?e.jsxs(r.Wrapper,{children:[e.jsx(r.Heading,{children:"My employees"}),e.jsx(r.LoadingMessage,{children:"Loading…"})]}):d?e.jsxs(r.Wrapper,{children:[e.jsx(r.Heading,{children:"My employees"}),e.jsx(r.ErrorMessage,{children:d})]}):e.jsxs(r.Wrapper,{children:[e.jsx(r.Heading,{children:"My employees"}),t.length===0?e.jsx(r.LoadingMessage,{children:"No employees assigned"}):e.jsx(r.EmployeeList,{children:t.map(o=>e.jsxs(r.EmployeeCard,{onClick:()=>g(o.id),children:[e.jsxs(r.EmployeeName,{children:[o.first_name," ",o.last_name]}),e.jsx(r.EmployeeEmail,{children:o.email})]},o.id))})]})}const R=h(function(){return e.jsx(f,{allowedRoles:["manager","admin"],children:e.jsx(j,{})})});export{R as default};
