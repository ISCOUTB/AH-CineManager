const express = require('express');
const router = express.Router();
const snackController = require('../controllers/snackController');

router.post('/snacks', snackController.createSnack);
router.get('/snacks', snackController.getAllSnacks);
router.get('/snacks/:id', snackController.getSnackById);
router.put('/snacks/:id', snackController.updateSnack);
router.delete('/snacks/:id', snackController.deleteSnack);

module.exports = router;
