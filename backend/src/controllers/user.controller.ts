import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  async list(request: Request, response: Response, next: NextFunction) {
    try {
      const users = await UserService.list();

      response.status(200).send({ status: "OK", users });
    } catch (error) {
      next(error);
    }
  }

  async listInactive(request: Request, response: Response, next: NextFunction) {
    try {
      const users = await UserService.listInactive();

      response.status(200).send({ status: "OK", users });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
