import express from "express";
import requestLoggerMiddleware from "./middlewares/requestLogger";
import errorHandlerMiddleware from "./middlewares/errorHandler";
import requestCORS from "./middlewares/requestCORS";
import workOrderRouter from "./Routers/workOrderRouter";
import healthRouter from "./Routers/healthRouter";
import userRouter from "./Routers/userRouter";

export function createApp() {
  const app = express();
  const router = express.Router();

  app.use(express.json());

  app.use(requestCORS);
  app.use(requestLoggerMiddleware);

  app.use("/api", router);
  router.use("/health", healthRouter);
  router.use("/workorders", workOrderRouter);
  router.use("/users", userRouter);

  app.use(errorHandlerMiddleware as express.ErrorRequestHandler);

  return app;
}
