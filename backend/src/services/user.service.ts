import { sql } from "../db";
import AppError from "../errors/AppError";
import ServiceError from "../errors/ServiceError";
import { IUser } from "../typings";
import { LIST_USERS_QUERY, LIST_INACTIVE_USERS_QUERY, GET_USERS_BY_IDS_QUERY } from "./queries";

class UserService {
  async list(): Promise<IUser[]> {
    try {
      return await sql<IUser>(LIST_USERS_QUERY);
    } catch (err) {
      console.error(err);
      throw new AppError("Internal server error");
    }
  }

  async listInactive(): Promise<IUser[]> {
    try {
      return await sql<IUser>(LIST_INACTIVE_USERS_QUERY);
    } catch (err) {
      console.error(err);
      throw new AppError("Internal server error");
    }
  }

  async getByIds(ids: string[] = []): Promise<IUser[]> {
    try {
      if (!ids.length) {
        return [];
      }

      const placeholders = ids.map(() => "?").join(",");
      const users = await sql<IUser>(GET_USERS_BY_IDS_QUERY(placeholders), ids);

      if (users.length !== ids.length) {
        throw new ServiceError("One or more user ids do not exist");
      }

      return users;
    } catch (err) {
      if (err instanceof ServiceError) throw err;

      throw new AppError("Internal server error");
    }
  }
}

export default new UserService();
