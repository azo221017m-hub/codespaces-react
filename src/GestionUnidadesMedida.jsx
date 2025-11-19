import { useState, useEffect } from 'react';
import './GestionUnidadesMedida.css';
import FormularioUnidadMedida from './FormularioUnidadMedida';
import ListaUnidadesMedida from './ListaUnidadesMedida';
import { obtenerUnidadesMedida, crearUnidadMedida, actualizarUnidadMedida, eliminarUnidadMedida } from './api';

function GestionUnidadesMedida({ usuario }) {
  const [unidades, setUnidades] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Cargar unidades desde la API
  useEffect(() => {
    cargarUnidades();
  }, []);

  const cargarUnidades = async () => {
    try {
      setCargando(true);
      setError('');
      const response = await obtenerUnidadesMedida();
      
      if (response.success) {
        setUnidades(response.data);
      }
    } catch (err) {
      console.error('Error al cargar unidades de medida:', err);
      setError('Error al cargar las unidades de medida: ' + err.message);
    } finally {
      setCargando(false);
    }
  };

  const handleNuevaUnidad = () => {
    setUnidadSeleccionada(null);
    setModoEdicion(false);
    setMostrarFormulario(true);
  };

  const handleEditarUnidad = (unidad) => {
    setUnidadSeleccionada(unidad);
    setModoEdicion(true);
    setMostrarFormulario(true);
  };

  const handleEliminarUnidad = async (idUmCompra) => {
    if (window.confirm('¿Está seguro de eliminar esta unidad de medida?')) {
      try {
        const response = await eliminarUnidadMedida(idUmCompra);
        if (response.success) {
          setUnidades(unidades.filter(u => u.idUmCompra !== idUmCompra));
          alert('Unidad de medida eliminada exitosamente');
        }
      } catch (err) {
        console.error('Error al eliminar unidad:', err);
        alert('Error al eliminar la unidad de medida: ' + err.message);
      }
    }
  };

  const handleGuardarUnidad = async (unidadData) => {
    try {
      if (modoEdicion && unidadSeleccionada) {
        // Actualizar unidad existente
        const response = await actualizarUnidadMedida(unidadSeleccionada.idUmCompra, {
          ...unidadData,
          usuarioauditoria: usuario.usuario || usuario.alias
        });
        
        if (response.success) {
          await cargarUnidades();
          alert('Unidad de medida actualizada exitosamente');
        }
      } else {
        // Crear nueva unidad
        const response = await crearUnidadMedida({
          ...unidadData,
          usuarioauditoria: usuario.usuario || usuario.alias
        });
        
        if (response.success) {
          await cargarUnidades();
          alert('Unidad de medida creada exitosamente');
        }
      }
      setMostrarFormulario(false);
    } catch (err) {
      console.error('Error al guardar unidad:', err);
      alert('Error al guardar la unidad de medida: ' + err.message);
    }
  };

  const handleCancelar = () => {
    setMostrarFormulario(false);
    setUnidadSeleccionada(null);
  };

  const unidadesFiltradas = unidades.filter(unidad =>
    unidad.nombreUmCompra?.toLowerCase().includes(busqueda.toLowerCase()) ||
    unidad.umMatPrima?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const estadisticas = {
    total: unidades.length,
    valorPromedio: unidades.length > 0 
      ? (unidades.reduce((acc, u) => acc + parseFloat(u.valor || 0), 0) / unidades.length).toFixed(2)
      : '0.00',
    conversionPromedio: unidades.length > 0
      ? (unidades.reduce((acc, u) => acc + parseFloat(u.valorConvertido || 0), 0) / unidades.length).toFixed(2)
      : '0.00'
  };

  return (
    <div className="gestion-unidades-medida">
      {!mostrarFormulario ? (
        <>
          <div className="gestion-header">
            <div className="header-info">
              <h2>📏 Gestión de Unidades de Medida</h2>
              <p>Administra las unidades de medida para compras</p>
            </div>
            <button className="btn-nuevo" onClick={handleNuevaUnidad}>
              ➕ Nueva Unidad de Medida
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
          <div className="estadisticas-unidades">
            <div className="stat-card">
              <span className="stat-icon">📊</span>
              <div className="stat-info">
                <span className="stat-valor">{estadisticas.total}</span>
                <span className="stat-label">Total Unidades</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">💰</span>
              <div className="stat-info">
                <span className="stat-valor">${estadisticas.valorPromedio}</span>
                <span className="stat-label">Valor Promedio</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">🔄</span>
              <div className="stat-info">
                <span className="stat-valor">{estadisticas.conversionPromedio}</span>
                <span className="stat-label">Conversión Promedio</span>
              </div>
            </div>
          </div>

          <div className="barra-busqueda">
            <input
              type="text"
              placeholder="🔍 Buscar por nombre o materia prima..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input-busqueda"
            />
          </div>

          {cargando ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Cargando unidades de medida...</p>
            </div>
          ) : (
            <ListaUnidadesMedida
              unidades={unidadesFiltradas}
              onEditar={handleEditarUnidad}
              onEliminar={handleEliminarUnidad}
            />
          )}
        </>
      ) : (
        <FormularioUnidadMedida
          unidad={unidadSeleccionada}
          modoEdicion={modoEdicion}
          onGuardar={handleGuardarUnidad}
          onCancelar={handleCancelar}
        />
      )}
    </div>
  );
}

export default GestionUnidadesMedida;
