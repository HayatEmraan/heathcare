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

interface IDoctorSpecialties {
  specialties: string;
  isDeleted: true;
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
      doctorSpecialties: true,
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

const retrieveSingleDoctorFromDB = async (
  id: string
): Promise<Doctor | null> => {
  // checking Doctor
  const findDoctor = await prisma.doctor.findUnique({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      doctorSpecialties: true,
    },
  });

  if (!findDoctor) {
    throw new Error("Doctor isn't found");
  }
  return findDoctor;
};

const updateSingleDoctorFromDB = async (
  id: string,
  data: Record<string, any>
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

  const { specialty, ...doctor } = data;

  prisma.$transaction(async (tx) => {
    await tx.doctor.update({
      where: {
        id,
      },
      data: doctor,
    });

    if (specialty && specialty.length > 0) {
      const deletedSpecialty = specialty
        .filter((sp: IDoctorSpecialties) => sp.isDeleted)
        .map((spFil: IDoctorSpecialties) => spFil.specialties);

      const updatedSpecialty = specialty
        .filter((sp: IDoctorSpecialties) => !sp.isDeleted)
        .map((spFil: IDoctorSpecialties) => {
          return {
            specialtiesId: spFil.specialties,
            doctorId: id,
          };
        });

      if (deletedSpecialty && deletedSpecialty.length > 0) {
        await tx.doctorSpecialties.deleteMany({
          where: {
            specialtiesId: {
              in: deletedSpecialty,
            },
          },
        });
      }

      if (updatedSpecialty && updatedSpecialty.length > 0) {
        for (const specialty of updatedSpecialty) {
          const result = await tx.doctorSpecialties.upsert({
            where: {
              doctorSpecialtyID: {
                specialtiesId: specialty.specialtiesId,
                doctorId: specialty.doctorId,
              },
            },
            update: {
              specialtiesId: specialty.specialtiesId,
            },
            create: specialty,
          });
        }
      }
    }
  });

  return await prisma.doctor.findUnique({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      doctorSpecialties: {
        include: {
          specialties: true,
        },
      },
    },
  });
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
