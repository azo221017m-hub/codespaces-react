// Controlador para tblposcrumenwebmesas
import db from '../config/database.js';

export const getMesas = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tblposcrumenwebmesas');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mesas', details: error.message });
  }
};

export const createMesa = async (req, res) => {
  try {
    const mesa = req.body;
    const [result] = await db.query('INSERT INTO tblposcrumenwebmesas SET ?', mesa);
    res.json({ idmesa: result.insertId, ...mesa });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear mesa', details: error.message });
  }
};

export const updateMesa = async (req, res) => {
  try {
    const { id } = req.params;
    const mesa = req.body;
    await db.query('UPDATE tblposcrumenwebmesas SET ? WHERE idmesa = ?', [mesa, id]);
    res.json({ idmesa: id, ...mesa });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar mesa', details: error.message });
  }
};

export const deleteMesa = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM tblposcrumenwebmesas WHERE idmesa = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar mesa', details: error.message });
  }
};
