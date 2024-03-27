import { Router } from "express";
import { adminController } from "./admin.controller";
import { zodValidation } from "../../middlewares/globalValidation";
import { adminValidation } from "./admin.validation";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const adminRoutes = Router();

adminRoutes.get(
  "/get-admins",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminController.retrieveAdmins
);

adminRoutes.get("/get-admin/:id", adminController.getAdminById);

adminRoutes.delete("/delete-admin/:id", adminController.deleteAdminById);

adminRoutes.patch(
  "/update-admin/:id",
  zodValidation(adminValidation.update),
  adminController.updateAdminById
);

export default adminRoutes;
