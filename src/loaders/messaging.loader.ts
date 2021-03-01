import { asValue } from 'awilix';
import LoggerFactory from '../factory/services/logger.service.factory';
import { IMessagingOptions } from '../interfaces/IMessaging.interface';
import Stream from '../messaging';
import Config from '../constants/config.constant';
import DIHelper from '../utils/di.utils';

/**
 * @description Exports Stream Provider
 */
const messagingFactory = async (): Promise<void> => {
  const container = DIHelper.getContainer();

  const loggerService = container.resolve<LoggerFactory>('logger');

  const logger = loggerService.createLogger('stream');

  logger.info('Configuring stream provider');

  const options: IMessagingOptions = {
    type: Config.STREAM_ADAPTER,
    connectOpts: Config.STREAM_CONFIG,
  };

  const messagingProvider = new Stream(options, loggerService).init();
  await messagingProvider.createClient('some_group_id');

  container.register({
    messagingProvider: asValue(messagingProvider),
  });
};

export default messagingFactory;
