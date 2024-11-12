const express = require('express');
const router = express.Router();
const reseniaController = require('../controllers/reseniaController');

router.post('/resenias', reseniaController.createResenia);
router.get('/resenias', reseniaController.getAllResenias);
router.get('/resenias/:id', reseniaController.getReseniaById);
router.put('/resenias/:id', reseniaController.updateResenia);
router.delete('/resenias/:id', reseniaController.deleteResenia);

module.exports = router;
