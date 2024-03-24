import { PrismaClient, UserStatus } from "@prisma/client";
import { generateToken } from "../../utils/generateToken";
import { JWT_ACCESS_EXPIRE, JWT_REFRESH_EXPIRE } from "../../config";
import { bcryptCompare } from "../../utils/bcrypt";
import { extractingToken } from "../../utils/extracToken";
import { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

const loginWithDB = async (payload: { email: string; password: string }) => {
  const findUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const matchingPassword = await bcryptCompare(
    payload.password,
    findUser.password
  );

  if (!matchingPassword) {
    throw new Error("email or password not matched!");
  }

  const payloadToken = {
    email: findUser.email,
    role: findUser.role,
  };

  const accessToken = generateToken(payloadToken, JWT_ACCESS_EXPIRE as string);
  const refreshToken = generateToken(
    payloadToken,
    JWT_REFRESH_EXPIRE as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const accessTokenFromRFT = async (token: string) => {
  const verifyToken = (await extractingToken(token)) as JwtPayload;
  
  const findUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: verifyToken.email,
      status: UserStatus.ACTIVE,
    },
  });

  const payloadToken = {
    email: findUser.role,
    role: findUser.role,
  };

  const accessToken = await generateToken(
    payloadToken,
    JWT_ACCESS_EXPIRE as string
  );
  return {
    accessToken,
  };
};

export const authService = {
  loginWithDB,
  accessTokenFromRFT,
};
