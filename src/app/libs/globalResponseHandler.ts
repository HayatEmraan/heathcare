import { Response } from "express";
import { IMeta } from "../interface";

interface IOutput {
  success: boolean;
  status: number;
  message: string;
  meta?: IMeta;
  data: Record<string, any> | null | undefined;
}

export const globalResponse = async (res: Response, output: IOutput) => {
  return res.status(output.status).send({
    success: output.success,
    message: output.message,
    data: output.data,
    meta: output.meta,
  });
};
