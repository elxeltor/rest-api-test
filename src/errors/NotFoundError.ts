import { ErrorParams, HttpError } from "./HttpError";

export class NotFoundError extends HttpError {
  constructor (params: ErrorParams) {
    super({...params, code: 404});
    this.name = 'NotFoundError';
  }
}