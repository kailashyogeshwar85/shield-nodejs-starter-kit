export interface IEvent {
  type: string;
  payload: unknown;
}

type subscribeHandler = (message: unknown) => void;

export interface IEventBus {
  publish(event: IEvent): void;
  subscribe(event: string, handler: subscribeHandler): void;
}
