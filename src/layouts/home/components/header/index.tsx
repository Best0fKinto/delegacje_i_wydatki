import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router";
import { colors } from "src/constants/colors";
import { Button } from "src/components/button";
import { authApi } from "src/lib/api/auth";
import { routes } from "src/constants/routes";

const S = {
  Header: styled.header`
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    height: 40px;
    background-color: #f5f5f5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: ${colors.navy[2]};
    color: ${colors.white};
  `,
  Heading: styled.h1`
    margin: 0;
    font-size: 24px;
  `,
};

export const Header = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      // authApi.logout() will:
      // 1. Try to call POST /api/auth/logout (best effort)
      // 2. ALWAYS clear token from localStorage
      await authApi.logout();
    } catch (error) {
      // This shouldn't happen as authApi.logout() catches all errors
      console.error('Unexpected logout error:', error);
    } finally {
      // Redirect to login page after logout
      navigate(routes.login, { replace: true });
    }
  };

  return <S.Header>
    <S.Heading>Delegacje</S.Heading>
    <Button 
      variant="text" 
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? 'Wylogowywanie...' : 'Wyloguj'}
    </Button>
  </S.Header>;
}