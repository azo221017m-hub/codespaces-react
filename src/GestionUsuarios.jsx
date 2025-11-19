import { useState, useEffect } from 'react';
import './GestionUsuarios.css';
import FormularioUsuario from './FormularioUsuario';
import ListaUsuarios from './ListaUsuarios';
import { obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from './api';

function GestionUsuarios({ usuario }) {
  const [usuarios, setUsuarios] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstatus, setFiltroEstatus] = useState('todos');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Cargar usuarios desde la API
  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setCargando(true);
      setError('');
      const response = await obtenerUsuarios();
      
      if (response.success) {
        setUsuarios(response.data);
      }
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
      setError('Error al cargar los usuarios: ' + err.message);
    } finally {
      setCargando(false);
    }
  };

  const handleNuevoUsuario = () => {
    setUsuarioSeleccionado(null);
    setModoEdicion(false);
    setMostrarFormulario(true);
  };

  const handleEditarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModoEdicion(true);
    setMostrarFormulario(true);
  };

  const handleEliminarUsuario = async (idUsuario) => {
    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      try {
        const response = await eliminarUsuario(idUsuario);
        if (response.success) {
          setUsuarios(usuarios.filter(u => u.idUsuario !== idUsuario));
          alert('Usuario eliminado exitosamente');
        }
      } catch (err) {
        console.error('Error al eliminar usuario:', err);
        alert('Error al eliminar el usuario: ' + err.message);
      }
    }
  };

  const handleGuardarUsuario = async (usuarioData) => {
    try {
      if (modoEdicion && usuarioSeleccionado) {
        // Actualizar usuario existente
        const response = await actualizarUsuario(usuarioSeleccionado.idUsuario, {
          ...usuarioData,
          usuarioauditoria: usuario.usuario || usuario.alias
        });
        
        if (response.success) {
          await cargarUsuarios();
          alert('Usuario actualizado exitosamente');
        }
      } else {
        // Crear nuevo usuario
        const response = await crearUsuario({
          ...usuarioData,
          usuarioauditoria: usuario.usuario || usuario.alias
        });
        
        if (response.success) {
          await cargarUsuarios();
          alert('Usuario creado exitosamente');
        }
      }
      setMostrarFormulario(false);
    } catch (err) {
      console.error('Error al guardar usuario:', err);
      alert('Error al guardar el usuario: ' + err.message);
    }
  };

  const handleCancelar = () => {
    setMostrarFormulario(false);
    setUsuarioSeleccionado(null);
  };

  const usuariosFiltrados = usuarios.filter(usr => {
    const matchBusqueda = 
      usr.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      usr.alias.toLowerCase().includes(busqueda.toLowerCase()) ||
      usr.telefono.includes(busqueda) ||
      usr.rolNombre.toLowerCase().includes(busqueda.toLowerCase());
    
    const matchEstatus = 
      filtroEstatus === 'todos' ||
      (filtroEstatus === 'activos' && usr.estatus === 1) ||
      (filtroEstatus === 'inactivos' && usr.estatus === 0);
    
    return matchBusqueda && matchEstatus;
  });

  const estadisticas = {
    total: usuarios.length,
    activos: usuarios.filter(u => u.estatus === 1).length,
    inactivos: usuarios.filter(u => u.estatus === 0).length,
    promedioDesempeno: (usuarios.reduce((acc, u) => acc + (u.desempeno || 0), 0) / usuarios.length).toFixed(2),
    promedioPopularidad: (usuarios.reduce((acc, u) => acc + (u.popularidad || 0), 0) / usuarios.length).toFixed(2)
  };

  return (
    <div className="gestion-usuarios">
      {!mostrarFormulario ? (
        <>
          <div className="gestion-header">
            <div className="header-info">
              <h2>👥 Gestión de Usuarios</h2>
              <p>Administra los usuarios del sistema</p>
            </div>
            <button className="btn-nuevo" onClick={handleNuevoUsuario}>
              ➕ Nuevo Usuario
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
          <div className="estadisticas-usuarios">
            <div className="stat-card">
              <span className="stat-icon">👤</span>
              <div className="stat-info">
                <span className="stat-valor">{estadisticas.total}</span>
                <span className="stat-label">Total Usuarios</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">✓</span>
              <div className="stat-info">
                <span className="stat-valor">{estadisticas.activos}</span>
                <span className="stat-label">Activos</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">✗</span>
              <div className="stat-info">
                <span className="stat-valor">{estadisticas.inactivos}</span>
                <span className="stat-label">Inactivos</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">⭐</span>
              <div className="stat-info">
                <span className="stat-valor">{estadisticas.promedioDesempeno}%</span>
                <span className="stat-label">Desempeño Promedio</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">❤️</span>
              <div className="stat-info">
                <span className="stat-valor">{estadisticas.promedioPopularidad}%</span>
                <span className="stat-label">Popularidad Promedio</span>
              </div>
            </div>
          </div>

          {/* Filtros y búsqueda */}
          <div className="filtros-container">
            <div className="barra-busqueda">
              <input
                type="text"
                placeholder="🔍 Buscar por nombre, alias, teléfono o rol..."
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
              <p>Cargando usuarios...</p>
            </div>
          ) : (
            <ListaUsuarios
              usuarios={usuariosFiltrados}
              onEditar={handleEditarUsuario}
              onEliminar={handleEliminarUsuario}
            />
          )}
        </>
      ) : (
        <FormularioUsuario
          usuario={usuarioSeleccionado}
          modoEdicion={modoEdicion}
          onGuardar={handleGuardarUsuario}
          onCancelar={handleCancelar}
        />
      )}
    </div>
  );
}

export default GestionUsuarios;
