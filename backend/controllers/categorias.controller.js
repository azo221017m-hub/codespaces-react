import db from '../config/database.js';

export const getCategorias = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tblposcrumenwebcategorias');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías', details: error.message });
  }
};

export const createCategoria = async (req, res) => {
  try {
    const { nombre, imagencategoria, descripcion, estatus, usuarioauditoria, idnegocio, idmoderadordef } = req.body;
    const [result] = await db.query(
      'INSERT INTO tblposcrumenwebcategorias (nombre, imagencategoria, descripcion, estatus, fechaRegistroauditoria, usuarioauditoria, idnegocio, idmoderadordef) VALUES (?, ?, ?, ?, NOW(), ?, ?, ?)',
      [nombre, imagencategoria, descripcion, estatus, usuarioauditoria, idnegocio, idmoderadordef]
    );
    res.json({ idCategoria: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear categoría', details: error.message });
  }
};

export const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, imagencategoria, descripcion, estatus, usuarioauditoria, idnegocio, idmoderadordef } = req.body;
    await db.query(
      'UPDATE tblposcrumenwebcategorias SET nombre=?, imagencategoria=?, descripcion=?, estatus=?, fechamodificacionauditoria=NOW(), usuarioauditoria=?, idnegocio=?, idmoderadordef=? WHERE idCategoria=?',
      [nombre, imagencategoria, descripcion, estatus, usuarioauditoria, idnegocio, idmoderadordef, id]
    );
    res.json({ idCategoria: id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar categoría', details: error.message });
  }
};

export const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM tblposcrumenwebcategorias WHERE idCategoria=?', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar categoría', details: error.message });
  }
};
