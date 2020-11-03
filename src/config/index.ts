import dotenv from 'dotenv';

dotenv.config();

export default class Config {
  static readonly PORT = process.env.PORT || 3210;

  static readonly ENVIRONMENT = process.env.NODE_ENV || 'development';

  static LOG_ADAPTER = process.env.LOG_ADAPTER || 'winston';

  static LOG_LEVEL = process.env.LOG_LEVEL || 'debug';

  static QUEUE_ADAPTER = process.env.QUEUE_ADAPTER || 'redis';

  static STREAM_ADAPTER = process.env.STREAM_ADAPTER || 'kafka';

  static readonly LOG_OPTIONS = {
    logPath: process.env.LOG_PATH || 'logs',
    logFile: process.env.LOGFILE || 'shield',
    level: process.env.LOG_LEVEL || 'debug',
  };

  static readonly DATABASE = {
    database: process.env.DATABASE || 'database_missing',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    dialect: process.env.DIALECT || 'postgres',
  };

  static readonly REDIS_CONFIG = {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || '127.0.0.1',
    username: process.env.REDIS_USERNAME || '',
    password: process.env.REDIS_PASSWORD,
  };

  static readonly STREAM_CONFIG = {
    brokers: ['localhost:9093', 'localhost:9093', 'localhost:9094'],
  };
}
