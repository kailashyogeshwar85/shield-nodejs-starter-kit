import { Log4Microservice as Logger } from 'log4-microservice';
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

  /**
   * @description Get All users
   * @return {*}  {Promise<IServiceResult>}
   * @memberof UserService
   */
  async getUser(): Promise<IServiceResult> {
    this.logger.info('getting a user');
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

  /**
   * @description creates user
   * @param {unknown} userData
   * @return {*}  {Promise<IServiceResult>}
   * @memberof UserService
   */
  async createUser(userData: unknown): Promise<IServiceResult> {
    this.logger.info('creating user');

    const result = await Promise.resolve({
      user: userData,
    });

    return result;
  }
}
