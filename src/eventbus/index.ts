import {
  IEvent,
  IEventBus,
  ISubscribtionReturnType,
} from '../interfaces/IEventBus.interface';

/**
 * @description EventBus will allow to publish/subscribe events at the application level.
 * @class EventBus
 */
class EventBus implements IEventBus {
  // eslint-disable-next-line no-undef
  private readonly subscribers: EventSubscriberMap;

  private lastCallbackId: number;

  /**
   * Creates an instance of EventBus.
   * @param {string} name
   * @memberof EventBus
   */
  constructor() {
    this.lastCallbackId = 0;
    this.subscribers = {};
  }

  publish(event: IEvent): void {
    if (!this.subscribers[event.type]) {
      return;
    }
    Object.keys(this.subscribers[event.type]).forEach((callbackId: string) => {
      this.subscribers[event.type][callbackId](event.payload);
    });
  }

  /**
   * @description Registers a Handler for EventType 1:1 support.
   * @param {string} eventType
   * @param {SubscribeHandler} handler
   * @memberof EventBus
   */
  subscribe(
    eventType: string,
    // eslint-disable-next-line no-undef
    handler: SubscribeHandler,
  ): ISubscribtionReturnType {
    const callbackId = this.getCallbackId();
    if (!this.subscribers[eventType]) {
      // eslint-disable-next-line no-undef
      this.subscribers[eventType] = {};
    }
    this.subscribers[eventType][callbackId] = handler;

    return {
      unsubscribe: () => {
        delete this.subscribers[eventType][callbackId];
        if (!Object.keys(this.subscribers[eventType]).length) {
          delete this.subscribers[eventType];
        }
      },
    };
  }

  getCallbackId(): number {
    this.lastCallbackId += 1;

    return this.lastCallbackId;
  }
}

export default EventBus;
