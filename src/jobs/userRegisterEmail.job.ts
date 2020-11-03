import { Logger } from '@zebpay/colt';
import Queue from 'bull';
import LoggerFactory from '../factory/services/logger.factory';

/**
 * @description Creates the new registered Email job.
 * @class UserRegisteredEmailJob
 */
class UserRegisteredEmailJob {
  static type = 'UserRegisteredEmail';

  private logger: Logger;

  // TODO: provide email service as dependency
  /**
   * Creates an instance of UserRegisteredEmailJob.
   * @param {LoggerFactory} loggerService
   * @memberof UserRegisteredEmailJob
   */
  constructor(loggerService: LoggerFactory) {
    this.logger = loggerService.createLogger('regjob');
  }

  public async process(
    job: Queue.Job<unknown>,
    done: Queue.DoneCallback,
  ): Promise<void> {
    this.logger.debug(`Processing job `, job);
    // do your processing like sending email
    done();
  }
}

export default UserRegisteredEmailJob;
