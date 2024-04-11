import { Router } from "express";
import { specialtiesController } from "./specialties.controller";
import { zodValidation } from "../../middlewares/globalValidation";
import { specialtiesValidation } from "./specialties.validation";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const specialtiesRoutes = Router();

specialtiesRoutes.post(
  "/create-specialties",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  zodValidation(specialtiesValidation.createSpecialties),
  specialtiesController.createSpecialties
);

specialtiesRoutes.get("/get-specialties", specialtiesController.getSpecialties);

export default specialtiesRoutes;
