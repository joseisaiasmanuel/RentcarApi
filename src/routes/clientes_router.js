var express = require('express');
var router = express.Router();
const verifyAccessToken = require("../middlewares/verifyAccessToken_middleware");
const verifyOwner = require("../middlewares/verifyOwner_middleware");
const ClientsController = require('../controllers/cliente_controllers')




//LIGINas
router.post('/login', ClientsController.bindMethod('login'));
//INDEX
router.get('/', ClientsController.bindMethod('index'));
//SHOW
router.get('/:id', verifyAccessToken, ClientsController.bindMethod('show'));
//STORE
router.post('/', ClientsController.bindMethod('store'));

//UPDATE
router.patch('/:id', verifyAccessToken, ClientsController.bindMethod('update'));
//REMOVE
router.delete('/:id', verifyAccessToken, ClientsController.bindMethod('remove'));


module.exports = router;