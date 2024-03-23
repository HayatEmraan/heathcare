import { Request, Response } from "express";


export const notFound = async (req: Request, res: Response) => {
  return res.status(404).send({
    success: false,
    message: "route isn't found",
    error: {
      path: req.originalUrl,
    },
  });
};