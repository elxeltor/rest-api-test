import { ErrorParams, HttpError } from "./HttpError";

export class UnauthorizedError extends HttpError {
  constructor (params: ErrorParams) {
    super({...params, code: 403});
    this.name = 'UnauthorizedError';
  }
}