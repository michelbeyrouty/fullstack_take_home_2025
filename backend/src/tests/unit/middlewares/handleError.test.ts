import errorHandler from "../../../middlewares/errorHandler";
import ValidationError from "../../../errors/ValidationError";
import ServiceError from "../../../errors/ServiceError";
import AppError from "../../../errors/AppError";
import generateMockedRequest from "../../mocks/mockedRequest";
import mockedNext from "../../mocks/mockedNext";
import mockedResponse from "../../mocks/mockedResponse";
import { vi, afterEach, describe, test, expect } from "vitest";

const mockedRequest = generateMockedRequest();

describe("errorHandler", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should generate proper response when ValidationError is thrown", async () => {
    errorHandler(new ValidationError("This is a test message"), mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.status).toBeCalledWith(400);

    expect(mockedResponse.send).toBeCalledWith({
      code: "ValidationError",
      message: "This is a test message",
      stack: {},
      status: 400,
    });
  });

  test("Should generate proper response when ServiceError is thrown", async () => {
    errorHandler(new ServiceError("This is a test message"), mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.status).toBeCalledWith(500);

    expect(mockedResponse.send).toBeCalledWith({
      code: "ServiceError",
      message: "This is a test message",
      stack: {},
      status: 400,
    });
  });

  test("Should generate proper response when AppError is thrown", async () => {
    errorHandler(new AppError("This is a test message", 438), mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.status).toBeCalledWith(438);
    expect(mockedResponse.send).toBeCalledWith({
      code: "AppError",
      message: "This is a test message",
      stack: {},
      status: 438,
    });
  });

  test("Should generate generic error response when no specific error is thrown", async () => {
    errorHandler(new Error("TEST"), mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.status).toBeCalledWith(500);
    expect(mockedResponse.send).toBeCalledWith({
      status: "error",
      message: "Something went wrong on the server",
      stack: {},
    });
  });
});
