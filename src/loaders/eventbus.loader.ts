import { AwilixContainer } from 'awilix';
import EventBusFactory from '../factory/eventbus';
import DIHelper from '../utils/di.utils';

const EventBusLoader = async (): Promise<void> => {
  const container: AwilixContainer = DIHelper.getContainer();
  EventBusFactory(container);
};

export default EventBusLoader;
