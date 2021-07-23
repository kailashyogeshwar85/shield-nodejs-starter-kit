import { Router, Request, Response } from 'express';
import { validate } from 'express-validation';
import IRouterDependencies from '../../interfaces/IRouterDepdencies.interface';
import LoggerFactory from '../../factory/services/logger.service.factory';
import UserController from '../controllers/user.controller';

import UserValidation from '../validations/user.validation';

const UserRouter = ({ app, container }: IRouterDependencies): void => {
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
  router.get(
    '/user',
    // [validate(UserValidation.listUser)],
    (req: Request, res: Response) => {
      container.resolve<UserController>('userController').getUser(req, res);
    },
  );

  /**
   *
   * @api {POST} /user Creates User
   * @apiName create User
   * @apiGroup User
   * @apiVersion  0.0.1
   *
   *
   * @apiSuccess (200) {Object} name description
   *
   * @apiSuccessExample {type} Success-Response:
   * {
   *     "status": "success",
   *     "error": null,
   *     "data" : {
   *         "user": {
   *              "email": "kailashyogeshwar85@gmail.com",
   *              "username": "kailash8591"
   *          }
   *      }
   * }
   *
   *
   */
  router.post(
    '/user',
    [validate(UserValidation.createUser)],
    (req: Request, res: Response) => {
      container.resolve<UserController>('userController').createUser(req, res);
    },
  );
};

export default UserRouter;
