import { z } from "zod";

const Login = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

const changePassword = z.object({
  body: z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
  }),
});

const forgotPassword = z.object({
  body: z.object({
    email: z.string(),
  }),
});

const resetPassword = z.object({
  body: z.object({
    id: z.string(),
    password: z.string(),
  }),
});

export const authValidation = {
  Login,
  changePassword,
  forgotPassword,
  resetPassword,
};
