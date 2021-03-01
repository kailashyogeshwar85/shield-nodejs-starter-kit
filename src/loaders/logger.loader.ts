import { ILogOptions, Logger } from '@zebpay/colt';
import { AwilixContainer, asClass } from 'awilix';
import Config from '../constants/config.constant';
import LoggerFactory from '../factory/services/logger.service.factory';
import DIHelper from '../utils/di.utils';

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
