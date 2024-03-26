import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const generateToken = (payload: object, expire: string) => {
  return jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: expire,
  });
};
