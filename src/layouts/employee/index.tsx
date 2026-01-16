import { Outlet } from "react-router";
import { RequireRole } from "src/components/RequireRole";

/**
 * Layout requiring employee role
 * Used for routes that should only be accessible by employees
 */
export default function EmployeeLayout() {
  return (
    <RequireRole allowedRoles={['employee']}>
      <Outlet />
    </RequireRole>
  );
}
