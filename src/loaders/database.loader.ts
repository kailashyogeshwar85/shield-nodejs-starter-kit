import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import Config from '../constants/config.constant';
import LoggerFactory from '../factory/services/logger.service.factory';

/**
 * @description Connects to database.
 * @returns {Promise<Sequelize>} Sequelize Instance
 */
const DatabaseLoader = async (
  // eslint-disable-next-line no-undef
  { app, container }: LoaderDependencies,
): Promise<Sequelize> => {
  const logger = container
    .resolve<LoggerFactory>('logger')
    .createLogger('database');

  const databaseOptions = {
    ...Config.DATABASE,
    logging: sql => logger.debug(sql),
  };

  const sequelize = new Sequelize(<SequelizeOptions>databaseOptions);

  try {
    await sequelize.authenticate();
    logger.info(
      `Database connection successful to ${Config.DATABASE.database}`,
    );

    return sequelize;
  } catch (e) {
    app.emit('error', {
      error: e,
    });

    return Promise.reject(e);
  }
};

export default DatabaseLoader;
