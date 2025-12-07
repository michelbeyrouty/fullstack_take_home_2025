"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const AppError_1 = __importDefault(require("../errors/AppError"));
const ServiceError_1 = __importDefault(require("../errors/ServiceError"));
const queries_1 = require("./queries");
class UserService {
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, db_1.sql)(queries_1.LIST_USERS_QUERY);
            }
            catch (err) {
                console.error(err);
                throw new AppError_1.default(500, "Internal server error");
            }
        });
    }
    listInactive() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, db_1.sql)(queries_1.LIST_INACTIVE_USERS_QUERY);
            }
            catch (err) {
                console.error(err);
                throw new AppError_1.default(500, "Internal server error");
            }
        });
    }
    getByIds() {
        return __awaiter(this, arguments, void 0, function* (ids = []) {
            try {
                if (!ids.length) {
                    return [];
                }
                const placeholders = ids.map(() => "?").join(",");
                const users = yield (0, db_1.sql)((0, queries_1.GET_USERS_BY_IDS_QUERY)(placeholders), ids);
                if (users.length !== ids.length) {
                    throw new ServiceError_1.default("One or more user ids do not exist");
                }
                return users;
            }
            catch (err) {
                if (err instanceof ServiceError_1.default)
                    throw err;
                throw new AppError_1.default(500, "Internal server error");
            }
        });
    }
}
exports.default = new UserService();
