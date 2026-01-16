import { Outlet } from "react-router";
import { RequireRole } from "src/components/RequireRole";

/**
 * Layout requiring manager role only
 * Used for routes that should be accessible only by managers
 * Admins have their own separate admin routes
 */
export default function ManagerLayout() {
  return (
    <RequireRole allowedRoles={['manager']}>
      <Outlet />
    </RequireRole>
  );
}
