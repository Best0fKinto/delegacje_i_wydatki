import {
  type RouteConfig,
  layout,
  index,
  route,
  // route,
} from "@react-router/dev/routes";
import { routes } from "./constants/routes";

// export default [
//   // * matches all URLs, the ? makes it optional so it will match / as well
//   route(routes.home.path, routes.home.file),
// ] satisfies RouteConfig;

export default [
  layout('./layouts/Home.tsx', [
    index('./pages/home-page/index.tsx'),
    route(routes.delegations, './pages/delegations/index.tsx'),
  ]),
] satisfies RouteConfig;