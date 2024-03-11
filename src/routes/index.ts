import express, { Request, Response, NextFunction, Router } from "express";
import kubernetesRouter from "../routes/kubernetes.route";
import clusterRouter from "../routes/cluster.route";

interface Route {
  prefix: string;
  router: Router;
}

const routes: Route[] = [
  { prefix: "/kubernetes", router: kubernetesRouter },
  { prefix: "/cluster", router: clusterRouter },
];

const apiRouter = express.Router();
apiRouter.use((_: Request, res: Response, next: NextFunction) => {
  res.status(404);
  next();
});

routes.map((route) => {
  apiRouter.use(route.prefix, route.router);
});

export default apiRouter;
