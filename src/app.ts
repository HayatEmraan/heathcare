import express, { Application } from "express";
export const app: Application = express();
import cors from "cors";
import { errorHandler } from "./app/errors/errorHandler";
import routes from "./app/routes";
import cookieParser from "cookie-parser";
import { notFound } from "./app/middlewares/notfound";
import cron from "node-cron";
import { appointmentService } from "./app/modules/appointment/appointment.service";
// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// api route middleware
app.use("/api/v1", routes);

// not found route
app.use("*", notFound);

// error handler
app.use(errorHandler);

// time scheduler

cron.schedule("* * * * *", () => {
  try {
    appointmentService.cancelUnpaidAppointment();
  } catch (error) {
    console.log(error);
  }
});
