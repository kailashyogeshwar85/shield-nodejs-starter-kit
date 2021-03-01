import { IEventBus } from '../interfaces/IEventBus';

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

  publish(msg: unknown) {}

  // eslint-disable-next-line no-undef
  subscribe(eventType: string, handler: SubscribeHandler): void {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(
        eventType,
        new Map().set(Symbol(eventType), handler),
      );
    } else {
    }
  }
}

export default EventBus;
