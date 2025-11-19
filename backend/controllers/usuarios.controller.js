import { query } from '../config/database.js';
import bcrypt from 'bcrypt';

// Obtener todos los usuarios
export const getAllUsuarios = async (req, res) => {
  try {
    const sql = `
      SELECT 
        u.*,
        r.nombreRol as rolNombre,
        n.nombreNegocio as negocioNombre
      FROM tblposcrumenwebusuarios u
      LEFT JOIN tblposcrumenwebrolesdeusuario r ON u.idRol = r.idRol
      LEFT JOIN tblposcrumenwebnegocio n ON u.idNegocio = n.idNegocio
      ORDER BY u.fechaRegistroauditoria DESC
    `;
    
    const usuarios = await query(sql);
    
    // No devolver contraseñas
    const usuariosSinPassword = usuarios.map(u => {
      const { password, ...usuarioSinPass } = u;
      return usuarioSinPass;
    });
    
    res.json({
      success: true,
      count: usuariosSinPassword.length,
      data: usuariosSinPassword
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener usuarios',
      message: error.message
    });
  }
};

// Obtener un usuario por ID
export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const sql = `
      SELECT 
        u.*,
        r.nombreRol as rolNombre,
        n.nombreNegocio as negocioNombre
      FROM tblposcrumenwebusuarios u
      LEFT JOIN tblposcrumenwebrolesdeusuario r ON u.idRol = r.idRol
      LEFT JOIN tblposcrumenwebnegocio n ON u.idNegocio = n.idNegocio
      WHERE u.idUsuario = ?
    `;
    
    const usuarios = await query(sql, [id]);
    
    if (usuarios.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }
    
    const { password, ...usuarioSinPass } = usuarios[0];
    
    res.json({
      success: true,
      data: usuarioSinPass
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener usuario',
      message: error.message
    });
  }
};

// Crear un nuevo usuario
export const createUsuario = async (req, res) => {
  try {
    const {
      idNegocio,
      idRol,
      nombre,
      alias,
      password,
      telefono,
      cumple,
      frasepersonal,
      desempeno,
      popularidad,
      estatus,
      usuarioauditoria
    } = req.body;

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO tblposcrumenwebusuarios (
        idNegocio, idRol, nombre, alias, password, telefono, cumple,
        frasepersonal, desempeno, popularidad, estatus,
        fechaRegistroauditoria, usuarioauditoria
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
    `;
    
    const result = await query(sql, [
      idNegocio,
      idRol,
      nombre,
      alias,
      hashedPassword,
      telefono,
      cumple,
      frasepersonal,
      desempeno || 0,
      popularidad || 0,
      estatus,
      usuarioauditoria
    ]);

    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: { idUsuario: result.insertId }
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear usuario',
      message: error.message
    });
  }
};

// Actualizar un usuario
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      idNegocio,
      idRol,
      nombre,
      alias,
      password,
      telefono,
      cumple,
      frasepersonal,
      desempeno,
      popularidad,
      estatus,
      usuarioauditoria
    } = req.body;

    let sql;
    let params;

    // Si se proporciona nueva contraseña, encriptarla
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      sql = `
        UPDATE tblposcrumenwebusuarios 
        SET idNegocio = ?, idRol = ?, nombre = ?, alias = ?, password = ?,
            telefono = ?, cumple = ?, frasepersonal = ?, desempeno = ?,
            popularidad = ?, estatus = ?, fehamodificacionauditoria = NOW(),
            usuarioauditoria = ?
        WHERE idUsuario = ?
      `;
      params = [
        idNegocio, idRol, nombre, alias, hashedPassword, telefono, cumple,
        frasepersonal, desempeno, popularidad, estatus, usuarioauditoria, id
      ];
    } else {
      sql = `
        UPDATE tblposcrumenwebusuarios 
        SET idNegocio = ?, idRol = ?, nombre = ?, alias = ?, telefono = ?,
            cumple = ?, frasepersonal = ?, desempeno = ?, popularidad = ?,
            estatus = ?, fehamodificacionauditoria = NOW(), usuarioauditoria = ?
        WHERE idUsuario = ?
      `;
      params = [
        idNegocio, idRol, nombre, alias, telefono, cumple, frasepersonal,
        desempeno, popularidad, estatus, usuarioauditoria, id
      ];
    }
    
    await query(sql, params);

    res.json({
      success: true,
      message: 'Usuario actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar usuario',
      message: error.message
    });
  }
};

// Eliminar un usuario
export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query('DELETE FROM tblposcrumenwebusuarios WHERE idUsuario = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Usuario eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar usuario',
      message: error.message
    });
  }
};

// Login de usuario
export const loginUsuario = async (req, res) => {
  try {
    const { alias, password } = req.body;

    const sql = `
      SELECT 
        u.*,
        r.nombreRol as rolNombre,
        n.nombreNegocio as negocioNombre
      FROM tblposcrumenwebusuarios u
      LEFT JOIN tblposcrumenwebrolesdeusuario r ON u.idRol = r.idRol
      LEFT JOIN tblposcrumenwebnegocio n ON u.idNegocio = n.idNegocio
      WHERE u.alias = ? AND u.estatus = 1
    `;
    
    const usuarios = await query(sql, [alias]);
    
    if (usuarios.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Credenciales inválidas'
      });
    }

    const usuario = usuarios[0];
    
    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, usuario.password);
    
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: 'Credenciales inválidas'
      });
    }

    // No devolver contraseña
    const { password: _, ...usuarioSinPass } = usuario;

    res.json({
      success: true,
      message: 'Login exitoso',
      data: usuarioSinPass
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      error: 'Error en el login',
      message: error.message
    });
  }
};
