import { AwilixContainer } from 'awilix';
import { Router } from 'express';
import UserRouter from './user.routes';
import HealthRouter from './health.routes';
// import TodoRouter from './todo.routes';
/**
 * @description Configures Routes
 * @param {IExpressApp} { app }
 */
const AppRouter = (container: AwilixContainer): Router => {
  const app = Router();
  /**
   * Application route will be initialized here
   */
  UserRouter({ app, container });
  // TodoRouter({ app, container });
  HealthRouter({ app, container });

  return app;
};

export default AppRouter;
