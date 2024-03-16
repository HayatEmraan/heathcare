import express, { Application } from "express";
export const app: Application = express();
import cors from "cors";

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
