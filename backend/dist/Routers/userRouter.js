"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const usersRouter = express_1.default.Router();
usersRouter.get("/", user_controller_1.default.list);
usersRouter.get("/inactive", user_controller_1.default.listInactive);
exports.default = usersRouter;
