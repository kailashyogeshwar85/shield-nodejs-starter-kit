import { IBaseDependencies } from './IBaseDepedencies.interface';

type ServiceArray<T> = T[];

export default interface IControllerDeps<T> extends IBaseDependencies {
  // will be typeof class passed as dependency
  service: T extends any[] ? ServiceArray<T> : T;
}
