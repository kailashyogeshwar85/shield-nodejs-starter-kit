import Lodash from 'lodash';
import { Response } from 'express';

export interface IUtils {
  sendFailureResponse: (
    res: Response,
    status: number,
    message: string,
    code: any,
    data: any,
  ) => void;
  sendSuccessResponse: (
    res: Response,
    status: number,
    message: string,
    data: any,
  ) => void;
  lodash: typeof Lodash;
}
