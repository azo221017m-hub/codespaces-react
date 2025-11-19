import './ListaRoles.css';

function ListaRoles({ roles, onEditar, onEliminar }) {
  if (roles.length === 0) {
    return (
      <div className="sin-resultados">
        <p>📭 No se encontraron roles</p>
      </div>
    );
  }

  const parsePrivilegios = (privilegioStr) => {
    try {
      return JSON.parse(privilegioStr);
    } catch {
      return {};
    }
  };

  const contarPrivilegios = (privilegios) => {
    let total = 0;
    let activos = 0;

    const contar = (obj) => {
      Object.values(obj).forEach(val => {
        if (typeof val === 'boolean') {
          total++;
          if (val) activos++;
        } else if (typeof val === 'object') {
          contar(val);
        }
      });
    };

    contar(privilegios);
    return { total, activos };
  };

  return (
    <div className="lista-roles">
      {roles.map((rol) => {
        const privilegios = parsePrivilegios(rol.privilegio);
        const { total, activos } = contarPrivilegios(privilegios);
        const porcentaje = total > 0 ? Math.round((activos / total) * 100) : 0;

        return (
          <div key={rol.idRol} className="rol-card">
            <div className="rol-header">
              <div className="rol-titulo-section">
                <div className="rol-icono">
                  <span className="icono-rol">🎭</span>
                </div>
                <div className="rol-info-principal">
                  <h3>{rol.nombreRol}</h3>
                  <span className={`rol-status ${rol.estatus ? 'activo' : 'inactivo'}`}>
                    {rol.estatus ? '● Activo' : '○ Inactivo'}
                  </span>
                </div>
              </div>
              <div className="rol-acciones">
                <button 
                  className="btn-editar"
                  onClick={() => onEditar(rol)}
                  title="Editar"
                >
                  ✏️
                </button>
                <button 
                  className="btn-eliminar"
                  onClick={() => onEliminar(rol.idRol)}
                  title="Eliminar"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="rol-descripcion">
              <p>{rol.descripcion}</p>
            </div>

            <div className="rol-info-extra">
              <div className="info-badge">
                <span className="badge-icon">🏢</span>
                <span>{rol.negocioNombre}</span>
              </div>
            </div>

            {/* Resumen de Privilegios */}
            <div className="privilegios-resumen">
              <div className="resumen-header">
                <h4>🔑 Privilegios del Rol</h4>
                <span className="privilegios-count">{activos} de {total} activos</span>
              </div>
              
              <div className="barra-privilegios">
                <div 
                  className="barra-relleno-privilegios"
                  style={{ 
                    width: `${porcentaje}%`,
                    backgroundColor: porcentaje >= 75 ? '#27ae60' : 
                                   porcentaje >= 50 ? '#3498db' : 
                                   porcentaje >= 25 ? '#f39c12' : '#e74c3c'
                  }}
                />
              </div>

              <div className="privilegios-grid">
                {privilegios.configuracion !== undefined && (
                  <div className={`privilegio-item ${privilegios.configuracion ? 'activo' : 'inactivo'}`}>
                    <span className="priv-icon">{privilegios.configuracion ? '✓' : '✗'}</span>
                    <span>Configuración</span>
                  </div>
                )}
                
                {privilegios.usuarios && (
                  <div className={`privilegio-item ${Object.values(privilegios.usuarios).some(v => v) ? 'activo' : 'inactivo'}`}>
                    <span className="priv-icon">{Object.values(privilegios.usuarios).some(v => v) ? '✓' : '✗'}</span>
                    <span>Usuarios</span>
                  </div>
                )}
                
                {privilegios.negocios && (
                  <div className={`privilegio-item ${Object.values(privilegios.negocios).some(v => v) ? 'activo' : 'inactivo'}`}>
                    <span className="priv-icon">{Object.values(privilegios.negocios).some(v => v) ? '✓' : '✗'}</span>
                    <span>Negocios</span>
                  </div>
                )}
                
                {privilegios.productos && (
                  <div className={`privilegio-item ${Object.values(privilegios.productos).some(v => v) ? 'activo' : 'inactivo'}`}>
                    <span className="priv-icon">{Object.values(privilegios.productos).some(v => v) ? '✓' : '✗'}</span>
                    <span>Productos</span>
                  </div>
                )}
                
                {privilegios.ventas && (
                  <div className={`privilegio-item ${Object.values(privilegios.ventas).some(v => v) ? 'activo' : 'inactivo'}`}>
                    <span className="priv-icon">{Object.values(privilegios.ventas).some(v => v) ? '✓' : '✗'}</span>
                    <span>Ventas</span>
                  </div>
                )}
                
                {privilegios.reportes !== undefined && (
                  <div className={`privilegio-item ${privilegios.reportes ? 'activo' : 'inactivo'}`}>
                    <span className="priv-icon">{privilegios.reportes ? '✓' : '✗'}</span>
                    <span>Reportes</span>
                  </div>
                )}
                
                {privilegios.ajustes !== undefined && (
                  <div className={`privilegio-item ${privilegios.ajustes ? 'activo' : 'inactivo'}`}>
                    <span className="priv-icon">{privilegios.ajustes ? '✓' : '✗'}</span>
                    <span>Ajustes</span>
                  </div>
                )}
              </div>
            </div>

            <div className="rol-footer">
              <span className="audit-info">
                Creado por <strong>{rol.usuarioauditoria}</strong> el{' '}
                {new Date(rol.fechaRegistroauditoria).toLocaleDateString('es-MX', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListaRoles;
