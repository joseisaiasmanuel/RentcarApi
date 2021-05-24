'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reservas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clienteId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Clientes',
          key: "id"
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
      valor: {
        type: Sequelize.DOUBLE
      },
      dataReserva: {
        type: Sequelize.DATE
      },
      dataEntrega: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Reservas');
  }
};