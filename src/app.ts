import express, { Application } from "express";
export const app: Application = express();
import cors from "cors";
import { errorHandler } from "./app/utils/errorHandler";
import routes from "./app/routes";
import { notFound } from "./app/utils/notfound";

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api route middleware
app.use("/api/v1", routes);

// not found route
app.use("*", notFound);

// error handler
app.use(errorHandler);
