import IExpressApp from '../../interfaces/IExpressApp.interface';
import UserRouter from './user.routes';
import TodoRouter from './todo.routes';
/**
 * @description Configures Routes
 * @param {IExpressApp} { app }
 */
const AppRouter = ({ app }: IExpressApp) => {
  /**
   * Application route will be initialized here
   */
  UserRouter(app);
  TodoRouter(app);
};

export default AppRouter;
