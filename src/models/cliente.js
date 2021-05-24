'use strict';
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = 'DSFGSD453435sdgfhdfg%&¨*#¨$%#sdgfsd';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cliente extends Model {
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

            const entities = await Cliente.findAndCountAll({
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
        static async verifyLogin(nome, senha) {




            try {
                let cliente = await Cliente.findOne({
                    where: {
                        nome: nome
                    }

                });
                if (!cliente) {
                    throw new Error("Nome nao enontrado");
                }
                if (!bcrypt.compareSync(senha, cliente.senha)) {
                    throw new Error("Senha nao confere");
                }

                //verificar se usuario esta logado
                let token = jwt.sign({
                    id: cliente.id
                }, SECRET, {
                    expiresIn: '1d'
                })

                return {
                    cliente: cliente,
                    token: token
                }
            } catch (error) {
                throw error;

            }

        }
        static async getId(id) {
            return await Cliente.findByPk(id)
        }


        static async verifyToken(token) {
            return await jwt.verify(token, SECRET)
        }

    };

    Cliente.init({
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
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
        genero: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {

                isAlphanumeric: {

                    msg: "Genero: digite caracteres de A-Z"
                },
                len: {
                    args: [7, 10],
                    msg: "Genero: No minimo deve conter  7 caracteres"
                },
                notNull: {
                    msg: "Genero: deve ser informado"
                }
            }
        },
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            validate: {
                isIn: {
                    args: [
                        [
                            false, //
                            true, //Básico

                        ]
                    ],
                    msg: 'São aceitos apenas dois estados 0-Nao activo 1 - Activo,'
                }
            }
        },
        bilhete: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: {
                    msg: "BI: apenas letras e numeros"

                },

                notNull: {
                    msg: "BI: dever informado"
                }
            }
        },
        dataNascimento: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Data de nascimento não pode ser null"
                },
                isDate: {
                    msg: "Data invalida"
                },
                isBefore: {
                    args: "2003-01-01",
                    msg: "Clientes devem ser apenas maiores de idade"
                }
            },
        },
        telefone: {
            type: DataTypes.STRING,
            validate: {

                isNumeric: {

                    msg: "Telefone: digite caracteres de 1-9"
                },
                len: {
                    args: [9, 9],
                    msg: "Telefone  deve conter 9 caracteres"
                }
            }
        },
        senha: {
            type: DataTypes.STRING,
            is: {
                args: ["^[a-z]+$", 'i'],
                msg: "Genero: digite caracteres de A-Z"
            },
            isAlphanumeric: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "A senha dever informada"
                }
            }

        },
        foto: DataTypes.STRING,
       
        email: {
            type: DataTypes.STRING,
            allowNull: false,

            unique: {
                msg: "E-mail informado ja existe no sistema"
            },

            validate: {
                notNull: {
                    msg: " O E-mail dever informado"
                },
                isEmail: {
                    msg: "E-mail val"
                }
            }

        },

    }, {
        sequelize,
        modelName: 'Cliente',
        hooks: {
            beforeSave: (cliente, options) => {
                try {

                    bcrypt.getRounds(cliente.senha)
                } catch (error) {
                    cliente.senha = bcrypt.hashSync(cliente.senha, 10)
                }
            }
        }
    });
    return Cliente;
};