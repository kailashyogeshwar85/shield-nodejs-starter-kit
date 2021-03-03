import Lodash from 'lodash';
import axios from 'axios';
import ResponseUtility from '../utils/response.utils';
import DIUtility from '../utils/di.utils';

export interface IUtils {
  _: typeof Lodash;
  axios: typeof axios;
  getFileName: () => string;
  tryParse: () => JSON | string;
  responseUtility: typeof ResponseUtility;
  diUtility: typeof DIUtility;
}
