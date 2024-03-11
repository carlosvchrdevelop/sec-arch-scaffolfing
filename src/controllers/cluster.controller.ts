import { Request, Response, NextFunction } from "express-serve-static-core";
import CMD from "../utils/cmd.util";
import CollectClusterDetails from "../use-cases/collectClusterDetails.use-case";
import CheckClusterStatus, {
  ClusterStatus,
} from "../use-cases/checkClusterStatus.use-case";
import { ResourceNode } from "../types/k8s";

export const check = (req: Request, res: Response, next: NextFunction) => {
  const cmd = new CMD().exec;
  const checkClusterStatus = new CheckClusterStatus({ execute: cmd });
  const result: ClusterStatus = checkClusterStatus.exec();
  req.body = { clusterStatus: result };
  res.status(200);
  next();
};

export const getAll = (req: Request, res: Response, next: NextFunction) => {
  const cmd = new CMD().exec;
  const collectClusterDetails = new CollectClusterDetails({ execute: cmd });
  const result: ResourceNode[] = collectClusterDetails.exec();
  req.body = result;
  res.status(200);
  next();
};
