/* global QueueService */
import { asClass, AwilixContainer } from 'awilix';
import LoggerFactory from '../factory/services/logger.service.factory';
import IQueue from '../interfaces/IQueue.interface';
import UserRegisterEmailJob from '../jobs/userRegisterEmail.job';

/**
 * @description Configures DeliveryJobs
 * @param {IQueue<QueueService>} queue
 * @param {AwilixContainer} container
 * @return {*}  {Promise<void>}
 */
const JobLoader = async (
  queue: IQueue<QueueService>,
  container: AwilixContainer,
): Promise<void> => {
  const loggerService = container.resolve<LoggerFactory>('logger');
  const logger = loggerService.createLogger('jobfactory');
  try {
    // NOTE: Separate out logic for processors in Deliver Job Service to better utilize CPU.
    container.register({
      userRegisterEmailJob: asClass(UserRegisterEmailJob)
        .inject(() => ({ queue, loggerService }))
        // pass dependency as a separate argument
        .classic()
        .singleton(),
    });

    // Register All your Jobs Class here
  } catch (e) {
    logger.error(`Error in job factory `, e);
  }
};

export default JobLoader;
