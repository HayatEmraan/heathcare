import { Router } from "express";
import { specialtiesController } from "./specialties.controller";
import { zodValidation } from "../../middlewares/globalValidation";
import { specialtiesValidation } from "./specialties.validation";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { upload } from "../../utils/image";
import { userUtils } from "../user/user.utils";

const specialtiesRoutes = Router();

specialtiesRoutes.post(
  "/create-specialties",
  upload.single("file"),
  userUtils.bodyParse,
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  zodValidation(specialtiesValidation.createSpecialties),
  specialtiesController.createSpecialties
);

specialtiesRoutes.delete(
  "/delete-specialties/:specialID",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  specialtiesController.deleteSpecialties
);

specialtiesRoutes.get("/get-specialties", specialtiesController.getSpecialties);

export default specialtiesRoutes;
