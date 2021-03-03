import { Router } from 'express';
import { AwilixContainer } from 'awilix';

export default interface IRouterDependencies {
  app: Router;
  container: AwilixContainer;
}
