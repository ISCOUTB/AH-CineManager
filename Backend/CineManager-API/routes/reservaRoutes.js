const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.post('/reservas', reservaController.createReserva);
router.get('/reservas', reservaController.getAllReservas);
router.get('/reservas/:id', reservaController.getReservaById);
router.put('/reservas/:id', reservaController.updateReserva);
router.delete('/reservas/:id', reservaController.deleteReserva);

module.exports = router;
