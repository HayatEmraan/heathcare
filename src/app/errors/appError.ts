class appError extends Error {
  status: number;
  constructor(msg: string, status: number) {
    super(msg);
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default appError;
