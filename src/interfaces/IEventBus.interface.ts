/* eslint-disable no-undef */
export interface IEvent {
  type: string;
  payload: unknown;
}

export interface IEventBus {
  subscribers: EventSubscriberMap;
  publish(event: IEvent): void;
  subscribe(event: string, handler: SubscribeHandler): void;
}
