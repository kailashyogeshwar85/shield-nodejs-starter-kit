import { QueryInterface } from 'sequelize/types';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'product_category',
      [
        {
          name: 'Electronics',
          description: 'Bravia OLED',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface: QueryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('product_category', null, {});
  },
};
