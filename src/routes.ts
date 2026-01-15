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
    route(routes.delegations, './pages/delegations/index.tsx'),
    route(routes.createDelegation, './pages/create-delegation/index.tsx'),
  ]),
] satisfies RouteConfig;