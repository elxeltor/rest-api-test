import { ErrorParams, HttpError } from "./HttpError";

export class BadRequestError extends HttpError {
  constructor (params: ErrorParams) {
    super({...params, code: 400});
    this.name = 'BadRequestError';
  }
}