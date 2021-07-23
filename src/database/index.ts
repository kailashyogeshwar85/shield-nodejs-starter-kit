import { Log4Microservice as Logger } from 'log4-microservice';
import { SequelizeOptions, Sequelize } from 'sequelize-typescript';
import Config from '../constants/config.constants';
import Product from './models/product.model';
import ProductCategory from './models/product_category.model';
import ProductDiscount from './models/product_discount.model';
import ProductInventory from './models/product_inventory.model';

/**
 * @description Manages database connection
 * @export
 * @class Database
 */
export default class Database {
  private static logger = new Logger(__filename);

  private static sequelize: Sequelize;

  /**
   * @description Connects application to Database
   * @static
   * @param {SequelizeOptions} [connectionOptions]
   * @return {*}
   * @memberof Database
   */
  public static async connect(
    connectionOptions?: SequelizeOptions,
  ): Promise<unknown> {
    if (connectionOptions) {
      this.sequelize = new Sequelize(connectionOptions);
    } else {
      const options = Config.DATABASE;
      options.models = [
        ProductInventory,
        ProductDiscount,
        ProductCategory,
        Product,
      ];
      this.sequelize = new Sequelize(Config.DATABASE);
    }
    this.sequelize.options.logging = this.logger.debug.bind(this.logger);

    this.sequelize.options.logging = (sql: string) => {
      this.logger.debug(sql);
    };

    return this.sequelize
      .authenticate()
      .then(async () => {
        const argv = process.argv.slice(2);
        if (argv.length && argv[0] === '--migrate') {
          await this.sequelize.sync({ force: true });
          await Database.createFunctions();
          await Database.addConstraints();

          return;
        }
        this.logger.info(
          `Successfully connected to database ${Config.DATABASE.database}`,
        );
      })
      .catch((exception: Error) => {
        this.logger.error('Failed to connect to database ', exception);
      });
  }

  /**
   * @description Gets the database instance
   * @memberof Database
   */
  public static async getDatabaseInstance(): Promise<Sequelize> {
    if (Database.sequelize) {
      return Promise.resolve(Database.sequelize);
    }
    await Database.connect();

    return Database.sequelize;
  }

  /**
   * @description Create DB functions
   * @static
   * @return {*}  {Promise<unknown>}
   * @memberof Database
   */
  public static async createFunctions(): Promise<unknown> {
    const result = await this.sequelize.query(`
      CREATE OR REPLACE FUNCTION get_userbalance(user_id text)
      RETURNS BIGINT
      LANGUAGE plpgsql
      AS
      $$
        DECLARE balance BIGINT;
        BEGIN
          -- LOGIC HERE
          RETURN 1;
        END;
      $$;
    `);

    return result;
  }

  /**
   * @description Adds constraint
   * @static
   * @memberof Database
   */
  static async addConstraints(): Promise<unknown> {
    const result = await this.sequelize.query(`
      ALTER TABLE product_inventory
        ADD CONSTRAINT quantity check (quantity >= 0);
    `);

    return result;
  }
}
