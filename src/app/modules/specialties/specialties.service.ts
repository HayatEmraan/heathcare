import { PrismaClient, Specialties } from "@prisma/client";

const prisma = new PrismaClient();

const insertIntoDBSpecialties = async (payload: Specialties) => {
  return await prisma.specialties.create({
    data: payload,
  });
};

const retrieveSpecialtiesFromDB = async (payload: Specialties) => {
  return await prisma.specialties.findMany({});
};

export const specialtiesService = {
  insertIntoDBSpecialties,
  retrieveSpecialtiesFromDB,
};
