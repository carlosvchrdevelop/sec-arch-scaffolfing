import { Request, Response, NextFunction } from "express-serve-static-core";
import CMD from "../utils/cmd.util";
import CheckClusterStatus, {
  ClusterStatus,
} from "../use-cases/checkClusterStatus.use-case";

export const check = (req: Request, res: Response, next: NextFunction) => {
  const cmd = new CMD().exec;
  const checkClusterStatus = new CheckClusterStatus({ execute: cmd });
  const result: ClusterStatus = checkClusterStatus.exec();
  req.body = { clusterStatus: result };
  res.status(200);
  next();
};
