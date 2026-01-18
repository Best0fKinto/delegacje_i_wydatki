import{w as $,B as I,v as B,a as d,q as e}from"./chunk-4WY6JWTD-DBnPwoI9.js";import{c as r,d as n}from"./colors-CR5HX9a0.js";import{a as A}from"./admin-BecAp--m.js";import{r as k}from"./routes-Co3Hordx.js";import"./apiClient-ctOkRHlj.js";const t={Wrapper:n.section`
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
  `,HeaderTop:n.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 8px;
  `,DelegationStatusBadge:n.span`
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    background: ${a=>{const s=a.status.toUpperCase();return s==="APPROVED"?r.green[0]:s==="REJECTED"?r.red[0]:r.yellow[0]}};
    color: ${a=>{const s=a.status.toUpperCase();return s==="APPROVED"?r.green[2]:s==="REJECTED"?r.red[1]:r.yellow[2]}};
  `,BackButton:n.button`
    background: none;
    border: none;
    color: ${r.blue[1]};
    cursor: pointer;
    font-size: 14px;
    padding: 8px 0;
    margin-bottom: 16px;

    &:hover {
      text-decoration: underline;
    }
  `,Heading:n.h1`
    margin: 0 0 8px 0;
    color: ${r.grey[8]};
  `,Subheading:n.p`
    margin: 0 0 24px 0;
    color: ${r.grey[6]};
    font-size: 14px;
  `,SummarySection:n.div`
    width: 100%;
    max-width: 1200px;
    padding-inline: 60px;
    box-sizing: border-box;
    margin-bottom: 24px;
  `,SummaryCards:n.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 16px;
  `,SummaryCard:n.div`
    background: ${a=>a.variant==="approved"?r.green[0]:a.variant==="rejected"?r.red[0]:a.variant==="pending"?r.yellow[0]:r.white};
    border: 1px solid ${a=>a.variant==="approved"?r.green[1]:a.variant==="rejected"?r.red[1]:a.variant==="pending"?r.yellow[1]:r.grey[2]};
    border-radius: 8px;
    padding: 20px;
  `,SummaryLabel:n.div`
    font-size: 14px;
    color: ${r.grey[6]};
    margin-bottom: 8px;
  `,SummaryAmount:n.div`
    font-size: 28px;
    font-weight: 600;
    color: ${r.grey[8]};
  `,ItemsList:n.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-inline: 60px;
    max-width: 1200px;
    box-sizing: border-box;
    gap: 12px;
  `,ItemCard:n.div`
    background: ${r.white};
    border: 1px solid ${r.grey[2]};
    border-radius: 8px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  `,ItemInfo:n.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  `,ItemName:n.h3`
    margin: 0;
    color: ${r.navy[2]};
    font-size: 16px;
  `,ItemAmount:n.p`
    margin: 0;
    color: ${r.grey[7]};
    font-size: 18px;
    font-weight: 600;
  `,ItemActions:n.div`
    display: flex;
    gap: 8px;
    align-items: center;
  `,StatusBadge:n.span`
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    background: ${a=>{const s=a.status.toUpperCase();return s==="APPROVED"?r.green[0]:s==="REJECTED"?r.red[0]:r.yellow[0]}};
    color: ${a=>{const s=a.status.toUpperCase();return s==="APPROVED"?r.green[2]:s==="REJECTED"?r.red[1]:r.yellow[2]}};
  `,LoadingMessage:n.p`
    color: ${r.grey[6]};
    font-size: 16px;
  `,ErrorMessage:n.p`
    color: ${r.red[1]};
    font-size: 16px;
  `,EmptyMessage:n.p`
    color: ${r.grey[6]};
    font-size: 16px;
    text-align: center;
    padding: 40px;
  `},T=$(function(){const{id:s}=I(),f=B(),[o,S]=d.useState(null),[l,b]=d.useState(null),[h,v]=d.useState("PENDING"),[y,E]=d.useState([]),[c,C]=d.useState({total:0,pending:0,approved:0,rejected:0}),[w,u]=d.useState(!0),[j,x]=d.useState(null),m=s?parseInt(s,10):null,D=async()=>{if(!m){x("Invalid delegation id"),u(!1);return}try{u(!0);const i=await A.getDelegationDetails(m);S(i.delegation),b(i.employee),v(i.delegation.status),E(i.items),C(i.summary),x(null)}catch(i){x(i?.data?.message||"Failed to load delegation"),console.error("Failed to fetch delegation details:",i)}finally{u(!1)}};d.useEffect(()=>{D()},[m]);const g=()=>{o?.employee_id?f(k.adminEmployee.replace(":id",o.employee_id.toString())):f(-1)},p=i=>`${i.toFixed(2)} PLN`;return w?e.jsxs(t.Wrapper,{children:[e.jsxs(t.Header,{children:[e.jsx(t.BackButton,{onClick:g,children:"← Back"}),e.jsx(t.Heading,{children:"Delegation details"})]}),e.jsx(t.LoadingMessage,{children:"Loading…"})]}):j?e.jsxs(t.Wrapper,{children:[e.jsxs(t.Header,{children:[e.jsx(t.BackButton,{onClick:g,children:"← Back"}),e.jsx(t.Heading,{children:"Delegation details"})]}),e.jsx(t.ErrorMessage,{children:j})]}):e.jsxs(t.Wrapper,{children:[e.jsxs(t.Header,{children:[e.jsx(t.BackButton,{onClick:g,children:"← Back"}),e.jsxs(t.HeaderTop,{children:[e.jsx(t.Heading,{children:o?.name||`Delegation #${m}`}),e.jsx(t.DelegationStatusBadge,{status:h,children:h.toUpperCase()})]}),l&&e.jsxs(t.Subheading,{children:["Employee: ",l.first_name&&l.last_name?`${l.first_name} ${l.last_name}`:l.username," • ",l.email]}),o&&e.jsxs(t.Subheading,{children:["Trip dates: ",o.start_date," → ",o.end_date,(o.city||o.country)&&e.jsxs(e.Fragment,{children:[" • Location: ",[o.city,o.country].filter(Boolean).join(", ")]})]})]}),e.jsx(t.SummarySection,{children:e.jsxs(t.SummaryCards,{children:[e.jsxs(t.SummaryCard,{variant:"total",children:[e.jsx(t.SummaryLabel,{children:"Total amount"}),e.jsx(t.SummaryAmount,{children:p(c.total)})]}),e.jsxs(t.SummaryCard,{variant:"pending",children:[e.jsx(t.SummaryLabel,{children:"Pending"}),e.jsx(t.SummaryAmount,{children:p(c.pending)})]}),e.jsxs(t.SummaryCard,{variant:"approved",children:[e.jsx(t.SummaryLabel,{children:"Approved"}),e.jsx(t.SummaryAmount,{children:p(c.approved)})]}),e.jsxs(t.SummaryCard,{variant:"rejected",children:[e.jsx(t.SummaryLabel,{children:"Rejected"}),e.jsx(t.SummaryAmount,{children:p(c.rejected)})]})]})}),y.length===0?e.jsx(t.EmptyMessage,{children:"No expenses"}):e.jsx(t.ItemsList,{children:y.map(i=>e.jsxs(t.ItemCard,{children:[e.jsxs(t.ItemInfo,{children:[e.jsx(t.ItemName,{children:i.name}),e.jsx(t.ItemAmount,{children:p(i.amount)})]}),e.jsx(t.ItemActions,{children:e.jsx(t.StatusBadge,{status:i.status,children:i.status.toUpperCase()})})]},i.id))})]})});export{T as default};
