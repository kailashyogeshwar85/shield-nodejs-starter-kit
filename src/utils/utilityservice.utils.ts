import lodash from 'lodash';

import axios from 'axios';
import ResponseUtility from './response.utils';
import DIUtility from './di.utils';

/**
 * @description Utility Class that will be accessible to all the core components
 * @export
 * @class UtilityService
 */
export default class UtilityService {
  // Define all the utility here
  static readonly _ = lodash;

  static readonly axios = axios;

  static readonly responseUtility = ResponseUtility;

  static readonly diUtility = DIUtility;

  /**
   * @description takes __filename from nodejs server
   * @param filePath
   */
  public static getFileName(filePath: string): string {
    return filePath.split('/')[filePath.split('/').length - 1];
  }

  /**
   * @description
   * @param {string} metrics
   * @memberof UtilityService
   */
  public static tryParse(jsonStr: string): JSON | string {
    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      return jsonStr || '';
    }
  }
}
