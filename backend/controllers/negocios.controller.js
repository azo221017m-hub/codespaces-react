import { query } from '../config/database.js';

// Obtener todos los negocios
export const getAllNegocios = async (req, res) => {
  try {
    const sql = `
      SELECT 
        n.*,
        p.*
      FROM tblposcrumenwebnegocio n
      LEFT JOIN tblposcrumenwebparametrosnegocio p ON n.idNegocio = p.idNegocio
      ORDER BY n.fechaRegistroauditoria DESC
    `;
    
    const negocios = await query(sql);
    res.json({
      success: true,
      count: negocios.length,
      data: negocios
    });
  } catch (error) {
    console.error('Error al obtener negocios:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener negocios',
      message: error.message
    });
  }
};

// Obtener un negocio por ID
export const getNegocioById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const sql = `
      SELECT 
        n.*,
        p.*
      FROM tblposcrumenwebnegocio n
      LEFT JOIN tblposcrumenwebparametrosnegocio p ON n.idNegocio = p.idNegocio
      WHERE n.idNegocio = ?
    `;
    
    const negocios = await query(sql, [id]);
    
    if (negocios.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Negocio no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: negocios[0]
    });
  } catch (error) {
    console.error('Error al obtener negocio:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener negocio',
      message: error.message
    });
  }
};

// Crear un nuevo negocio
export const createNegocio = async (req, res) => {
  try {
    const {
      numeronegocio,
      nombreNegocio,
      rfcnegocio,
      direccionfiscalnegocio,
      contactonegocio,
      telefonocontacto,
      estatusnegocio,
      usuarioauditoria,
      parametros
    } = req.body;

    // Insertar negocio
    const sqlNegocio = `
      INSERT INTO tblposcrumenwebnegocio (
        numeronegocio, nombreNegocio, rfcnegocio, direccionfiscalnegocio,
        contactonegocio, telefonocontacto, estatusnegocio,
        fechaRegistroauditoria, usuarioauditoria
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)
    `;
    
    const resultNegocio = await query(sqlNegocio, [
      numeronegocio,
      nombreNegocio,
      rfcnegocio,
      direccionfiscalnegocio,
      contactonegocio,
      telefonocontacto,
      estatusnegocio,
      usuarioauditoria
    ]);

    const idNegocio = resultNegocio.insertId;

    // Insertar parámetros si existen
    if (parametros) {
      const sqlParametros = `
        INSERT INTO tblposcrumenwebparametrosnegocio (
          idNegocio, telefonoNegocio, telefonoPedidos, ubicacion, tipoNegocio,
          impresionRecibo, impresionTablero, envioWhats, encabezado, pie,
          impresionComanda, envioMensaje, estatus, fechaRegistroAuditoria, usuarioAuditoria
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
      `;
      
      await query(sqlParametros, [
        idNegocio,
        parametros.telefonoNegocio,
        parametros.telefonoPedidos,
        parametros.ubicacion,
        parametros.tipoNegocio,
        parametros.impresionRecibo,
        parametros.impresionTablero,
        parametros.envioWhats,
        parametros.encabezado,
        parametros.pie,
        parametros.impresionComanda,
        parametros.envioMensaje,
        parametros.estatus,
        usuarioauditoria
      ]);
    }

    res.status(201).json({
      success: true,
      message: 'Negocio creado exitosamente',
      data: { idNegocio }
    });
  } catch (error) {
    console.error('Error al crear negocio:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear negocio',
      message: error.message
    });
  }
};

// Actualizar un negocio
export const updateNegocio = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      numeronegocio,
      nombreNegocio,
      rfcnegocio,
      direccionfiscalnegocio,
      contactonegocio,
      telefonocontacto,
      estatusnegocio,
      usuarioauditoria,
      parametros
    } = req.body;

    // Actualizar negocio
    const sqlNegocio = `
      UPDATE tblposcrumenwebnegocio 
      SET numeronegocio = ?, nombreNegocio = ?, rfcnegocio = ?,
          direccionfiscalnegocio = ?, contactonegocio = ?, telefonocontacto = ?,
          estatusnegocio = ?, fehamodificacionauditoria = NOW(), usuarioauditoria = ?
      WHERE idNegocio = ?
    `;
    
    await query(sqlNegocio, [
      numeronegocio,
      nombreNegocio,
      rfcnegocio,
      direccionfiscalnegocio,
      contactonegocio,
      telefonocontacto,
      estatusnegocio,
      usuarioauditoria,
      id
    ]);

    // Actualizar parámetros si existen
    if (parametros) {
      const sqlParametros = `
        UPDATE tblposcrumenwebparametrosnegocio 
        SET telefonoNegocio = ?, telefonoPedidos = ?, ubicacion = ?, tipoNegocio = ?,
            impresionRecibo = ?, impresionTablero = ?, envioWhats = ?, encabezado = ?,
            pie = ?, impresionComanda = ?, envioMensaje = ?, estatus = ?,
            fechaModificacionAuditoria = NOW(), usuarioAuditoria = ?
        WHERE idNegocio = ?
      `;
      
      await query(sqlParametros, [
        parametros.telefonoNegocio,
        parametros.telefonoPedidos,
        parametros.ubicacion,
        parametros.tipoNegocio,
        parametros.impresionRecibo,
        parametros.impresionTablero,
        parametros.envioWhats,
        parametros.encabezado,
        parametros.pie,
        parametros.impresionComanda,
        parametros.envioMensaje,
        parametros.estatus,
        usuarioauditoria,
        id
      ]);
    }

    res.json({
      success: true,
      message: 'Negocio actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error al actualizar negocio:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar negocio',
      message: error.message
    });
  }
};

// Eliminar un negocio
export const deleteNegocio = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Eliminar parámetros primero
    await query('DELETE FROM tblposcrumenwebparametrosnegocio WHERE idNegocio = ?', [id]);
    
    // Eliminar negocio
    const result = await query('DELETE FROM tblposcrumenwebnegocio WHERE idNegocio = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Negocio no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Negocio eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar negocio:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar negocio',
      message: error.message
    });
  }
};
