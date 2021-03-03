import { asClass, AwilixContainer } from 'awilix';
import LoggerFactory from '../services/logger.service.factory';
import UserController from '../../api/controllers/user.controller';
import UserService from '../../api/services/user.service';
import IControllerDeps from '../../interfaces/IControllerDependencies.interface';

export default (container: AwilixContainer): void => {
  const dependencies: IControllerDeps<UserService> = {
    utils: container.resolve('utilityService'),
    logger: container.resolve<LoggerFactory>('logger').createLogger('todoctrl'),
    service: container.resolve<UserService>('userService'),
  };
  container.register({
    userController: asClass(UserController)
      .singleton()
      .inject(() => dependencies),
  });
};
