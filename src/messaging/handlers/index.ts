import OrderPlacedMessageHandler from './orderplaced.handler';

/**
 * @description Configures event handler with messaging provider
 * @export
 * @class EventHandler
 */
export default class MessageHandler {
  /* eslint-disable no-undef */
  private messageProvider: MessagingProvider;

  /**
   * Creates an instance of MessageHandler.
   * @param {MessageProvider} provider
   * @memberof MessageHandler
   */
  constructor(provider: MessagingProvider) {
    this.messageProvider = provider;
  }

  /**
   * @description Registers all the event handler
   * @static
   * @memberof EventHandler
   */
  async configureEventHandlers(): Promise<void> {
    new OrderPlacedMessageHandler().init(this.messageProvider);
  }
}
