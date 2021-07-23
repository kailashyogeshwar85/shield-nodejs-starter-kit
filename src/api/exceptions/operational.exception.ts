import IApiError from '../../interfaces/IApiError.interface';
import ApiError from './apiError.exception';

/**
 * @description
 * @class OperationalException
 * @extends {ApiError}
 */
class OperationalException extends ApiError {
  public name: string;

  static readonly isOperational = true;

  /**
   * Creates an instance of OperationalException.
   * @param {IApiError} error
   * @memberof OperationalException
   */
  constructor(error: IApiError) {
    super(error, OperationalException.isOperational);
    this.name = this.constructor.name;
  }
}

export default OperationalException;
