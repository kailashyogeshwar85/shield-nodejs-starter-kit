import LoggerFactory from 'factory/services/logger.factory';
import IQueue from '../interfaces/IQueue';
import UserRegisterEmailJob from '../jobs/userRegisterEmail.job';
import DIHelper from '../utils/di.utils';

// eslint-disable-next-line no-undef
const JobFactory = async (queue: IQueue<QueueService>): Promise<void> => {
  const container = DIHelper.getContainer();
  const loggerService = container.resolve<LoggerFactory>('logger');
  const logger = loggerService.createLogger('jobfactory');
  try {
    await (await queue.configure(UserRegisterEmailJob.type)).registerProcessor(
      new UserRegisterEmailJob(loggerService).process,
    );
  } catch (e) {
    logger.error(`Error in job factory `, e);
  }
};

export default JobFactory;
