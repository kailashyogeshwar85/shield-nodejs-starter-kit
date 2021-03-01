import { AwilixContainer } from 'awilix';
import { Application, Router, Request, Response } from 'express';
import LoggerFactory from '../../factory/services/logger.service.factory';
import DIHelper from '../../utils/di.utils';

const TodoRouter = (app: Application): void => {
  const container: AwilixContainer = DIHelper.getContainer();
  const logger = container
    .resolve<LoggerFactory>('logger')
    .createLogger('router');
  logger.debug('Configuring todo router');

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
    res.send('TODO LIST');
  });
};

export default TodoRouter;
