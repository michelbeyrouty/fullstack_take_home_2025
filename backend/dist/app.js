"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const requestLogger_1 = __importDefault(require("./middlewares/requestLogger"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const Routers_1 = require("./Routers");
function createApp() {
    const app = (0, express_1.default)();
    const router = express_1.default.Router();
    app.use(express_1.default.json());
    app.use(requestLogger_1.default);
    app.use("/api", router);
    router.use("/workorders", Routers_1.workOrderRouter);
    router.use("/users", Routers_1.userRouter);
    app.use(errorHandler_1.default);
    return app;
}
