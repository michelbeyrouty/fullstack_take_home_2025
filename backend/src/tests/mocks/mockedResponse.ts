import { vi } from "vitest";

const generateMockedResponse = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.send = (message: any) => message;
  res.on = vi.fn().mockReturnValue(res);
  vi.spyOn(res, "send");
  return res;
};

export default generateMockedResponse();
