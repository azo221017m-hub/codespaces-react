import { useState, useEffect } from 'react';
import './FormularioRol.css';
import { obtenerNegocios } from './api';

function FormularioRol({ rol, modoEdicion, onGuardar, onCancelar }) {
  const parsePrivilegios = (privilegioStr) => {
    try {
      return JSON.parse(privilegioStr);
    } catch {
      return {
        configuracion: false,
        usuarios: { crear: false, editar: false, eliminar: false, ver: false },
        negocios: { crear: false, editar: false, eliminar: false, ver: false },
        productos: { crear: false, editar: false, eliminar: false, ver: false },
        ventas: { crear: false, editar: false, eliminar: false, ver: false },
        reportes: false,
        ajustes: false
      };
    }
  };

  const [formData, setFormData] = useState({
    nombreRol: rol?.nombreRol || '',
    descripcion: rol?.descripcion || '',
    idnegocio: rol?.idnegocio || '',
    negocioNombre: rol?.negocioNombre || '',
    estatus: rol?.estatus ?? 1,
    privilegio: parsePrivilegios(rol?.privilegio)
  });

  const [tabActiva, setTabActiva] = useState('general');
  const [negocios, setNegocios] = useState([]);
  const [cargandoDatos, setCargandoDatos] = useState(true);

  // Cargar negocios desde la API
  useEffect(() => {
    cargarNegocios();
  }, []);

  const cargarNegocios = async () => {
    try {
      setCargandoDatos(true);
      const response = await obtenerNegocios();
      
      if (response.success) {
        // Eliminar duplicados por idNegocio
        const negociosMap = new Map();
        
        response.data.forEach(item => {
          if (!negociosMap.has(item.idNegocio)) {
            negociosMap.set(item.idNegocio, {
              id: item.idNegocio,
              nombre: item.nombreNegocio
            });
          }
        });
        
        setNegocios(Array.from(negociosMap.values()));
      }
    } catch (error) {
      console.error('Error al cargar negocios:', error);
    } finally {
      setCargandoDatos(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'idnegocio') {
      const negocio = negocios.find(n => n.id === parseInt(value));
      setFormData(prev => ({
        ...prev,
        [name]: value,
        negocioNombre: negocio?.nombre || ''
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handlePrivilegioChange = (categoria, subcategoria = null) => {
    setFormData(prev => {
      const newPrivilegios = { ...prev.privilegio };
      
      if (subcategoria) {
        // Si es un objeto con subcategorías
        newPrivilegios[categoria] = {
          ...newPrivilegios[categoria],
          [subcategoria]: !newPrivilegios[categoria][subcategoria]
        };
      } else {
        // Si es un privilegio simple
        newPrivilegios[categoria] = !newPrivilegios[categoria];
      }
      
      return { ...prev, privilegio: newPrivilegios };
    });
  };

  const toggleCategoria = (categoria) => {
    setFormData(prev => {
      const newPrivilegios = { ...prev.privilegio };
      
      if (typeof newPrivilegios[categoria] === 'object') {
        // Si es un objeto, activar/desactivar todos los subcampos
        const todosActivos = Object.values(newPrivilegios[categoria]).every(v => v);
        Object.keys(newPrivilegios[categoria]).forEach(key => {
          newPrivilegios[categoria][key] = !todosActivos;
        });
      }
      
      return { ...prev, privilegio: newPrivilegios };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dataToSave = {
      ...formData,
      privilegio: JSON.stringify(formData.privilegio)
    };
    
    onGuardar(dataToSave);
  };

  return (
    <div className="formulario-rol">
      <div className="formulario-header">
        <h2>{modoEdicion ? '✏️ Editar Rol' : '➕ Nuevo Rol'}</h2>
        <p>Configure los permisos y privilegios del rol</p>
      </div>

      <div className="tabs-container">
        <button
          className={`tab ${tabActiva === 'general' ? 'activa' : ''}`}
          onClick={() => setTabActiva('general')}
        >
          📋 Información General
        </button>
        <button
          className={`tab ${tabActiva === 'privilegios' ? 'activa' : ''}`}
          onClick={() => setTabActiva('privilegios')}
        >
          🔑 Privilegios y Permisos
        </button>
      </div>

      <form onSubmit={handleSubmit} className="formulario-contenido">
        {tabActiva === 'general' && (
          <div className="seccion-formulario">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nombreRol">Nombre del Rol *</label>
                <input
                  type="text"
                  id="nombreRol"
                  name="nombreRol"
                  value={formData.nombreRol}
                  onChange={handleChange}
                  placeholder="Ej: Gerente, Supervisor, etc."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="idnegocio">Negocio *</label>
                <select
                  id="idnegocio"
                  name="idnegocio"
                  value={formData.idnegocio}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un negocio...</option>
                  {negocios.map(negocio => (
                    <option key={negocio.id} value={negocio.id}>
                      {negocio.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="descripcion">Descripción del Rol *</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Describe las responsabilidades y funciones de este rol..."
                  rows="4"
                  required
                />
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="estatus"
                    checked={formData.estatus === 1}
                    onChange={handleChange}
                  />
                  <span>Rol Activo</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {tabActiva === 'privilegios' && (
          <div className="seccion-formulario">
            <div className="privilegios-info">
              <p className="info-text">
                🔐 Configure los permisos específicos para este rol. Los usuarios con este rol 
                tendrán acceso únicamente a las funciones que habilite aquí.
              </p>
            </div>

            <div className="privilegios-configuracion">
              {/* Configuración General */}
              <div className="privilegio-seccion">
                <div className="seccion-header">
                  <h4>⚙️ Configuración General</h4>
                </div>
                <div className="privilegio-opciones">
                  <label className="privilegio-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.privilegio.configuracion}
                      onChange={() => handlePrivilegioChange('configuracion')}
                    />
                    <span>Acceso a configuración del sistema</span>
                  </label>
                  <label className="privilegio-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.privilegio.reportes}
                      onChange={() => handlePrivilegioChange('reportes')}
                    />
                    <span>Acceso a reportes y estadísticas</span>
                  </label>
                  <label className="privilegio-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.privilegio.ajustes}
                      onChange={() => handlePrivilegioChange('ajustes')}
                    />
                    <span>Modificar ajustes del sistema</span>
                  </label>
                </div>
              </div>

              {/* Gestión de Usuarios */}
              <div className="privilegio-seccion">
                <div className="seccion-header">
                  <h4>👥 Gestión de Usuarios</h4>
                  <button 
                    type="button" 
                    className="btn-toggle-all"
                    onClick={() => toggleCategoria('usuarios')}
                  >
                    Seleccionar todo
                  </button>
                </div>
                <div className="privilegio-opciones-grid">
                  <label className="privilegio-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.privilegio.usuarios.crear}
                      onChange={() => handlePrivilegioChange('usuarios', 'crear')}
                    />
                    <span>➕ Crear usuarios</span>
                  </label>
                  <label className="privilegio-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.privilegio.usuarios.editar}
                      onChange={() => handlePrivilegioChange('usuarios', 'editar')}
                    />
                    <span>✏️ Editar usuarios</span>
                  </label>
                  <label className="privilegio-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.privilegio.usuarios.eliminar}
                      onChange={() => handlePrivilegioChange('usuarios', 'eliminar')}
                    />
                    <span>🗑️ Eliminar usuarios</span>
                  </label>
                  <label className="privilegio-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.privilegio.usuarios.ver}
                      onChange={() => handlePrivilegioChange('usuarios', 'ver')}
                    />
                    <span>👁️ Ver usuarios</span>
                  </label>
                </div>
              </div>

              {/* Gestión de Negocios */}
              <div className="privilegio-seccion">
                <div className="seccion-header">
                  <h4>🏢 Gestión de Negocios</h4>
                  <button 
                    type="button" 
                    className="btn-toggle-all"
                    onClick={() => toggleCategoria('negocios')}
                  >
                    Seleccionar todo
                  </button>
                </div>
                <div className="privilegio-opciones-grid">
                  <label className="privilegio-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.privilegio.negocios.crear}
                      onChange={() => handlePrivilegioChange('negocios', 'crear')}
                    />
                    <span>➕ Crear negocios</span>
                  </label>
                  <label className="privilegio-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.privilegio.negocios.editar}
                      onChange={() => handlePrivilegioChange('negocios', 'editar')}
                    />
                    <span>✏️ Editar negocios</span>
                  </label>
                  <label className="privilegio-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.privilegio.negocios.eliminar}
                      onChange={() => handlePrivilegioChange('negocios', 'eliminar')}
                    />
                    <span>🗑️ Eliminar negocios</span>
                  </label>
                  <label className="privilegio-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.privilegio.negocios.ver}
                      onChange={() => handlePrivilegioChange('negocios', 'ver')}
                    />
                    <span>👁️ Ver negocios</span>
                  </label>
                </div>
              </div>

              {/* Gestión de Productos */}
              <div className="privilegio-seccion">
                <div className="seccion-header">
                  <h4>📦 Gestión de Productos</h4>
                  <button 
                    type="button" 
                    className="btn-toggle-all"
                    onClick={() => toggleCategoria('productos')}
                  >
                    Seleccionar todo
                  </button>
                </div>
                <div className="privilegio-opciones-grid">
                  <label className="privilegio-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.privilegio.productos.crear}
                      onChange={() => handlePrivilegioChange('productos', 'crear')}
                    />
                    <span>➕ Crear productos</span>
                  </label>
                  <label className="privilegio-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.privilegio.productos.editar}
                      onChange={() => handlePrivilegioChange('productos', 'editar')}
                    />
                    <span>✏️ Editar productos</span>
                  </label>
                  <label className="privilegio-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.privilegio.productos.eliminar}
                      onChange={() => handlePrivilegioChange('productos', 'eliminar')}
                    />
                    <span>🗑️ Eliminar productos</span>
                  </label>
                  <label className="privilegio-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.privilegio.productos.ver}
                      onChange={() => handlePrivilegioChange('productos', 'ver')}
                    />
                    <span>👁️ Ver productos</span>
                  </label>
                </div>
              </div>

              {/* Gestión de Ventas */}
              <div className="privilegio-seccion">
                <div className="seccion-header">
                  <h4>💰 Gestión de Ventas</h4>
                  <button 
                    type="button" 
                    className="btn-toggle-all"
                    onClick={() => toggleCategoria('ventas')}
                  >
                    Seleccionar todo
                  </button>
                </div>
                <div className="privilegio-opciones-grid">
                  <label className="privilegio-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.privilegio.ventas.crear}
                      onChange={() => handlePrivilegioChange('ventas', 'crear')}
                    />
                    <span>➕ Crear ventas</span>
                  </label>
                  <label className="privilegio-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.privilegio.ventas.editar}
                      onChange={() => handlePrivilegioChange('ventas', 'editar')}
                    />
                    <span>✏️ Editar ventas</span>
                  </label>
                  <label className="privilegio-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.privilegio.ventas.eliminar}
                      onChange={() => handlePrivilegioChange('ventas', 'eliminar')}
                    />
                    <span>🗑️ Anular ventas</span>
                  </label>
                  <label className="privilegio-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.privilegio.ventas.ver}
                      onChange={() => handlePrivilegioChange('ventas', 'ver')}
                    />
                    <span>👁️ Ver ventas</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="formulario-acciones">
          <button type="button" className="btn-cancelar" onClick={onCancelar}>
            ✗ Cancelar
          </button>
          <button type="submit" className="btn-guardar">
            ✓ {modoEdicion ? 'Actualizar' : 'Guardar'} Rol
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioRol;
