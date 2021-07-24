/* eslint-disable no-restricted-syntax */
import { Sequelize } from 'sequelize-typescript';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as fixtures from 'sequelize-fixtures';
import { join } from 'path';

export default class SequelizeFixture {
  private fixtureList = [];

  public async init(sequelize: Sequelize): Promise<unknown> {
    for (const fixture of this.fixtureList) {
      const mockPath = join(__dirname, `mocks/${fixture}.json`);
      // eslint-disable-next-line no-await-in-loop
      await fixtures.loadFile(mockPath, sequelize.models);
    }
    // ANY CONSTRAINT ADD

    return sequelize.query(`
      ALTER TABLE product_inventory
        ADD CONSTRAINT quantity check (quantity >= 0);
    `);
  }
}
