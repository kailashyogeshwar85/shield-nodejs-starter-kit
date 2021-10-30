import { QueryInterface } from 'sequelize/types';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'products',
      [
        {
          product_code: '101',
          product_name: 'Sony Bravia 102 inch OLED',
          product_description: 'Bravia',
          category_id: 1,
          inventory_id: 1,
          discount_id: 1,
          price: '130000.00',
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
    await queryInterface.bulkDelete('products', null, {});
  },
};
