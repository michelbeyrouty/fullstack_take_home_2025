"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workOrder_controller_1 = __importDefault(require("../controllers/workOrder.controller"));
const workOrderRouter = express_1.default.Router();
workOrderRouter.get("/", workOrder_controller_1.default.list);
workOrderRouter.get("/:workOrderId", workOrder_controller_1.default.getById);
workOrderRouter.post("/", workOrder_controller_1.default.create);
workOrderRouter.put("/:id/status", workOrder_controller_1.default.updateStatus);
workOrderRouter.delete("/:id", workOrder_controller_1.default.delete);
exports.default = workOrderRouter;
