import { Doctor, Prisma, PrismaClient, UserStatus } from "@prisma/client";
import { searchFields } from "./doctor.constant";
import { sortingQuery } from "../../utils/sorting";
import { paginationQuery } from "../../utils/pagination";
import { IMeta } from "../../interface";

const prisma = new PrismaClient();

interface IDoctorResult {
  data: Doctor[];
  meta: IMeta;
}

const retrieveDoctorFromDB = async (
  query: Record<string, any>
): Promise<IDoctorResult> => {
  const { searchQuery, page, limit, sortBy, orderBy, ...filterQuery } = query;
  const { skip, limitNumber, pageNumber } = await paginationQuery(page, limit);

  const sorting = await sortingQuery({ sortBy, orderBy });

  const conditions: Prisma.DoctorWhereInput[] = [];

  if (searchQuery) {
    conditions.push({
      OR: searchFields.map((field) => {
        return {
          [field]: {
            contains: searchQuery,
            mode: "insensitive",
          },
        };
      }),
    });
  }
  if (filterQuery) {
    for (let key in filterQuery) {
      conditions.push({
        [key]: {
          equals: filterQuery[key],
          mode: "insensitive",
        },
      });
    }
  }

  conditions.push({
    isDeleted: false,
  });

  // console.dir(conditions, { depth: Infinity });

  const result = await prisma.doctor.findMany({
    where: {
      AND: conditions,
    },
    include: {
      doctorSpecialties: true
    },
    skip,
    take: limitNumber,
    orderBy: sorting,
  });

  const total = await prisma.doctor.count({
    where: {
      AND: conditions,
    },
  });

  return {
    data: result,
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
  };
};

const retrieveSingleDoctorFromDB = async (id: string): Promise<Doctor | null> => {
  // checking Doctor
  const findDoctor = await prisma.doctor.findUnique({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      doctorSpecialties: true
    }
  });

  if (!findDoctor) {
    throw new Error("Doctor isn't found");
  }
  return findDoctor;
};

const updateSingleDoctorFromDB = async (
  id: string,
  data: Partial<Doctor>
): Promise<Doctor | null> => {
  // checking Doctor
  const findDoctor = await prisma.doctor.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!findDoctor) {
    throw new Error("Doctor isn't found");
  }

  const updateDoctor = await prisma.doctor.update({
    where: {
      id,
    },
    data,
  });

  return updateDoctor;
};

const deleteSingleDoctorFromDB = async (id: string): Promise<Doctor | null> => {
  // checking Doctor
  const findDoctor = await prisma.doctor.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!findDoctor) {
    throw new Error("Doctor isn't found");
  }

  const softDeleteDoctor = prisma.doctor.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });

  const softDeleteUser = prisma.user.update({
    where: {
      email: findDoctor.email,
    },
    data: {
      status: UserStatus.DELETED,
    },
  });

  const [softDelete] = await prisma.$transaction([
    softDeleteDoctor,
    softDeleteUser,
  ]);

  return softDelete;
};

export const doctorService = {
  retrieveDoctorFromDB,
  retrieveSingleDoctorFromDB,
  deleteSingleDoctorFromDB,
  updateSingleDoctorFromDB,
};
