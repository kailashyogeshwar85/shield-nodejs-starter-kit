import { ILogOptions, Log4Microservice as Logger } from 'log4-microservice';
import { AwilixContainer, asClass } from 'awilix';
import Config from '../constants/config.constants';
import LoggerFactory from '../factory/services/logger.service.factory';
import DIHelper from '../utils/di.utils';

/**
 * @description Configures a logger should be called once from server's entrypoint.
 * @param {string} scope
 * @return {*}  {Logger}
 */
const getLogger = (scope: string): Logger => {
  const container: AwilixContainer = DIHelper.getContainer();
  const loggingOptions: ILogOptions = Config.LOG_OPTIONS;
  Logger.setLoggerOptions(loggingOptions);
  Logger.addAdapter(Config.LOG_ADAPTER, Logger.setAdapter(Config.LOG_ADAPTER));
  container.register({
    logger: asClass(LoggerFactory),
  });

  return container.resolve<LoggerFactory>('logger').createLogger(scope);
};

export default getLogger;
