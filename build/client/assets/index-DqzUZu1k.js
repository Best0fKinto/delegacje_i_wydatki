import{w as T,v as M,a as i,q as e}from"./chunk-4WY6JWTD-DBnPwoI9.js";import{c as s,d as t}from"./colors-CR5HX9a0.js";import{B as v}from"./index-CiXxZgXT.js";import{a as B}from"./admin-BecAp--m.js";import{r as j}from"./routes-Co3Hordx.js";import{T as E}from"./TextField-BqbKARkj.js";import"./apiClient-ctOkRHlj.js";import"./Modal-BugdIcMr.js";import"./index-TJkuZCev.js";const a={Wrapper:t.section`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `,Header:t.div`
    width: 100%;
    max-width: 800px;
    padding-inline: 60px;
    box-sizing: border-box;
  `,BackButton:t.button`
    background: none;
    border: none;
    color: ${s.blue[1]};
    cursor: pointer;
    font-size: 14px;
    padding: 8px 0;
    margin-bottom: 16px;

    &:hover {
      text-decoration: underline;
    }
  `,Heading:t.h1`
    margin: 0 0 32px 0;
    color: ${s.grey[8]};
  `,Form:t.form`
    width: 100%;
    max-width: 800px;
    padding-inline: 60px;
    box-sizing: border-box;
    background: ${s.white};
    border: 1px solid ${s.grey[2]};
    border-radius: 8px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,TextField:t(E)`
    width: 100%;
  `,ButtonGroup:t.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  `,ErrorMessage:t.p`
    color: ${s.red[1]};
    font-size: 14px;
    margin: 0;
  `,SuccessMessage:t.p`
    color: ${s.green[2]};
    font-size: 14px;
    margin: 0;
  `},L=T(function(){const c=M(),[l,m]=i.useState(""),[p,x]=i.useState(""),[u,g]=i.useState(""),[h,o]=i.useState(null),[b,f]=i.useState(null),[n,w]=i.useState(!1),y=()=>{c(j.adminDashboard)},z=async r=>{if(r.preventDefault(),o(null),f(null),!l||!p||!u){o("Wszystkie pola są wymagane");return}if(u.length<8){o("Hasło musi mieć minimum 8 znaków");return}try{w(!0),await B.createManager({username:l,email:p,password:u}),f(`Menedżer "${l}" został utworzony pomyślnie!`),m(""),x(""),g(""),setTimeout(()=>{c(j.adminDashboard)},2e3)}catch(d){if(console.error("Failed to create manager:",d),d?.data?.error==="DUPLICATE"){const k=d?.data?.field||"unknown",S=d?.data?.message||"This value already exists";o(`${k==="email"?"Email":"Nazwa użytkownika"}: ${S}`)}else o(d?.data?.message||"Nie udało się utworzyć menedżera")}finally{w(!1)}};return e.jsxs(a.Wrapper,{children:[e.jsxs(a.Header,{children:[e.jsx(a.BackButton,{onClick:y,children:"← Powrót do panelu"}),e.jsx(a.Heading,{children:"Utwórz Nowego Menedżera"})]}),e.jsxs(a.Form,{onSubmit:z,children:[e.jsx(a.TextField,{label:"Nazwa użytkownika",value:l,onChange:r=>m(r.target.value),variant:"outlined",required:!0,disabled:n}),e.jsx(a.TextField,{label:"Email",type:"email",value:p,onChange:r=>x(r.target.value),variant:"outlined",required:!0,disabled:n}),e.jsx(a.TextField,{label:"Hasło",type:"password",value:u,onChange:r=>g(r.target.value),variant:"outlined",required:!0,disabled:n,helperText:"Minimum 8 znaków"}),h&&e.jsx(a.ErrorMessage,{children:h}),b&&e.jsx(a.SuccessMessage,{children:b}),e.jsxs(a.ButtonGroup,{children:[e.jsx(v,{type:"button",onClick:y,disabled:n,variant:"text",children:"Anuluj"}),e.jsx(v,{type:"submit",disabled:n,children:n?"Tworzenie...":"Utwórz Menedżera"})]})]})]})});export{L as default};
