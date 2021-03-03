import { AwilixContainer } from 'awilix';
import LoggerFactory from '../factory/services/logger.service.factory';
import ControllerFactory from '../factory/controllers';
import ServiceFactory from '../factory/services';
import UtilityFactory from './utility.loader';
import EventSubscriberFactory from './event.loader';

/**
 * @description Injects dependencies to service layer.
 * @param {IShieldApplication} app
 * @param {Logger} logger
 */
const Injector = (container: AwilixContainer): void => {
  const logger = container
    .resolve<LoggerFactory>('logger')
    .createLogger('injector');

  logger.info('injecting dependencies');

  UtilityFactory(container);

  // Load EventSubscribe factoryr
  EventSubscriberFactory(container);

  // Load Services
  ServiceFactory(container);

  // Load controllers as it depends on services
  ControllerFactory(container);
};

export default Injector;
