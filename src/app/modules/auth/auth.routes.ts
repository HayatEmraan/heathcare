import { Router } from "express";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";
import { zodValidation } from "../../middlewares/globalValidation";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const authRoutes = Router();

authRoutes.post(
  "/login",
  zodValidation(authValidation.Login),
  authController.login
);

authRoutes.post(
  "/get-access-token",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  authController.accessToken
);

authRoutes.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  zodValidation(authValidation.changePassword),
  authController.changePassword
);

authRoutes.post(
  "/forgot-password",
  zodValidation(authValidation.forgotPassword),
  authController.forgotPassword
);

authRoutes.post(
  "/reset-password",
  zodValidation(authValidation.resetPassword),
  authController.resetPassword
);

export default authRoutes;
