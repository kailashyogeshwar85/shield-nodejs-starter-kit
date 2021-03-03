/**
 * @author Kailash Yogeshwar <kailashyogedshwar85@gmail.com>
 * @date October 31 2020
 */

import { AwilixContainer, asClass } from 'awilix';
import { Logger } from '@zebpay/colt';
import IExpressApp from '../interfaces/IExpressApp.interface';
import LoggerFactory from '../factory/services/logger.service.factory';
import Injector from './injector.loader';
import DIUtil from '../utils/di.utils';
import DatabaseFactory from './database.loader';
import QueueFactory from './queue.loader';
import JobFactory from './jobs.loader';
import MessagingFactory from './messaging.loader';
import EventBusFactory from './eventbus.loader';
import ExpressLoader from './express.loader.';

/**
 * @description Loaders will load all the modules and hook up the dependencies.
 */
const loader = async ({ app }: IExpressApp): Promise<void> => {
  const container: AwilixContainer = DIUtil.getContainer();

  container.register({
    logger: asClass(LoggerFactory).singleton(),
  });
  let logger: Logger;
  try {
    logger = container.resolve<LoggerFactory>('logger').createLogger('loader');
    logger.info('logger initialized');

    await EventBusFactory();

    // Load database
    await DatabaseFactory({ app });

    const queueService = await QueueFactory({ app });

    // Registers Queue Processors
    await JobFactory(queueService);

    // load stream
    await MessagingFactory();

    // controller/services dependency injector
    await Injector(container);

    await ExpressLoader({ app, container });
  } catch (e) {
    logger.error('Error in dependency injection ', e);
  }
};

export default loader;
