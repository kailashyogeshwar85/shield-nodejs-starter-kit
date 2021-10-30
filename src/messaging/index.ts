import { Log4Microservice as Logger } from 'log4-microservice';
import LoggerFactory from '../factory/services/logger.service.factory';
import { IMessagingOptions } from '../interfaces/IMessaging.interface';
import KafkaMessagingProvider from './providers/kafka.messaging';

/**
 * @description Messaging Class create Pubsub Provider
 * @class Messaging
 */
class Messaging {
  private messagingOptions: IMessagingOptions;

  private logger: Logger;

  private loggerService: LoggerFactory;

  /* eslint-disable no-undef */
  static provider: MessagingProvider;

  /**
   * Creates an instance of Messaging.
   * @param {IMessagingOptions} options
   * @param {LoggerFactory} loggerService
   * @memberof Messaging
   */
  constructor(options: IMessagingOptions, loggerService: LoggerFactory) {
    this.messagingOptions = options;
    this.loggerService = loggerService;
    this.logger = loggerService.createLogger('messaging');
  }

  /* eslint-disable no-undef */
  /**
   * @description
   * @return {*}  {MessagingProvider}
   * @memberof Messaging
   */
  init(): MessagingProvider {
    const opts: IMessagingOptions = this.messagingOptions;
    this.logger.debug(`Configuring MessagingProvider => ${opts.type}`);

    if (Messaging.provider) {
      return Messaging.provider;
    }

    switch (this.messagingOptions.type) {
      case 'kafka':
        Messaging.provider = new KafkaMessagingProvider(
          opts,
          this.loggerService,
        );
        break;
      default:
        throw new Error(
          `Messaging provider ${this.messagingOptions.type} not supported`,
        );
    }

    return Messaging.provider;
  }
}

export default Messaging;
