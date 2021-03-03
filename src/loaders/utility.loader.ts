import { asValue, AwilixContainer } from 'awilix';
import { IUtils } from '../interfaces/IUtils.interface';
import UtilityService from '../utils/utilityservice.utils';

/**
 * @description Utility Loader
 * @param {AwilixContainer} container
 * @return {*}  {IUtils}
 */
const UtilityFactory = (container: AwilixContainer): IUtils => {
  container.register({
    utilityService: asValue(UtilityService),
  });

  return container.resolve<IUtils>('utilityService');
};

export default UtilityFactory;
