import { useState, useEffect } from 'react';
import './GestionNegocios.css';
import FormularioNegocio from './FormularioNegocio';
import ListaNegocios from './ListaNegocios';
import { obtenerNegocios, crearNegocio, actualizarNegocio, eliminarNegocio } from './api';

function GestionNegocios({ usuario }) {
  const [negocios, setNegocios] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [negocioSeleccionado, setNegocioSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Cargar negocios desde la API
  useEffect(() => {
    cargarNegocios();
  }, []);

  const cargarNegocios = async () => {
    try {
      setCargando(true);
      setError('');
      const response = await obtenerNegocios();
      
      if (response.success) {
        // Agrupar datos de negocio con sus parámetros
        const negociosAgrupados = [];
        const negociosMap = new Map();
        
        response.data.forEach(item => {
          if (!negociosMap.has(item.idNegocio)) {
            negociosMap.set(item.idNegocio, {
              idNegocio: item.idNegocio,
              numeronegocio: item.numeronegocio,
              nombreNegocio: item.nombreNegocio,
              rfcnegocio: item.rfcnegocio,
              direccionfiscalnegocio: item.direccionfiscalnegocio,
              contactonegocio: item.contactonegocio,
              telefonocontacto: item.telefonocontacto,
              estatusnegocio: item.estatusnegocio,
              fechaRegistroauditoria: item.fechaRegistroauditoria,
              usuarioauditoria: item.usuarioauditoria,
              parametros: {
                idParametro: item.idParametro,
                telefonoNegocio: item.telefonoNegocio,
                telefonoPedidos: item.telefonoPedidos,
                ubicacion: item.ubicacion,
                tipoNegocio: item.tipoNegocio,
                impresionRecibo: item.impresionRecibo,
                impresionTablero: item.impresionTablero,
                envioWhats: item.envioWhats,
                encabezado: item.encabezado,
                pie: item.pie,
                impresionComanda: item.impresionComanda,
                envioMensaje: item.envioMensaje,
                estatus: item.estatus
              }
            });
          }
        });
        
        setNegocios(Array.from(negociosMap.values()));
      }
    } catch (err) {
      console.error('Error al cargar negocios:', err);
      setError('Error al cargar los negocios: ' + err.message);
    } finally {
      setCargando(false);
    }
  };

  const handleNuevoNegocio = () => {
    setNegocioSeleccionado(null);
    setModoEdicion(false);
    setMostrarFormulario(true);
  };

  const handleEditarNegocio = (negocio) => {
    setNegocioSeleccionado(negocio);
    setModoEdicion(true);
    setMostrarFormulario(true);
  };

  const handleEliminarNegocio = async (idNegocio) => {
    if (window.confirm('¿Está seguro de eliminar este negocio?')) {
      try {
        const response = await eliminarNegocio(idNegocio);
        if (response.success) {
          setNegocios(negocios.filter(n => n.idNegocio !== idNegocio));
          alert('Negocio eliminado exitosamente');
        }
      } catch (err) {
        console.error('Error al eliminar negocio:', err);
        alert('Error al eliminar el negocio: ' + err.message);
      }
    }
  };

  const handleGuardarNegocio = async (negocioData) => {
    try {
      if (modoEdicion && negocioSeleccionado) {
        // Actualizar negocio existente
        const response = await actualizarNegocio(negocioSeleccionado.idNegocio, {
          ...negocioData,
          usuarioauditoria: usuario.usuario || usuario.alias
        });
        
        if (response.success) {
          await cargarNegocios();
          alert('Negocio actualizado exitosamente');
        }
      } else {
        // Crear nuevo negocio
        const response = await crearNegocio({
          ...negocioData,
          usuarioauditoria: usuario.usuario || usuario.alias
        });
        
        if (response.success) {
          await cargarNegocios();
          alert('Negocio creado exitosamente');
        }
      }
      setMostrarFormulario(false);
    } catch (err) {
      console.error('Error al guardar negocio:', err);
      alert('Error al guardar el negocio: ' + err.message);
    }
  };

  const handleCancelar = () => {
    setMostrarFormulario(false);
    setNegocioSeleccionado(null);
  };

  const negociosFiltrados = negocios.filter(negocio =>
    negocio.nombreNegocio.toLowerCase().includes(busqueda.toLowerCase()) ||
    negocio.numeronegocio.toLowerCase().includes(busqueda.toLowerCase()) ||
    negocio.rfcnegocio.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="gestion-negocios">
      {!mostrarFormulario ? (
        <>
          <div className="gestion-header">
            <div className="header-info">
              <h2>🏢 Gestión de Negocios</h2>
              <p>Administra la información de tus negocios y parámetros</p>
            </div>
            <button className="btn-nuevo" onClick={handleNuevoNegocio}>
              ➕ Nuevo Negocio
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

          <div className="barra-busqueda">
            <input
              type="text"
              placeholder="🔍 Buscar por nombre, número o RFC..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input-busqueda"
            />
          </div>

          {cargando ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Cargando negocios...</p>
            </div>
          ) : (
            <ListaNegocios
              negocios={negociosFiltrados}
              onEditar={handleEditarNegocio}
              onEliminar={handleEliminarNegocio}
            />
          )}
        </>
      ) : (
        <FormularioNegocio
          negocio={negocioSeleccionado}
          modoEdicion={modoEdicion}
          onGuardar={handleGuardarNegocio}
          onCancelar={handleCancelar}
        />
      )}
    </div>
  );
}

export default GestionNegocios;
