import { vi } from "vitest";

export const mockedConsoleError = vi.spyOn(console, "error").mockImplementation(() => {});
