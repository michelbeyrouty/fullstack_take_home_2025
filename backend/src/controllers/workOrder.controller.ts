import { NextFunction, Request, Response } from "express";
import WorkOrderService from "../services/workOrder.service";
import UserService from "../services/user.service";
import ValidationError from "../errors/ValidationError";

class WorkOrderController {
  async list(request: Request, response: Response, next: NextFunction) {
    try {
      const workOrders = await WorkOrderService.list();

      response.status(200).send({ status: "OK", workOrders });
    } catch (error) {
      next(error);
    }
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    try {
      const workOrderId = request.params.workOrderId;

      if (!workOrderId) {
        throw new ValidationError("workOrderId is missing");
      }

      const workOrder = await WorkOrderService.getById(workOrderId);

      response.status(200).send({ status: "OK", workOrder });
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const body = request.body;

      if (!body.name || typeof body.name != "string") {
        throw new ValidationError("Name input is missing or has the wrong type");
      }

      if (body.assigneeIds && !Array.isArray(body.assigneeIds)) {
        throw new ValidationError("assigneeIds should be an array");
      }

      await UserService.getByIds(body.assigneeIds);

      const orderID = await WorkOrderService.create(body.name, body.assigneeIds);

      response.status(201).send({ id: orderID });
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(request: Request, response: Response, next: NextFunction) {
    try {
      const workOrderId = request.params.id;

      if (!workOrderId) {
        throw new ValidationError("Invalid work order ID");
      }

      await WorkOrderService.updateStatus(workOrderId);

      response.status(200).send({ status: "OK", message: "order status updated successfuly" });
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const workOrderId = request.params.id;

      if (!workOrderId) {
        throw new ValidationError("Invalid work order ID");
      }

      await WorkOrderService.delete(workOrderId);

      response.status(200).send({ status: "OK", message: "work order deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default new WorkOrderController();
