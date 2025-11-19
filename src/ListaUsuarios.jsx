import './ListaUsuarios.css';

function ListaUsuarios({ usuarios, onEditar, onEliminar }) {
  if (usuarios.length === 0) {
    return (
      <div className="sin-resultados">
        <p>📭 No se encontraron usuarios</p>
      </div>
    );
  }

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const cumple = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - cumple.getFullYear();
    const mes = hoy.getMonth() - cumple.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < cumple.getDate())) {
      edad--;
    }
    return edad;
  };

  const getBarraColor = (valor) => {
    if (valor >= 90) return '#27ae60';
    if (valor >= 75) return '#3498db';
    if (valor >= 60) return '#f39c12';
    return '#e74c3c';
  };

  return (
    <div className="lista-usuarios">
      {usuarios.map((usuario) => (
        <div key={usuario.idUsuario} className="usuario-card">
          <div className="usuario-header">
            <div className="usuario-avatar-section">
              <div className="avatar-grande">
                {usuario.fotoavatar ? (
                  <img src={usuario.fotoavatar} alt={usuario.nombre} />
                ) : (
                  <span className="avatar-inicial">
                    {usuario.nombre.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="usuario-info-principal">
                <h3>{usuario.nombre}</h3>
                <span className="usuario-alias">@{usuario.alias}</span>
                <span className={`usuario-status ${usuario.estatus ? 'activo' : 'inactivo'}`}>
                  {usuario.estatus ? '● Activo' : '○ Inactivo'}
                </span>
              </div>
            </div>
            <div className="usuario-acciones">
              <button 
                className="btn-editar"
                onClick={() => onEditar(usuario)}
                title="Editar"
              >
                ✏️
              </button>
              <button 
                className="btn-eliminar"
                onClick={() => onEliminar(usuario.idUsuario)}
                title="Eliminar"
              >
                🗑️
              </button>
            </div>
          </div>

          <div className="usuario-detalles">
            <div className="detalle-grupo">
              <span className="detalle-icon">🏢</span>
              <div>
                <span className="detalle-label">Negocio</span>
                <span className="detalle-valor">{usuario.negocioNombre}</span>
              </div>
            </div>
            <div className="detalle-grupo">
              <span className="detalle-icon">🔐</span>
              <div>
                <span className="detalle-label">Rol</span>
                <span className="detalle-valor">{usuario.rolNombre}</span>
              </div>
            </div>
            <div className="detalle-grupo">
              <span className="detalle-icon">📱</span>
              <div>
                <span className="detalle-label">Teléfono</span>
                <span className="detalle-valor">{usuario.telefono}</span>
              </div>
            </div>
            <div className="detalle-grupo">
              <span className="detalle-icon">🎂</span>
              <div>
                <span className="detalle-label">Edad</span>
                <span className="detalle-valor">
                  {calcularEdad(usuario.cumple)} años
                </span>
              </div>
            </div>
          </div>

          {usuario.frasepersonal && (
            <div className="frase-personal">
              <span className="comilla">"</span>
              {usuario.frasepersonal}
              <span className="comilla">"</span>
            </div>
          )}

          {/* Métricas de Desempeño */}
          <div className="metricas-container">
            <div className="metrica">
              <div className="metrica-header">
                <span className="metrica-label">⭐ Desempeño</span>
                <span className="metrica-valor">{usuario.desempeno}%</span>
              </div>
              <div className="barra-progreso">
                <div 
                  className="barra-relleno"
                  style={{ 
                    width: `${usuario.desempeno}%`,
                    backgroundColor: getBarraColor(usuario.desempeno)
                  }}
                />
              </div>
            </div>

            <div className="metrica">
              <div className="metrica-header">
                <span className="metrica-label">❤️ Popularidad</span>
                <span className="metrica-valor">{usuario.popularidad}%</span>
              </div>
              <div className="barra-progreso">
                <div 
                  className="barra-relleno"
                  style={{ 
                    width: `${usuario.popularidad}%`,
                    backgroundColor: getBarraColor(usuario.popularidad)
                  }}
                />
              </div>
            </div>
          </div>

          <div className="usuario-footer">
            <span className="audit-info">
              Registrado por <strong>{usuario.usuarioauditoria}</strong> el{' '}
              {new Date(usuario.fechaRegistroauditoria).toLocaleDateString('es-MX', {
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

export default ListaUsuarios;
