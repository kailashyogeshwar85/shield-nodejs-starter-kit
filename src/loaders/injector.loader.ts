import { AwilixContainer } from 'awilix';
import LoggerFactory from '../factory/services/logger.service.factory';
import ControllerFactor from '../factory/controllers';
import ServiceFactory from '../factory/services';
import UtilityFactory from './utility.loader';

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

  // First Service
  ServiceFactory(container);

  // controller as it depends on services
  ControllerFactor(container);
};

export default Injector;
