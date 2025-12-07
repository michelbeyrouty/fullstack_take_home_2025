import { NextFunction, Request, Response } from "express";

class HealthController {
  async check(request: Request, response: Response, next: NextFunction) {
    try {
      response.status(200).send({
        status: "OK",
        timestamp: new Date().toISOString(),
        service: "take-home-project-backend"
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new HealthController();
