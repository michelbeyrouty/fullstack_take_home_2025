import express from "express";
import UserController from "../controllers/user.controller";

const usersRouter = express.Router();

usersRouter.get("/", UserController.list);
usersRouter.get("/inactive", UserController.listInactive);

export default usersRouter;
