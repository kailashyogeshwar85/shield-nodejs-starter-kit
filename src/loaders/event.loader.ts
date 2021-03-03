import { AwilixContainer } from 'awilix';
import EventFactory from '../events';

const EventSubscriberFactory = async (
  container: AwilixContainer,
): Promise<void> => {
  EventFactory(container.resolve('eventBus'), container);
};

export default EventSubscriberFactory;
