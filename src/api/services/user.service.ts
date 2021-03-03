import { Logger } from '@zebpay/colt';
import { IServiceDeps } from '../../interfaces/IServiceDependencies.interface';

/**
 * @description Todo Service
 * @export
 * @class UserService
 */
export default class UserService {
  private logger: Logger;

  /**
   * Creates an instance of UserService.
   * @param {IServiceDeps} { logger }
   * @memberof UserService
   */
  constructor(deps: IServiceDeps) {
    this.logger = deps.logger;
  }

  async getAllUsers(): Promise<any> {
    this.logger.info('getting todos');
    const result = await Promise.resolve([{ id: 1, title: 'todo1' }]);

    return result;
  }
}
