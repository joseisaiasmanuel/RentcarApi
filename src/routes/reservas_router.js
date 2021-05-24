var express = require('express');
var router = express.Router();
const verifyAccessToken = require("../middlewares/verifyAccessToken_middleware");
const ReservaController = require('../controllers/reserva_controllers')



//INDEX
router.get('/', ReservaController.bindMethod('index'));
//SHOW
router.get('/:id', verifyAccessToken, ReservaController.bindMethod('show'));
//STORE
router.post('/', verifyAccessToken, ReservaController.bindMethod('store'));

//UPDATE
router.patch('/:id', verifyAccessToken, ReservaController.bindMethod('update'));
//REMOVE
router.delete('/:id', verifyAccessToken, ReservaController.bindMethod('remove'));


module.exports = router;