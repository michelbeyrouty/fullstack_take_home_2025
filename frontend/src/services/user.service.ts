import fetchApi from "../utils/fetchApi";
import { IUser } from "../typings";

class UserService {
  async list(): Promise<IUser[]> {
    const { users } = await fetchApi({ endpoint: "/users" });

    return users;
  }

  async listInactive(): Promise<IUser[]> {
    const { users } = await fetchApi({ endpoint: "/users/inactive" });

    return users;
  }
}

export default new UserService();
