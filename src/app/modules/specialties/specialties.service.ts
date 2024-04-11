import { PrismaClient, Specialties } from "@prisma/client";
import { uploadCloud } from "../../utils/image";

const prisma = new PrismaClient();

const insertIntoDBSpecialties = async (
  payload: Specialties,
  file: Record<string, any> | undefined
) => {
  let photoURL;
  if (file) {
    photoURL = await uploadCloud(file.path);
  }
  return await prisma.specialties.create({
    data: {
      ...payload,
      icon: photoURL!.secure_url,
    },
  });
};

const retrieveSpecialtiesFromDB = async () => {
  return await prisma.specialties.findMany({});
};

const deleteSpecialtiesFromDB = async (id: string) => {
  return await prisma.specialties.delete({
    where: {
      id,
    },
  });
};

export const specialtiesService = {
  insertIntoDBSpecialties,
  retrieveSpecialtiesFromDB,
  deleteSpecialtiesFromDB,
};
