"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = requestLoggerMiddleware;
const string_1 = __importDefault(require("../utils/string"));
function requestLoggerMiddleware(req, res, next) {
    res.on("finish", () => {
        const ts = string_1.default.formatDateTime(new Date());
        console.info(`${ts} [${req.method}] ${req.path} - ${res.statusCode}`);
    });
    next();
}
