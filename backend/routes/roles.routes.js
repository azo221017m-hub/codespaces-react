import express from 'express';
import {
  getAllRoles,
  getRolById,
  createRol,
  updateRol,
  deleteRol
} from '../controllers/roles.controller.js';

const router = express.Router();

// Rutas para roles
router.get('/', getAllRoles);
router.get('/:id', getRolById);
router.post('/', createRol);
router.put('/:id', updateRol);
router.delete('/:id', deleteRol);

export default router;
