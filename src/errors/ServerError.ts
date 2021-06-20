import { HttpError } from "./HttpError";

export class ServerError extends HttpError {
  constructor (message: string) {
    super(500, message);
    this.name = 'ServerError';
  }
}