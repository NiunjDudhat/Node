'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Productes', [
      {
        name: 'Laptop',
        description: 'Hello',
        price: 55000,
        createdAT: new Date(),
        updatedAT: new Date()
      },
      {
        name: 'Apple',
        description: 'Mobile',
        price: 175000,
        createdAT: new Date(),
        updatedAT: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    
    await queryInterface.bulkDelete('Productes', null, {});
  }
};
