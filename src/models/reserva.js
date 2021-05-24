'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Cliente, {
        foreignKey: 'clienteId',
        targetKey: 'id',
        as: 'Cliente'

    }),

    this.belongsTo(models.Viatura, {
        foreignKey: 'viaturaId',
        targetKey: 'id',
        as: 'Viatura'
    })
    }
    static async search(query) {
      const limit = query.limit ? parseInt(query.limit) : 500
      const offset = query.offset ? parseInt(query.offset) : 0

      let where = {}
          //filtrar por name
      if (query.description) where.description = {
          [Op.like]: `%${query.description}%`
      }

      const { rows, count } = await Reserva.findAndCountAll({
          where: where,
          limit: limit,
          offset: offset
      });

      return {
          entities: rows,
          meta: {
              count: count,
              limit: limit,
              offset: offset
          }
      }

  }
  static async getId(id) {
    return await Reserva.findByPk(id)
}
  };
  Reserva.init({
    clienteId:{type:DataTypes.INTEGER,
      allowNull:false,
      validate: {
        isNumeric: {
            msg: "Digite apenas numeros"
        },
        notNull: {
            msg: 'O clienteId deve ser informado.'
        },
        async isInClientes(value) {
            try {
                const cliente = await this.sequelize.models.Cliente.getId(value)
                if (!cliente) {
                    throw new Error('Cliente associado não pode ser encontrado');
                }
            } catch (error) {
                throw error;
            }
        }
    },
    
    },
    viaturaId:{ type:DataTypes.INTEGER,
      allowNull:false,
      validate: {
        isNumeric: {
            msg: "Digite apenas numeros"
        },
        notNull: {
            msg: 'O viaturaId deve ser informado.'
        },
        async isInViaturas(value) {
            try {
                const viatura = await this.sequelize.models.Viatura.getId(value)
                if (!viatura) {
                    throw new Error('Viatura associado não pode ser encontrado');
                }
            } catch (error) {
                throw error;
            }
        }
    },
    
    
    },
    valor:{
     type:DataTypes.DOUBLE,
     allowNull:false,
     validate: {

      min: 0,
      isNumeric: {
          args: true,

          msg: "Digite apenas numeros"

      },
      notNull: {
          msg: "O valor deve ser informado"
      }
  }
    },
    dataReserva:{
    type:DataTypes.DATE,
    allowNull:false,
    validate: {
      notNull: {
          msg: "Data de reserva não pode ser null"
      },
      isDate: {
          msg: "Data invalida"
      },
  },

    },
    dataEntrega:{
     type:DataTypes.DATE,
    allowNull:false,
    validate: {
      notNull: {
          msg: "Data de entrega não pode ser null"
      },
      isDate: {
          msg: "Data invalida"
      },
  },
    }
  }, {
    sequelize,
    modelName: 'Reserva',
  });
  return Reserva;
};