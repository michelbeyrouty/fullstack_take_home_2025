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
const workOrder_service_1 = __importDefault(require("../services/workOrder.service"));
const user_service_1 = __importDefault(require("../services/user.service"));
const ValidationError_1 = __importDefault(require("../errors/ValidationError"));
class WorkOrderController {
    list(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workOrders = yield workOrder_service_1.default.list();
                response.status(200).send({ status: "OK", workOrders });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workOrderId = String(request.params.workOrderId);
                if (!workOrderId) {
                    throw new ValidationError_1.default("workOrderId is missing");
                }
                const workOrder = yield workOrder_service_1.default.getById(workOrderId);
                response.status(200).send({ status: "OK", workOrder });
            }
            catch (error) {
                next(error);
            }
        });
    }
    create(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = request.body;
                if (!body.name || typeof body.name != "string") {
                    throw new ValidationError_1.default("Name input is missing or has the wrong type");
                }
                if (body.assigneeIds && !Array.isArray(body.assigneeIds)) {
                    throw new ValidationError_1.default("assigneeIds should be an array");
                }
                yield user_service_1.default.getByIds(body.assigneeIds);
                const orderID = yield workOrder_service_1.default.create(body.name, body.assigneeIds);
                response.status(201).send({ id: orderID });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateStatus(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workOrderId = request.params.id;
                if (!workOrderId) {
                    throw new ValidationError_1.default("Invalid work order ID");
                }
                yield workOrder_service_1.default.updateStatus(workOrderId);
                response.status(200).send({ status: "OK", message: "order status updated successfuly" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workOrderId = request.params.id;
                if (!workOrderId) {
                    throw new ValidationError_1.default("Invalid work order ID");
                }
                yield workOrder_service_1.default.delete(workOrderId);
                response.status(200).send({ status: "OK", message: "work order deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new WorkOrderController();
