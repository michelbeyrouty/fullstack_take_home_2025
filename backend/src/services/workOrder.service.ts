import { sql } from "../db";
import AppError from "../errors/AppError";
import ServiceError from "../errors/ServiceError";
import { IWorkOrder } from "../typings";
import {
  GET_WORK_ORDER_WITH_USERS_QUERY,
  LIST_WORK_ORDERS_QUERY,
  INSERT_WORK_ORDER_QUERY,
  INSERT_WORK_ORDER_ASSIGNEE_QUERY,
  UPDATE_WORK_ORDER_STATUS_QUERY,
  DELETE_WORK_ORDER_QUERY,
  DELETE_WORK_ORDER_ASSIGNEES_QUERY,
} from "./queries";

class WorkOrdersService {
  async list(): Promise<IWorkOrder[]> {
    try {
      return await sql<IWorkOrder>(LIST_WORK_ORDERS_QUERY);
    } catch (e) {
      console.error(e);
      throw new AppError("Internal server error");
    }
  }

  async getById(workOrderId: string): Promise<IWorkOrder | null> {
    try {
      const workOrders = await sql<IWorkOrder>(GET_WORK_ORDER_WITH_USERS_QUERY, [workOrderId]);

      if (workOrders.length === 0) {
        throw new ServiceError("Work order not found");
      }

      return {
        ...workOrders[0],
        assignees: JSON.parse(workOrders[0].assignees as unknown as string),
      };
    } catch (err) {
      if (err instanceof ServiceError) throw err;

      throw new AppError("Internal server error");
    }
  }

  async create(name: string, userIds: string[] = []): Promise<string> {
    try {
      await sql("BEGIN TRANSACTION");

      const result = await sql<{ id: number }>(INSERT_WORK_ORDER_QUERY, [name]);
      const orderID = result[0].id;

      for (const userId of userIds) {
        await sql(INSERT_WORK_ORDER_ASSIGNEE_QUERY, [orderID, userId]);
      }

      await sql("COMMIT");

      return String(orderID);
    } catch (err) {
      await sql("ROLLBACK");

      console.error(err);
      throw new AppError("Internal server error");
    }
  }

  async updateStatus(workOrderId: string): Promise<void> {
    try {
      await sql<null>(UPDATE_WORK_ORDER_STATUS_QUERY, [workOrderId]);
    } catch (e) {
      console.error(e);
      throw new AppError("Internal server error");
    }
  }

  async delete(workOrderId: string): Promise<void> {
    try {
      await sql("BEGIN TRANSACTION");
      await sql(DELETE_WORK_ORDER_ASSIGNEES_QUERY, [workOrderId]);
      await sql(DELETE_WORK_ORDER_QUERY, [workOrderId]);
      await sql("COMMIT");
    } catch (e) {
      await sql("ROLLBACK");

      console.error(e);
      throw new AppError("Internal server error");
    }
  }
}

export default new WorkOrdersService();
