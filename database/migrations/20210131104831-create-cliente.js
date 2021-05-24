'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome:{
        allowNull:false,
        type:Sequelize.STRING
      },
      genero: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    estado: {
      allowNull:false,
      type: Sequelize.BOOLEAN,
      },
      bilhete: {
        type: Sequelize.STRING,
        allowNull: false,
    },
 
    dataNascimento: {
      type: Sequelize.DATE,
      allowNull: false,
  },
  telefone: {
    type: Sequelize.STRING,
    allowNull: false,
},
foto:{
type:Sequelize.STRING
},
   senha: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
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
    await queryInterface.dropTable('Clientes');
  }
};