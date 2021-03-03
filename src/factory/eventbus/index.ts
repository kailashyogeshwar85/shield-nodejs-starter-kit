import { asClass, AwilixContainer } from 'awilix';
import EventBus from '../../eventbus';
import LoggerFactory from '../services/logger.service.factory';

const EventBusFactory = (container: AwilixContainer): void => {
  const logger = container.resolve<LoggerFactory>('logger');

  container.register({
    eventBus: asClass(EventBus)
      .singleton()
      .inject(() => logger),
  });
};

export default EventBusFactory;
