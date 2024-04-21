import { PrismaClient, UserRole } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();

const insertAppointmentIntoDB = async (
  id: string,
  payload: Record<string, any>
) => {
  const doctorInfo = await prisma.doctor.findFirstOrThrow({
    where: {
      id: payload.doctorId,
      isDeleted: false,
    },
  });

  await prisma.doctorSchedules.findFirstOrThrow({
    where: {
      doctorId: payload.doctorId,
      scheduleId: payload.scheduleId,
      isBooked: false,
    },
  });

  const videoCallingId = uuidv4();
  const appointmentData = {
    patientId: id,
    doctorId: payload.doctorId,
    scheduleId: payload.scheduleId,
    videoCallingId,
  };

  return prisma.$transaction(async (tx) => {
    const createAppointment = await tx.appointment.create({
      data: appointmentData,
      include: {
        doctorSchedules: true,
        doctor: true,
        patient: true,
      },
    });

    await prisma.doctorSchedules.update({
      where: {
        doctorId_scheduleId: {
          doctorId: payload.doctorId,
          scheduleId: payload.scheduleId,
        },
      },
      data: {
        isBooked: true,
        appointmentId: createAppointment.id,
      },
    });

    const today = new Date();

    const transactionId =
      "HealthCare" +
      "-" +
      today.getFullYear() +
      +today.getDay() +
      +today.getHours() +
      today.getMinutes();

    await prisma.payment.create({
      data: {
        appointmentId: createAppointment.id,
        amount: doctorInfo.appointmentFee,
        transactionId,
      },
    });

    return createAppointment;
  });
};
const retrieveAppointmentFromDB = async (user: Record<string, any>) => {
  if (user.role === UserRole.DOCTOR) {
    return await prisma.appointment.findMany({
      where: {
        doctorId: user.id,
      },
      include: {
        patient: {
          include: {
            MedicalReport: true,
            PatientHealthData: true,
          },
        },
        schedule: true,
      },
    });
  } else if (user.role === UserRole.PATIENT) {
    return await prisma.appointment.findMany({
      where: {
        patientId: user.id,
      },
      include: {
        doctor: true,
        schedule: true,
      },
    });
  }
};

const retrieveAllAppointmentFromDB = async () => {
  return await prisma.appointment.findMany({
    include: {
      doctor: true,
      patient: true,
    },
  });
};

export const appointmentService = {
  insertAppointmentIntoDB,
  retrieveAppointmentFromDB,
  retrieveAllAppointmentFromDB,
};
