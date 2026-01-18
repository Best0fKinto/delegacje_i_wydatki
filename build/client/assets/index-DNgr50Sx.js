import{w,B as E,v as $,a as t,q as e}from"./chunk-4WY6JWTD-DBnPwoI9.js";import{c as r,d as n}from"./colors-CR5HX9a0.js";import{a as k}from"./admin-BecAp--m.js";import{r as f}from"./routes-Co3Hordx.js";import"./apiClient-ctOkRHlj.js";const a={Wrapper:n.section`
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
  `,ManagerInfo:n.div`
    background: ${r.white};
    border: 1px solid ${r.grey[2]};
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 24px;
  `,InfoRow:n.div`
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
    font-size: 14px;

    &:last-child {
      margin-bottom: 0;
    }
  `,InfoLabel:n.span`
    font-weight: 600;
    color: ${r.grey[7]};
  `,InfoValue:n.span`
    color: ${r.grey[6]};
  `,Subheading:n.h2`
    margin: 32px 0 16px 0;
    color: ${r.grey[7]};
    font-size: 20px;
  `,EmployeeList:n.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-inline: 60px;
    max-width: 1200px;
    box-sizing: border-box;
    gap: 16px;
  `,EmployeeCard:n.div`
    background: ${r.white};
    border: 1px solid ${r.grey[2]};
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: ${r.blue[1]};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  `,EmployeeName:n.h3`
    margin: 0 0 4px 0;
    color: ${r.navy[2]};
    font-size: 16px;
  `,EmployeeEmail:n.p`
    margin: 0;
    color: ${r.grey[6]};
    font-size: 14px;
  `,LoadingMessage:n.p`
    color: ${r.grey[6]};
    font-size: 16px;
  `,ErrorMessage:n.p`
    color: ${r.red[1]};
    font-size: 16px;
  `},P=w(function(){const{id:m}=E(),g=$(),[i,u]=t.useState(null),[d,b]=t.useState([]),[j,l]=t.useState(!0),[h,c]=t.useState(null),p=m?parseInt(m,10):null;t.useEffect(()=>{if(!p){c("Nieprawidłowy ID menedżera"),l(!1);return}(async()=>{try{l(!0);const s=await k.getManagerDetails(p);u(s.manager),b(s.employees),c(null)}catch(s){c(s?.data?.message||"Nie udało się pobrać danych menedżera"),console.error("Failed to fetch manager data:",s)}finally{l(!1)}})()},[p]);const x=()=>{g(f.adminDashboard)},y=o=>{g(f.adminEmployee.replace(":id",o.toString()))};return j?e.jsxs(a.Wrapper,{children:[e.jsxs(a.Header,{children:[e.jsx(a.BackButton,{onClick:x,children:"← Powrót do panelu"}),e.jsx(a.Heading,{children:"Profil menedżera"})]}),e.jsx(a.LoadingMessage,{children:"Ładowanie..."})]}):h||!i?e.jsxs(a.Wrapper,{children:[e.jsxs(a.Header,{children:[e.jsx(a.BackButton,{onClick:x,children:"← Powrót do panelu"}),e.jsx(a.Heading,{children:"Profil menedżera"})]}),e.jsx(a.ErrorMessage,{children:h||"Nie znaleziono menedżera"})]}):e.jsxs(a.Wrapper,{children:[e.jsxs(a.Header,{children:[e.jsx(a.BackButton,{onClick:x,children:"← Powrót do panelu"}),e.jsx(a.Heading,{children:i.first_name&&i.last_name?`${i.first_name} ${i.last_name}`:i.username}),e.jsxs(a.ManagerInfo,{children:[e.jsxs(a.InfoRow,{children:[e.jsx(a.InfoLabel,{children:"Email:"}),e.jsx(a.InfoValue,{children:i.email})]}),e.jsxs(a.InfoRow,{children:[e.jsx(a.InfoLabel,{children:"Rola:"}),e.jsx(a.InfoValue,{children:i.role})]}),e.jsxs(a.InfoRow,{children:[e.jsx(a.InfoLabel,{children:"Status:"}),e.jsx(a.InfoValue,{children:i.is_active?"Aktywny":"Nieaktywny"})]})]}),e.jsxs(a.Subheading,{children:["Przypisani pracownicy (",d.length,")"]})]}),d.length===0?e.jsx(a.LoadingMessage,{children:"Brak przypisanych pracowników"}):e.jsx(a.EmployeeList,{children:d.map(o=>e.jsxs(a.EmployeeCard,{onClick:()=>y(o.id),children:[e.jsx(a.EmployeeName,{children:o.first_name&&o.last_name?`${o.first_name} ${o.last_name}`:o.username}),e.jsx(a.EmployeeEmail,{children:o.email})]},o.id))})]})});export{P as default};
