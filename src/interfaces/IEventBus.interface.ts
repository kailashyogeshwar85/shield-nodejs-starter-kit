/* eslint-disable no-undef */
export interface IEvent {
  type: string;
  payload: unknown;
}

export interface ISubscribtionReturnType {
  unsubscribe: () => void;
}
export interface IEventBus {
  dispatch(event: IEvent): void;
  subscribe(event: string, handler: SubscribeHandler): ISubscribtionReturnType;
}
