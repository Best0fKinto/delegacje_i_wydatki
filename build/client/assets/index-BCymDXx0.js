import{w as I,v as P,a as r,q as e}from"./chunk-4WY6JWTD-DBnPwoI9.js";import{c as i,d as n}from"./colors-CR5HX9a0.js";import{B as z}from"./index-CiXxZgXT.js";import{a as S}from"./admin-BecAp--m.js";import{r as M}from"./routes-Co3Hordx.js";import{I as $,S as H,k as N,T as q}from"./TextField-BqbKARkj.js";import{M as F}from"./MenuItem-D8mq6nM6.js";import"./apiClient-ctOkRHlj.js";import"./Modal-BugdIcMr.js";import"./index-TJkuZCev.js";const t={Wrapper:n.section`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `,Header:n.div`
    width: 100%;
    max-width: 800px;
    padding-inline: 60px;
    box-sizing: border-box;
  `,BackButton:n.button`
    background: none;
    border: none;
    color: ${i.blue[1]};
    cursor: pointer;
    font-size: 14px;
    padding: 8px 0;
    margin-bottom: 16px;

    &:hover {
      text-decoration: underline;
    }
  `,Heading:n.h1`
    margin: 0 0 32px 0;
    color: ${i.grey[8]};
  `,Form:n.form`
    width: 100%;
    max-width: 800px;
    padding-inline: 60px;
    box-sizing: border-box;
    background: ${i.white};
    border: 1px solid ${i.grey[2]};
    border-radius: 8px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,TextField:n(q)`
    width: 100%;
  `,FormControl:n(N)`
    width: 100%;
  `,ButtonGroup:n.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  `,ErrorMessage:n.p`
    color: ${i.red[1]};
    font-size: 14px;
    margin: 0;
  `,SuccessMessage:n.p`
    color: ${i.green[2]};
    font-size: 14px;
    margin: 0;
  `},Q=I(function(){const m=P(),[d,x]=r.useState(""),[u,g]=r.useState(""),[c,h]=r.useState(""),[p,b]=r.useState(""),[C,B]=r.useState([]),[f,l]=r.useState(null),[w,y]=r.useState(null),[s,j]=r.useState(!1),[E,v]=r.useState(!0);r.useEffect(()=>{(async()=>{try{v(!0);const o=await S.listManagers();B(o)}catch(o){console.error("Failed to fetch managers:",o),l("Nie udało się pobrać listy menedżerów")}finally{v(!1)}})()},[]);const k=()=>{m(M.adminDashboard)},T=async a=>{if(a.preventDefault(),l(null),y(null),!d||!u||!c){l("Wszystkie pola (oprócz menedżera) są wymagane");return}if(c.length<8){l("Hasło musi mieć minimum 8 znaków");return}try{j(!0),await S.createEmployee({username:d,email:u,password:c,manager_id:p===""?void 0:p}),y(`Pracownik "${d}" został utworzony pomyślnie!`),x(""),g(""),h(""),b(""),setTimeout(()=>{m(M.adminDashboard)},2e3)}catch(o){console.error("Failed to create employee:",o),l(o?.data?.message||"Nie udało się utworzyć pracownika")}finally{j(!1)}};return e.jsxs(t.Wrapper,{children:[e.jsxs(t.Header,{children:[e.jsx(t.BackButton,{onClick:k,children:"← Powrót do panelu"}),e.jsx(t.Heading,{children:"Utwórz Nowego Pracownika"})]}),e.jsxs(t.Form,{onSubmit:T,children:[e.jsx(t.TextField,{label:"Nazwa użytkownika",value:d,onChange:a=>x(a.target.value),variant:"outlined",required:!0,disabled:s}),e.jsx(t.TextField,{label:"Email",type:"email",value:u,onChange:a=>g(a.target.value),variant:"outlined",required:!0,disabled:s}),e.jsx(t.TextField,{label:"Hasło",type:"password",value:c,onChange:a=>h(a.target.value),variant:"outlined",required:!0,disabled:s,helperText:"Minimum 8 znaków"}),e.jsxs(t.FormControl,{variant:"outlined",disabled:s||E,children:[e.jsx($,{id:"manager-select-label",children:"Menedżer (opcjonalnie)"}),e.jsxs(H,{labelId:"manager-select-label",value:p,onChange:a=>b(a.target.value),label:"Menedżer (opcjonalnie)",children:[e.jsx(F,{value:"",children:e.jsx("em",{children:"Brak przypisania"})}),C.map(a=>e.jsxs(F,{value:a.id,children:[a.username," (",a.email,")"]},a.id))]})]}),f&&e.jsx(t.ErrorMessage,{children:f}),w&&e.jsx(t.SuccessMessage,{children:w}),e.jsxs(t.ButtonGroup,{children:[e.jsx(z,{type:"button",onClick:k,disabled:s,variant:"text",children:"Anuluj"}),e.jsx(z,{type:"submit",disabled:s,children:s?"Tworzenie...":"Utwórz Pracownika"})]})]})]})});export{Q as default};
