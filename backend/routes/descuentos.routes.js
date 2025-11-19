import { Router } from 'express';
import { getDescuentos, createDescuento, updateDescuento, deleteDescuento } from '../controllers/descuentos.controller.js';

const router = Router();

router.get('/', getDescuentos);
router.post('/', createDescuento);
router.put('/:id', updateDescuento);
router.delete('/:id', deleteDescuento);

export default router;
