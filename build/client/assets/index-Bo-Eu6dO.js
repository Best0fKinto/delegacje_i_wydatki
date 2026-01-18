import{w as k,B as $,v as B,x as w,a,q as e}from"./chunk-4WY6JWTD-DBnPwoI9.js";import{c as t,d as r}from"./colors-CR5HX9a0.js";import{m as C}from"./manager-Bj-g3NEy.js";import{r as y}from"./routes-Co3Hordx.js";import"./apiClient-ctOkRHlj.js";const n={Wrapper:r.section`
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
    color: ${t.blue[1]};
    cursor: pointer;
    font-size: 14px;
    padding: 8px 0;
    margin-bottom: 16px;

    &:hover {
      text-decoration: underline;
    }
  `,Heading:r.h1`
    margin: 0 0 8px 0;
    color: ${t.grey[8]};
  `,Subheading:r.h2`
    margin: 32px 0 16px 0;
    color: ${t.grey[7]};
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
    background: ${t.white};
    border: 1px solid ${t.grey[2]};
    border-radius: 8px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: ${t.blue[1]};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  `,DelegationInfo:r.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  `,DelegationTitle:r.h3`
    margin: 0;
    color: ${t.navy[2]};
    font-size: 16px;
  `,DelegationDates:r.p`
    margin: 0;
    color: ${t.grey[6]};
    font-size: 14px;
  `,DelegationDestination:r.p`
    margin: 4px 0 0 0;
    color: ${t.grey[7]};
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
    background: ${d=>{const i=d.status.toUpperCase();return i==="APPROVED"?t.green[0]:i==="REJECTED"?t.red[0]:t.yellow[0]}};
    color: ${d=>{const i=d.status.toUpperCase();return i==="APPROVED"?t.green[2]:i==="REJECTED"?t.red[1]:t.yellow[2]}};
  `,LoadingMessage:r.p`
    color: ${t.grey[6]};
    font-size: 16px;
  `,ErrorMessage:r.p`
    color: ${t.red[1]};
    font-size: 16px;
  `},P=k(function(){const{id:i}=$(),g=B(),D=w(),[s,j]=a.useState(null),[u,b]=a.useState([]),[m,p]=a.useState(!0),[f,c]=a.useState(null),l=i?parseInt(i,10):null,h=async()=>{if(!l){c("Invalid employee id"),p(!1);return}try{p(!0);const o=await C.getEmployeeDetails(l);j(o.employee),b(o.delegations),c(null)}catch(o){c(o?.data?.message||"Failed to load employee"),console.error("Failed to fetch employee data:",o)}finally{p(!1)}};a.useEffect(()=>{h()},[l]),a.useEffect(()=>{l&&!m&&h()},[D.key]);const E=o=>{g(y.managerDelegation.replace(":id",o.toString()))},x=()=>{g(y.managerDashboard)};return m?e.jsxs(n.Wrapper,{children:[e.jsxs(n.Header,{children:[e.jsx(n.BackButton,{onClick:x,children:"← Back to employees"}),e.jsx(n.Heading,{children:"Employee profile"})]}),e.jsx(n.LoadingMessage,{children:"Loading…"})]}):f?e.jsxs(n.Wrapper,{children:[e.jsxs(n.Header,{children:[e.jsx(n.BackButton,{onClick:x,children:"← Back to employees"}),e.jsx(n.Heading,{children:"Employee profile"})]}),e.jsx(n.ErrorMessage,{children:f})]}):e.jsxs(n.Wrapper,{children:[e.jsxs(n.Header,{children:[e.jsx(n.BackButton,{onClick:x,children:"← Back to employees"}),e.jsx(n.Heading,{children:s?`${s.first_name} ${s.last_name}`:`Employee #${l}`}),s&&e.jsx(n.DelegationDates,{children:s.email}),e.jsx(n.Subheading,{children:"Employee delegations"})]}),u.length===0?e.jsx(n.LoadingMessage,{children:"This employee has no delegations"}):e.jsx(n.DelegationList,{children:u.map(o=>e.jsxs(n.DelegationCard,{onClick:()=>E(o.id),children:[e.jsxs(n.DelegationInfo,{children:[e.jsx(n.DelegationTitle,{children:o.name||`Delegation #${o.id}`}),e.jsxs(n.DelegationDates,{children:[o.start_date," - ",o.end_date]}),(o.city||o.country)&&e.jsx(n.DelegationDestination,{children:[o.city,o.country].filter(Boolean).join(", ")})]}),e.jsx(n.DelegationActions,{children:e.jsx(n.DelegationStatus,{status:o.status,children:o.status.toUpperCase()})})]},o.id))})]})});export{P as default};
