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

  static sendErrorResponse(
    status = 400,
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
