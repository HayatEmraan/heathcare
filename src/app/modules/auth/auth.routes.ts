import { Router } from "express";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";
import { zodValidation } from "../../middlewares/globalValidation";

const authRoutes = Router();

authRoutes.post(
  "/login",
  zodValidation(authValidation.Login),
  authController.login
);

authRoutes.post("/get-access-token", authController.accessToken);

export default authRoutes;
