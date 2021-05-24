const Viatura = require('../models').Viatura
const HistoricoViatura = require('../models').HistoricoViatura
const ResourceController = require("./resource_controller");
const successResponse = require('../responses/success_response');
const errorResponse = require('../responses/error_response');

class ViaturasController extends ResourceController {

    constructor() {
        super()
        this.setModel(Viatura);
    }

    // update
    async update(req, res, next) {
        await HistoricoViatura.create({
            viaturaId: req.params.id,
            descricao: "U",
        });


        return await super.update(req, res, next)
    }

    async findCars() {

        }
        //REMOVE
    async remove(req, res, next) {
        try {
            await HistoricoViatura.create({
                viaturaId: req.params.id,
                descricao: "R",
            });
        } catch (error) {
            console.log(error);

        }
        return await super.remove(req, res, next)
    }

}

module.exports = new ViaturasController