/**
 * Redis QueueService using Bull SDK
 */

import { Application } from 'express';
import Queue, { Queue as BullQueue } from 'bull';
import { Logger } from '@zebpay/colt';
import Config from '../../constants/config.constant';
import IExpressApp from '../../interfaces/IExpressApp.interface';
import IQueue from '../../interfaces/IQueue.interface';
import LoggerFactory from '../../factory/services/logger.service.factory';

/**
 * @description Creates a bull service
 * @class RedisQueueService
 * @implements {IQueue<RedisQueueService>}
 */
class RedisQueueService implements IQueue<RedisQueueService> {
  private queueOptions: Queue.QueueOptions;

  private app: Application;

  private logger: Logger;

  /**
   * @description Map of Queues associated with their name
   * @private
   * @type {Map<string, BullQueue>}
   * @memberof RedisQueueService
   */
  private queueList: Map<string, BullQueue>;

  /**
   * Creates an instance of RedisQueueService.
   * @param {IExpressApp} { app }
   * @param {LoggerFactory} logger
   * @memberof RedisQueueService
   */
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
    this.queueList = new Map();
  }

  /**
   * @description Creates a queue for jobType eg: createPDF
   * @param {string} queueName
   * @return {*}  {Promise<RedisQueueService>}
   * @memberof RedisQueueService
   */
  async configure(queueName: string): Promise<RedisQueueService> {
    this.logger.debug(`Configuring JobQueue for ${queueName}`);

    return new Promise((resolve, reject) => {
      if (this.queueList.has(queueName)) {
        return resolve(this);
      }
      const queue = new Queue(queueName, this.queueOptions);
      this.queueList.set(queueName, queue);

      queue.client.on('connect', () => {
        this.logger.info(`${queue.name} is connected ${queue.name}`);
        resolve(this);
      });

      queue.client.on('error', err => {
        this.logger.error(`Failed to initialize queue ${queue.name}`);
        this.app.emit('error', err);
        reject(err);
      });
    });
  }

  /**
   * @description Registers a Job Processor
   * @param {string} queueName QueueName of a job eg: imageConverter
   * @param {string} jobCategory Category of a job eg: pngConverter
   * @param {JobProcessor} processor
   * @memberof RedisQueueService
   */
  // eslint-disable-next-line no-undef
  public registerProcessor(
    queueName: string,
    // eslint-disable-next-line no-undef
    processor: JobProcessor,
    jobCategory?: string,
  ): void {
    if (!this.queueList.has(queueName)) {
      throw new Error(`No Queue is configured with type ${jobCategory}`);
    }
    if (jobCategory) {
      this.queueList.get(queueName).process(processor);
    }
    this.queueList.get(queueName).process(jobCategory, processor);
  }

  /**
   * @description Adds job to the current queue.
   * @param {string} queueName QueueName of a job eg: imageConverter
   * @param {string} jobCategory Category of a job eg: userRegistered
   * @param {unknown} jobData
   * @memberof RedisQueueService
   */
  public addJob(
    queueName: string,
    jobData: unknown,
    jobCategory?: string,
  ): Promise<Queue.Job<any>> {
    if (!this.queueList.has(queueName)) {
      throw new Error(`No Queue is configured with type ${jobCategory}`);
    }
    if (jobCategory) {
      return this.queueList.get(queueName).add(jobData);
    }

    return this.queueList.get(queueName).add(jobCategory, jobData);
  }

  /**
   * @description Purges a queue
   * @param {string} queueName
   * @param {number} gracePeriod
   * @memberof RedisQueueService
   */
  public purge(queueName: string, gracePeriod: number): void {
    this.queueList.get(queueName).clean(gracePeriod);
  }
}

export default RedisQueueService;
