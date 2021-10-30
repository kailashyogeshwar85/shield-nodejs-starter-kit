import { QueryInterface } from 'sequelize/types';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'product_discount',
      [
        {
          name: 'FLAT 10%',
          description: 'FLAT 15% discount',
          discount_percent: '15',
          active: true,
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
    await queryInterface.bulkDelete('product_discount', null, {});
  },
};
