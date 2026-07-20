'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'terms_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Terms',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    );

    await queryInterface.addColumn('Products', 'deletedAt',
      {
        allowNull: true,
        type: Sequelize.DATE
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'terms_id');
    await queryInterface.removeColumn('Products', 'deletedAt');
  }
};
