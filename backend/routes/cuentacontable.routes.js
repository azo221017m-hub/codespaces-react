import { Router } from 'express';
import { getCuentasContables, createCuentaContable, updateCuentaContable, deleteCuentaContable } from '../controllers/cuentacontable.controller.js';

const router = Router();

router.get('/', getCuentasContables);
router.post('/', createCuentaContable);
router.put('/:id', updateCuentaContable);
router.delete('/:id', deleteCuentaContable);

export default router;
