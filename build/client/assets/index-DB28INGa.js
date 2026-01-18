import{w as j,v,a as l,q as e}from"./chunk-4WY6JWTD-DBnPwoI9.js";import{c as s,d as a}from"./colors-CR5HX9a0.js";import{B as z}from"./index-CiXxZgXT.js";import{a as f}from"./auth-BtFPvg-z.js";import{r as p}from"./routes-Co3Hordx.js";import{g as S}from"./apiClient-ctOkRHlj.js";import{u as k}from"./AuthContext-DQnsZs3F.js";import{T as C}from"./TextField-BqbKARkj.js";import"./Modal-BugdIcMr.js";import"./index-TJkuZCev.js";const t={Wrapper:a.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, ${s.navy[2]} 0%, ${s.blue[1]} 100%);
  `,LoginCard:a.div`
    background: ${s.white};
    padding: 48px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
  `,Title:a.h1`
    margin: 0 0 32px 0;
    color: ${s.navy[2]};
    text-align: center;
    font-size: 28px;
  `,Form:a.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,TextField:a(C)`
    width: 100%;
  `,SubmitButton:a(z)`
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: 600;
  `,ErrorMessage:a.p`
    color: ${s.red[1]};
    font-size: 14px;
    margin: 0;
    text-align: center;
  `,InfoMessage:a.p`
    color: ${s.grey[3]};
    font-size: 14px;
    margin: 0;
    text-align: center;
  `},A=j(function(){const i=v(),{refetchUser:h}=k(),[m,w]=l.useState(""),[u,b]=l.useState(""),[g,r]=l.useState(null),[d,c]=l.useState(!1);l.useEffect(()=>{S()&&i(p.delegations,{replace:!0})},[i]);const y=async o=>{if(o.preventDefault(),r(null),!m||!u){r("Proszę wypełnić wszystkie pola");return}try{c(!0),await f.login({email:m.trim(),password:u}),await h();const x=(await f.me()).employee.role;i(x==="admin"?p.adminDashboard:x==="manager"?p.managerDashboard:p.delegations)}catch(n){console.error("Login failed:",n),n?.statusCode===401?r("Nieprawidłowy email lub hasło"):n?.statusCode===403?r("Konto jest nieaktywne"):r(n?.data?.message||"Błąd logowania. Spróbuj ponownie.")}finally{c(!1)}};return e.jsx(t.Wrapper,{children:e.jsxs(t.LoginCard,{children:[e.jsx(t.Title,{children:"Delegacje i wydatki"}),e.jsxs(t.Form,{onSubmit:y,children:[e.jsx(t.TextField,{label:"Email",type:"email",value:m,onChange:o=>w(o.target.value),disabled:d,autoComplete:"email",autoFocus:!0}),e.jsx(t.TextField,{label:"Hasło",type:"password",value:u,onChange:o=>b(o.target.value),disabled:d,autoComplete:"current-password"}),g&&e.jsx(t.ErrorMessage,{children:g}),e.jsx(t.SubmitButton,{type:"submit",disabled:d,children:d?"Logowanie...":"Zaloguj"}),e.jsx(t.InfoMessage,{children:"Zaloguj się, aby zarządzać delegacjami i wydatkami"})]})]})})});export{A as default};
