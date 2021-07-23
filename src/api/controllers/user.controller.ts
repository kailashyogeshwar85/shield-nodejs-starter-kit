import { Log4Microservice as Logger } from 'log4-microservice';
import { Request, Response } from 'express';
import { IUtils } from '../../interfaces/IUtils.interface';
import IControllerDeps from '../../interfaces/IControllerDependencies.interface';
import UserService from '../services/user.service';
import Constants from '../../constants/network.constants';
import ApiError from '../exceptions/apiError.exception';

const { HTTP_STATUS_CODE } = Constants;
/**
 * @description UserController
 * @export
 * @class UserController
 */
export default class UserController {
  private userService: UserService;

  private utils: IUtils;

  private logger: Logger;

  /**
   * Creates an instance of UserController.
   * @param {IControllerDeps<UserService>} { logger, utils, service }
   * @memberof UserController
   */
  constructor({ logger, utils, service }: IControllerDeps<UserService>) {
    this.utils = utils;
    this.logger = logger;
    this.userService = service;
  }

  /**
   * @description Get User
   * @param {Request} req
   * @param {Response} res
   * @return {*}  {Promise<void>}
   * @memberof UserController
   */
  async getUser(req: Request, res: Response): Promise<void> {
    this.logger.info('getting users');
    try {
      const result = await this.userService.getUser();
      this.utils.responseUtility.sendSuccessResponse(
        HTTP_STATUS_CODE.OK,
        result,
        res,
      );
    } catch (error) {
      this.logger.error('Exception while fetching users', error);
      this.utils.responseUtility.handleServiceFailedResponse(
        error as ApiError,
        res,
      );
    }
  }

  /**
   * @description Create User
   * @param {Request} req
   * @param {Response} res
   * @return {*}  {Promise<void>}
   * @memberof UserController
   */
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.userService.createUser(req.body);
      this.utils.responseUtility.sendSuccessResponse(
        HTTP_STATUS_CODE.CREATED,
        result,
        res,
      );
    } catch (error: unknown) {
      this.logger.error('Exception ', error);
      this.utils.responseUtility.handleServiceFailedResponse(
        error as ApiError,
        res,
      );
    }
  }
}
