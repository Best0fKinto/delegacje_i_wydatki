import { Outlet } from "react-router";
import { RequireRole } from "src/components/RequireRole";

/**
 * Layout requiring admin role
 * Used for routes that should only be accessible by admins
 */
export default function AdminLayout() {
  return (
    <RequireRole allowedRoles={['admin']}>
      <Outlet />
    </RequireRole>
  );
}
