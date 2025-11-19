import { query } from '../config/database.js';

// Obtener todas las unidades de medida
export const getAllUnidadesMedida = async (req, res) => {
  try {
    const sql = `
      SELECT 
        u.*,
        n.nombreNegocio as negocioNombre
      FROM tblposrumenwebumcompra u
      LEFT JOIN tblposcrumenwebnegocio n ON u.idnegocio = n.idNegocio
      ORDER BY u.fechaRegistroauditoria DESC
    `;
    
    const unidades = await query(sql);
    res.json({
      success: true,
      count: unidades.length,
      data: unidades
    });
  } catch (error) {
    console.error('Error al obtener unidades de medida:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener unidades de medida',
      message: error.message
    });
  }
};

// Obtener una unidad de medida por ID
export const getUnidadMedidaById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const sql = `
      SELECT 
        u.*,
        n.nombreNegocio as negocioNombre
      FROM tblposrumenwebumcompra u
      LEFT JOIN tblposcrumenwebnegocio n ON u.idnegocio = n.idNegocio
      WHERE u.idUmCompra = ?
    `;
    
    const unidades = await query(sql, [id]);
    
    if (unidades.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Unidad de medida no encontrada'
      });
    }
    
    res.json({
      success: true,
      data: unidades[0]
    });
  } catch (error) {
    console.error('Error al obtener unidad de medida:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener unidad de medida',
      message: error.message
    });
  }
};

// Crear una nueva unidad de medida
export const createUnidadMedida = async (req, res) => {
  try {
    const {
      nombreUmCompra,
      valor,
      umMatPrima,
      valorConvertido,
      idnegocio,
      usuarioauditoria
    } = req.body;

    const sql = `
      INSERT INTO tblposrumenwebumcompra (
        nombreUmCompra, valor, umMatPrima, valorConvertido, idnegocio,
        fechaRegistroauditoria, usuarioauditoria
      ) VALUES (?, ?, ?, ?, ?, NOW(), ?)
    `;
    
    const result = await query(sql, [
      nombreUmCompra,
      valor,
      umMatPrima,
      valorConvertido,
      idnegocio,
      usuarioauditoria
    ]);

    res.status(201).json({
      success: true,
      message: 'Unidad de medida creada exitosamente',
      data: { idUmCompra: result.insertId }
    });
  } catch (error) {
    console.error('Error al crear unidad de medida:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear unidad de medida',
      message: error.message
    });
  }
};

// Actualizar una unidad de medida
export const updateUnidadMedida = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombreUmCompra,
      valor,
      umMatPrima,
      valorConvertido,
      idnegocio,
      usuarioauditoria
    } = req.body;

    const sql = `
      UPDATE tblposrumenwebumcompra 
      SET nombreUmCompra = ?, valor = ?, umMatPrima = ?, valorConvertido = ?,
          idnegocio = ?, fehamodificacionauditoria = NOW(), usuarioauditoria = ?
      WHERE idUmCompra = ?
    `;
    
    await query(sql, [
      nombreUmCompra,
      valor,
      umMatPrima,
      valorConvertido,
      idnegocio,
      usuarioauditoria,
      id
    ]);

    res.json({
      success: true,
      message: 'Unidad de medida actualizada exitosamente'
    });
  } catch (error) {
    console.error('Error al actualizar unidad de medida:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar unidad de medida',
      message: error.message
    });
  }
};

// Eliminar una unidad de medida
export const deleteUnidadMedida = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query('DELETE FROM tblposrumenwebumcompra WHERE idUmCompra = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Unidad de medida no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Unidad de medida eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar unidad de medida:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar unidad de medida',
      message: error.message
    });
  }
};
