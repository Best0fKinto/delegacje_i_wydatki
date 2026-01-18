import{w as $,B as k,v as w,x as v,a as s,q as e}from"./chunk-4WY6JWTD-DBnPwoI9.js";import{c as o,d as r}from"./colors-CR5HX9a0.js";import{a as B}from"./admin-BecAp--m.js";import{r as m}from"./routes-Co3Hordx.js";import"./apiClient-ctOkRHlj.js";const n={Wrapper:r.section`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `,Header:r.div`
    width: 100%;
    max-width: 1200px;
    padding-inline: 60px;
    box-sizing: border-box;
  `,BackButton:r.button`
    background: none;
    border: none;
    color: ${o.blue[1]};
    cursor: pointer;
    font-size: 14px;
    padding: 8px 0;
    margin-bottom: 16px;

    &:hover {
      text-decoration: underline;
    }
  `,Heading:r.h1`
    margin: 0 0 8px 0;
    color: ${o.grey[8]};
  `,EmployeeInfo:r.div`
    background: ${o.white};
    border: 1px solid ${o.grey[2]};
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 24px;
  `,InfoRow:r.div`
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
    font-size: 14px;

    &:last-child {
      margin-bottom: 0;
    }
  `,InfoLabel:r.span`
    font-weight: 600;
    color: ${o.grey[7]};
  `,InfoValue:r.span`
    color: ${o.grey[6]};
  `,Subheading:r.h2`
    margin: 32px 0 16px 0;
    color: ${o.grey[7]};
    font-size: 20px;
  `,DelegationList:r.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-inline: 60px;
    max-width: 1200px;
    box-sizing: border-box;
    gap: 16px;
  `,DelegationCard:r.div`
    background: ${o.white};
    border: 1px solid ${o.grey[2]};
    border-radius: 8px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: ${o.blue[1]};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  `,DelegationInfo:r.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,DelegationTitle:r.h3`
    margin: 0;
    color: ${o.navy[2]};
    font-size: 16px;
  `,DelegationDates:r.p`
    margin: 0;
    color: ${o.grey[6]};
    font-size: 14px;
  `,DelegationDestination:r.p`
    margin: 4px 0 0 0;
    color: ${o.grey[7]};
    font-size: 13px;
  `,DelegationActions:r.div`
    display: flex;
    gap: 8px;
    align-items: center;
  `,DelegationStatus:r.span`
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    background: ${d=>{const t=d.status.toUpperCase();return t==="APPROVED"?o.green[0]:t==="REJECTED"?o.red[0]:o.yellow[0]}};
    color: ${d=>{const t=d.status.toUpperCase();return t==="APPROVED"?o.green[2]:t==="REJECTED"?o.red[1]:o.yellow[2]}};
  `,LoadingMessage:r.p`
    color: ${o.grey[6]};
    font-size: 16px;
  `,ErrorMessage:r.p`
    color: ${o.red[1]};
    font-size: 16px;
  `},H=$(function(){const{id:t}=k(),p=w(),b=v(),[a,j]=s.useState(null),[u,D]=s.useState([]),[f,c]=s.useState(!0),[h,x]=s.useState(null),l=t?parseInt(t,10):null,y=async()=>{if(!l){x("Invalid employee id"),c(!1);return}try{c(!0);const i=await B.getEmployeeDetails(l);j(i.employee),D(i.delegations),x(null)}catch(i){x(i?.data?.message||"Failed to load employee"),console.error("Failed to fetch employee data:",i)}finally{c(!1)}};s.useEffect(()=>{y()},[l]),s.useEffect(()=>{l&&!f&&y()},[b.key]);const E=i=>{p(m.adminDelegation.replace(":id",i.toString()))},g=()=>{a?.manager_id?p(m.adminManager.replace(":id",a.manager_id.toString())):p(m.adminDashboard)};return f?e.jsxs(n.Wrapper,{children:[e.jsxs(n.Header,{children:[e.jsx(n.BackButton,{onClick:g,children:"← Back"}),e.jsx(n.Heading,{children:"Employee profile"})]}),e.jsx(n.LoadingMessage,{children:"Loading…"})]}):h?e.jsxs(n.Wrapper,{children:[e.jsxs(n.Header,{children:[e.jsx(n.BackButton,{onClick:g,children:"← Back"}),e.jsx(n.Heading,{children:"Employee profile"})]}),e.jsx(n.ErrorMessage,{children:h})]}):e.jsxs(n.Wrapper,{children:[e.jsxs(n.Header,{children:[e.jsx(n.BackButton,{onClick:g,children:"← Back"}),e.jsx(n.Heading,{children:a?.first_name&&a?.last_name?`${a.first_name} ${a.last_name}`:a?.username||`Employee #${l}`}),a&&e.jsx(n.EmployeeInfo,{children:e.jsxs(n.InfoRow,{children:[e.jsx(n.InfoLabel,{children:"Email:"}),e.jsx(n.InfoValue,{children:a.email})]})}),e.jsx(n.Subheading,{children:"Employee delegations"})]}),u.length===0?e.jsx(n.LoadingMessage,{children:"This employee has no delegations"}):e.jsx(n.DelegationList,{children:u.map(i=>e.jsxs(n.DelegationCard,{onClick:()=>E(i.id),children:[e.jsxs(n.DelegationInfo,{children:[e.jsx(n.DelegationTitle,{children:i.name||`Delegation #${i.id}`}),e.jsxs(n.DelegationDates,{children:[i.start_date," - ",i.end_date]}),(i.city||i.country)&&e.jsx(n.DelegationDestination,{children:[i.city,i.country].filter(Boolean).join(", ")})]}),e.jsx(n.DelegationActions,{children:e.jsx(n.DelegationStatus,{status:i.status,children:i.status.toUpperCase()})})]},i.id))})]})});export{H as default};
