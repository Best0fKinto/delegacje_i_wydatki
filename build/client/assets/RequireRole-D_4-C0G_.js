import{x as c,q as e,z as t}from"./chunk-4WY6JWTD-DBnPwoI9.js";import{g as m}from"./apiClient-ctOkRHlj.js";import{r as o}from"./routes-Co3Hordx.js";import{c as p,d as f}from"./colors-CR5HX9a0.js";import{u as d}from"./AuthContext-DQnsZs3F.js";const g=f.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: ${p.grey[6]};
  font-size: 16px;
`;function y({children:a,allowedRoles:s}){const n=c(),{user:r,isLoading:i,error:u}=d(),l=m();return i?e.jsx(g,{children:"Sprawdzanie uprawnień..."}):!l||u||!r?e.jsx(t,{to:o.login,state:{from:n},replace:!0}):s.includes(r.role)?e.jsx(e.Fragment,{children:a}):r.role==="admin"?e.jsx(t,{to:o.adminDashboard,replace:!0}):r.role==="manager"?e.jsx(t,{to:o.managerDashboard,replace:!0}):e.jsx(t,{to:o.delegations,replace:!0})}export{y as R};
