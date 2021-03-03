import { asClass, AwilixContainer } from 'awilix';
import LoggerFactory from './logger.service.factory';
import TodoService from '../../api/services/todo.service';
import { IServiceDeps } from '../../interfaces/IServiceDependencies.interface';

export default (container: AwilixContainer): void => {
  const dependencies: IServiceDeps = {
    container,
    logger: container
      .resolve<LoggerFactory>('logger')
      .createLogger('userService'),
    utils: container.resolve('utilityService'),
    models: {
      // pass in the sequelizeModels
      userModel: {},
    },
    eventBus: container.resolve('eventBus'),
  };
  container.register({
    todoService: asClass(TodoService)
      .singleton()
      .inject(() => dependencies),
  });
};
