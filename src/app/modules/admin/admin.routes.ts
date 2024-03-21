import { Router } from "express";
import { adminController } from "./admin.controller";

const adminRoutes = Router();

adminRoutes.get("/get-admins", adminController.retrieveAdmins);

adminRoutes.get("/get-admin/:id", adminController.getAdminById);

adminRoutes.delete("/delete-admin/:id", adminController.deleteAdminById);

adminRoutes.patch("/update-admin/:id", adminController.updateAdminById);

export default adminRoutes;
