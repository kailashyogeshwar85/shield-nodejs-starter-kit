import IApiError from '../../interfaces/IApiError.interface';

/**
 * @description Api Error class
 * @class ApiError
 * @extends {Error}
 */
class ApiError extends Error {
  public name: string;

  public isOperational: boolean;

  public statusCode: number;

  public errorCode: string;

  public errors: []; // TODO: type

  /**
   * Creates an instance of ApiError.
   * @param {IApiError} { message, statusCode, errorCode }
   * @memberof ApiError
   */
  constructor(
    { message, statusCode, errorCode, errors }: IApiError,
    isOperational: boolean,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.isOperational = isOperational; // true = eg: ECONNREFUSED
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errors = errors || [];
    Error.captureStackTrace(this);
  }
}

export default ApiError;
