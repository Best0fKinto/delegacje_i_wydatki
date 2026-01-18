import{w as i,v as c,a as s,q as l}from"./chunk-4WY6JWTD-DBnPwoI9.js";import{r}from"./routes-Co3Hordx.js";import{a as p}from"./auth-BtFPvg-z.js";import{g as u}from"./apiClient-ctOkRHlj.js";import{c as m,d}from"./colors-CR5HX9a0.js";const f=d.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: ${m.grey[6]};
  font-size: 16px;
`,j=i(function(){const e=c(),[n,t]=s.useState(!0);return s.useEffect(()=>{(async()=>{if(!u()){e(r.login,{replace:!0}),t(!1);return}try{const a=(await p.me()).employee.role;a==="admin"?e(r.adminDashboard,{replace:!0}):a==="manager"?e(r.managerDashboard,{replace:!0}):e(r.delegations,{replace:!0})}catch(o){console.error("Failed to get user data:",o),e(r.login,{replace:!0})}finally{t(!1)}})()},[e]),n?l.jsx(f,{children:"Ładowanie..."}):null});export{j as default};
