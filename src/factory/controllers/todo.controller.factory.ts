import { asClass, AwilixContainer } from 'awilix';
import TodoService from '../../api/services/todo.service';
import IControllerDeps from '../../interfaces/IControllerDependencies.interface';
import TodoController from '../../api/controllers/todo.controller';
import LoggerFactory from '../services/logger.service.factory';

export default (container: AwilixContainer): void => {
  const dependencies: IControllerDeps<TodoService> = {
    utils: container.resolve('utilityService'),
    logger: container.resolve<LoggerFactory>('logger').createLogger('todoctrl'),
    service: container.resolve<TodoService>('todoService'),
  };

  // register controller with container
  container.register({
    todoController: asClass(TodoController)
      .singleton()
      .inject(() => dependencies),
  });
};
