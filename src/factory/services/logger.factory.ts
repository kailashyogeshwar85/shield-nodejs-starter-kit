import { Logger } from '@zebpay/colt';

/**
 * @description Creates a logger instance for module.
 * @export
 * @class LoggerFactory
 */
export default class LoggerFactory {
  /**
   * @description Returns new logger instance with scope bound.
   *
   * @param {*} scope
   * @return {*}  {Logger}
   * @memberof LoggerFactory
   */
  // eslint-disable-next-line class-methods-use-this
  createLogger(scope: string): Logger {
    return new Logger(scope);
  }
}
