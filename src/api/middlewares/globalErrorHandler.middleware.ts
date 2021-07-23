import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-validation';
import ResponseUtility from '../../utils/response.utils';

function globalErrorHandlerMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (error instanceof ValidationError) {
    ResponseUtility.sendFailedResponse(
      error.statusCode,
      {
        error: {
          code: '1',
          message: error.message,
          errors: error.details, // TODO: format validation messages
        },
      },
      res,
    );
  } else {
    next(error); // TODO
  }
}

export default globalErrorHandlerMiddleware;
