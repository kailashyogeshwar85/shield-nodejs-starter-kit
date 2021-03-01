/* eslint-disable no-undef */
import { Logger } from '@zebpay/colt';
import Queue from 'bull';
import IJobCreator from '../interfaces/IJobCreator.interface';
import IQueue, { IJobProcessor } from '../interfaces/IQueue.interface';
import LoggerFactory from '../factory/services/logger.factory';

/**
 * @description Creates the new registered Email job.
 * @class UserRegisteredEmailJob
 */
class UserRegisteredEmailJob implements IJobCreator {
  static queueName = 'userQueue';

  private logger: Logger;

  private queue: IQueue<QueueService>;

  /**
   * Creates an instance of UserRegisteredEmailJob.
   * @param {LoggerFactory} loggerService
   * @memberof UserRegisteredEmailJob
   */

  constructor(queue: IQueue<QueueService>, loggerService: LoggerFactory) {
    this.queue = queue;
    this.logger = loggerService.createLogger('regjob');
    this.logger.debug(`Configuring queue: ${UserRegisteredEmailJob.queueName}`);
    this.queue.configure(UserRegisteredEmailJob.queueName);
  }

  /**
   * @description Adds the Job to Queue
   * @param {string} jobType category of a job eg: userCreateWebhook
   * @param {unknown} job Job data
   * @memberof UserRegisteredEmailJob
   */
  add(job: unknown, jobType?: string): Promise<Queue.Job<unknown>> {
    return this.queue.addJob(UserRegisteredEmailJob.queueName, job, jobType);
  }

  /**
   * @description JobProcessor
   * @return {*}  {IJobProcessor}
   * @memberof UserRegisteredEmailJob
   */
  public process(): IJobProcessor {
    return (job: Queue.Job<unknown>, done: Queue.DoneCallback) => {
      this.logger.debug(`processing job `, job.name);
      done();
    };
  }
}

export default UserRegisteredEmailJob;
