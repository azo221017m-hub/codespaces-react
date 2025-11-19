import './ListaNegocios.css';

function ListaNegocios({ negocios, onEditar, onEliminar }) {
  if (negocios.length === 0) {
    return (
      <div className="sin-resultados">
        <p>📭 No se encontraron negocios</p>
      </div>
    );
  }

  return (
    <div className="lista-negocios">
      {negocios.map((negocio) => (
        <div key={negocio.idNegocio} className="negocio-card">
          <div className="negocio-header">
            <div className="negocio-titulo">
              <h3>{negocio.nombreNegocio}</h3>
              <span className="negocio-numero">{negocio.numeronegocio}</span>
              <span className={`negocio-status ${negocio.estatusnegocio ? 'activo' : 'inactivo'}`}>
                {negocio.estatusnegocio ? '✓ Activo' : '✗ Inactivo'}
              </span>
            </div>
            <div className="negocio-acciones">
              <button 
                className="btn-editar"
                onClick={() => onEditar(negocio)}
                title="Editar"
              >
                ✏️
              </button>
              <button 
                className="btn-eliminar"
                onClick={() => onEliminar(negocio.idNegocio)}
                title="Eliminar"
              >
                🗑️
              </button>
            </div>
          </div>

          <div className="negocio-info">
            <div className="info-grupo">
              <span className="info-label">RFC:</span>
              <span className="info-valor">{negocio.rfcnegocio}</span>
            </div>
            <div className="info-grupo">
              <span className="info-label">Teléfono:</span>
              <span className="info-valor">{negocio.telefonocontacto}</span>
            </div>
            <div className="info-grupo">
              <span className="info-label">Contacto:</span>
              <span className="info-valor">{negocio.contactonegocio}</span>
            </div>
            <div className="info-grupo full-width">
              <span className="info-label">Dirección:</span>
              <span className="info-valor">{negocio.direccionfiscalnegocio}</span>
            </div>
          </div>

          {negocio.parametros && (
            <div className="negocio-parametros">
              <h4>⚙️ Parámetros del Negocio</h4>
              <div className="parametros-grid">
                <div className="parametro-item">
                  <span className="param-label">Tipo:</span>
                  <span className="param-valor">{negocio.parametros.tipoNegocio}</span>
                </div>
                <div className="parametro-item">
                  <span className="param-label">Ubicación:</span>
                  <span className="param-valor">{negocio.parametros.ubicacion}</span>
                </div>
                <div className="parametro-item">
                  <span className="param-label">Tel. Pedidos:</span>
                  <span className="param-valor">{negocio.parametros.telefonoPedidos}</span>
                </div>
              </div>
              <div className="parametros-opciones">
                {negocio.parametros.impresionRecibo && <span className="opcion-badge">🖨️ Impresión Recibo</span>}
                {negocio.parametros.impresionTablero && <span className="opcion-badge">📋 Impresión Tablero</span>}
                {negocio.parametros.impresionComanda && <span className="opcion-badge">📄 Impresión Comanda</span>}
                {negocio.parametros.envioWhats && <span className="opcion-badge">📱 Envío WhatsApp</span>}
                {negocio.parametros.envioMensaje && <span className="opcion-badge">💬 Envío Mensaje</span>}
              </div>
            </div>
          )}

          <div className="negocio-footer">
            <span className="audit-info">
              Registrado por <strong>{negocio.usuarioauditoria}</strong> el{' '}
              {new Date(negocio.fechaRegistroauditoria).toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListaNegocios;
