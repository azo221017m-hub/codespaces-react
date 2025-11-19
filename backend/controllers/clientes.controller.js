// Controlador para tblposcrumenwebclientes
import db from '../config/database.js';

export const getClientes = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tblposcrumenwebclientes');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes', details: error.message });
  }
};

export const createCliente = async (req, res) => {
  try {
    const cliente = req.body;
    const [result] = await db.query('INSERT INTO tblposcrumenwebclientes SET ?', cliente);
    res.json({ idCliente: result.insertId, ...cliente });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente', details: error.message });
  }
};

export const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = req.body;
    await db.query('UPDATE tblposcrumenwebclientes SET ? WHERE idCliente = ?', [cliente, id]);
    res.json({ idCliente: id, ...cliente });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cliente', details: error.message });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM tblposcrumenwebclientes WHERE idCliente = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente', details: error.message });
  }
};
