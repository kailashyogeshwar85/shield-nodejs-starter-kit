import { Sequelize } from 'sequelize-typescript';
import { Log4Microservice as Logger } from 'log4-microservice';
import { IDatabaseHelper } from '../interfaces/IDatabaseHelper.interface';
import Config from '../../constants/config.constants';
import SequelizeFixture from '../fixtures/sequelize.fixture';

/**
 * @description DatabaseHelper to perform DB operations
 * @export
 * @class DatabaseHelper
 * @implements {IDatabaseHelper}
 */
export default class DatabaseHelper implements IDatabaseHelper {
  private sequelize: Sequelize;

  private logger: Logger;

  /**
   * Creates an instance of DatabaseHelper.
   * @memberof DatabaseHelper
   */
  constructor() {
    this.sequelize = new Sequelize(Config.DATABASE);
    this.logger = new Logger(__filename);
  }

  /**
   * @description Connects to Database
   * @return {*}  {Promise<unknown>}
   * @memberof DatabaseHelper
   */
  public async connectDatabase(): Promise<unknown> {
    try {
      await this.sequelize.authenticate();
      await this.clearDB();
      await this.fillDB();

      return;
    } catch (error) {
      this.logger.error(`Failed to connect testdb`, error);
    }
  }

  /**
   * @description Truncates a model
   * @param {string} model
   * @return {*}  {Promise<unknown>}
   * @memberof DatabaseHelper
   */
  public async clearModel(model: string): Promise<unknown> {
    return this.sequelize.models[model]?.truncate({
      cascade: true,
    });
  }

  /**
   * @description Resets fixtures
   * @return {*}  {Promise<unknown>}
   * @memberof DatabaseHelper
   */
  public resetFixtures(): Promise<unknown> {
    return this.clearDB();
  }

  /**
   * @description Clears the data in tables.
   * @private
   * @memberof DatabaseHelper
   */
  private async clearDB(): Promise<unknown> {
    try {
      await this.sequelize.query(this.getStatementForDroppingFunctions());

      return;
    } catch (error) {
      this.logger.error('Error when clearing database', error);
    }
  }

  /**
   * @description fills database
   * @private
   * @memberof DatabaseHelper
   */
  private async fillDB() {
    try {
      await this.sequelize.sync({ force: true });
      await new SequelizeFixture().init(this.sequelize);
      await this.createFunctions();
    } catch (error) {
      this.logger.error('Error filling db', error);
    }
  }

  private async createFunctions(): Promise<unknown> {
    this.logger.info('Create functions');

    return this.sequelize.query(
      `CREATE OR REPLACE FUNCTION IF NOT EXIST get_balance(
          user_id text
        )
        RETURNS decimal;
        LANGUAGE 'plpgsql'
        COST 100
        VOLATILE PARALLEL UNSAFE
      AS $BODY$
      DECLARE balance decimal
        BEGIN
         RETURN 10.0;
        END;
      `,
    );
  }

  /**
   * @description
   * @private
   * @return {*}  {string}
   * @memberof DatabaseHelper
   */
  private getStatementForDroppingFunctions(): string {
    this.logger.info('getting function drop statement');

    return `
      DROP FUNCTION IF EXISTS public.function_name(param1 text);
    `;
  }
}
