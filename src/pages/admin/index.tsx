import { RequireRole } from "src/components/RequireRole";
import AdminDashboard from "./dashboard/index";

export default function AdminDashboardWrapper() {
  return (
    <RequireRole allowedRoles={['admin']}>
      <AdminDashboard />
    </RequireRole>
  );
}
