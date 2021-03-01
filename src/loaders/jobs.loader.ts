import { asClass, AwilixContainer } from 'awilix';
import LoggerFactory from '../factory/services/logger.service.factory';
import IQueue from '../interfaces/IQueue.interface';
import UserRegisterEmailJob from '../jobs/userRegisterEmail.job';
import DIHelper from '../utils/di.utils';

// eslint-disable-next-line no-undef
const JobFactory = async (queue: IQueue<QueueService>): Promise<void> => {
  const container: AwilixContainer = DIHelper.getContainer();
  const loggerService = container.resolve<LoggerFactory>('logger');
  const logger = loggerService.createLogger('jobfactory');
  try {
    // NOTE: Separate out logic for processors in Deliver Job Service to better utilize CPU.
    container.register({
      userRegisterEmailJob: asClass(UserRegisterEmailJob)
        .inject(() => ({ queue, loggerService }))
        .classic()
        .singleton(),
    });

    // Register All your Jobs Class here
  } catch (e) {
    logger.error(`Error in job factory `, e);
  }
};

export default JobFactory;
