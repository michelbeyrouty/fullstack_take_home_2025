import { vi } from "vitest";
import { sql } from "../../db";

vi.mock("../../db", () => ({
  sql: vi.fn(),
}));

export const mockedSql = vi.mocked(sql);
