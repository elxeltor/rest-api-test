import { ErrorParams, HttpError } from "./HttpError";

export class ForbiddenError extends HttpError {
  constructor (params: ErrorParams) {
    super({...params, code: 403});
    this.name = 'ForbiddenError';
  }
}