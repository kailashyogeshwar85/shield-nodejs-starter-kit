import { Request, Response, NextFunction } from 'express';

/**
 * @description Authentication middleware
 * @export
 * @class AuthMiddleware
 */
export default class AuthMiddleware {
  static isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    next();
  }
}
