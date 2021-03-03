import { Router, Request, Response } from 'express';
import TodoController from '../controllers/todo.controller';
import IRouterDependencies from '../../interfaces/IRouterDepdencies.interface';

const TodoRouter = ({ app, container }: IRouterDependencies): void => {
  const router = Router();
  app.use(router);
  /**
   *
   * @api {GET} /todos Get TODOS
   * @apiName TODOS
   * @apiGroup TODO
   * @apiVersion  0.0.1
   *
   *
   * @apiSuccess (200) {JSON} name description
   *
   * @apiSuccessExample {type} Success-Response:
   * {
   *     "status": "success",
   *     "data": [],
   *     "error": null
   * }
   *
   */
  router.get('/todos', (req: Request, res: Response) => {
    container.resolve<TodoController>('todoController').getTodos(req, res);
  });
};

export default TodoRouter;
