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
