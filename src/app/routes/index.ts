import { Router } from "express";
import userRouter from "../modules/user/user.routes";
import adminRoutes from "../modules/admin/admin.routes";
import authRoutes from "../modules/auth/auth.routes";

const routes = Router();

const bulkRoutes = [
  {
    path: "/user",
    router: userRouter,
  },
  {
    path: "/admin",
    router: adminRoutes,
  },
  {
    path: "/auth",
    router: authRoutes,
  },
];

bulkRoutes.forEach((route) => routes.use(route.path, route.router));

export default routes;
