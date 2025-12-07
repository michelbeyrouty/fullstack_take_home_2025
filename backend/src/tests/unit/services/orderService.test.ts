import { vi, describe, afterEach, test, expect } from "vitest";
import { mockedSql } from "../../mocks/mockedDatabase";
import workOrderService from "../../../services/workOrder.service";
import AppError from "../../../errors/AppError";
import ServiceError from "../../../errors/ServiceError";
import { mockWorkOrderWithData, mockWorkOrders } from "../../mocks/mockData";
import { mockedConsoleError } from "../../mocks/mockedConsole";

describe("workOrderService ~ list", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should return list of work orders on success", async () => {
    mockedSql.mockResolvedValue(mockWorkOrders);

    const result = await workOrderService.list();

    expect(result).toEqual(mockWorkOrders);
    expect(mockedSql).toHaveBeenCalledTimes(1);
  });

  test("Should throw AppError when database query fails", async () => {
    const dbError = new Error("Database connection failed");
    mockedSql.mockRejectedValue(dbError);

    await expect(workOrderService.list()).rejects.toThrow(AppError);
    await expect(workOrderService.list()).rejects.toThrow("Internal server error");
    expect(mockedConsoleError).toHaveBeenCalledWith(dbError);
  });
});

describe("workOrderService ~ getById", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should return work order when found", async () => {
    const mockWorkOrderWithAssignees = {
      ...mockWorkOrderWithData,
      assignees: JSON.stringify([{ id: 1, name: "Test User" }]),
    };
    mockedSql.mockResolvedValue([mockWorkOrderWithAssignees]);

    const result = await workOrderService.getById("1");

    expect(result).toEqual({
      ...mockWorkOrderWithAssignees,
      assignees: [{ id: 1, name: "Test User" }],
    });
    expect(mockedSql).toHaveBeenCalledWith(expect.any(String), ["1"]);
  });

  test("Should throw ServiceError when work order not found", async () => {
    mockedSql.mockResolvedValue([]);

    await expect(workOrderService.getById("999")).rejects.toThrow(ServiceError);
    await expect(workOrderService.getById("999")).rejects.toThrow("Work order not found");
  });

  test("Should throw AppError for non-ServiceError database errors", async () => {
    const dbError = new Error("Database connection failed");
    mockedSql.mockRejectedValue(dbError);

    await expect(workOrderService.getById("1")).rejects.toThrow(AppError);
    await expect(workOrderService.getById("1")).rejects.toThrow("Internal server error");
  });
});

describe("workOrderService ~ create", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should create work order successfully with assignees", async () => {
    mockedSql
      .mockResolvedValueOnce([]) // BEGIN TRANSACTION
      .mockResolvedValueOnce([{ id: 123 }]) // INSERT_WORK_ORDER_QUERY
      .mockResolvedValueOnce([]) // INSERT_WORK_ORDER_ASSIGNEE_QUERY for user 1
      .mockResolvedValueOnce([]) // INSERT_WORK_ORDER_ASSIGNEE_QUERY for user 2
      .mockResolvedValueOnce([]); // COMMIT

    const result = await workOrderService.create("Test Work Order", ["1", "2"]);

    expect(result).toBe("123");
    expect(mockedSql).toHaveBeenCalledWith("BEGIN TRANSACTION");
    expect(mockedSql).toHaveBeenCalledWith(expect.any(String), ["Test Work Order"]);
    expect(mockedSql).toHaveBeenCalledWith(expect.any(String), [123, "1"]);
    expect(mockedSql).toHaveBeenCalledWith(expect.any(String), [123, "2"]);
    expect(mockedSql).toHaveBeenCalledWith("COMMIT");
  });

  test("Should handle database error and rollback transaction", async () => {
    const dbError = new Error("Database error");
    mockedSql
      .mockResolvedValueOnce([]) // BEGIN TRANSACTION
      .mockRejectedValueOnce(dbError) // INSERT_WORK_ORDER_QUERY fails
      .mockResolvedValueOnce([]); // ROLLBACK

    await expect(workOrderService.create("Test Work Order")).rejects.toThrow(AppError);

    expect(mockedSql).toHaveBeenCalledWith("ROLLBACK");
    expect(mockedConsoleError).toHaveBeenCalledWith(dbError);
  });

  test("Should handle empty userIds array", async () => {
    mockedSql
      .mockResolvedValueOnce([]) // BEGIN TRANSACTION
      .mockResolvedValueOnce([{ id: 123 }]) // INSERT_WORK_ORDER_QUERY
      .mockResolvedValueOnce([]); // COMMIT

    const result = await workOrderService.create("Test Work Order", []);

    expect(result).toBe("123");
    // Should not call INSERT_WORK_ORDER_ASSIGNEE_QUERY for empty array
    expect(mockedSql).toHaveBeenCalledTimes(3);
  });
});

describe("workOrderService ~ updateStatus", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should update work order status successfully", async () => {
    mockedSql.mockResolvedValue([]);

    await workOrderService.updateStatus("1");

    expect(mockedSql).toHaveBeenCalledWith(expect.any(String), ["1"]);
    expect(mockedSql).toHaveBeenCalledTimes(1);
  });

  test("Should throw AppError when database query fails", async () => {
    const dbError = new Error("Database connection failed");
    mockedSql.mockRejectedValue(dbError);

    await expect(workOrderService.updateStatus("1")).rejects.toThrow(AppError);
    await expect(workOrderService.updateStatus("1")).rejects.toThrow("Internal server error");
    expect(mockedConsoleError).toHaveBeenCalledWith(dbError);
  });
});

describe("workOrderService ~ delete", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should delete work order successfully", async () => {
    mockedSql
      .mockResolvedValueOnce([]) // BEGIN TRANSACTION
      .mockResolvedValueOnce([]) // DELETE_WORK_ORDER_ASSIGNEES_QUERY
      .mockResolvedValueOnce([]) // DELETE_WORK_ORDER_QUERY
      .mockResolvedValueOnce([]); // COMMIT

    await workOrderService.delete("1");

    expect(mockedSql).toHaveBeenCalledWith("BEGIN TRANSACTION");
    expect(mockedSql).toHaveBeenCalledWith(expect.any(String), ["1"]); // DELETE assignees
    expect(mockedSql).toHaveBeenCalledWith(expect.any(String), ["1"]); // DELETE work order
    expect(mockedSql).toHaveBeenCalledWith("COMMIT");
  });

  test("Should handle database error and rollback transaction", async () => {
    const dbError = new Error("Database error");
    mockedSql
      .mockResolvedValueOnce([]) // BEGIN TRANSACTION
      .mockResolvedValueOnce([]) // DELETE_WORK_ORDER_ASSIGNEES_QUERY
      .mockRejectedValueOnce(dbError) // DELETE_WORK_ORDER_QUERY fails
      .mockResolvedValueOnce([]); // ROLLBACK

    await expect(workOrderService.delete("1")).rejects.toThrow(AppError);

    expect(mockedSql).toHaveBeenCalledWith("ROLLBACK");
    expect(mockedConsoleError).toHaveBeenCalledWith(dbError);
  });
});
