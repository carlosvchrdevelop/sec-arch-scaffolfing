import { z } from "zod";
import { Params, validator } from "./validator.validation";

export const showValidation = (params: Params) => {
  return validator(params, {
    name: z.string().min(3, "Name too short").max(255, "Name too long"),
  });
};
