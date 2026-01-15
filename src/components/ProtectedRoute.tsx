import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { getToken } from "src/lib/apiClient";
import { routes } from "src/constants/routes";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute component
 * Checks if user is authenticated (has token in localStorage)
 * If not authenticated, redirects to login page
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
    setIsChecking(false);
  }, []);

  // Show nothing while checking authentication
  if (isChecking) {
    return null;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={routes.login} state={{ from: location }} replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
}
