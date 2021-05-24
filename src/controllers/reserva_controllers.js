const Reserva = require('../models').Reserva
const HistoricoReserva  = require('../models').HistoricoReserva 
const ResourceController = require("./resource_controller");
const successResponse = require('../responses/success_response');
const errorResponse = require('../responses/error_response');

class ReservaController extends ResourceController {

    constructor() {
        super()
        this.setModel(Reserva);
    }
       // update
       async update(req, res, next) {
        await HistoricoReserva.create({
            reservaId: req.params.id,
            descricao: "U",
        });


        return await super.update(req, res, next)
    }
            //REMOVE
            async remove(req, res, next) {
                try {
                    await HistoricoReserva.create({
                        reservaId: req.params.id,
                        descricao: "R",
                    });
                } catch (error) {
                    console.log(error);
        
                }
                return await super.remove(req, res, next)
            }
   
}

module.exports = new ReservaController