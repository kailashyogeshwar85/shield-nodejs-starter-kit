import IExpressApp from '../interfaces/IExpressApp.interface';
import DIHelper from '../utils/di.utils';
import LoggerFactory from '../factory/services/logger.factory';
import AppRouter from '../api/routes';

/**
 * @description Injects dependencies to service layer.
 * @param {IShieldApplication} app
 * @param {Logger} logger
 */
const Injector = ({ app }: IExpressApp): void => {
  const container = DIHelper.getContainer();
  const logger = container
    .resolve<LoggerFactory>('logger')
    .createLogger('injector');

  logger.info('injecting dependencies');
  AppRouter({ app });
};

export default Injector;
