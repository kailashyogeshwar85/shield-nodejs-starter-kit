import { Logger } from '@zebpay/colt';
import LoggerFactory from '../factory/services/logger.service.factory';
import { IMessagingOptions } from '../interfaces/IMessaging.interface';
import KafkaStreamProvider from './providers/kafka.messaging';

/**
 * @description Stream Class create Pubsub Provider
 * @class Stream
 */
class Stream {
  private messagingOptions: IMessagingOptions;

  private logger: Logger;

  private loggerService: LoggerFactory;

  /**
   * Creates an instance of Stream.
   * @param {IMessagingOptions} options
   * @param {LoggerFactory} loggerService
   * @memberof Stream
   */
  constructor(options: IMessagingOptions, loggerService: LoggerFactory) {
    this.messagingOptions = options;
    this.loggerService = loggerService;
    this.logger = loggerService.createLogger('stream');
  }

  /* eslint-disable no-undef */
  /**
   * @description
   * @return {*}  {StreamProvider}
   * @memberof Stream
   */
  init(): MessagingProvider {
    let provider: MessagingProvider;
    const opts: IMessagingOptions = this.messagingOptions;
    this.logger.debug(`Configuring Stream TYPE:: ${opts.type}`);
    switch (this.messagingOptions.type) {
      case 'kafka':
        provider = new KafkaStreamProvider(opts, this.loggerService);
        break;
      default:
        throw new Error(
          `Messaging provider ${this.messagingOptions.type} not supported`,
        );
    }

    return provider;
  }
}

export default Stream;
