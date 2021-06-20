export interface ErrorParams {
  code?: number;
  message?: string;
  payload?: Record<string, unknown> | unknown[];
}
export class HttpError extends Error {
  private errorCode: number;
  private payload: Record<string, unknown> | unknown[];

  constructor({code, message, payload}: ErrorParams) {
    super(message);
    this.errorCode = code || 400;
    this.payload = payload || {};
    Error.captureStackTrace(this, this.constructor);
  }

  get code() {
    return this.errorCode;
  }

  get data() {
    return {
      errorData: this.payload,
      message: this.message,
    };
  }
}