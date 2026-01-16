// type RouteProps = {
//   path: string;
//   file: string;
// };

// const homeRoutes = {
//   homeDefault: "/",
// }

// export const routes: Record<string, string> = {
//   ...homeRoutes,
// }
// export const routeToFileMap: Record<string, string> = {
//   homeDefault: './pages/home-page/Home.tsx',
// };

// export const routesWithEntries: Array<RouteProps> = Object.entries(routes).map(([key, path]) => ({
//   path,
//   file: routeToFileMap[key],
// }));

export const routes = {
  login: '/login',
  delegations: '/delegations',
  createDelegation: '/delegations/create',
  
  // Manager routes
  managerDashboard: '/manager',
  managerEmployee: '/manager/employees/:id',
  
  // Admin routes
  adminDashboard: '/admin',
  adminManager: '/admin/managers/:id',
  adminEmployee: '/admin/employees/:id',
  adminCreateManager: '/admin/create-manager',
  adminCreateEmployee: '/admin/create-employee',
}

