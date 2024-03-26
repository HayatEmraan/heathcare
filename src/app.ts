import express, { Application } from "express";
export const app: Application = express();
import env from "dotenv";
import cors from "cors";
import { errorHandler } from "./app/errors/errorHandler";
import routes from "./app/routes";
import { notFound } from "./app/utils/notfound";
import cookieParser from "cookie-parser";
env.config({
  path: process.cwd() + ".env",
});

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
