import { Patient, Prisma, PrismaClient, UserStatus } from "@prisma/client";
import { searchFields } from "./patient.constant";
import { sortingQuery } from "../../utils/sorting";
import { paginationQuery } from "../../utils/pagination";
import { IMeta } from "../../interface";

const prisma = new PrismaClient();

interface IPatientResult {
  data: Patient[];
  meta: IMeta;
}

const retrievePatientFromDB = async (
  query: Record<string, any>
): Promise<IPatientResult> => {
  const { searchQuery, page, limit, sortBy, orderBy, ...filterQuery } = query;
  const { skip, limitNumber, pageNumber } = await paginationQuery(page, limit);

  const sorting = await sortingQuery({ sortBy, orderBy });

  const conditions: Prisma.PatientWhereInput[] = [];

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

  const result = await prisma.patient.findMany({
    where: {
      AND: conditions,
    },
    skip,
    take: limitNumber,
    orderBy: sorting,
  });

  const total = await prisma.patient.count({
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

const retrieveSinglePatientFromDB = async (
  id: string
): Promise<Patient | null> => {
  // checking Patient
  const findPatient = await prisma.patient.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!findPatient) {
    throw new Error("Patient isn't found");
  }
  return findPatient;
};

const updateSinglePatientFromDB = async (
  id: string,
  data: Partial<Patient>
): Promise<Patient | null> => {
  // checking Patient
  const findPatient = await prisma.patient.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!findPatient) {
    throw new Error("Patient isn't found");
  }

  const updatePatient = await prisma.patient.update({
    where: {
      id,
    },
    data,
  });

  return updatePatient;
};

const deleteSinglePatientFromDB = async (
  id: string
): Promise<Patient | null> => {
  // checking Patient
  const findPatient = await prisma.patient.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!findPatient) {
    throw new Error("Patient isn't found");
  }

  const softDeletePatient = prisma.patient.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });

  const softDeleteUser = prisma.user.update({
    where: {
      email: findPatient.email,
    },
    data: {
      status: UserStatus.DELETED,
    },
  });

  const [softDelete] = await prisma.$transaction([
    softDeletePatient,
    softDeleteUser,
  ]);

  return softDelete;
};

export const patientService = {
  retrievePatientFromDB,
  retrieveSinglePatientFromDB,
  deleteSinglePatientFromDB,
  updateSinglePatientFromDB,
};
