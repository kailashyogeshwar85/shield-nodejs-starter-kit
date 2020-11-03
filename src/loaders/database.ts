import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import Config from '../config';
import getLogger from './logger';
import IExpressApp from '../interfaces/IExpressApp';

/**
 * @description Connects to database.
 * @returns {Promise<Sequelize>} Sequelize Instance
 */
const DatabaseLoader = async ({ app }: IExpressApp): Promise<Sequelize> => {
  const logger = getLogger('database');
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
