import IApiError from '../../interfaces/IApiError.interface';
import ApiError from './apiError.exception';

/**
 * @description
 * @class ApplicationException
 * @extends {ApiError}
 */
class ApplicationException extends ApiError {
  public name: string;

  static readonly isOperational = false;

  /**
   * Creates an instance of ApplicationException.
   * @param {IApiError} error
   * @memberof ApplicationException
   */
  constructor(error: IApiError) {
    super(error, ApplicationException.isOperational);
    this.name = this.constructor.name;
  }
}

export default ApplicationException;
