import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";
import { routes } from "./constants/routes";

// export default [
//   // * matches all URLs, the ? makes it optional so it will match / as well
//   route(routes.home.path, routes.home.file),
// ] satisfies RouteConfig;

export default Object.values(routes).map(({ path, file }) =>
  route(path, file)
) satisfies RouteConfig;