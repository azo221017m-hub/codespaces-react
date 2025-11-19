import express from 'express';
import {
  getAllUnidadesMedida,
  getUnidadMedidaById,
  createUnidadMedida,
  updateUnidadMedida,
  deleteUnidadMedida
} from '../controllers/unidadesMedida.controller.js';

const router = express.Router();

// Rutas para unidades de medida
router.get('/', getAllUnidadesMedida);
router.get('/:id', getUnidadMedidaById);
router.post('/', createUnidadMedida);
router.put('/:id', updateUnidadMedida);
router.delete('/:id', deleteUnidadMedida);

export default router;
