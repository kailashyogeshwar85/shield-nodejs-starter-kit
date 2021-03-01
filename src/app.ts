import { Logger } from '@zebpay/colt';
import express, { Application } from 'express';
import { Server } from 'http';
import Config from './constants/config.constant';
import IShieldApplication from './interfaces/IShieldApplication.interface';
import LoggerFactory from './loaders/logger.loader';
import AppLoader from './loaders';
/**
 * @description Main Application class
 * @class ShieldApplication
 */
export default class ShieldApplication implements IShieldApplication {
  private app: Application;

  private server: Server;

  private logger: Logger;

  private port: number;

  /**
   * Creates an instance of ShieldApplication.
   * @param {number} [port]
   * @memberof ShieldApplication
   */
  constructor(port?: number) {
    this.port = port; // for Test in parallel mode
    this.app = express();
    this.logger = LoggerFactory('shield');
  }

  /**
   * @description Starts the application
   * @return {*}  {ShieldApplication}.
   * @memberof ShieldApplication
   */
  async start(): Promise<ShieldApplication> {
    await AppLoader({ app: this.app });
    this.server = this.app.listen(this.port || Config.PORT, () => {
      // log server started listening on port this.port | 3210
      this.logger.info(
        `Server listening on PORT: ${Config.PORT} Environment: ${Config.ENVIRONMENT}`,
      );
      this.app.emit('listening');
    });

    return Promise.resolve(this);
  }

  /**
   * @description Closes the http Server and releases the resources.
   * @memberof ShieldApplication
   */
  gracefulShutdown(): void {
    this.server.close();
    // release all the resources
  }
}
