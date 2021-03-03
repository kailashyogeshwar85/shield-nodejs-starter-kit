import { Logger } from '@zebpay/colt';
import { IServiceResult } from '../../interfaces/IResponse.interface';
import { IServiceDeps } from '../../interfaces/IServiceDependencies.interface';

/**
 * @description Todo Service
 * @export
 * @class TodoService
 */
export default class TodoService {
  private logger: Logger;

  /**
   * Creates an instance of TodoService.
   * @param {IServiceDeps} { logger }
   * @memberof TodoService
   */
  constructor({ logger }: IServiceDeps) {
    this.logger = logger;
  }

  async getTodos(): Promise<IServiceResult> {
    this.logger.info('getting todos');
    const result = await Promise.resolve([{ id: 1, title: 'todo1' }]);

    return {
      todos: result,
    };
  }

  /**
   * @description Creates a todo.
   * @param {*} todoData
   * @return {*}  {Promise<any>}
   * @memberof TodoService
   */
  async createTodo(todoData: any): Promise<IServiceResult> {
    this.logger.info('Creating todo ', todoData);
    const result = await Promise.resolve({
      todo: { id: 1, title: todoData.title },
    });

    return result;
  }
}
