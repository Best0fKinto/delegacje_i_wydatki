import{a as h,q as e,w as m}from"./chunk-4WY6JWTD-DBnPwoI9.js";import{d as n,c as l}from"./colors-CR5HX9a0.js";import{B as f}from"./index-CiXxZgXT.js";import{D,a as y,E as b,g as w,d as j,b as L}from"./utils-DXVHnQlh.js";import"./apiClient-ctOkRHlj.js";import"./Modal-BugdIcMr.js";import"./index-TJkuZCev.js";const s={DialogContent:n(L)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 600px;
    max-height: 700px;
    overflow-y: auto;
  `,Item:n.div`
    display: flex;
    justify-content: space-between;
  `,ItemLabel:n.span`
    font-weight: bold;
  `,ExpensesLabel:n.h3`
    margin: 0;
    margin-top: 16px;
    margin-bottom: 8px;
    color: ${l.grey[8]};
    text-align: center;
  `,ExpenseList:n.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  `},I=({delegationId:i,isOpen:r,onClose:u})=>{const[t,p]=h.useState(null),x=!t,g=t?.expenses&&t.expenses.length>0;return h.useEffect(()=>{(async()=>{if(r)try{const c=await j.getDelegation(i);p(c)}catch(c){console.error("Failed to fetch delegation details:",c)}})()},[i,r]),e.jsxs(D,{open:r,onClose:u,children:[e.jsx(y,{title:"Szczegóły delegacji",onClose:u}),e.jsxs(s.DialogContent,{children:[x&&e.jsx("p",{children:"Ładowanie..."}),!x&&t&&e.jsxs(e.Fragment,{children:[e.jsxs(s.Item,{children:[e.jsx(s.ItemLabel,{children:"Nazwa"}),e.jsx("span",{children:t.name})]}),e.jsxs(s.Item,{children:[e.jsx(s.ItemLabel,{children:"Data rozpoczęcia"}),e.jsx("span",{children:t.start_date})]}),e.jsxs(s.Item,{children:[e.jsx(s.ItemLabel,{children:"Data zakończenia"}),e.jsx("span",{children:t.end_date})]}),e.jsxs(s.Item,{children:[e.jsx(s.ItemLabel,{children:"Status"}),e.jsx("span",{children:t.status})]}),t.purpose&&e.jsxs(s.Item,{children:[e.jsx(s.ItemLabel,{children:"Cel"}),e.jsx("span",{children:t.purpose})]}),t.city&&e.jsxs(s.Item,{children:[e.jsx(s.ItemLabel,{children:"Miasto"}),e.jsx("span",{children:t.city})]}),t.country&&e.jsxs(s.Item,{children:[e.jsx(s.ItemLabel,{children:"Kraj"}),e.jsx("span",{children:t.country})]}),g&&e.jsxs(e.Fragment,{children:[e.jsx(s.ExpensesLabel,{children:"Wydatki"}),e.jsx(s.ExpenseList,{children:t?.expenses?.map(a=>e.jsx("li",{children:e.jsx(b,{title:a.explanation||"Brak opisu",amount:a.amount,date:a.payed_at?new Date(a.payed_at).toISOString().split("T")[0]:"Nie podano",currency:w(a.currency_id??1)})},a.id))})]})]})]})]})},z=i=>{switch(i){case"Accepted":return l.green[1];case"Pending":return l.grey[3];case"Rejected":return l.red[1];default:return l.grey[1]}},d={Wrapper:n.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-radius: 8px;
    background-color: #fff;
    gap: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `,Name:n.h3`
    margin: 0;
    color: ${l.grey[8]};
  `,Date:n.p`
    margin: 0;
    color: ${l.grey[8]};
  `,DateFrame:n.span`
    /* font-weight: bold; */
  `,BottomWrapper:n.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,Status:n.div`
    background-color: green;
    width: fit-content;
    padding: 6px;
    border-radius: 4px;
    background-color: ${({$status:i})=>z(i)};
  `,ViewDetailsButton:n(f)`
    padding: 6px;
  `},S=({id:i,name:r,dateFrom:u,dateTo:t,status:p})=>{const[x,g]=h.useState(!1),a=(()=>{switch(p){case"Accepted":return"Zatwierdzona";case"Pending":return"Oczekuje";case"Rejected":return"Odrzucona";default:return""}})();return e.jsxs(d.Wrapper,{children:[e.jsx(d.Name,{children:r}),e.jsxs(d.Date,{children:[e.jsx(d.DateFrame,{children:u})," - ",e.jsx(d.DateFrame,{children:t})]}),e.jsxs(d.BottomWrapper,{children:[e.jsx(d.Status,{$status:p,children:a}),e.jsx(d.ViewDetailsButton,{onClick:()=>g(!0),children:"Zobacz szczegóły"})]}),e.jsx(I,{delegationId:i,isOpen:x,onClose:()=>g(!1)})]})},o={Wrapper:n.section`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `,Heading:n.h1`
    margin-block: 32px;
    color: ${l.grey[8]};
  `,DelegationList:n.ol`
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    padding-inline: 60px;
    max-width: 1200px;
    box-sizing: border-box;
    gap: 16px;
  `,LoadingMessage:n.p`
    color: ${l.grey[6]};
    font-size: 16px;
  `,ErrorMessage:n.p`
    color: ${l.red[1]};
    font-size: 16px;
  `},E=i=>{const r=i.toLowerCase();return r==="accepted"||r==="approved"?"Accepted":r==="rejected"?"Rejected":"Pending"},_=m(function(){const[r,u]=h.useState([]),[t,p]=h.useState(!0),[x,g]=h.useState(null);return h.useEffect(()=>{(async()=>{try{p(!0);const c=await j.getDelegations();u(c),g(null)}catch(c){g(c?.data?.message||"Nie udało się pobrać delegacji"),console.error("Failed to fetch delegations:",c)}finally{p(!1)}})()},[]),t?e.jsxs(o.Wrapper,{children:[e.jsx(o.Heading,{children:"Moje delegacje"}),e.jsx(o.LoadingMessage,{children:"Ładowanie delegacji..."})]}):x?e.jsxs(o.Wrapper,{children:[e.jsx(o.Heading,{children:"Moje delegacje"}),e.jsx(o.ErrorMessage,{children:x})]}):e.jsxs(o.Wrapper,{children:[e.jsx(o.Heading,{children:"Moje delegacje"}),r.length===0?e.jsx(o.LoadingMessage,{children:"Brak delegacji do wyświetlenia"}):e.jsx(o.DelegationList,{children:r.map(a=>e.jsx("li",{children:e.jsx(S,{id:a.id,name:a.name||`Delegacja #${a.id}`,dateFrom:a.start_date,dateTo:a.end_date,status:E(a.status)})},a.id))})]})});export{_ as default};
