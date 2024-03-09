import Koa from "koa";
import apiRoutes from "./routes";
import wrapResponseMiddleware from "./middleware/wrapResponse.middleware";
const app = new Koa();

app.use(wrapResponseMiddleware);
app.use(apiRoutes);

app.listen(process.env.PORT || 3000);
