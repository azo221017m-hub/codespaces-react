import { useState, useEffect } from 'react';
import './FormularioUnidadMedida.css';
import { obtenerNegocios } from './api';

function FormularioUnidadMedida({ unidad, modoEdicion, onGuardar, onCancelar }) {
  const [formData, setFormData] = useState({
    nombreUmCompra: unidad?.nombreUmCompra || '',
    valor: unidad?.valor || '',
    umMatPrima: unidad?.umMatPrima || '',
    valorConvertido: unidad?.valorConvertido || '',
    idnegocio: unidad?.idnegocio || '',
    negocioNombre: unidad?.negocioNombre || ''
  });

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
    const { name, value } = e.target;
    
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
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(formData);
  };

  return (
    <div className="formulario-unidad-medida">
      <div className="formulario-header">
        <h2>{modoEdicion ? '✏️ Editar Unidad de Medida' : '➕ Nueva Unidad de Medida'}</h2>
        <p>Complete la información de la unidad de medida</p>
      </div>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-grid">
          {/* Nombre de la Unidad */}
          <div className="form-group full-width">
            <label htmlFor="nombreUmCompra">
              <span className="label-icon">📏</span>
              Nombre de la Unidad de Medida *
            </label>
            <input
              type="text"
              id="nombreUmCompra"
              name="nombreUmCompra"
              value={formData.nombreUmCompra}
              onChange={handleChange}
              placeholder="Ej: Kilogramo, Litro, Pieza, Caja..."
              required
              maxLength={100}
            />
          </div>

          {/* Valor */}
          <div className="form-group">
            <label htmlFor="valor">
              <span className="label-icon">💰</span>
              Valor *
            </label>
            <input
              type="number"
              id="valor"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              placeholder="0.000"
              step="0.001"
              required
              min="0"
            />
            <span className="help-text">Valor numérico con 3 decimales</span>
          </div>

          {/* Unidad de Materia Prima */}
          <div className="form-group">
            <label htmlFor="umMatPrima">
              <span className="label-icon">📦</span>
              Unidad de Materia Prima
            </label>
            <input
              type="text"
              id="umMatPrima"
              name="umMatPrima"
              value={formData.umMatPrima}
              onChange={handleChange}
              placeholder="Ej: kg, lt, pz..."
              maxLength={50}
            />
            <span className="help-text">Abreviatura o código de la unidad</span>
          </div>

          {/* Valor Convertido */}
          <div className="form-group">
            <label htmlFor="valorConvertido">
              <span className="label-icon">🔄</span>
              Valor Convertido
            </label>
            <input
              type="number"
              id="valorConvertido"
              name="valorConvertido"
              value={formData.valorConvertido}
              onChange={handleChange}
              placeholder="0.000"
              step="0.001"
              min="0"
            />
            <span className="help-text">Factor de conversión con 3 decimales</span>
          </div>

          {/* Negocio */}
          <div className="form-group">
            <label htmlFor="idnegocio">
              <span className="label-icon">🏢</span>
              Negocio *
            </label>
            <select
              id="idnegocio"
              name="idnegocio"
              value={formData.idnegocio}
              onChange={handleChange}
              required
              disabled={cargandoDatos}
            >
              <option value="">
                {cargandoDatos ? 'Cargando negocios...' : 'Seleccione un negocio'}
              </option>
              {negocios.map(negocio => (
                <option key={negocio.id} value={negocio.id}>
                  {negocio.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ejemplo de Conversión */}
        {formData.valor && formData.valorConvertido && (
          <div className="conversion-example">
            <div className="example-header">
              <span className="example-icon">🧮</span>
              <strong>Ejemplo de Conversión:</strong>
            </div>
            <div className="example-content">
              <span className="example-text">
                1 {formData.nombreUmCompra || 'Unidad'} = {parseFloat(formData.valor).toFixed(3)} unidades base
              </span>
              <span className="conversion-arrow">→</span>
              <span className="example-text">
                Factor de conversión: {parseFloat(formData.valorConvertido).toFixed(3)}
              </span>
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="form-actions">
          <button type="button" className="btn-cancelar" onClick={onCancelar}>
            ❌ Cancelar
          </button>
          <button type="submit" className="btn-guardar">
            💾 {modoEdicion ? 'Actualizar' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioUnidadMedida;
