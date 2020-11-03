/**
 * Redis QueueService using Bull SDK
 */

import { Application } from 'express';
import Queue, { Queue as BullQueue } from 'bull';
import { Logger } from '@zebpay/colt';
import Config from '../../config';
import IExpressApp from '../../interfaces/IExpressApp';
import IQueue from '../../interfaces/IQueue';
import LoggerFactory from '../../factory/services/logger.factory';

/**
 * @description Creates a bull service
 * @class RedisQueueService
 * @implements {IQueue<RedisQueueService>}
 */
class RedisQueueService implements IQueue<RedisQueueService> {
  private queueOptions: Queue.QueueOptions;

  private app: Application;

  private queue: BullQueue;

  private logger: Logger;

  constructor({ app }: IExpressApp, logger: LoggerFactory) {
    this.queueOptions = {
      redis: {
        port: Number(Config.REDIS_CONFIG.port),
        host: Config.REDIS_CONFIG.host,
        username: Config.REDIS_CONFIG.username,
        password: Config.REDIS_CONFIG.password,
      },
    };
    this.logger = logger.createLogger('queue');
    this.app = app;
  }

  /**
   * @description Creates a queue for jobType eg: createPDF
   * @param {string} queueName
   * @return {*}  {Promise<RedisQueueService>}
   * @memberof RedisQueueService
   */
  async configure(queueName: string): Promise<RedisQueueService> {
    return new Promise((resolve, reject) => {
      this.queue = new Queue(queueName, this.queueOptions);

      this.queue.client.on('connect', () => {
        this.logger.info(`${queueName} is connected`);
        resolve(this);
      });

      this.queue.client.on('error', err => {
        this.logger.error('Failed to initialize queue');
        this.app.emit('error', err);
        reject(err);
      });
    });
  }

  /**
   * @description Registers a Job Processor
   * @param {JobProcessor} processor
   * @memberof RedisQueueService
   */
  // eslint-disable-next-line no-undef
  registerProcessor(processor: JobProcessor): void {
    this.queue.process(processor);
  }

  // TODO: Add additional methods like purge
  purge(): void {
    this.queue.clean(1000);
  }
}

export default RedisQueueService;
