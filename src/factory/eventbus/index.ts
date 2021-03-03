import { asClass, AwilixContainer } from 'awilix';
import EventBus from '../../eventbus';

const EventBusFactory = (container: AwilixContainer): void => {
  container.register({
    eventBus: asClass(EventBus).singleton(),
  });
};

export default EventBusFactory;
