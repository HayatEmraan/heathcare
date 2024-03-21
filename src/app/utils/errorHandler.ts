import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = async (
  err,
  req,
  res,
  next
) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.name || "Internal Server Error",
    error: err,
  });
};
