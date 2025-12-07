import { Request, Response, NextFunction } from "express";
import StringUtils from "../utils/string";

export default function requestLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  res.on("finish", () => {
    const ts = StringUtils.formatDateTime(new Date());
    console.info(`${ts} [${req.method}] ${req.path} - ${res.statusCode}`);
  });

  next();
}
