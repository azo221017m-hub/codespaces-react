const express = require('express');
const router = express.Router();
const detallesubrecetasController = require('../controllers/detallesubrecetas.controller');

router.get('/', detallesubrecetasController.getAllDetallesSubRecetas);
router.get('/:id', detallesubrecetasController.getDetalleSubRecetaById);
router.post('/', detallesubrecetasController.createDetalleSubReceta);
router.put('/:id', detallesubrecetasController.updateDetalleSubReceta);
router.delete('/:id', detallesubrecetasController.deleteDetalleSubReceta);

module.exports = router;
