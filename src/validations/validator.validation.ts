import { z } from "zod";

export interface Params {
  key: string;
  value: string;
}

export const validator = (params: Params, schema: any): any => {
  try {
    const validated = z.object(schema).parse(params);
    return { ok: true, data: validated };
  } catch (error) {
    return { ok: false, error: JSON.stringify(error) };
  }
};
