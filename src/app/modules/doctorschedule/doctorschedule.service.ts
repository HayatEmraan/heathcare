import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertScheduleIntoDB = async () => {
  return {
    something: true,
  };
};

export const scheduleService = {
  insertScheduleIntoDB,
};
