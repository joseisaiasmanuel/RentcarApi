const Cliente = require("../models").Cliente;

const errorResponse = require("../responses/error_response")


module.exports = async(req, res, next) => {
    try {

        if (!req.headers['x-access-token']) {
            return errorResponse(res, 400, 'O header [x-access-token] deve ser informado')
        }
        req.body.token = await Cliente.verifyToken(req.headers['x-access-token']);
        req.body.clienteId = parseInt(req.body.token.id)
        req.body.cliente = await Cliente.getId(req.body.clienteId)

        if (!req.body.cliente) {
            return errorResponse(res, 400, 'Cliente não encontrado')
        }

        next()
    } catch (error) {
        return errorResponse(res, 500, 'impossivel validar token de accesso!', error)

    }

}