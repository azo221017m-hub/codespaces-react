import { query } from '../config/database.js';

// Obtener todos los roles
export const getAllRoles = async (req, res) => {
  try {
    const sql = `
      SELECT 
        r.*,
        n.nombreNegocio as negocioNombre
      FROM tblposcrumenwebrolesdeusuario r
      LEFT JOIN tblposcrumenwebnegocio n ON r.idnegocio = n.idNegocio
      ORDER BY r.fechaRegistroauditoria DESC
    `;
    
    const roles = await query(sql);
    
    res.json({
      success: true,
      count: roles.length,
      data: roles
    });
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener roles',
      message: error.message
    });
  }
};

// Obtener un rol por ID
export const getRolById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const sql = `
      SELECT 
        r.*,
        n.nombreNegocio as negocioNombre
      FROM tblposcrumenwebrolesdeusuario r
      LEFT JOIN tblposcrumenwebnegocio n ON r.idnegocio = n.idNegocio
      WHERE r.idRol = ?
    `;
    
    const roles = await query(sql, [id]);
    
    if (roles.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Rol no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: roles[0]
    });
  } catch (error) {
    console.error('Error al obtener rol:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener rol',
      message: error.message
    });
  }
};

// Crear un nuevo rol
export const createRol = async (req, res) => {
  try {
    const {
      nombreRol,
      descripcion,
      privilegio,
      estatus,
      idnegocio,
      usuarioauditoria
    } = req.body;

    const sql = `
      INSERT INTO tblposcrumenwebrolesdeusuario (
        nombreRol, descripcion, privilegio, estatus, idnegocio,
        fechaRegistroauditoria, usuarioauditoria
      ) VALUES (?, ?, ?, ?, ?, NOW(), ?)
    `;
    
    const result = await query(sql, [
      nombreRol,
      descripcion,
      privilegio,
      estatus,
      idnegocio,
      usuarioauditoria
    ]);

    res.status(201).json({
      success: true,
      message: 'Rol creado exitosamente',
      data: { idRol: result.insertId }
    });
  } catch (error) {
    console.error('Error al crear rol:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear rol',
      message: error.message
    });
  }
};

// Actualizar un rol
export const updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombreRol,
      descripcion,
      privilegio,
      estatus,
      idnegocio,
      usuarioauditoria
    } = req.body;

    const sql = `
      UPDATE tblposcrumenwebrolesdeusuario 
      SET nombreRol = ?, descripcion = ?, privilegio = ?, estatus = ?,
          idnegocio = ?, fehamodificacionauditoria = NOW(), usuarioauditoria = ?
      WHERE idRol = ?
    `;
    
    await query(sql, [
      nombreRol,
      descripcion,
      privilegio,
      estatus,
      idnegocio,
      usuarioauditoria,
      id
    ]);

    res.json({
      success: true,
      message: 'Rol actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error al actualizar rol:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar rol',
      message: error.message
    });
  }
};

// Eliminar un rol
export const deleteRol = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar si hay usuarios con este rol
    const usuarios = await query('SELECT COUNT(*) as count FROM tblposcrumenwebusuarios WHERE idRol = ?', [id]);
    
    if (usuarios[0].count > 0) {
      return res.status(400).json({
        success: false,
        error: 'No se puede eliminar el rol porque tiene usuarios asignados'
      });
    }
    
    const result = await query('DELETE FROM tblposcrumenwebrolesdeusuario WHERE idRol = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Rol no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Rol eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar rol:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar rol',
      message: error.message
    });
  }
};
