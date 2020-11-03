import ShieldApplication from './app';
import IShieldApplication from './interfaces/IShieldApplication';
import LoggerFactory from './loaders/logger';

/**
 * @description Boot your Express App and return the Http Server instance
 * @param {number} [port] Optional port for parallel testing
 */
const bootServer = (port?: number): Promise<IShieldApplication> => {
  const logger = LoggerFactory('server');
  logger.debug('Initializing ShieldApplication');
  const app: IShieldApplication = new ShieldApplication(port);

  return app.start();
};

if (process.env.NODE_ENV !== 'test') {
  bootServer();
}

export default bootServer;
