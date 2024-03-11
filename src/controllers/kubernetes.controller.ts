import DeployService from "../use-cases/deployService.use-case";
import CollectServicesDetails from "../use-cases/collectServicesDetails.use-case";
import DeleteService from "../use-cases/deleteService.use-case";
import ListServices from "../use-cases/listServices.use-case";
import CMD from "../utils/cmd.util";
import FileIO from "../utils/fileIO.util";
import Config from "../config/config";
import {
  Props as DeployServiceProps,
  Options as DeployServiceOptions,
} from "../use-cases/deployService.use-case";
import { Request, Response, NextFunction } from "express";
import {
  validatorGet,
  validatorUpdate,
  validatorDestroy,
  validatorStore,
} from "../validations/kubernetes.validator";

export const get = (req: Request, res: Response, next: NextFunction) => {
  const validated = validatorGet(req);
  const cmd = new CMD().exec;
  const resources = new CollectServicesDetails({ execute: cmd }).exec([
    validated.id,
  ]);
  if (resources.length <= 0) {
    res.status(404);
  } else {
    res.status(200);
    req.body = resources[0];
  }
  next();
};

export const getAll = (req: Request, res: Response, next: NextFunction) => {
  const cmd = new CMD().exec;
  const labels = new ListServices({ execute: cmd }).exec();
  const resources = new CollectServicesDetails({ execute: cmd }).exec(labels);
  req.body = resources;
  res.status(200);
  next();
};

export const store = (req: Request, res: Response, next: NextFunction) => {
  const validated = validatorStore(req);
  const deployProps: DeployServiceProps = {
    execute: new CMD().exec,
    fileHandler: new FileIO(),
  };
  const deployService = new DeployService(deployProps);
  const deployOptions: DeployServiceOptions = {
    externalPort: validated.externalPort,
    image: validated.image,
    internalPort: validated.internalPort,
    maxCpu: validated.maxCpu,
    maxMemory: validated.maxMemory,
    name: validated.name,
    replicas: validated.replicas,
    serviceType: validated.serviceType,
    outputFolder: Config.outputFolder,
  };
  deployService.exec(deployOptions);
  res.status(200);
  next();
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const validated = validatorUpdate(req);
  res.status(200);
  next();
};

export const destroy = (req: Request, res: Response, next: NextFunction) => {
  const validated = validatorDestroy(req);
  const cmd = new CMD().exec;
  const deleteService = new DeleteService({ execute: cmd });
  deleteService.exec(validated.id);
  res.status(200);
  next();
};
