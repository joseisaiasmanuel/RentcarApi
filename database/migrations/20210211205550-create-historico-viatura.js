'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HistoricoViaturas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      viaturaId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Viaturas',
          key: "id"
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',

      },
      descricao: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('HistoricoViaturas');
  }
};