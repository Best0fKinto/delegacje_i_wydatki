import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { routes } from "src/constants/routes";
import { authApi } from "src/lib/api";
import { getToken } from "src/lib/apiClient";
import styled from "styled-components";
import { colors } from "src/constants/colors";

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: ${colors.grey[6]};
  font-size: 16px;
`;

/**
 * Root redirect component
 * Redirects from / to appropriate dashboard based on user role
 * or to login if not authenticated
 */
export default function RootRedirect() {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const redirect = async () => {
      const token = getToken();
      
      // No token - redirect to login
      if (!token) {
        navigate(routes.login, { replace: true });
        setIsChecking(false);
        return;
      }

      try {
        const response = await authApi.me();
        // Backend returns 'employee' field
        const userRole = response.employee.role;
        
        if (userRole === 'admin') {
          navigate(routes.adminDashboard, { replace: true });
        } else if (userRole === 'manager') {
          navigate(routes.managerDashboard, { replace: true });
        } else {
          navigate(routes.delegations, { replace: true });
        }
      } catch (err) {
        // If can't get user data, redirect to login
        console.error('Failed to get user data:', err);
        navigate(routes.login, { replace: true });
      } finally {
        setIsChecking(false);
      }
    };

    redirect();
  }, [navigate]);

  if (isChecking) {
    return <LoadingWrapper>Ładowanie...</LoadingWrapper>;
  }

  return null;
}
