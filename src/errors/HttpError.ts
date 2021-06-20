export class HttpError extends Error {
  private errorCode: number;

  constructor(code: number, message: string) {
    super(message);
    this.errorCode = code;
  }

  get code() {
    return this.errorCode;
  }
}