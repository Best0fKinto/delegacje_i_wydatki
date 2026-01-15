import { useEffect } from "react";
import { useNavigate } from "react-router";
import { routes } from "src/constants/routes";

/**
 * Root redirect component
 * Redirects from / to /delegations
 */
export default function RootRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(routes.delegations, { replace: true });
  }, [navigate]);

  return null;
}
