import { vi, describe, afterEach, test, expect } from "vitest";
import workOrderController from "../../../controllers/workOrder.controller";
import orderService from "../../../services/workOrder.service";
import generateMockedRequest from "../../mocks/mockedRequest";
import mockedNext from "../../mocks/mockedNext";
import mockedResponse from "../../mocks/mockedResponse";
import { mockWorkOrder } from "../../mocks/mockData";
import ValidationError from "../../../errors/ValidationError";

const mockedRequest = generateMockedRequest({
  body: {
    id: "id",
    name: "name",
  },
});

vi.mock("../../../services/workOrder.service");
const mockedOrderService = vi.mocked(orderService);

describe("workOrderController ~ list", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should return the right response on success", async () => {
    mockedOrderService.list.mockResolvedValue([]);
    await workOrderController.list(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    expect(mockedResponse.send).toHaveBeenCalledWith({ status: "OK", workOrders: [] });
    expect(mockedNext).toHaveBeenCalledTimes(0);
  });

  test("Should call next in case of error", async () => {
    mockedOrderService.list.mockRejectedValue(new Error("test"));
    await workOrderController.list(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.send).toHaveBeenCalledTimes(0);
    expect(mockedNext).toHaveBeenCalledTimes(1);
    expect(mockedNext).toHaveBeenCalledWith(new Error("test"));
  });
});

describe("workOrderController ~ getById", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should return the right response on success", async () => {
    const mockedRequest = generateMockedRequest({
      params: {
        workOrderId: "123",
      },
    });
    mockedOrderService.getById.mockResolvedValue(mockWorkOrder);
    await workOrderController.getById(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    expect(mockedResponse.send).toHaveBeenCalledWith({ status: "OK", workOrder: mockWorkOrder });
    expect(mockedNext).toHaveBeenCalledTimes(0);
  });

  test("Should throw a ValidationError if work order id is missing", async () => {
    const mockedRequest = generateMockedRequest({
      params: {
        workOrderId: undefined,
      },
    });
    await workOrderController.getById(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.send).toHaveBeenCalledTimes(0);
    expect(mockedNext).toHaveBeenCalledTimes(1);
    expect(mockedNext).toHaveBeenCalledWith(new ValidationError("workOrderId is missing"));
  });

  test("Should call next in case of error", async () => {
    const mockedRequest = generateMockedRequest({
      params: {
        workOrderId: "123",
      },
    });
    mockedOrderService.getById.mockRejectedValue(new Error("test"));
    await workOrderController.getById(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.send).toHaveBeenCalledTimes(0);
    expect(mockedNext).toHaveBeenCalledTimes(1);
    expect(mockedNext).toHaveBeenCalledWith(new Error("test"));
  });
});

describe("workOrderController ~ create", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should return the right response on success", async () => {
    await workOrderController.create(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.status).toHaveBeenCalledWith(201);
    expect(mockedResponse.send).toHaveBeenCalledWith({
      id: undefined,
    });
    expect(mockedNext).toHaveBeenCalledTimes(0);
  });

  test("Should throw validation error with missing input name", async () => {
    const mockedRequest = generateMockedRequest({
      body: {
        id: "id",
      },
    });
    await workOrderController.create(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.send).toHaveBeenCalledTimes(0);
    expect(mockedNext).toHaveBeenCalledTimes(1);
    expect(mockedNext).toHaveBeenCalledWith(new ValidationError("Name input is missing or has the wrong type"));
  });

  test("Should throw validation error with wrong input name type", async () => {
    const mockedRequest = generateMockedRequest({
      body: {
        id: "id",
        name: 123,
      },
    });
    await workOrderController.create(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.send).toHaveBeenCalledTimes(0);
    expect(mockedNext).toHaveBeenCalledTimes(1);
    expect(mockedNext).toHaveBeenCalledWith(new ValidationError("Name input is missing or has the wrong type"));
  });

  test("Should throw validation error with wrong input assigneeIds type", async () => {
    const mockedRequest = generateMockedRequest({
      body: {
        assigneeIds: "id",
        name: "123",
      },
    });
    await workOrderController.create(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.send).toHaveBeenCalledTimes(0);
    expect(mockedNext).toHaveBeenCalledTimes(1);
    expect(mockedNext).toHaveBeenCalledWith(new ValidationError("assigneeIds should be an array"));
  });

  test("Should call next in case of error", async () => {
    mockedOrderService.create.mockRejectedValue(new Error("test"));
    await workOrderController.create(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.send).toHaveBeenCalledTimes(0);
    expect(mockedNext).toHaveBeenCalledTimes(1);
    expect(mockedNext).toHaveBeenCalledWith(new Error("test"));
  });
});

describe("workOrderController ~ updateStatus", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should return the right response on success", async () => {
    const mockedRequest = generateMockedRequest({
      params: {
        id: "id",
      },
    });
    await workOrderController.updateStatus(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    expect(mockedResponse.send).toHaveBeenCalledWith({ status: "OK", message: "order status updated successfuly" });
    expect(mockedNext).toHaveBeenCalledTimes(0);
  });

  test("Should throw validation error with missing input name", async () => {
    const mockedRequest = generateMockedRequest({
      body: {
        id: "id",
      },
    });
    await workOrderController.updateStatus(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.send).toHaveBeenCalledTimes(0);
    expect(mockedNext).toHaveBeenCalledTimes(1);
    expect(mockedNext).toHaveBeenCalledWith(new ValidationError("Invalid work order ID"));
  });

  test("Should call next in case of error", async () => {
    const mockedRequest = generateMockedRequest({
      params: {
        id: "id",
      },
    });
    mockedOrderService.updateStatus.mockRejectedValue(new Error("test"));
    await workOrderController.updateStatus(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.send).toHaveBeenCalledTimes(0);
    expect(mockedNext).toHaveBeenCalledTimes(1);
    expect(mockedNext).toHaveBeenCalledWith(new Error("test"));
  });
});

describe("workOrderController ~ delete", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should return the right response on success", async () => {
    const mockedRequest = generateMockedRequest({
      params: {
        id: "123",
      },
    });
    mockedOrderService.delete.mockResolvedValue(undefined);
    await workOrderController.delete(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    expect(mockedResponse.send).toHaveBeenCalledWith({ status: "OK", message: "work order deleted successfully" });
    expect(mockedNext).toHaveBeenCalledTimes(0);
  });

  test("Should throw validation error when ID is missing", async () => {
    const mockedRequest = generateMockedRequest({
      params: {},
    });
    await workOrderController.delete(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.send).toHaveBeenCalledTimes(0);
    expect(mockedNext).toHaveBeenCalledTimes(1);
    expect(mockedNext).toHaveBeenCalledWith(new ValidationError("Invalid work order ID"));
  });

  test("Should call next in case of error", async () => {
    const mockedRequest = generateMockedRequest({
      params: {
        id: "123",
      },
    });
    mockedOrderService.delete.mockRejectedValue(new Error("Delete failed"));
    await workOrderController.delete(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.send).toHaveBeenCalledTimes(0);
    expect(mockedNext).toHaveBeenCalledTimes(1);
    expect(mockedNext).toHaveBeenCalledWith(new Error("Delete failed"));
  });
});
