import pool from '../config/database.js';

export const getAllDetallesSubRecetas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM detallesubrecetas');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDetalleSubRecetaById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM detallesubrecetas WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createDetalleSubReceta = async (req, res) => {
  try {
    const { subreceta_id, insumo_id, cantidad, unidad } = req.body;
    const [result] = await pool.query(
      'INSERT INTO detallesubrecetas (subreceta_id, insumo_id, cantidad, unidad) VALUES (?, ?, ?, ?)',
      [subreceta_id, insumo_id, cantidad, unidad]
    );
    res.json({ id: result.insertId, subreceta_id, insumo_id, cantidad, unidad });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDetalleSubReceta = async (req, res) => {
  try {
    const { subreceta_id, insumo_id, cantidad, unidad } = req.body;
    const [result] = await pool.query(
      'UPDATE detallesubrecetas SET subreceta_id = ?, insumo_id = ?, cantidad = ?, unidad = ? WHERE id = ?',
      [subreceta_id, insumo_id, cantidad, unidad, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ id: req.params.id, subreceta_id, insumo_id, cantidad, unidad });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDetalleSubReceta = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM detallesubrecetas WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
