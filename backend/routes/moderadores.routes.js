import express from 'express';
import * as moderadoresController from '../controllers/moderadores.controller.js';
const router = express.Router();

router.get('/', moderadoresController.getAllModeradores);
router.get('/:id', moderadoresController.getModeradorById);
router.post('/', moderadoresController.createModerador);
router.put('/:id', moderadoresController.updateModerador);
router.delete('/:id', moderadoresController.deleteModerador);

export default router;
