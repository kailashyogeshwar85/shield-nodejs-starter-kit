export interface IOrderPlacedEvent {
  userId: string;
  orderId: string;
  orderAmount: number;
  eventName: string;
  eventTime: number;
}
