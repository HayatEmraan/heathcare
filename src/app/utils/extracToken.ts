import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const extractingToken = async (token: string) => {
  return await jwt.verify(token, JWT_SECRET as string);
};
