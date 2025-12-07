import AppError from "./AppError";

export default class ServiceError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}
