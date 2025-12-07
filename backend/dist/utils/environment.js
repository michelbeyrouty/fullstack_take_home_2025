"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../constants/config"));
class EnvironmentUtils {
    isDevelopment() {
        return config_1.default.NODE_ENV === "development";
    }
}
exports.default = new EnvironmentUtils();
