import { IEventBus } from '../interfaces/IEventBus.interface';

/**
 * @description EventBus will allow to publish/subscribe events at the application level.
 * @class EventBus
 */
class EventBus implements IEventBus {
  // eslint-disable-next-line no-undef
  public subscribers: EventSubscriberMap;

  /**
   * Creates an instance of EventBus.
   * @param {string} name
   * @memberof EventBus
   */
  constructor() {
    this.subscribers = new Map();
  }

  // TODO:
  publish(msg: unknown): void {}

  /**
   * @description Registers a Handler for EventType 1:1 support.
   * @param {string} eventType
   * @param {SubscribeHandler} handler
   * @memberof EventBus
   */
  // eslint-disable-next-line no-undef
  subscribe(eventType: string, handler: SubscribeHandler): void {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(
        eventType,
        new Map().set(Symbol(eventType), handler),
      );
    }
  }
}

export default EventBus;
