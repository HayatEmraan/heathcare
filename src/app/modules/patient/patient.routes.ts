import { Router } from "express";
import { zodValidation } from "../../middlewares/globalValidation";
import { patientValidation } from "./patient.validation";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { patientController } from "./patient.controller";

const patientRoutes = Router();

patientRoutes.get(
  "/get-patients",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  patientController.retrievePatients
);

patientRoutes.get("/get-patient/:id", patientController.getPatientById);

patientRoutes.delete(
  "/delete-patient/:id",
  patientController.deletePatientById
);

patientRoutes.patch(
  "/update-patient/:id",
  zodValidation(patientValidation.update),
  patientController.updatePatientById
);

export default patientRoutes;
