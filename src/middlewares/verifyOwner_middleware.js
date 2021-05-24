const errorRes = require('../responses/error_response')

module.exports = async(req, res, next) => {
    const clienteId = parseInt(req.params.clienteId ? req.params.clienteId : req.params.id)

    if (clienteId !== req.body.cliente.id) {
        return errorRes(res, 400, 'Você não tem permissão para acessar esse recurso.')
    }

    next()
}