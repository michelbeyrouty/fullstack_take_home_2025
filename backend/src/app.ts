import express from "express";
import requestLoggerMiddleware from "./middlewares/requestLogger";
import errorHandlerMiddleware from "./middlewares/errorHandler";
import workOrderRouter from "./Routers/workOrderRouter";
import userRouter from "./Routers/userRouter";
import healthController from "./controllers/health.controller";

export function createApp() {
  const app = express();
  const router = express.Router();

  app.use(express.json());

  // Add CORS middleware
  app.use((req, res, next) => {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:4173',
      'https://fullstacktakehome2025.netlify.app'
    ];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin as string)) {
      res.setHeader('Access-Control-Allow-Origin', origin as string);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    next();
  });

  app.use(requestLoggerMiddleware);

  // Health check endpoint
  app.get('/health', healthController.check);

  app.use("/api", router);
  router.use("/workorders", workOrderRouter);
  router.use("/users", userRouter);

  app.use(errorHandlerMiddleware as express.ErrorRequestHandler);

  return app;
}
