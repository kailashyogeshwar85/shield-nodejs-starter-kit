import ShieldApplication from './app';
import IShieldApplication from './interfaces/IShieldApplication.interface';
import LoggerFactory from './loaders/logger.loader';
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

if (require.main === module) {
  bootServer();
}

export default bootServer;
