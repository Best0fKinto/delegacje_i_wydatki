import {
  type RouteConfig,
  layout,
  index,
  route,
} from "@react-router/dev/routes";
import { routes } from "./constants/routes";

export default [
  // Login route (public, no layout)
  route(routes.login, './pages/login/index.tsx'),
  
  // Protected routes with layout
  layout('./layouts/protected/index.tsx', [
    // Redirect root to delegations
    index('./pages/root-redirect/index.tsx'),
    
    // Employee routes (requires employee role)
    layout('./layouts/employee/index.tsx', [
      route(routes.delegations, './pages/delegations/index.tsx'),
      route(routes.createDelegation, './pages/create-delegation/index.tsx'),
    ]),
    
    // Manager routes (requires manager role)
    layout('./layouts/manager/index.tsx', [
      route(routes.managerDashboard, './pages/manager/index.tsx'),
      route(routes.managerEmployee, './pages/manager/employee/[id]/index.tsx'),
      route(routes.managerDelegation, './pages/manager/delegation/[id]/index.tsx'),
    ]),
    
    // Admin routes (requires admin role)
    layout('./layouts/admin/index.tsx', [
      route(routes.adminDashboard, './pages/admin/index.tsx'),
      route(routes.adminManager, './pages/admin/manager/[id]/index.tsx'),
      route(routes.adminEmployee, './pages/admin/employee/[id]/index.tsx'),
      route(routes.adminDelegation, './pages/admin/delegation/[id]/index.tsx'),
      route(routes.adminCreateManager, './pages/admin/create-manager/index.tsx'),
      route(routes.adminCreateEmployee, './pages/admin/create-employee/index.tsx'),
    ]),
  ]),
] satisfies RouteConfig;