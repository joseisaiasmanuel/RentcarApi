'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoricoCliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Cliente,{
        foreignKey: 'clienteId',
        targetKey: 'id',
        as: 'Cliente'
      })
    
    }
  };
  HistoricoCliente.init({
    clienteId: DataTypes.INTEGER,
    descricao: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'HistoricoCliente',
  });
  return HistoricoCliente;
};