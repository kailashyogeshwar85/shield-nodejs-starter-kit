import { Logger } from '@zebpay/colt';
import { IUtils } from './IUtils.interface';

/**
 * @description Represents the base dependencies that are required by all the classes eg: logger
 *
 * @interface IBaseDependencies
 */
export interface IBaseDependencies {
  logger?: Logger;
  utils: IUtils;
}
