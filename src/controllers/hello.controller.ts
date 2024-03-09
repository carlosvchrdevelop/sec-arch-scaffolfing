import { Context } from "koa";
import { showValidation } from "../validations/hello.validation";
import SayHello from "../use-cases/sayHello.use-case";

export const index = (ctx: Context) => {
  const sayHello: SayHello = new SayHello();
  ctx.body = { greeting: sayHello.run() };
};

export const show = async (ctx: Context) => {
  const validated = showValidation(ctx.params);
  if (!validated.ok) throw new Error(validated.error);
  const sayHello: SayHello = new SayHello();
  ctx.body = { greeting: sayHello.run(validated.data.name) };
};
