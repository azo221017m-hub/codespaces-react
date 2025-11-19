import { useState, useEffect } from 'react';
import './GestionRoles.css';
import FormularioRol from './FormularioRol';
import ListaRoles from './ListaRoles';
import { obtenerRoles, crearRol, actualizarRol, eliminarRol } from './api';

function GestionRoles({ usuario }) {
  const [roles, setRoles] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [rolSeleccionado, setRolSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstatus, setFiltroEstatus] = useState('todos');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Cargar roles desde la API
  useEffect(() => {
    cargarRoles();
  }, []);

  const cargarRoles = async () => {
    try {
      setCargando(true);
      setError('');
      const response = await obtenerRoles();
      
      if (response.success) {
        setRoles(response.data);
      }
    } catch (err) {
      console.error('Error al cargar roles:', err);
      setError('Error al cargar los roles: ' + err.message);
    } finally {
      setCargando(false);
    }
  };

  const handleNuevoRol = () => {
    setRolSeleccionado(null);
    setModoEdicion(false);
    setMostrarFormulario(true);
  };

  const handleEditarRol = (rol) => {
    setRolSeleccionado(rol);
    setModoEdicion(true);
    setMostrarFormulario(true);
  };

  const handleEliminarRol = async (idRol) => {
    if (window.confirm('¿Está seguro de eliminar este rol? Los usuarios con este rol podrían verse afectados.')) {
      try {
        const response = await eliminarRol(idRol);
        if (response.success) {
          setRoles(roles.filter(r => r.idRol !== idRol));
          alert('Rol eliminado exitosamente');
        }
      } catch (err) {
        console.error('Error al eliminar rol:', err);
        alert('Error al eliminar el rol: ' + err.message);
      }
    }
  };

  const handleGuardarRol = async (rolData) => {
    try {
      if (modoEdicion && rolSeleccionado) {
        // Actualizar rol existente
        const response = await actualizarRol(rolSeleccionado.idRol, {
          ...rolData,
          usuarioauditoria: usuario.usuario || usuario.alias
        });
        
        if (response.success) {
          await cargarRoles();
          alert('Rol actualizado exitosamente');
        }
      } else {
        // Crear nuevo rol
        const response = await crearRol({
          ...rolData,
          usuarioauditoria: usuario.usuario || usuario.alias
        });
        
        if (response.success) {
          await cargarRoles();
          alert('Rol creado exitosamente');
        }
      }
      setMostrarFormulario(false);
    } catch (err) {
      console.error('Error al guardar rol:', err);
      alert('Error al guardar el rol: ' + err.message);
    }
  };

  const handleCancelar = () => {
    setMostrarFormulario(false);
    setRolSeleccionado(null);
  };

  const rolesFiltrados = roles.filter(rol => {
    const matchBusqueda = 
      rol.nombreRol.toLowerCase().includes(busqueda.toLowerCase()) ||
      rol.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      rol.negocioNombre.toLowerCase().includes(busqueda.toLowerCase());
    
    const matchEstatus = 
      filtroEstatus === 'todos' ||
      (filtroEstatus === 'activos' && rol.estatus === 1) ||
      (filtroEstatus === 'inactivos' && rol.estatus === 0);
    
    return matchBusqueda && matchEstatus;
  });

  const estadisticas = {
    total: roles.length,
    activos: roles.filter(r => r.estatus === 1).length,
    inactivos: roles.filter(r => r.estatus === 0).length
  };

  return (
    <div className="gestion-roles">
      {!mostrarFormulario ? (
        <>
          <div className="gestion-header">
            <div className="header-info">
              <h2>🔐 Gestión de Roles de Usuario</h2>
              <p>Configura los permisos y privilegios del sistema</p>
            </div>
            <button className="btn-nuevo" onClick={handleNuevoRol}>
              ➕ Nuevo Rol
            </button>
          </div>

          {error && (
            <div className="error-message" style={{
              padding: '1rem',
              backgroundColor: '#fee',
              color: '#c33',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}>
              {error}
            </div>
          )}

          {/* Estadísticas */}
          <div className="estadisticas-roles">
            <div className="stat-card">
              <span className="stat-icon">🎭</span>
              <div className="stat-info">
                <span className="stat-valor">{estadisticas.total}</span>
                <span className="stat-label">Total de Roles</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">✓</span>
              <div className="stat-info">
                <span className="stat-valor">{estadisticas.activos}</span>
                <span className="stat-label">Roles Activos</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">✗</span>
              <div className="stat-info">
                <span className="stat-valor">{estadisticas.inactivos}</span>
                <span className="stat-label">Roles Inactivos</span>
              </div>
            </div>
          </div>

          {/* Filtros y búsqueda */}
          <div className="filtros-container">
            <div className="barra-busqueda">
              <input
                type="text"
                placeholder="🔍 Buscar por nombre, descripción o negocio..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="input-busqueda"
              />
            </div>
            <div className="filtros-estatus">
              <button
                className={`filtro-btn ${filtroEstatus === 'todos' ? 'activo' : ''}`}
                onClick={() => setFiltroEstatus('todos')}
              >
                Todos
              </button>
              <button
                className={`filtro-btn ${filtroEstatus === 'activos' ? 'activo' : ''}`}
                onClick={() => setFiltroEstatus('activos')}
              >
                Activos
              </button>
              <button
                className={`filtro-btn ${filtroEstatus === 'inactivos' ? 'activo' : ''}`}
                onClick={() => setFiltroEstatus('inactivos')}
              >
                Inactivos
              </button>
            </div>
          </div>

          {cargando ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Cargando roles...</p>
            </div>
          ) : (
            <ListaRoles
              roles={rolesFiltrados}
              onEditar={handleEditarRol}
              onEliminar={handleEliminarRol}
            />
          )}
        </>
      ) : (
        <FormularioRol
          rol={rolSeleccionado}
          modoEdicion={modoEdicion}
          onGuardar={handleGuardarRol}
          onCancelar={handleCancelar}
        />
      )}
    </div>
  );
}

export default GestionRoles;
