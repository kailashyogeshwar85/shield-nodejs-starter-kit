/**
 * @description OrderPlaced Kafka Message handler
 * @export
 * @class OrderPlacedMessageHandler
 */
export default class OrderPlacedMessageHandler {
  /* eslint-disable no-undef */

  /**
   * @description Registers subscriber for message
   * @static
   * @param {MessagingProvider} provider
   * @return {*}  {Promise<void>}
   * @memberof OrderPlacedMessageHandler
   */
  static async init(provider: MessagingProvider): Promise<void> {
    // Process Order and create invoice
  }
}
