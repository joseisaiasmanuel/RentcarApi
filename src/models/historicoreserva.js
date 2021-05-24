'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoricoReserva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Reserva,{
        foreignKey: 'reservaId',
        targetKey: 'id',
        as: 'Reserva'
 })
    }
  };
  HistoricoReserva.init({
    reservaId: DataTypes.INTEGER,
    descricao: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'HistoricoReserva',
  });
  return HistoricoReserva;
};