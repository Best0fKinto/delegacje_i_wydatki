import{q as d}from"./chunk-4WY6JWTD-DBnPwoI9.js";import{l as r,c as t,d as l}from"./colors-CR5HX9a0.js";const n=r`
  font-family: 'Montserrat';
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.1s ease-out;
`,i=r`
  ${n};
  font-size: 16px;
  padding: 4px 8px;
  background-color: ${t.navy[2]};

  &:hover {
    background-color: ${t.navy[3]};
  }

  &:active {
    background-color: ${t.navy[3]};
    filter: brightness(1.05);
  }
`,p=r`
  ${n};
  background-color: transparent;
  font-size: 16px;
  color: ${t.white};

  &:hover {
    background-color: transparent;
    text-decoration: underline;
  }
`,b={Button:l.button`
    ${({variant:o})=>{switch(o){case"text":return p;default:return i}}}
  `},g=({children:o,onClick:e,type:s="button",className:a,variant:c="default",disabled:u})=>d.jsx(b.Button,{onClick:e,type:s,className:a,variant:c,disabled:u,children:o});export{g as B,i as d};
