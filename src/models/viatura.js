'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Viatura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async search(query) {
      const limit = query.limit ? parseInt(query.limit) : 20;
      const offset = query.offset ? parseInt(query.limit) : 0

      let where = {}

      if (query.nome) where.nome = {
          [Op.like]: `%${query.nome}%` //filtrando pelo nome

      }
      if (query.email) where.email = q.query.email;

      const entities = await Viatura.findAndCountAll({
          where: where,
          limit: limit,
          offset: offset
      })

      return {
          entities: entities.rows,
          meta: {
              count: entities.count,
              limit: limit,
              offset: offset
          }
      };
  }
  static async getId(id) {
    return await Viatura.findByPk(id)
}
  };
  Viatura.init({
    nome:{ 
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        is: {
            args: [/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/],
            msg: "O nome deve conter apenas caracteres de A-Z"
        },
        len: {
            args: [6, 20],
            msg: "Registo: Minimo deve conter 6 caracteres"
        },
        contains: {
            args: ' ',
            msg: "Nome: deve conter espaco"
        },

        notNull: {
            msg: "Nome: deve ser informado"
        }
    }
    },
    marca: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        is: {
            args: [/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/],
            msg: "A marca deve conter apenas caracteres de A-Z"
        },
        len: {
            args: [6, 20],
            msg: "Registo: Minimo deve conter 6 caracteres"
        },
        contains: {
            args: ' ',
            msg: "Marca: deve conter espaco"
        },

        notNull: {
            msg: "Marca: deve ser informado"
        }
    }
    },
    modelo:{ type:DataTypes.STRING,
      allowNull:false,
      validate: {
        is: {
            args: [/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/],
            msg: "O modelo deve conter apenas caracteres de A-Z"
        },
        len: {
            args: [6, 20],
            msg: "Modelo: Minimo deve conter 6 caracteres"
        },
        contains: {
            args: ' ',
            msg: "Modelo: deve conter espaco"
        },

        notNull: {
            msg: "Nome: deve ser informado"
        }
    }
    
    },
    foto:{
      type:DataTypes.STRING
     },
    anoFabrico:{type:DataTypes.DATE,
      allowNull:false,
      validate: {
        notNull: {
            msg: "Data de fabrico não pode ser null"
        },
        isDate: {
            msg: "Data invalida"
        },
    },
    },
    valor:{type:DataTypes.DOUBLE,
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
    }
  }, {
    sequelize,
    modelName: 'Viatura',
  });
  return Viatura;
};