import { Navigate, useLocation } from "react-router";
import { getToken } from "src/lib/apiClient";
import { routes } from "src/constants/routes";
import styled from "styled-components";
import { colors } from "src/constants/colors";
import { useAuth } from "src/contexts/AuthContext";

interface RequireRoleProps {
  children: React.ReactNode;
  allowedRoles: Array<'employee' | 'manager' | 'admin'>;
}

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: ${colors.grey[6]};
  font-size: 16px;
`;

/**
 * RequireRole component
 * Checks if user has the required role to access the route
 * Shows loading state while checking
 * Redirects based on authorization status
 * Uses AuthContext to avoid redundant API calls
 */
export function RequireRole({ children, allowedRoles }: RequireRoleProps) {
  const location = useLocation();
  const { user, isLoading, error } = useAuth();
  const token = getToken();

  // Show loading state while checking authentication
  if (isLoading) {
    return <LoadingWrapper>Sprawdzanie uprawnień...</LoadingWrapper>;
  }

  // Redirect to login if no token or error
  if (!token || error || !user) {
    return <Navigate to={routes.login} state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (!allowedRoles.includes(user.role)) {
    // Redirect based on actual role
    if (user.role === 'admin') {
      return <Navigate to={routes.adminDashboard} replace />;
    } else if (user.role === 'manager') {
      return <Navigate to={routes.managerDashboard} replace />;
    } else {
      return <Navigate to={routes.delegations} replace />;
    }
  }

  // Render children if authorized
  return <>{children}</>;
}
