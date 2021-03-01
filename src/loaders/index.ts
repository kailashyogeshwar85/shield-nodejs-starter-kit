/**
 * @author Kailash Yogeshwar <kailashyogedshwar85@gmail.com>
 * @date October 31 2020
 */

import { AwilixContainer, asClass } from 'awilix';
import IExpressApp from '../interfaces/IExpressApp.interface';
import Logger from '../factory/services/logger.factory';
import DI from './injector.loader';
import DIUtil from '../utils/di.utils';
import DatabaseFactory from './database.loader';
import QueueFactory from './queue.loader';
import JobFactory from './jobs.loader';
import StreamFactory from './messaging.loader';

/**
 * @description Loaders will load all the modules and hook up the dependencies.
 */
const loader = async ({ app }: IExpressApp): Promise<void> => {
  const container: AwilixContainer = DIUtil.getContainer();

  container.register({
    logger: asClass(Logger).singleton(),
  });

  const logger = container.resolve<Logger>('logger').createLogger('loader');
  logger.info('logger initialized');

  // Load database
  await DatabaseFactory({ app });

  const queueService = await QueueFactory({ app });

  // Registers Queue Processors
  await JobFactory(queueService);

  // load stream
  await StreamFactory();

  await DI({ app });
};

export default loader;
