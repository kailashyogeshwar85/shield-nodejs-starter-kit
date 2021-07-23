import LoggerFactory from '../factory/services/logger.service.factory';
import Database from '../database';
/**
 * @description Connects to database.
 * @returns {Promise<Sequelize>} Sequelize Instance
 */
const DatabaseLoader = async (
  // eslint-disable-next-line no-undef
  { app, container }: LoaderDependencies,
): Promise<void> => {
  const logger = container
    .resolve<LoggerFactory>('logger')
    .createLogger('database');
  try {
    logger.info(`Connecting database`);
    await Database.getDatabaseInstance();
    logger.info('Connected to database');
  } catch (e) {
    console.log(e);
    app.emit('error', {
      error: e,
    });
  }
};

export default DatabaseLoader;
