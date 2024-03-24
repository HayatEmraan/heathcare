import bcrypt from "bcrypt";

export const bcryptHash = async (password: string, salt: string) => {
  return await bcrypt.hash(password as string, Number(salt));
};

export const bcryptCompare = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
