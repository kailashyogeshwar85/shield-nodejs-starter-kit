import { Log4Microservice as Logger } from 'log4-microservice';
import { IOrderPlacedEvent } from '../../interfaces/events/IOrderPlaced.interface';
import MessageType from '../../enums/messagetype.enum';
import LoggerFactory from '../../factory/services/logger.service.factory';
/**
 * @description OrderPlaced Kafka Message handler
 * @export
 * @class OrderPlacedMessageHandler
 */
export default class OrderPlacedMessageHandler {
  private logger: Logger = new LoggerFactory().createLogger('orderhandler');
  /* eslint-disable no-undef */

  /**
   * @description Registers subscriber for message
   * @static
   * @param {MessagingProvider} provider
   * @return {*}  {Promise<void>}
   * @memberof OrderPlacedMessageHandler
   */
  public async init(provider: MessagingProvider): Promise<void> {
    // Process Order and create invoice
    provider.registerHandlers(
      'orders',
      MessageType.ORDER_PLACED,
      this.processEvent.bind(this),
    );
  }

  private processEvent(eventData: IOrderPlacedEvent) {
    this.logger.info('processing order placed event ', eventData);
  }
}
