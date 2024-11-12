const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/peliculaController');

router.post('/peliculas', peliculaController.createPelicula);
router.get('/peliculas', peliculaController.getAllPeliculas);
router.get('/peliculas/:id', peliculaController.getPeliculaById);
router.put('/peliculas/:id', peliculaController.updatePelicula);
router.delete('/peliculas/:id', peliculaController.deletePelicula);

module.exports = router;
