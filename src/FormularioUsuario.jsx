import { useState } from 'react';
import './FormularioUsuario.css';

function FormularioUsuario({ usuario, modoEdicion, onGuardar, onCancelar }) {
  const [formData, setFormData] = useState({
    idNegocio: usuario?.idNegocio || '',
    idRol: usuario?.idRol || '',
    nombre: usuario?.nombre || '',
    alias: usuario?.alias || '',
    password: '',
    telefono: usuario?.telefono || '',
    cumple: usuario?.cumple || '',
    frasepersonal: usuario?.frasepersonal || '',
    desempeno: usuario?.desempeno || 0,
    popularidad: usuario?.popularidad || 0,
    estatus: usuario?.estatus ?? 1,
    rolNombre: usuario?.rolNombre || '',
    negocioNombre: usuario?.negocioNombre || ''
  });

  const [tabActiva, setTabActiva] = useState('general');
  const [mostrarPassword, setMostrarPassword] = useState(false);

  // Datos de ejemplo para los selectores
  const negocios = [
    { id: 1, nombre: 'Restaurante El Sabor' },
    { id: 2, nombre: 'Cafetería La Taza' }
  ];

  const roles = [
    { id: 1, nombre: 'Super Administrador' },
    { id: 2, nombre: 'Gerente' },
    { id: 3, nombre: 'Mesero' },
    { id: 4, nombre: 'Chef' },
    { id: 5, nombre: 'Cajero' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
    
    // Actualizar nombres cuando cambian los IDs
    if (name === 'idNegocio') {
      const negocio = negocios.find(n => n.id === parseInt(value));
      setFormData(prev => ({
        ...prev,
        [name]: value,
        negocioNombre: negocio?.nombre || ''
      }));
      return;
    }
    
    if (name === 'idRol') {
      const rol = roles.find(r => r.id === parseInt(value));
      setFormData(prev => ({
        ...prev,
        [name]: value,
        rolNombre: rol?.nombre || ''
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar que la contraseña se incluya solo si es nuevo usuario o si se modificó
    const dataToSave = { ...formData };
    if (modoEdicion && !formData.password) {
      delete dataToSave.password;
    }
    
    onGuardar(dataToSave);
  };

  return (
    <div className="formulario-usuario">
      <div className="formulario-header">
        <h2>{modoEdicion ? '✏️ Editar Usuario' : '➕ Nuevo Usuario'}</h2>
        <p>Complete la información del usuario</p>
      </div>

      <div className="tabs-container">
        <button
          className={`tab ${tabActiva === 'general' ? 'activa' : ''}`}
          onClick={() => setTabActiva('general')}
        >
          👤 Información General
        </button>
        <button
          className={`tab ${tabActiva === 'metricas' ? 'activa' : ''}`}
          onClick={() => setTabActiva('metricas')}
        >
          📊 Métricas y Desempeño
        </button>
      </div>

      <form onSubmit={handleSubmit} className="formulario-contenido">
        {tabActiva === 'general' && (
          <div className="seccion-formulario">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nombre">Nombre Completo *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Juan Pérez García"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="alias">Alias/Usuario *</label>
                <input
                  type="text"
                  id="alias"
                  name="alias"
                  value={formData.alias}
                  onChange={handleChange}
                  placeholder="jperez"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Contraseña {!modoEdicion && '*'}
                  {modoEdicion && <span className="hint-text">(Dejar vacío para no cambiar)</span>}
                </label>
                <div className="password-input-container">
                  <input
                    type={mostrarPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required={!modoEdicion}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                  >
                    {mostrarPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono *</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="5555-1234"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cumple">Fecha de Nacimiento *</label>
                <input
                  type="date"
                  id="cumple"
                  name="cumple"
                  value={formData.cumple}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="idNegocio">Negocio *</label>
                <select
                  id="idNegocio"
                  name="idNegocio"
                  value={formData.idNegocio}
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

              <div className="form-group">
                <label htmlFor="idRol">Rol *</label>
                <select
                  id="idRol"
                  name="idRol"
                  value={formData.idRol}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un rol...</option>
                  {roles.map(rol => (
                    <option key={rol.id} value={rol.id}>
                      {rol.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="frasepersonal">Frase Personal</label>
                <textarea
                  id="frasepersonal"
                  name="frasepersonal"
                  value={formData.frasepersonal}
                  onChange={handleChange}
                  placeholder="Una frase motivacional o lema personal..."
                  rows="3"
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
                  <span>Usuario Activo</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {tabActiva === 'metricas' && (
          <div className="seccion-formulario">
            <div className="metricas-info">
              <p className="info-text">
                💡 Las métricas se calculan automáticamente basándose en el desempeño 
                del usuario, pero puedes ajustarlas manualmente.
              </p>
            </div>

            <div className="form-grid-metricas">
              <div className="form-group-metrica">
                <label htmlFor="desempeno">
                  ⭐ Desempeño
                  <span className="valor-actual">{formData.desempeno}%</span>
                </label>
                <input
                  type="range"
                  id="desempeno"
                  name="desempeno"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.desempeno}
                  onChange={handleChange}
                  className="range-slider"
                />
                <div className="range-labels">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
                <div 
                  className="barra-preview"
                  style={{
                    width: `${formData.desempeno}%`,
                    backgroundColor: formData.desempeno >= 90 ? '#27ae60' : 
                                   formData.desempeno >= 75 ? '#3498db' : 
                                   formData.desempeno >= 60 ? '#f39c12' : '#e74c3c'
                  }}
                />
              </div>

              <div className="form-group-metrica">
                <label htmlFor="popularidad">
                  ❤️ Popularidad
                  <span className="valor-actual">{formData.popularidad}%</span>
                </label>
                <input
                  type="range"
                  id="popularidad"
                  name="popularidad"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.popularidad}
                  onChange={handleChange}
                  className="range-slider"
                />
                <div className="range-labels">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
                <div 
                  className="barra-preview"
                  style={{
                    width: `${formData.popularidad}%`,
                    backgroundColor: formData.popularidad >= 90 ? '#27ae60' : 
                                   formData.popularidad >= 75 ? '#3498db' : 
                                   formData.popularidad >= 60 ? '#f39c12' : '#e74c3c'
                  }}
                />
              </div>
            </div>

            <div className="metricas-visualizacion">
              <h4>📈 Vista Previa de Métricas</h4>
              <div className="preview-cards">
                <div className="preview-card">
                  <span className="preview-icon">⭐</span>
                  <div className="preview-info">
                    <span className="preview-label">Desempeño</span>
                    <span className="preview-valor">{formData.desempeno}%</span>
                  </div>
                </div>
                <div className="preview-card">
                  <span className="preview-icon">❤️</span>
                  <div className="preview-info">
                    <span className="preview-label">Popularidad</span>
                    <span className="preview-valor">{formData.popularidad}%</span>
                  </div>
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
            ✓ {modoEdicion ? 'Actualizar' : 'Guardar'} Usuario
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioUsuario;
