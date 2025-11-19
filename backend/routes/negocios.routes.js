import express from 'express';
import {
  getAllNegocios,
  getNegocioById,
  createNegocio,
  updateNegocio,
  deleteNegocio
} from '../controllers/negocios.controller.js';

const router = express.Router();

// Rutas para negocios
router.get('/', getAllNegocios);
router.get('/:id', getNegocioById);
router.post('/', createNegocio);
router.put('/:id', updateNegocio);
router.delete('/:id', deleteNegocio);

export default router;
