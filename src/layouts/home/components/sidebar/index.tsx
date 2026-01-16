import styled, { css } from "styled-components"
import { colors } from "src/constants/colors";
import { NavLink } from "react-router";
import { routes } from "src/constants/routes"
import { defaultButtonStyles } from "src/constants/styles";
import { useLocation } from "react-router";
import { useAuth } from "src/contexts/AuthContext";

const navbarHeight = 72;

const S = {
  Sidebar: styled.aside`
    position: sticky;
    height: calc(100vh - ${navbarHeight + 1}px);
    top: ${navbarHeight + 1}px;
    width: 231px;
    padding: 8px;
    box-sizing: border-box;
    background-color: ${colors.navy[2]};
  `,
  Nav: styled.nav`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  NavLink: styled(NavLink)<{ isSelected?: boolean }>`
    ${defaultButtonStyles};
    text-decoration: none;
    color: ${colors.white};
    padding: 12px 4px;

    &:hover {
      color: ${colors.white};
    }

    ${({ isSelected }) => isSelected && css`
      background-color: ${colors.blue[1]};
      &:hover {
        background-color: ${colors.blue[1]};
      };

    `}
  `,
  LoadingText: styled.div`
    color: ${colors.white};
    padding: 12px 4px;
    font-size: 14px;
    opacity: 0.7;
  `,
};

export const Sidebar = () => {
  const location = useLocation();
  const { user, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <S.Sidebar>
        <S.Nav>
          <S.LoadingText>Ładowanie...</S.LoadingText>
        </S.Nav>
      </S.Sidebar>
    );
  }

  // Show empty sidebar if user not loaded
  if (!user) {
    return (
      <S.Sidebar>
        <S.Nav></S.Nav>
      </S.Sidebar>
    );
  }

  // Build sidebar routes based on user role - complete separation of panels
  let sideBarRoutes: Array<{ name: string; path: string }> = [];

  if (user.role === 'employee') {
    // Employee panel - delegations only
    sideBarRoutes = [
      { name: 'Moje delegacje', path: routes.delegations },
      { name: 'Utwórz delegację', path: routes.createDelegation },
    ];
  } else if (user.role === 'manager') {
    // Manager panel - manager dashboard only (NO delegations)
    sideBarRoutes = [
      { name: 'Dashboard', path: routes.managerDashboard },
    ];
  } else if (user.role === 'admin') {
    // Admin panel - admin dashboard and user management only (NO delegations)
    sideBarRoutes = [
      { name: 'Dashboard', path: routes.adminDashboard },
      { name: 'Utwórz Menedżera', path: routes.adminCreateManager },
      { name: 'Utwórz Pracownika', path: routes.adminCreateEmployee },
    ];
  }
  // No fallback - if role doesn't match, empty sidebar

  return (
    <S.Sidebar>
      <S.Nav>
        {sideBarRoutes.map(({ name, path }) => (
          <S.NavLink key={path} to={path} isSelected={path === location.pathname}>
            {name}
          </S.NavLink>
        ))}
      </S.Nav>
    </S.Sidebar>
  );
}