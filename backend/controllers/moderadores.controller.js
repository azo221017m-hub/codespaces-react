import pool from '../config/database.js';

export const getAllModeradores = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tblposcrumenwebmoderadores');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getModeradorById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tblposcrumenwebmoderadores WHERE idmoderador = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createModerador = async (req, res) => {
  try {
    const { nombremoderador, usuarioauditoria, idnegocio, estatus } = req.body;
    const [result] = await pool.query(
      'INSERT INTO tblposcrumenwebmoderadores (nombremoderador, usuarioauditoria, idnegocio, estatus, fechaRegistroauditoria) VALUES (?, ?, ?, ?, NOW())',
      [nombremoderador, usuarioauditoria, idnegocio, estatus]
    );
    res.json({ idmoderador: result.insertId, nombremoderador, usuarioauditoria, idnegocio, estatus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateModerador = async (req, res) => {
  try {
    const { nombremoderador, usuarioauditoria, idnegocio, estatus } = req.body;
    const [result] = await pool.query(
      'UPDATE tblposcrumenwebmoderadores SET nombremoderador = ?, usuarioauditoria = ?, idnegocio = ?, estatus = ?, fehamodificacionauditoria = NOW() WHERE idmoderador = ?',
      [nombremoderador, usuarioauditoria, idnegocio, estatus, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ idmoderador: req.params.id, nombremoderador, usuarioauditoria, idnegocio, estatus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteModerador = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM tblposcrumenwebmoderadores WHERE idmoderador = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
