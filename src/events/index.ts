/* eslint-disable no-new */
import { AwilixContainer } from 'awilix';
import { IEventBus } from '../interfaces/IEventBus.interface';
import UserEventSubscriber from './subscribers/userEvents.subscriber';

const Event = (eventBus: IEventBus, container: AwilixContainer): void => {
  new UserEventSubscriber(eventBus, container);
};

export default Event;
