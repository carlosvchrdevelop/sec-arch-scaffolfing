import Router from "koa-router";
import compose from "koa-compose";
import helloRouter from "./hello.route";

interface Route {
  prefix: string;
  getRoutes: (router: Router) => void;
}

const routes: Route[] = [
  { prefix: "/hello", getRoutes: helloRouter },
  { prefix: "/hello", getRoutes: helloRouter },
];

const routers: Router[] = [];

routes.map((r) => {
  const apiRoutes2 = new Router({ prefix: r.prefix });
  r.getRoutes(apiRoutes2);
  routers.push(apiRoutes2);
});

const apiRoutes = compose(routers.map((router) => router.routes()));

export default apiRoutes;
