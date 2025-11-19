import { useState } from 'react';
import './FormularioNegocio.css';

function FormularioNegocio({ negocio, modoEdicion, onGuardar, onCancelar }) {
  const [formData, setFormData] = useState({
    // Datos principales del negocio
    numeronegocio: negocio?.numeronegocio || '',
    nombreNegocio: negocio?.nombreNegocio || '',
    rfcnegocio: negocio?.rfcnegocio || '',
    direccionfiscalnegocio: negocio?.direccionfiscalnegocio || '',
    contactonegocio: negocio?.contactonegocio || '',
    telefonocontacto: negocio?.telefonocontacto || '',
    estatusnegocio: negocio?.estatusnegocio ?? 1,
    
    // Parámetros del negocio
    parametros: {
      telefonoNegocio: negocio?.parametros?.telefonoNegocio || '',
      telefonoPedidos: negocio?.parametros?.telefonoPedidos || '',
      ubicacion: negocio?.parametros?.ubicacion || '',
      tipoNegocio: negocio?.parametros?.tipoNegocio || '',
      impresionRecibo: negocio?.parametros?.impresionRecibo ?? 1,
      impresionTablero: negocio?.parametros?.impresionTablero ?? 0,
      envioWhats: negocio?.parametros?.envioWhats ?? 1,
      encabezado: negocio?.parametros?.encabezado || '',
      pie: negocio?.parametros?.pie || '',
      impresionComanda: negocio?.parametros?.impresionComanda ?? 1,
      envioMensaje: negocio?.parametros?.envioMensaje ?? 0,
      estatus: negocio?.parametros?.estatus ?? 1
    }
  });

  const [tabActiva, setTabActiva] = useState('general');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handleParametroChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      parametros: {
        ...prev.parametros,
        [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(formData);
  };

  return (
    <div className="formulario-negocio">
      <div className="formulario-header">
        <h2>{modoEdicion ? '✏️ Editar Negocio' : '➕ Nuevo Negocio'}</h2>
        <p>Complete la información del negocio y sus parámetros</p>
      </div>

      <div className="tabs-container">
        <button
          className={`tab ${tabActiva === 'general' ? 'activa' : ''}`}
          onClick={() => setTabActiva('general')}
        >
          🏢 Información General
        </button>
        <button
          className={`tab ${tabActiva === 'parametros' ? 'activa' : ''}`}
          onClick={() => setTabActiva('parametros')}
        >
          ⚙️ Parámetros y Configuración
        </button>
      </div>

      <form onSubmit={handleSubmit} className="formulario-contenido">
        {tabActiva === 'general' && (
          <div className="seccion-formulario">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="numeronegocio">Número de Negocio *</label>
                <input
                  type="text"
                  id="numeronegocio"
                  name="numeronegocio"
                  value={formData.numeronegocio}
                  onChange={handleChange}
                  placeholder="NEG-001"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="nombreNegocio">Nombre del Negocio *</label>
                <input
                  type="text"
                  id="nombreNegocio"
                  name="nombreNegocio"
                  value={formData.nombreNegocio}
                  onChange={handleChange}
                  placeholder="Mi Negocio SA"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="rfcnegocio">RFC *</label>
                <input
                  type="text"
                  id="rfcnegocio"
                  name="rfcnegocio"
                  value={formData.rfcnegocio}
                  onChange={handleChange}
                  placeholder="ABC123456XYZ"
                  maxLength="50"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefonocontacto">Teléfono de Contacto *</label>
                <input
                  type="tel"
                  id="telefonocontacto"
                  name="telefonocontacto"
                  value={formData.telefonocontacto}
                  onChange={handleChange}
                  placeholder="5555-1234"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="contactonegocio">Email de Contacto *</label>
                <input
                  type="email"
                  id="contactonegocio"
                  name="contactonegocio"
                  value={formData.contactonegocio}
                  onChange={handleChange}
                  placeholder="contacto@negocio.com"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="direccionfiscalnegocio">Dirección Fiscal *</label>
                <textarea
                  id="direccionfiscalnegocio"
                  name="direccionfiscalnegocio"
                  value={formData.direccionfiscalnegocio}
                  onChange={handleChange}
                  placeholder="Calle, número, colonia, ciudad, estado, CP"
                  rows="3"
                  required
                />
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="estatusnegocio"
                    checked={formData.estatusnegocio === 1}
                    onChange={handleChange}
                  />
                  <span>Negocio Activo</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {tabActiva === 'parametros' && (
          <div className="seccion-formulario">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="tipoNegocio">Tipo de Negocio *</label>
                <select
                  id="tipoNegocio"
                  name="tipoNegocio"
                  value={formData.parametros.tipoNegocio}
                  onChange={handleParametroChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="Restaurante">Restaurante</option>
                  <option value="Cafetería">Cafetería</option>
                  <option value="Bar">Bar</option>
                  <option value="Tienda">Tienda</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="ubicacion">Ubicación</label>
                <input
                  type="text"
                  id="ubicacion"
                  name="ubicacion"
                  value={formData.parametros.ubicacion}
                  onChange={handleParametroChange}
                  placeholder="Ciudad, Estado"
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefonoNegocio">Teléfono del Negocio</label>
                <input
                  type="tel"
                  id="telefonoNegocio"
                  name="telefonoNegocio"
                  value={formData.parametros.telefonoNegocio}
                  onChange={handleParametroChange}
                  placeholder="5555-1234"
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefonoPedidos">Teléfono para Pedidos</label>
                <input
                  type="tel"
                  id="telefonoPedidos"
                  name="telefonoPedidos"
                  value={formData.parametros.telefonoPedidos}
                  onChange={handleParametroChange}
                  placeholder="5555-5678"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="encabezado">Encabezado de Recibo</label>
                <textarea
                  id="encabezado"
                  name="encabezado"
                  value={formData.parametros.encabezado}
                  onChange={handleParametroChange}
                  placeholder="Texto que aparecerá en la parte superior del recibo"
                  rows="2"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="pie">Pie de Recibo</label>
                <textarea
                  id="pie"
                  name="pie"
                  value={formData.parametros.pie}
                  onChange={handleParametroChange}
                  placeholder="Texto que aparecerá en la parte inferior del recibo"
                  rows="2"
                />
              </div>
            </div>

            <div className="opciones-configuracion">
              <h4>🔧 Opciones de Configuración</h4>
              <div className="opciones-grid">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="impresionRecibo"
                    checked={formData.parametros.impresionRecibo === 1}
                    onChange={handleParametroChange}
                  />
                  <span>🖨️ Impresión de Recibo</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="impresionTablero"
                    checked={formData.parametros.impresionTablero === 1}
                    onChange={handleParametroChange}
                  />
                  <span>📋 Impresión de Tablero</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="impresionComanda"
                    checked={formData.parametros.impresionComanda === 1}
                    onChange={handleParametroChange}
                  />
                  <span>📄 Impresión de Comanda</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="envioWhats"
                    checked={formData.parametros.envioWhats === 1}
                    onChange={handleParametroChange}
                  />
                  <span>📱 Envío por WhatsApp</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="envioMensaje"
                    checked={formData.parametros.envioMensaje === 1}
                    onChange={handleParametroChange}
                  />
                  <span>💬 Envío de Mensajes</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="estatus"
                    checked={formData.parametros.estatus === 1}
                    onChange={handleParametroChange}
                  />
                  <span>✓ Parámetros Activos</span>
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="formulario-acciones">
          <button type="button" className="btn-cancelar" onClick={onCancelar}>
            ✗ Cancelar
          </button>
          <button type="submit" className="btn-guardar">
            ✓ {modoEdicion ? 'Actualizar' : 'Guardar'} Negocio
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioNegocio;
