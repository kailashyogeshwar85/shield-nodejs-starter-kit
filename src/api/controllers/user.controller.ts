import { Logger } from '@zebpay/colt';
import { Request, Response } from 'express';
import { IUtils } from '../../interfaces/IUtils.interface';
import IControllerDeps from '../../interfaces/IControllerDependencies.interface';
import UserService from '../services/user.service';

export default class UserController {
  private userService: UserService;

  private utils: IUtils;

  private logger: Logger;

  constructor({ logger, utils, service }: IControllerDeps<UserService>) {
    this.utils = utils;
    this.logger = logger;
    this.userService = service;
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    this.logger.info('getting users');
    try {
      const result = await this.userService.getAllUsers();
      this.utils.responseUtility.sendSuccessResponse(200, result, res);
    } catch (e) {
      // TODO: failed or error response ?
      this.logger.error('Exception ', e);
      this.utils.responseUtility.sendErrorResponse(400, e, res);
    }
  }
}
