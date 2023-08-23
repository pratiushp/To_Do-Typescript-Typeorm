import express from "express";
import authRoutes from "./authRoute";
import roleRoutes from "./roleRoute";
import taskRoutes from "./taskRoute";
import userAuth from "./userAuth";
import uploadRoutes from "./uploadRoute"
import { requireSignIn } from "../middlware/authMiddleware";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/",
    route: authRoutes,
    requireSignIn: false, 
  },

  {
    path: "/",
    route: userAuth,
    requireSignIn: true,
  },


  {
    path: "/",
    route: roleRoutes,
    requireSignIn: true, 
  },
  {
    path: "/",
    route: taskRoutes,
    requireSignIn: true, 
  },
  {
    path: "/",
    route: uploadRoutes,
    requireSignIn: true, 
  },
];

defaultRoutes.forEach((route) => {
  if (route.requireSignIn) {
    router.use(route.path, requireSignIn, route.route);
  } else {
    router.use(route.path, route.route);
  }
});

export { router };
