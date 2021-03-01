import { asClass, AwilixContainer } from 'awilix';
import UserController from '../../api/controllers/user.controller';

export default (container: AwilixContainer): void => {
  const baseDependencies = {
    utils: {},
    logger: console,
    service: () => {},
  };

  container.register({
    userController: asClass(UserController)
      .singleton()
      .inject(() => baseDependencies),
  });
};
