import { Logger } from '@zebpay/colt';
import { Request, Response } from 'express';
import { IUtils } from '../../interfaces/IUtils.interface';
import IControllerDeps from '../../interfaces/IControllerDependencies.interface';
import TodoService from '../services/todo.service';

export default class TodoController {
  private todoService: TodoService;

  private utils: IUtils;

  private logger: Logger;

  constructor({ logger, utils, service }: IControllerDeps<TodoService>) {
    this.utils = utils;
    this.logger = logger;
    this.todoService = service;
  }

  async getTodos(req: Request, res: Response): Promise<void> {
    this.logger.info(`Getting all todos for user`);
    try {
      const result = await this.todoService.getTodos();
      this.utils.responseUtility.sendSuccessResponse(200, result, res);
    } catch (e) {
      this.logger.error('Exception ', e);
      this.utils.responseUtility.sendErrorResponse(400, e, res);
    }
  }
}
