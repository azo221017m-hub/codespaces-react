import { Router } from 'express';
import { getInsumos, createInsumo, updateInsumo, deleteInsumo } from '../controllers/insumos.controller.js';

const router = Router();

router.get('/', getInsumos);
router.post('/', createInsumo);
router.put('/:id', updateInsumo);
router.delete('/:id', deleteInsumo);

export default router;
