// Controlador para tblposcrumenwebcuentacontable
import db from '../config/database.js';

export const getCuentasContables = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tblposcrumenwebcuentacontable');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cuentas contables', details: error.message });
  }
};

export const createCuentaContable = async (req, res) => {
  try {
    const cuenta = req.body;
    const [result] = await db.query('INSERT INTO tblposcrumenwebcuentacontable SET ?', cuenta);
    res.json({ id_cuentacontable: result.insertId, ...cuenta });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cuenta contable', details: error.message });
  }
};

export const updateCuentaContable = async (req, res) => {
  try {
    const { id } = req.params;
    const cuenta = req.body;
    await db.query('UPDATE tblposcrumenwebcuentacontable SET ? WHERE id_cuentacontable = ?', [cuenta, id]);
    res.json({ id_cuentacontable: id, ...cuenta });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cuenta contable', details: error.message });
  }
};

export const deleteCuentaContable = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM tblposcrumenwebcuentacontable WHERE id_cuentacontable = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cuenta contable', details: error.message });
  }
};
