import { asClass, AwilixContainer } from 'awilix';
import LoggerFactory from './logger.service.factory';
import { IServiceDeps } from '../../interfaces/IServiceDependencies.interface';
import UserService from '../../api/services/user.service';

export default (container: AwilixContainer): void => {
  const dependencies: IServiceDeps = {
    container,
    logger: container
      .resolve<LoggerFactory>('logger')
      .createLogger('userService'),
    utils: container.resolve('utilityService'),
    models: {},
    eventBus: container.resolve('eventBus'),
  };
  container.register({
    userService: asClass(UserService)
      .singleton()
      .inject(() => dependencies),
  });
};
