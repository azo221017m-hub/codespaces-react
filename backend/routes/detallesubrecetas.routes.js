import express from 'express';
import * as detallesubrecetasController from '../controllers/detallesubrecetas.controller.js';
const router = express.Router();

router.get('/', detallesubrecetasController.getAllDetallesSubRecetas);
router.get('/:id', detallesubrecetasController.getDetalleSubRecetaById);
router.post('/', detallesubrecetasController.createDetalleSubReceta);
router.put('/:id', detallesubrecetasController.updateDetalleSubReceta);
router.delete('/:id', detallesubrecetasController.deleteDetalleSubReceta);

export default router;
