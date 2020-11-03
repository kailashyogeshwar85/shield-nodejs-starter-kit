import { asValue } from 'awilix';
import LoggerFactory from '../factory/services/logger.factory';
import { IStreamOptions } from '../interfaces/IStream';
import Stream from '../streams';
import Config from '../config';
import DIHelper from '../utils/di.utils';

/**
 * @description Exports Stream Provider
 */
const streamFactory = async (): Promise<void> => {
  const container = DIHelper.getContainer();

  const loggerService = container.resolve<LoggerFactory>('logger');

  const logger = loggerService.createLogger('stream');

  logger.info('Configuring stream provider');

  const options: IStreamOptions = {
    type: Config.STREAM_ADAPTER,
    connectOpts: Config.STREAM_CONFIG,
  };

  const streamProvider = new Stream(options, loggerService).init();
  await streamProvider.createClient('some_group_id');

  container.register({
    streamProvider: asValue(streamProvider),
  });
};

export default streamFactory;
