import { AwilixContainer } from 'awilix';
import { IBaseDependencies } from './IBaseDepedencies.interface';

export interface IServiceDeps extends IBaseDependencies {
  models: any; // models that a service will need
  container: AwilixContainer;
}
