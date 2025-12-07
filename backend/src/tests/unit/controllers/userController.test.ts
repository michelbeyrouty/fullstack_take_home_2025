import userController from "../../../controllers/user.controller";
import userService from "../../../services/user.service";
import generateMockedRequest from "../../mocks/mockedRequest";
import mockedNext from "../../mocks/mockedNext";
import mockedResponse from "../../mocks/mockedResponse";
import { afterEach, vi, expect, test, describe } from "vitest";

const mockedRequest = generateMockedRequest();
vi.mock("../../../services/user.service");
const mockeduserService = vi.mocked(userService);

describe("userController ~ getUsers", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should return the right response on success", async () => {
    mockeduserService.list.mockResolvedValue([]);
    await userController.list(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    expect(mockedResponse.send).toHaveBeenCalledWith({ status: "OK", users: [] });
    expect(mockedNext).toHaveBeenCalledTimes(0);
  });

  test("Should call next in case of error", async () => {
    mockeduserService.list.mockRejectedValue(new Error("test"));
    await userController.list(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.send).toHaveBeenCalledTimes(0);
    expect(mockedNext).toHaveBeenCalledTimes(1);
    expect(mockedNext).toHaveBeenCalledWith(new Error("test"));
  });
});

describe("userController ~ getInactiveUsers", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should return the right response on success", async () => {
    mockeduserService.listInactive.mockResolvedValue([]);
    await userController.listInactive(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    expect(mockedResponse.send).toHaveBeenCalledWith({ status: "OK", users: [] });
    expect(mockedNext).toHaveBeenCalledTimes(0);
  });

  test("Should call next in case of error", async () => {
    mockeduserService.listInactive.mockRejectedValue(new Error("test"));
    await userController.listInactive(mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.send).toHaveBeenCalledTimes(0);
    expect(mockedNext).toHaveBeenCalledTimes(1);
    expect(mockedNext).toHaveBeenCalledWith(new Error("test"));
  });
});
