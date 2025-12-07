import requestLogger from "../../../middlewares/requestLogger";
import generateMockedRequest from "../../mocks/mockedRequest";
import mockedNext from "../../mocks/mockedNext";
import mockedResponse from "../../mocks/mockedResponse";
import { vi, afterEach, describe, test, expect, beforeEach } from "vitest";

const consoleInfoSpy = vi.spyOn(console, "info").mockImplementation(() => {});

function simulateResponseFinish(method: string, path: string, statusCode: number) {
  const request = generateMockedRequest({ method, path });
  mockedResponse.statusCode = statusCode;

  requestLogger(request, mockedResponse, mockedNext);

  const finishCallback = mockedResponse.on.mock.calls.find((call: any) => call[0] === "finish")?.[1];
  finishCallback();

  return consoleInfoSpy.mock.calls[0][0];
}

describe("logRequestDetails", () => {
  beforeEach(() => {
    mockedResponse.statusCode = 200;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should run successfully and call next", () => {
    const request = generateMockedRequest({ method: "GET", path: "/api/workorders" });
    requestLogger(request, mockedResponse, mockedNext);

    expect(mockedResponse.on).toHaveBeenCalledWith("finish", expect.any(Function));
    expect(mockedNext).toHaveBeenCalledTimes(1);
  });

  test("Should log GET request correctly", () => {
    const logMessage = simulateResponseFinish("GET", "/api/workorders", 200);
    expect(logMessage).toMatch(/^\d{4}-\d{2}-\d{2} - \d{2}:\d{2}:\d{2} \[GET\] \/api\/workorders - 200$/);
  });

  test("Should log POST request correctly", () => {
    const logMessage = simulateResponseFinish("POST", "/api/workorders", 201);
    expect(logMessage).toMatch(/^\d{4}-\d{2}-\d{2} - \d{2}:\d{2}:\d{2} \[POST\] \/api\/workorders - 201$/);
  });

  test("Should log DELETE request with error status correctly", () => {
    const logMessage = simulateResponseFinish("DELETE", "/api/workorders/123", 404);
    expect(logMessage).toMatch(/^\d{4}-\d{2}-\d{2} - \d{2}:\d{2}:\d{2} \[DELETE\] \/api\/workorders\/123 - 404$/);
  });
});
