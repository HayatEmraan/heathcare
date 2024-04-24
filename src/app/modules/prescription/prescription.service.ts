import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

const insertScheduleIntoDB = async (
  id: string,
  payload: Record<string, any>
) => {
  // checking doctor

  const doctor = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  // checking appointment is belong to current doctor

  const appointment = await prisma.appointment.findUniqueOrThrow({
    where: {
      doctorId: id,
      id: payload.appointmentId,
      patientId: payload.patientId,
    },
  });

  return await prisma.prescription.create({
    data: {
      appointmentId: appointment.id,
      doctorId: id,
      patientId: payload.patientId,
      instructions: payload.instructions,
      followUpDate: payload.followUpDate ? payload.followUpDate : null,
    },
  });
};

const getMyPrescriptionFromDB = async (user: Record<string, any>) => {
  if (user.role === UserRole.ADMIN || UserRole.SUPER_ADMIN) {
    return await prisma.prescription.findMany({});
  } else if (user.role === UserRole.DOCTOR) {
    return await prisma.prescription.findMany({
      where: {
        doctorId: user.id,
      },
    });
  } else {
    return await prisma.prescription.findMany({
      where: {
        patientId: user.id,
      },
    });
  }
};

export const prescriptionService = {
  insertScheduleIntoDB,
  getMyPrescriptionFromDB,
};
