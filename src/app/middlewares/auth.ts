import { NextFunction, Request, Response } from "express";
import { extractingToken } from "../libs/extracToken";
import { PrismaClient, UserStatus } from "@prisma/client";
import appError from "../errors/appError";
import httpStatus from "http-status";

const prisma = new PrismaClient();

export const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new appError(
          "User unauthorized or access not granted",
          httpStatus.UNAUTHORIZED
        );
      }

      const decode = await extractingToken(token as string);

      const { role, email } = decode;

      if (!decode && !roles.includes(role)) {
        throw new appError(
          "User unauthorized or role not matched",
          httpStatus.UNAUTHORIZED
        );
      }

      const findUser = await prisma.user.findUniqueOrThrow({
        where: {
          email,
          status: UserStatus.ACTIVE,
        },
      });

      if (!findUser) {
        throw new appError(
          "User unauthorized or not found",
          httpStatus.UNAUTHORIZED
        );
      }
      req.user = decode;
      next();
    } catch (error) {
      next(error);
    }
  };
};
