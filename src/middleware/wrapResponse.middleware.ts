import { Context, Next } from "koa";

export default async function (ctx: Context, next: Next) {
  try {
    await next();
    ctx.res.statusCode === 200
      ? (ctx.body = { status: "ok", code: ctx.res.statusCode, data: ctx.body })
      : (ctx.body = { status: "error", code: ctx.res.statusCode, data: {} });
  } catch (error) {
    console.log(error);
    ctx.body = {
      status: "error",
      code: ctx.res.statusCode,
      data: JSON.parse((error as Error).message),
    };
  }
}
