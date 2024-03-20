import { Router } from "express";
import { adminController } from "./admin.controller";

const adminRoutes = Router();

adminRoutes.get("/get-admins", adminController.retrieveAdmins);

export default adminRoutes;
