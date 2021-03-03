import { Logger } from '@zebpay/colt';
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
  constructor(deps: IServiceDeps) {
    this.logger = deps.logger;
  }

  async getTodos(): Promise<any> {
    this.logger.info('getting todos');
    const result = await Promise.resolve([{ id: 1, title: 'todo1' }]);

    return result;
  }
}
