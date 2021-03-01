import { asClass, AwilixContainer } from 'awilix';
import TodoService from '../../api/services/todo.service';

export default (container: AwilixContainer): void => {
  // TODO: define dependencies here
  container.register({
    todoService: asClass(TodoService).singleton(),
  });
};
