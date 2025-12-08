import config from "../constants/config";

type NeededHTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface IFetchAPIParams {
  endpoint?: string;
  method?: NeededHTTPMethod;
  data?: Object;
}

export class HTTPError extends Error {
  public statusCode: number;

  constructor(statusCode: number, ...args: ConstructorParameters<typeof Error>) {
    super(...args);
    this.statusCode = statusCode;
  }
}

export default async function fetchApi({ endpoint = "/", method = "GET", data }: IFetchAPIParams = {}) {
  try {
    const response = await fetch(`${config.BACKEND_BASE_URL}${endpoint}`, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (response.status >= 400) {
      throw new HTTPError(response.status, response.statusText);
    }

    return response.json();
  } catch (e) {
    if (!(e instanceof HTTPError)) {
      console.error("API Fetch error:", e);
    }

    throw e;
  }
}
