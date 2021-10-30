// @eslint-disable

require('dotenv').config();

const { Log4Microservice } = require('log4-microservice');

const logOptions = {
  level: process.env.LOG_LEVEL,
  logPath: process.env.LOG_PATH,
  logFile: 'sequelize.log',
};
Log4Microservice.setLoggerOptions(logOptions);
Log4Microservice.addAdapter(
  process.env.LOG_ADAPTER,
  Log4Microservice.setAdapter(process.env.LOG_ADAPTER
  )
);

const logger = new Log4Microservice('migration');

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  host: process.env.DB_HOST,
  logging: (sql) => logger.debug(sql),
  dialect: process.env.DIALECT,
}