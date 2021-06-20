import { ErrorParams, HttpError } from "./HttpError";

export class ConflictError extends HttpError {
  constructor (params: ErrorParams) {
    super({...params, code: 409});
    this.name = 'ConflictError';
  }
}