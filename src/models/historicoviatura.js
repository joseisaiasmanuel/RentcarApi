'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoricoViatura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    this.belongsTo(models.Viatura,{
      foreignKey: 'viaturaId',
      targetKey: 'id',
      as: 'Viatura'
    })
    
    }
  };
  HistoricoViatura.init({
    viaturaId: DataTypes.INTEGER,
    descricao: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'HistoricoViatura',
  });
  return HistoricoViatura;
};