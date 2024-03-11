import { Request, Response } from "express";

export default (req: Request, res: Response) => {
  if (req.headers["errors"]) res.status(400);

  return res.json({
    status: res.statusCode === 200 ? "ok" : "error",
    code: res.statusCode,
    data: req.body || [],
    error: req.headers["errors"],
  });
};
