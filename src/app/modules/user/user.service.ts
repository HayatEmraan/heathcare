import {
  Admin,
  Doctor,
  Patient,
  Prisma,
  PrismaClient,
  UserRole,
  UserStatus,
} from "@prisma/client";
import { bcryptHash } from "../../utils/bcrypt";
import { BCRYPT_SALT } from "../../config";
import { uploadCloud } from "../../utils/image";
const prisma = new PrismaClient();

const userCreate = async (
  data: Record<string, any>,
  file: Record<string, any> | undefined
) => {
  const hash = await bcryptHash(data.password, BCRYPT_SALT as string);

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

  let photoURL;

  if (file) {
    photoURL = await uploadCloud(file.path);
  }
  let result;
  if (data.admin) {
    const adminTransaction = prisma.admin.create({
      data: {
        ...data.admin,
        email: data.email as string,
        photoURL: photoURL?.secure_url,
      },
    });

    result = await prisma.$transaction([userTransaction, adminTransaction]);
  } else if (data.patient) {
    const patientTransaction = prisma.patient.create({
      data: {
        ...data.patient,
        email: data.email as string,
        photoURL: photoURL?.secure_url,
      },
    });
    result = await prisma.$transaction([userTransaction, patientTransaction]);
  } else if (data.doctor) {
    const doctorTransaction = prisma.doctor.create({
      data: {
        ...data.doctor,
        email: data.email as string,
        photoURL: photoURL?.secure_url,
      },
    });
    result = await prisma.$transaction([userTransaction, doctorTransaction]);
  }

  return result![1];
};

const getMyProfile = async (email: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
  });

  let userBased;

  if (user.role === UserRole.ADMIN) {
    userBased = await prisma.admin.findUniqueOrThrow({
      where: {
        email,
        isDeleted: false,
      },
    });
  } else if (user.role === UserRole.PATIENT) {
    userBased = await prisma.patient.findUniqueOrThrow({
      where: {
        email,
        isDeleted: false,
      },
    });
  } else if (user.role === UserRole.DOCTOR) {
    userBased = await prisma.doctor.findUniqueOrThrow({
      where: {
        email,
        isDeleted: false,
      },
    });
  }

  const { password, ...others } = user;

  return {
    ...others,
    ...userBased,
  };
};

const updateMyProfile = async (
  email: string,
  payload: Partial<Admin | Doctor | Patient>,
  file: Record<string, any> | undefined
) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
  });

  let userBased;

  let photoURL;

  if (file) {
    photoURL = await uploadCloud(file.path);
  }

  if (user.role === UserRole.ADMIN) {
    userBased = await prisma.admin.update({
      where: {
        email,
        isDeleted: false,
      },
      data: {
        ...payload,
        photoURL: photoURL?.secure_url,
      },
    });
  } else if (user.role === UserRole.PATIENT) {
    userBased = await prisma.patient.update({
      where: {
        email,
        isDeleted: false,
      },
      data: {
        ...payload,
        photoURL: photoURL?.secure_url,
      },
    });
  } else if (user.role === UserRole.DOCTOR) {
    userBased = await prisma.doctor.update({
      where: {
        email,
        isDeleted: false,
      },
      data: {
        ...payload,
        photoURL: photoURL?.secure_url,
      },
    });
  }

  return userBased;
};

const updateUserStatus = async (email: string, status: UserStatus) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
  });
  return await prisma.user.update({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
    data: status,
    select: {
      password: false,
      id: true,
      email: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      role: true,
    },
  });
};

export const userService = {
  userCreate,
  getMyProfile,
  updateMyProfile,
  updateUserStatus,
};
