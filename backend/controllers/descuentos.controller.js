// Controlador para tblposcrumenwebdescuentos
import db from '../config/database.js';

export const getDescuentos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tblposcrumenwebdescuentos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener descuentos', details: error.message });
  }
};

export const createDescuento = async (req, res) => {
  try {
    const descuento = req.body;
    const [result] = await db.query('INSERT INTO tblposcrumenwebdescuentos SET ?', descuento);
    res.json({ id_descuento: result.insertId, ...descuento });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear descuento', details: error.message });
  }
};

export const updateDescuento = async (req, res) => {
  try {
    const { id } = req.params;
    const descuento = req.body;
    await db.query('UPDATE tblposcrumenwebdescuentos SET ? WHERE id_descuento = ?', [descuento, id]);
    res.json({ id_descuento: id, ...descuento });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar descuento', details: error.message });
  }
};

export const deleteDescuento = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM tblposcrumenwebdescuentos WHERE id_descuento = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar descuento', details: error.message });
  }
};
