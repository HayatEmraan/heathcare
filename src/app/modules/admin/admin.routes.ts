import { Router } from "express";
import { adminController } from "./admin.controller";
import { zodValidation } from "../../utils/globalValidation";
import { adminValidation } from "./admin.validation";

const adminRoutes = Router();

adminRoutes.get("/get-admins", adminController.retrieveAdmins);

adminRoutes.get("/get-admin/:id", adminController.getAdminById);

adminRoutes.delete("/delete-admin/:id", adminController.deleteAdminById);

adminRoutes.patch(
  "/update-admin/:id",
  zodValidation(adminValidation.update),
  adminController.updateAdminById
);

export default adminRoutes;
