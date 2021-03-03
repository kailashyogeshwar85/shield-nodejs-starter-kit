import { Logger } from '@zebpay/colt';
import { IServiceResult } from '../../interfaces/IResponse.interface';
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

  async getAllUsers(): Promise<IServiceResult> {
    this.logger.info('getting all users');
    const result = await Promise.resolve({
      users: [
        {
          id: 1,
          name: 'kailash',
          email: 'kailashyogeshwar85@gmail.com',
        },
      ],
    });

    return result;
  }
}
