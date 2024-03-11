import { z } from "zod";
import { Request } from "express";

export const validatorGet = (req: Request) => {
  return z
    .object({
      id: z.string().min(3).max(16).regex(new RegExp("[A-Za-z][A-Za-z0-9-]*")),
    })
    .parse(req.params);
};

export const validatorGetAll = (req: Request) => {};

export const validatorStore = (req: Request) => {
  return z
    .object({
      name: z
        .string()
        .min(3)
        .max(16)
        .regex(new RegExp("[A-Za-z][A-Za-z0-9-]*")),
      image: z.string(),
      internalPort: z.number().min(1).max(65535),
      externalPort: z.number().min(1).max(65535),
      serviceType: z.enum(["public", "private"]).default("private"),
      maxCpu: z.number().min(250).default(512),
      maxMemory: z.number().min(128).default(128),
      replicas: z.number().min(1).default(1),
    })
    .parse(req.body);
};

export const validatorUpdate = (req: Request) => {
  return z
    .object({
      id: z.string().min(3).max(16).regex(new RegExp("[A-Za-z][A-Za-z0-9-]*")),
    })
    .parse(req.params);
};

export const validatorDestroy = (req: Request) => {
  return z
    .object({
      id: z.string().min(3).max(16).regex(new RegExp("[A-Za-z][A-Za-z0-9-]*")),
    })
    .parse(req.params);
};
