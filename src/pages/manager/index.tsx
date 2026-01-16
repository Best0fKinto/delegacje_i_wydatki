import { RequireRole } from "src/components/RequireRole";
import ManagerDashboard from "./dashboard/index";

export default function ManagerDashboardWrapper() {
  return (
    <RequireRole allowedRoles={['manager', 'admin']}>
      <ManagerDashboard />
    </RequireRole>
  );
}
