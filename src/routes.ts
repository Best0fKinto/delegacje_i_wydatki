import {
  type RouteConfig,
  // layout,
  // index,
  route,
} from "@react-router/dev/routes";

// export default [
//   // * matches all URLs, the ? makes it optional so it will match / as well
//   route(routes.home.path, routes.home.file),
// ] satisfies RouteConfig;

export default [
  route('/', './pages/home-page/Home.tsx'),
] satisfies RouteConfig;