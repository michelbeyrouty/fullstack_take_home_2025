import express from "express";
import requestLoggerMiddleware from "./middlewares/requestLogger";
import errorHandlerMiddleware from "./middlewares/errorHandler";
import workOrderRouter from "./Routers/workOrderRouter";
import userRouter from "./Routers/userRouter";

export function createApp() {
  const app = express();
  const router = express.Router();

  app.use(express.json());
  app.use(requestLoggerMiddleware);

  app.use("/api", router);
  router.use("/workorders", workOrderRouter);
  router.use("/users", userRouter);

  app.use(errorHandlerMiddleware as express.ErrorRequestHandler);

  return app;
}
