import styled from "styled-components"

const S = {
  Sidebar: styled.aside`
    width: 250px;
    height: 100%;
  `,
};

export const Sidebar = () => {
  return <S.Sidebar>Sidebar</S.Sidebar>;
}