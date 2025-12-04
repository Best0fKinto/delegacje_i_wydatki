import styled from "styled-components"
import { colors } from "src/constants/colors";
import { NavLink } from "react-router";
import { routes } from "src/constants/routes"
import { defaultButtonStyles } from "src/constants/styles";

const sideBarRoutes = [
  { name: 'Home', path: routes.home },
  { name: 'Delegations', path: routes.delegations },
]

const S = {
  Sidebar: styled.aside`
    width: 215px;
    padding: 8px;
    background-color: ${colors.navy[2]};
    /* height: 100%; */
  `,
  Nav: styled.nav`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  NavLink: styled(NavLink)`
    ${defaultButtonStyles};
    text-decoration: none;
    color: ${colors.white};
    padding: 12px 4px;

    &:hover {
      color: ${colors.white};
    }
  `,
};

export const Sidebar = () => {
  return <S.Sidebar>
    <S.Nav>
      {sideBarRoutes.map(({ name, path }) => (
        <S.NavLink key={path} to={path}>
          {name}
        </S.NavLink>
      ))}
    </S.Nav>
  </S.Sidebar>;
}