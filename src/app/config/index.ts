import path from "path";
import env from "dotenv";
env.config({ path: path.join(process.cwd(), ".env") });

export const JWT_SECRET = process.env.JWT_SECRET_KEY;
export const JWT_ACCESS_EXPIRE = process.env.JWT_ACCESS_TOKEN_EXPIRE;
export const JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_TOKEN_EXPIRE;
export const BCRYPT_SALT = process.env.BCRYPT_SALT;
export const JWT_RESET_TOKEN_EXPIRE = process.env.JWT_RESET_TOKEN_EXPIRE;
export const RESET_PASS_LINK = process.env.RESET_PASS_LINK;
export const emailSender = {
  email: process.env.SMTP_USER,
  port: process.env.SMTP_PORT,
  host: process.env.SMTP_HOST,
  pass: process.env.SMTP_PASS,
};
export const cloudImage = {
  cloudName: process.env.CLOUD_NAME,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  uploadPreset: process.env.UPLOAD_PRESET,
};

export const sslPayment = {
  store_id: process.env.STORE_ID,
  store_pass: process.env.STORE_PASS,
  success_url: process.env.SUCCESS_URL,
  cancel_url: process.env.CANCEL_URL,
  fail_url: process.env.FAIL_URL,
  ssl_payment_url: process.env.SSL_PAYMENT_URL,
  validation_api: process.env.VALIDATION_URL,
};
