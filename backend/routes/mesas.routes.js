import { Router } from 'express';
import { getMesas, createMesa, updateMesa, deleteMesa } from '../controllers/mesas.controller.js';

const router = Router();

router.get('/', getMesas);
router.post('/', createMesa);
router.put('/:id', updateMesa);
router.delete('/:id', deleteMesa);

export default router;
