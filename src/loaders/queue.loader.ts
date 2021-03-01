import { asValue } from 'awilix';
import IQueue from '../interfaces/IQueue.interface';
import IExpressApp from '../interfaces/IExpressApp.interface';
import DIHelper from '../utils/di.utils';
import LoggerFactory from '../factory/services/logger.service.factory';
import QueueFactory from '../queue';
/**
 * @description Loads Queue Service
 * @param {IExpressApp} { app }
 * @return {*}  {Promise<unknown>}
 */
const QueueLoader = async (
  dependency: IExpressApp,
  // eslint-disable-next-line no-undef
): Promise<IQueue<QueueService>> => {
  const container = DIHelper.getContainer();
  const logger = container
    .resolve<LoggerFactory>('logger')
    .createLogger('queue');

  logger.info('loading Queue Service');

  const queue = await QueueFactory(
    dependency,
    container.resolve<LoggerFactory>('logger'),
  );

  container.register({
    queueService: asValue(queue),
  });

  // This should provided as dependency to job loader to define the job processors.

  return queue;
};

export default QueueLoader;
