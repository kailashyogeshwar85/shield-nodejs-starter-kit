import { Request, Response } from 'express';
import { Log4Microservice as Logger } from 'log4-microservice';
import morgan from 'morgan';

export default class RequestLogger {
  static logRequest(): any {
    const logger = new Logger('reqlog');

    return morgan((token, req: Request, res: Response) => {
      logger.info(
        `Started [${req.method}] ${req.originalUrl} for ${this.getIP(
          token,
          req,
          res,
        )} ${token.status(req, res)} ${this.getResponseTime(
          token,
          req,
          res,
        )} Request Body: ${JSON.stringify(req.body)}`,
        {
          'request-id': req.headers['request-id'],
          'user-id': req.headers['user-id'],
        },
      );
      const requestMetrics = {
        url: req.originalUrl,
        method: req.method,
        statusCode: Number(token.status(req, res)),
        responseTime: Number(
          this.getResponseTime(token, req, res).slice(0, -2),
        ),
      };

      logger.debug('Request Metrics ', {}, { requestMetrics });

      return undefined;
    });
  }

  static getIP(tokens: unknown, req: Request, res: Response): string {
    return tokens['remote-addr'](req, res);
  }

  static getResponseTime(tokens: unknown, req: Request, res: Response): string {
    return `${Math.ceil(tokens['response-time'](req, res))}ms`;
  }
}
