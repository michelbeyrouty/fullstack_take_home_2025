import Config from "../constants/config";

class EnvironmentUtils {
  isDevelopment(): boolean {
    return Config.NODE_ENV === "development";
  }
}

export default new EnvironmentUtils();
