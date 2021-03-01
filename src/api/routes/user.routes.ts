import { AwilixContainer } from 'awilix';
import { Application, Router, Request, Response } from 'express';
import LoggerFactory from '../../factory/services/logger.service.factory';
import DIHelper from '../../utils/di.utils';

const UserRouter = (app: Application): void => {
  const container: AwilixContainer = DIHelper.getContainer();
  const logger = container
    .resolve<LoggerFactory>('logger')
    .createLogger('router');
  logger.debug('Configuring user router');

  const router = Router();
  app.use(router);

  /**
   *
   * @api {GET} /users Get Users
   * @apiName Get Users List
   * @apiGroup User
   * @apiVersion  0.0.1
   *
   *
   * @apiParam  {String} paramName description
   *
   * @apiSuccess (200) {type} name description
   *
   * @apiParamExample  {type} Request-Example:
   * {
   *     property : value
   * }
   *
   *
   * @apiSuccessExample {type} Success-Response:
   * {
   *     "status" : "success",
   *     "data": [],
   *      error: null
   * }
   *
   */
  router.get('/users', (req: Request, res: Response) => {
    res.send('USER ENDPOINT');
  });
};

export default UserRouter;
