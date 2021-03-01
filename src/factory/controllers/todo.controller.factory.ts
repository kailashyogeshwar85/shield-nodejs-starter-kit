import TodoService from 'api/services/todo.service';
import { asClass, AwilixContainer } from 'awilix';
import IControllerDeps from 'interfaces/IControllerDependencies.interface';
import TodoController from '../../api/controllers/todo.controller';
import { LoggerServiceFactory as Logger } from '../services';

export default (container: AwilixContainer): void => {
  const baseDependencies: IControllerDeps<TodoService> = {
    utils: container.resolve('utilService'),
    logger: ,
    service: container.resolve<TodoService>('todoService'),
  };
};
