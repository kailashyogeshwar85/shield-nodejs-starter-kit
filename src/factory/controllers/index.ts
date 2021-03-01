import { AwilixContainer } from 'awilix';
import UserControllerFactory from './user.controller.factory';
import TodoControllerFactory from './todo.controller.factory';

// pass any additional dependencies a factory controller can have
export default (container: AwilixContainer): void => {
  UserControllerFactory(container);
  TodoControllerFactory(container);
};
