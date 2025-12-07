import { NextFunction, Request, Response } from "express";
import ValidationError from "../errors/ValidationError";
import AppError from "../errors/AppError";
import ServiceError from "../errors/ServiceError";
import EnvironmentUtils from "../utils/environment";

export default function errorHandlerMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ValidationError || err instanceof AppError || err instanceof ServiceError) {
    res.status(err.status).send({
      status: err.status,
      code: err.name,
      message: err.message,
      stack: EnvironmentUtils.isDevelopment() ? err.stack : {},
    });
  }

  res.status(500).send({
    status: "error",
    message: "Something went wrong on the server",
    stack: EnvironmentUtils.isDevelopment() ? err.stack : {},
  });
}
