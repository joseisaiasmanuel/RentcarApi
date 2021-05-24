'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Viaturas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        allowNull:false,
        type: Sequelize.STRING
      },
      marca: {
        allowNull:false,
        type: Sequelize.STRING
      },
      modelo: {
        type: Sequelize.STRING
      },
      foto:{
     type: Sequelize.STRING
      },
      anoFabrico: {
        allowNull:false,
        type: Sequelize.DATE
      },
      valor: {
        allowNull:false,
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('Viaturas');
  }
};