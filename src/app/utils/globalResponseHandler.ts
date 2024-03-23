import { Response } from "express";
import { IMeta } from "../interface";

interface IOutput {
  status: number;
  message: string;
  meta?: IMeta;
  data: Record<string, any> | null;
}

export const globalResponse = async (res: Response, output: IOutput) => {
  return res.status(output.status | 500).send({
    message: output.message,
    data: output.data,
    meta: output.meta,
  });
};
