const express = require('express');
const router = express.Router();
const funcionController = require('../controllers/funcionController');

router.post('/funciones', funcionController.createFuncion);
router.get('/funciones', funcionController.getAllFunciones);
router.get('/funciones/:id', funcionController.getFuncionById);
router.put('/funciones/:id', funcionController.updateFuncion);
router.delete('/funciones/:id', funcionController.deleteFuncion);

module.exports = router;
