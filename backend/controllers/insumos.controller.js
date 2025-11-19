// Controlador para tblposcrumenwebinsumos
import db from '../config/database.js';

export const getInsumos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tblposcrumenwebinsumos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener insumos', details: error.message });
  }
};

export const createInsumo = async (req, res) => {
  try {
    const insumo = req.body;
    const [result] = await db.query('INSERT INTO tblposcrumenwebinsumos SET ?', insumo);
    res.json({ id_insumo: result.insertId, ...insumo });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear insumo', details: error.message });
  }
};

export const updateInsumo = async (req, res) => {
  try {
    const { id } = req.params;
    const insumo = req.body;
    await db.query('UPDATE tblposcrumenwebinsumos SET ? WHERE id_insumo = ?', [insumo, id]);
    res.json({ id_insumo: id, ...insumo });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar insumo', details: error.message });
  }
};

export const deleteInsumo = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM tblposcrumenwebinsumos WHERE id_insumo = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar insumo', details: error.message });
  }
};
