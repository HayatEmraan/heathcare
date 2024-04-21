import { PrismaClient } from "@prisma/client";
import { sslPayment } from "../../config";
const prisma = new PrismaClient();
import axios from "axios";
import appError from "../../errors/appError";
import httpStatus from "http-status";

const paymentIntent = async (id: string) => {
  const findPayment = await prisma.payment.findUniqueOrThrow({
    where: {
      appointmentId: id,
    },
    include: {
      appointment: {
        include: {
          patient: true,
        },
      },
    },
  });

  const data = {
    store_id: sslPayment.store_id,
    store_passwd: sslPayment.store_pass,
    total_amount: findPayment?.amount,
    currency: "BDT",
    tran_id: findPayment.transactionId, // use unique tran_id for each api call
    success_url: sslPayment.success_url,
    fail_url: sslPayment.fail_url,
    cancel_url: sslPayment.cancel_url,
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "N/A",
    product_name: "Appointment.",
    product_category: "HealthCare",
    product_profile: "general",
    cus_name: findPayment.appointment.patient.name,
    cus_email: "customer@example.com",
    cus_add1: "N/A",
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "N/A",
    cus_country: "Bangladesh",
    cus_phone: "N/A",
    cus_fax: "N/A",
    ship_name: findPayment.appointment.patient.name,
    ship_add1: "N/A",
    ship_add2: "N/A",
    ship_city: "N/A",
    ship_state: "N/A",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const response = await axios({
    method: "POST",
    url: sslPayment.ssl_payment_url,
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return {
    paymentURL: response.data.GatewayPageURL,
  };
};

const validatePayment = async (query: Record<string, any>) => {
  if (!query || !query.status || query.status !== "VALID") {
    throw new appError("Payment not successful", httpStatus.FORBIDDEN);
  }

  const response = await axios({
    method: "GET",
    url: `${sslPayment.validation_api}?val_id=${query.val_id}&store_id=${sslPayment.store_id}&store_passwd=${sslPayment.store_pass}&format=json`,
  });

  return {
    payment: "done",
  };
};

export const paymentService = {
  paymentIntent,
  validatePayment,
};
