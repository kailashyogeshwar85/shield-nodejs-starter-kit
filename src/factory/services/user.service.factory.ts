import { asClass, AwilixContainer } from 'awilix';
import UserService from '../../api/services/user.service';

export default (container: AwilixContainer): void => {
  // TODO: define dependencies here
  container.register({
    userService: asClass(UserService).singleton(),
  });
};
