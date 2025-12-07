"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandlerMiddleware;
const ValidationError_1 = __importDefault(require("../errors/ValidationError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const ServiceError_1 = __importDefault(require("../errors/ServiceError"));
const environment_1 = __importDefault(require("../utils/environment"));
function errorHandlerMiddleware(err, req, res, next) {
    if (err instanceof ValidationError_1.default || err instanceof AppError_1.default || err instanceof ServiceError_1.default) {
        return res.status(err.status).json({
            code: err.name,
            status: err.status,
            message: err.message,
            stack: environment_1.default.isDevelopment() ? err.stack : {},
        });
    }
    res.status(500).json({
        status: "error",
        message: "Something went wrong on the server",
        stack: environment_1.default.isDevelopment() ? err.stack : {},
    });
}
