import express from "express";
import s from "../s";
import WorkOrderController from "../controllers/workOrder.controller";

const workOrderRouter = express.Router();

workOrderRouter.get("/", WorkOrderController.list);
workOrderRouter.get("/:workOrderId", WorkOrderController.getById);
workOrderRouter.post("/", s, WorkOrderController.create);
workOrderRouter.put("/:id/status", WorkOrderController.updateStatus);
workOrderRouter.delete("/:id", WorkOrderController.delete);

export default workOrderRouter;
