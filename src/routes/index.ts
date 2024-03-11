import express, { Request, Response, NextFunction, Router } from "express";
import kubernetesRouter from "../routes/kubernetes.route";

interface Route {
  prefix: string;
  router: Router;
}

const routes: Route[] = [{ prefix: "/kubernetes", router: kubernetesRouter }];

const apiRouter = express.Router();
apiRouter.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  next();
});

routes.map((route) => {
  apiRouter.use(route.prefix, route.router);
});

export default apiRouter;
