import Router from "koa-router";
import { index, show } from "../controllers/hello.controller";

export default function (router: Router) {
  router.get("/", index);
  router.get("/:name", show);
}
