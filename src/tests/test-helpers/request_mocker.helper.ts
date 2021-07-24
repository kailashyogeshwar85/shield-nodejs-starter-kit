/* eslint-disable no-restricted-syntax */
import { Log4Microservice as Logger } from 'log4-microservice';
// eslint-disable-next-line import/no-extraneous-dependencies
import httpNock from 'nock';
import {
  IRequestMocker,
  IMockAPIConfig,
  INockAPI,
  IRequestMockOptions,
} from '../interfaces/IRequestMocker.interface';
import REQUEST_MOCKS from '../mocks/request.mock';

export default class RequestMocker implements IRequestMocker {
  private logger: Logger = new Logger(__filename);

  /**
   * @description
   * @param {(IMockAPIConfig | IMockAPIConfig[])} mockConfig
   * @memberof RequestMocker
   */
  createMocks(mockConfig: IMockAPIConfig | IMockAPIConfig[]): void {
    if (Array.isArray(mockConfig)) {
      mockConfig.forEach((el: IMockAPIConfig) => {
        const apis: INockAPI = REQUEST_MOCKS[el.apiName];

        if (!apis) {
          throw new Error('Error in nocking request');
        }
        this.initMocks(el.baseUrl, apis);
      });
    } else {
      const apis: INockAPI = REQUEST_MOCKS[mockConfig.apiName];
      if (!apis) {
        throw new Error('Error in nocking request');
      }
      this.initMocks(mockConfig.baseUrl, apis);
    }
  }

  initMocks(baseUrl: string, apis: INockAPI): void {
    this.logger.info('init mocks');
    // eslint-disable-next-line guard-for-in
    for (const apiName in apis) {
      const mock: IRequestMockOptions = apis[apiName] as IRequestMockOptions;
      const headers = mock.headers ? mock.headers : {};
      const scope: httpNock.Scope = httpNock(baseUrl, {
        reqheaders: headers,
      });

      if (mock.persist) {
        scope.persist(true);
      }
      if (mock.matchHeader && mock.matchHeader.length) {
        // eslint-disable-next-line prefer-spread
        scope.matchHeader.apply(scope, mock.matchHeader);
      }

      scope[mock.method](`/${decodeURI(mock.path)}`)
        .times(mock.times || 1)
        .query(mock.query || {})
        .reply(mock.status || 200, mock.response);
    }
  }

  /**
   * @description
   * @memberof RequestMocker
   */
  clearMocks(): void {
    this.logger.info('clearing mocks');
    httpNock.cleanAll();
  }
}
