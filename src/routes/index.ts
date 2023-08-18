import express from "express";
import authRoutes from "./authRoute";
import roleRoutes from "./roleRoute"
import taskRoutes from "./taskRoute";

const router = express.Router();



const defaultRoutes = [
  {
    path: "/",
    route: authRoutes,
    },
    {
        path: "/",
        route: roleRoutes,
      },
  {
    path: "/",
    route: taskRoutes,
  },
];
//require sign in common except for login and forgot password
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export { router};
