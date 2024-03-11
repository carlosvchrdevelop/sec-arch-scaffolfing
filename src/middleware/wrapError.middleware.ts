import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export default (
  err: ErrorRequestHandler,
  req: Request,
  _: Response,
  next: NextFunction
) => {
  req.headers["errors"] = JSON.stringify(err);
  next();
};
