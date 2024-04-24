import { Prisma, PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

const insertScheduleIntoDB = async (
  id: string,
  payload: Record<string, any>
) => {
  // checking doctor

  const patient = await prisma.patient.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  // checking appointment is belong to current patient

  const appointment = await prisma.appointment.findUniqueOrThrow({
    where: {
      doctorId: payload.doctorId,
      id: payload.appointmentId,
      patientId: id,
    },
  });

  return await prisma.review.create({
    data: {
      comment: payload.comment,
      rating: payload.rating,
      appointmentId: appointment.id,
      patientId: patient.id,
      doctorId: payload.doctorId,
    },
  });
};

const getMyReviewFromDB = async (user: Record<string, any>) => {
  if (user.role === UserRole.ADMIN || UserRole.SUPER_ADMIN) {
    return await prisma.review.findMany({});
  } else if (user.role === UserRole.DOCTOR) {
    return await prisma.review.findMany({
      where: {
        doctorId: user.id,
      },
    });
  } else {
    return await prisma.review.findMany({
      where: {
        patientId: user.id,
      },
    });
  }
};

export const reviewService = {
  insertScheduleIntoDB,
  getMyReviewFromDB,
};
