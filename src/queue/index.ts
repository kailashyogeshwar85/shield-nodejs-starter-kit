import IQueue from '../interfaces/IQueue.interface';
import IExpressApp from '../interfaces/IExpressApp.interface';
import Config from '../constants/config.constant';
import RedisQueueService from './plugins/redis.queue';
import LoggerFactory from '../factory/services/logger.factory';

/**
 * @description Configures the Queue Adapter eg: Redis, SQS
 * @param {IExpressApp} dependency
 * @param {LoggerFactory} loggerService
 * @return {*}  {IQueue<RedisQueueService>}
 */
const Queue = (
  dependency: IExpressApp,
  loggerService: LoggerFactory,
): IQueue<RedisQueueService> => {
  let service: IQueue<RedisQueueService>; // RedisQueue | SQSQueue
  switch (Config.QUEUE_ADAPTER) {
    case 'REDIS':
      service = new RedisQueueService(dependency, loggerService);
      break;
    case 'SQS':
      // service = new SQS();
      break;
    default:
      service = new RedisQueueService(dependency, loggerService);
  }

  return service;
};

export default Queue;
