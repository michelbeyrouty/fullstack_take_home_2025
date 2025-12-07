export default function generateMockedRequest(overrides?: any): any {
  return {
    body: overrides?.body,
    query: overrides?.query || "query",
    headers: overrides?.headers || "headers",
    method: overrides?.method || "method",
    path: overrides?.path || "path",
    params: overrides?.params || "params",
    ...overrides,
  };
}
