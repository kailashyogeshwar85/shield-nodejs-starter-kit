import { AwilixContainer } from 'awilix';
import UserServiceFactory from './user.service.factory';
import TodoServiceFactory from './todo.service.factory';

export default (container: AwilixContainer): void => {
  // containers will be registered in their respective factory functions
  UserServiceFactory(container);
  TodoServiceFactory(container);
};
