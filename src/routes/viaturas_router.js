var express = require('express');
var router = express.Router();
const ViaturasController = require('../controllers/viatura_controllers')
const verifyAccessToken = require("../middlewares/verifyAccessToken_middleware");


//INDEX
router.get('/', ViaturasController.bindMethod('index'));
//SHOW
router.get('/:id', verifyAccessToken, ViaturasController.bindMethod('show'));
//STORE
router.post('/', verifyAccessToken, ViaturasController.bindMethod('store'));

//UPDATE
router.patch('/:id', verifyAccessToken, ViaturasController.bindMethod('update'));
//REMOVE
router.delete('/:id', verifyAccessToken, ViaturasController.bindMethod('remove'));


module.exports = router;