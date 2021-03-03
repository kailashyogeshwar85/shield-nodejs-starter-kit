/**
 * @class ResponseUtility
 * @description Provides utility API for sending consistent response.
 */

import { Response } from 'express';
import { IResponseError } from '../interfaces/IResponseError.interface';

export default class ResponseUtility {
  /**
   * @description Sends Success Response
   * @static
   * @param {number} [status=200]
   * @param {unknown} data
   * @param {Response} res
   * @memberof ResponseUtility
   */
  static sendSuccessResponse(status = 200, data: unknown, res: Response): void {
    res.status(status).json({
      status: 'success',
      data,
      error: null,
    });
  }

  /**
   * @description Sends fail response due to data invalidation
   * @static
   * @param {number} [status=400]
   * @param {IResponseError} error
   * @param {Response} res
   * @memberof ResponseUtility
   */
  static sendFailedResponse(
    status = 400,
    error: IResponseError,
    res: Response,
  ): void {
    res.status(status).json({
      status: 'fail',
      data: null,
      error,
    });
  }

  /**
   * @description Send error response incase of exception.
   * @static
   * @param {number} [status=500]
   * @param {IResponseError} error
   * @param {Response} res
   * @memberof ResponseUtility
   */
  static sendErrorResponse(
    status = 500,
    error: IResponseError,
    res: Response,
  ): void {
    res.status(status).json({
      status: 'error',
      data: null,
      error,
    });
  }
}
