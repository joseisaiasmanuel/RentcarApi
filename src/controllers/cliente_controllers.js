const Cliente = require('../models').Cliente;
const HistoricoCliente= require('../models').HistoricoCliente
const ResourceController = require("./resource_controller");
const successResponse = require('../responses/success_response');
const errorResponse = require('../responses/error_response');

class ClientsController extends ResourceController {

    constructor() {
        super()
        this.setModel(Cliente);
    }
    async login(req, res, next) {
        try {
            const {nome, senha, } = req.body;


            const result = await Cliente.verifyLogin(nome,senha)

            successResponse(res, 200, "Cliente autenticado com sucesso!", result)
        } catch (error) {
            console.log(error);
            errorResponse(res, 500, " Nao foi possivel autenticar")
        }
    }

    // update
    async update(req, res, next) {
        await HistoricoCliente.create({
            clienteId: req.params.id,
            descricao: "U",
        });


        return await super.update(req, res, next)
    }
            //REMOVE
            async remove(req, res, next) {
                try {
                    await HistoricoCliente.create({
                        clienteId: req.params.id,
                        descricao: "R",
                    });
                } catch (error) {
                    console.log(error);
        
                }
                return await super.remove(req, res, next)
            }
   
}

module.exports = new ClientsController