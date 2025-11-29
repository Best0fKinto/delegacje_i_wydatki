type RouteProps = {
  path: string;
  file: string;
};

export const routes: Record<string, RouteProps> = {
  home: {
    path: "/",
    file: "App.tsx",
  },
}