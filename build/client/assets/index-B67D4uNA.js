import{w as H,B as F,v as T,a as d,q as e}from"./chunk-4WY6JWTD-DBnPwoI9.js";import{c as n,d as a}from"./colors-CR5HX9a0.js";import{m as g}from"./manager-Bj-g3NEy.js";import{B as j}from"./index-CiXxZgXT.js";import"./apiClient-ctOkRHlj.js";const t={Wrapper:a.section`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `,Header:a.div`
    width: 100%;
    max-width: 1200px;
    padding-inline: 60px;
    box-sizing: border-box;
  `,HeaderTop:a.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 8px;
  `,DelegationStatusBadge:a.span`
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    background: ${i=>{const s=i.status.toUpperCase();return s==="APPROVED"?n.green[0]:s==="REJECTED"?n.red[0]:n.yellow[0]}};
    color: ${i=>{const s=i.status.toUpperCase();return s==="APPROVED"?n.green[2]:s==="REJECTED"?n.red[1]:n.yellow[2]}};
  `,BackButton:a.button`
    background: none;
    border: none;
    color: ${n.blue[1]};
    cursor: pointer;
    font-size: 14px;
    padding: 8px 0;
    margin-bottom: 16px;

    &:hover {
      text-decoration: underline;
    }
  `,Heading:a.h1`
    margin: 0 0 8px 0;
    color: ${n.grey[8]};
  `,Subheading:a.p`
    margin: 0 0 24px 0;
    color: ${n.grey[6]};
    font-size: 14px;
  `,SummarySection:a.div`
    width: 100%;
    max-width: 1200px;
    padding-inline: 60px;
    box-sizing: border-box;
    margin-bottom: 24px;
  `,SummaryCards:a.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 16px;
  `,SummaryCard:a.div`
    background: ${i=>i.variant==="approved"?n.green[0]:i.variant==="rejected"?n.red[0]:i.variant==="pending"?n.yellow[0]:n.white};
    border: 1px solid ${i=>i.variant==="approved"?n.green[1]:i.variant==="rejected"?n.red[1]:i.variant==="pending"?n.yellow[1]:n.grey[2]};
    border-radius: 8px;
    padding: 20px;
  `,SummaryLabel:a.div`
    font-size: 14px;
    color: ${n.grey[6]};
    margin-bottom: 8px;
  `,SummaryAmount:a.div`
    font-size: 28px;
    font-weight: 600;
    color: ${n.grey[8]};
  `,ActionsRow:a.div`
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
  `,ItemsList:a.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-inline: 60px;
    max-width: 1200px;
    box-sizing: border-box;
    gap: 12px;
  `,ItemCard:a.div`
    background: ${n.white};
    border: 1px solid ${n.grey[2]};
    border-radius: 8px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  `,ItemInfo:a.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  `,ItemName:a.h3`
    margin: 0;
    color: ${n.navy[2]};
    font-size: 16px;
  `,ItemAmount:a.p`
    margin: 0;
    color: ${n.grey[7]};
    font-size: 18px;
    font-weight: 600;
  `,ItemActions:a.div`
    display: flex;
    gap: 8px;
    align-items: center;
  `,StatusBadge:a.span`
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    background: ${i=>{const s=i.status.toUpperCase();return s==="APPROVED"?n.green[0]:s==="REJECTED"?n.red[0]:n.yellow[0]}};
    color: ${i=>{const s=i.status.toUpperCase();return s==="APPROVED"?n.green[2]:s==="REJECTED"?n.red[1]:n.yellow[2]}};
  `,LoadingMessage:a.p`
    color: ${n.grey[6]};
    font-size: 16px;
  `,ErrorMessage:a.p`
    color: ${n.red[1]};
    font-size: 16px;
  `,EmptyMessage:a.p`
    color: ${n.grey[6]};
    font-size: 16px;
    text-align: center;
    padding: 40px;
  `},W=H(function(){const{id:s}=F(),C=T(),[x,E]=d.useState(null),[h,I]=d.useState(null),[w,D]=d.useState("PENDING"),[y,R]=d.useState([]),[f,$]=d.useState({total:0,pending:0,approved:0,rejected:0}),[k,v]=d.useState(!0),[A,b]=d.useState(null),[c,p]=d.useState(null),l=s?parseInt(s,10):null,m=async()=>{if(!l){b("Invalid delegation id"),v(!1);return}try{v(!0);const r=await g.getDelegationDetails(l);E(r.delegation),I(r.employee),D(r.delegation.status),R(r.items),$(r.summary),b(null)}catch(r){b(r?.data?.message||"Failed to load delegation"),console.error("Failed to fetch delegation details:",r)}finally{v(!1)}};d.useEffect(()=>{m()},[l]);const B=async r=>{if(l)try{p(r),await g.approveItem(l,r),await m()}catch(o){console.error("Failed to approve item:",o),alert(o?.data?.message||"Could not approve this item")}finally{p(null)}},P=async r=>{if(l)try{p(r),await g.rejectItem(l,r),await m()}catch(o){console.error("Failed to reject item:",o),alert(o?.data?.message||"Could not reject this item")}finally{p(null)}},z=async()=>{if(!(!l||!window.confirm("Approve all pending items?")))try{p("approve-all");const o=await g.approveAllItems(l);alert(`Approved ${o.count} items`),await m()}catch(o){console.error("Failed to approve all items:",o),alert(o?.data?.message||"Could not approve items")}finally{p(null)}},L=async()=>{if(!(!l||!window.confirm("Reject all pending items?")))try{p("reject-all");const o=await g.rejectAllItems(l);alert(`Rejected ${o.count} items`),await m()}catch(o){console.error("Failed to reject all items:",o),alert(o?.data?.message||"Could not reject items")}finally{p(null)}},S=()=>{C(-1)},u=r=>`${r.toFixed(2)} PLN`;if(k)return e.jsxs(t.Wrapper,{children:[e.jsxs(t.Header,{children:[e.jsx(t.BackButton,{onClick:S,children:"← Back"}),e.jsx(t.Heading,{children:"Delegation details"})]}),e.jsx(t.LoadingMessage,{children:"Loading…"})]});if(A)return e.jsxs(t.Wrapper,{children:[e.jsxs(t.Header,{children:[e.jsx(t.BackButton,{onClick:S,children:"← Back"}),e.jsx(t.Heading,{children:"Delegation details"})]}),e.jsx(t.ErrorMessage,{children:A})]});const N=y.some(r=>r.status==="PENDING");return e.jsxs(t.Wrapper,{children:[e.jsxs(t.Header,{children:[e.jsx(t.BackButton,{onClick:S,children:"← Back"}),e.jsxs(t.HeaderTop,{children:[e.jsx(t.Heading,{children:x?.name||`Delegation #${l}`}),e.jsx(t.DelegationStatusBadge,{status:w,children:w.toUpperCase()})]}),h&&e.jsxs(t.Subheading,{children:["Employee: ",h.first_name," ",h.last_name," • ",h.email]}),x&&e.jsxs(t.Subheading,{children:["Trip dates: ",x.start_date," → ",x.end_date]})]}),e.jsxs(t.SummarySection,{children:[e.jsxs(t.SummaryCards,{children:[e.jsxs(t.SummaryCard,{variant:"total",children:[e.jsx(t.SummaryLabel,{children:"Total amount"}),e.jsx(t.SummaryAmount,{children:u(f.total)})]}),e.jsxs(t.SummaryCard,{variant:"pending",children:[e.jsx(t.SummaryLabel,{children:"Pending"}),e.jsx(t.SummaryAmount,{children:u(f.pending)})]}),e.jsxs(t.SummaryCard,{variant:"approved",children:[e.jsx(t.SummaryLabel,{children:"Approved"}),e.jsx(t.SummaryAmount,{children:u(f.approved)})]}),e.jsxs(t.SummaryCard,{variant:"rejected",children:[e.jsx(t.SummaryLabel,{children:"Rejected"}),e.jsx(t.SummaryAmount,{children:u(f.rejected)})]})]}),N&&e.jsxs(t.ActionsRow,{children:[e.jsx(j,{onClick:z,disabled:c!==null,children:c==="approve-all"?"Approving…":"Approve all pending"}),e.jsx(j,{onClick:L,disabled:c!==null,children:c==="reject-all"?"Rejecting…":"Reject all pending"})]})]}),y.length===0?e.jsx(t.EmptyMessage,{children:"No expenses"}):e.jsx(t.ItemsList,{children:y.map(r=>e.jsxs(t.ItemCard,{children:[e.jsxs(t.ItemInfo,{children:[e.jsx(t.ItemName,{children:r.name}),e.jsx(t.ItemAmount,{children:u(r.amount)})]}),e.jsxs(t.ItemActions,{children:[e.jsx(t.StatusBadge,{status:r.status,children:r.status.toUpperCase()}),r.status==="PENDING"&&e.jsxs(e.Fragment,{children:[e.jsx(j,{onClick:()=>B(r.id),disabled:c===r.id,children:c===r.id?"Approving…":"Approve"}),e.jsx(j,{onClick:()=>P(r.id),disabled:c===r.id,children:c===r.id?"Rejecting…":"Reject"})]})]})]},r.id))})]})});export{W as default};
