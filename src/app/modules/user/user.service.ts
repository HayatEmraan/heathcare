import { Prisma, PrismaClient, UserRole } from "@prisma/client";
import { bcryptHash } from "../../utils/bcrypt";
import { BCRYPT_SALT } from "../../config";
const prisma = new PrismaClient();

const userCreate = async (data: Record<string, any>) => {
  const hash = await bcryptHash(data.password, BCRYPT_SALT as string)

  const user: Prisma.UserCreateInput = {
    email: data.email as string,
    password: hash,
  };

  if (data.role) {
    user.role = data.role as UserRole;
  }

  const userTransaction = prisma.user.create({
    data: user,
  });

  let result;
  if (data.admin) {
    const adminTransaction = prisma.admin.create({
      data: {
        ...data.admin,
        email: data.email as string,
      },
    });

    result = await prisma.$transaction([userTransaction, adminTransaction]);
  } else if (data.patient) {
    const patientTransaction = prisma.patient.create({
      data: {
        ...data.patient,
        email: data.email as string,
      },
    });
    result = await prisma.$transaction([userTransaction, patientTransaction]);
  } else if (data.doctor) {
    const doctorTransaction = prisma.doctor.create({
      data: {
        ...data.doctor,
        email: data.email as string,
      },
    });
    result = await prisma.$transaction([userTransaction, doctorTransaction]);
  }

  return result![1];
};

export const userService = {
  userCreate,
};
