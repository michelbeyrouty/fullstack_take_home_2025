import { vi, describe, afterEach, test, expect } from "vitest";
import { mockedSql } from "../../mocks/mockedDatabase";
import userService from "../../../services/user.service";
import AppError from "../../../errors/AppError";
import ServiceError from "../../../errors/ServiceError";
import { mockUsers, mockUser } from "../../mocks/mockData";
import { mockedConsoleError } from "../../mocks/mockedConsole";

describe("userService ~ list", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should return list of users on success", async () => {
    mockedSql.mockResolvedValue(mockUsers);

    const result = await userService.list();

    expect(result).toEqual(mockUsers);
    expect(mockedSql).toHaveBeenCalledTimes(1);
  });

  test("Should throw AppError when database query fails", async () => {
    const dbError = new Error("Database connection failed");
    mockedSql.mockRejectedValue(dbError);

    await expect(userService.list()).rejects.toThrow(AppError);
    await expect(userService.list()).rejects.toThrow("Internal server error");
    expect(mockedConsoleError).toHaveBeenCalledWith(dbError);
  });
});

describe("userService ~ listInactive", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should return list of inactive users on success", async () => {
    mockedSql.mockResolvedValue(mockUsers);

    const result = await userService.listInactive();

    expect(result).toEqual(mockUsers);
    expect(mockedSql).toHaveBeenCalledTimes(1);
  });

  test("Should throw AppError when database query fails", async () => {
    const dbError = new Error("Database connection failed");
    mockedSql.mockRejectedValue(dbError);

    await expect(userService.listInactive()).rejects.toThrow(AppError);
    await expect(userService.listInactive()).rejects.toThrow("Internal server error");
    expect(mockedConsoleError).toHaveBeenCalledWith(dbError);
  });
});

describe("userService ~ getByIds", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should return empty array when no ids provided", async () => {
    const result = await userService.getByIds([]);

    expect(result).toEqual([]);
    expect(mockedSql).not.toHaveBeenCalled();
  });

  test("Should return users when valid ids provided", async () => {
    const userIds = ["1", "2"];
    mockedSql.mockResolvedValue(mockUsers);

    const result = await userService.getByIds(userIds);

    expect(result).toEqual(mockUsers);
    expect(mockedSql).toHaveBeenCalledWith(expect.stringContaining("?,?"), userIds);
  });

  test("Should throw ServiceError when not all users found", async () => {
    const userIds = ["1", "2", "3"];
    mockedSql.mockResolvedValue([mockUser]);

    await expect(userService.getByIds(userIds)).rejects.toThrow(ServiceError);
    await expect(userService.getByIds(userIds)).rejects.toThrow("One or more user ids do not exist");
  });

  test("Should throw AppError for non-ServiceError database errors", async () => {
    const userIds = ["1"];
    const dbError = new Error("Database connection failed");
    mockedSql.mockRejectedValue(dbError);

    await expect(userService.getByIds(userIds)).rejects.toThrow(AppError);
    await expect(userService.getByIds(userIds)).rejects.toThrow("Internal server error");
  });
});
