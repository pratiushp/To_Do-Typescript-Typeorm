import express from "express"
import {authRoutes} from "./authRoute"
import {roleRoutes} from "./roleRoute"

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
  ];
  
  defaultRoutes.forEach(function (route) {
    router.use(route.path, route.route);
  });
  

export {router}