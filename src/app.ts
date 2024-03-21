import express, { Application } from "express";
export const app: Application = express();
import cors from "cors";
import userRouter from "./app/modules/user/user.routes";
import adminRoutes from "./app/modules/admin/admin.routes";
import { errorHandler } from "./app/utils/errorHandler";

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRouter);
app.use("/api/v1", adminRoutes);

// error handler
app.use(errorHandler);
