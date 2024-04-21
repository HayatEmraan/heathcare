import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { paymentController } from "./payment.controller";

const paymentRoutes = Router();

paymentRoutes.post(
  "/payment-init/:appointmentId",
  auth(UserRole.PATIENT),
  paymentController.createInit
);

paymentRoutes.get("/ipn", paymentController.validationPaymentIntent);

export default paymentRoutes;
