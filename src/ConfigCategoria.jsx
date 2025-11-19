import React, { useEffect, useState } from 'react';
import CategoriasList from './CategoriasList';
import FormularioCategoria from './FormularioCategoria';
import {
  obtenerCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
} from './api';

const ConfigCategoria = ({ usuario }) => {
  const [categorias, setCategorias] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [categoriaEdit, setCategoriaEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const cargarCategorias = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await obtenerCategorias();
      setCategorias(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const handleAdd = () => {
    setCategoriaEdit(null);
    setFormVisible(true);
  };

  const handleEdit = (cat) => {
    setCategoriaEdit(cat);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta categoría?')) {
      setLoading(true);
      try {
        await eliminarCategoria(id);
        cargarCategorias();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (form) => {
    setLoading(true);
    setError('');
    try {
      if (categoriaEdit) {
        await actualizarCategoria(categoriaEdit.idCategoria, {
          ...form,
          usuarioauditoria: usuario?.usuario || usuario?.alias || 'sistema',
        });
      } else {
        await crearCategoria({
          ...form,
          usuarioauditoria: usuario?.usuario || usuario?.alias || 'sistema',
        });
      }
      setFormVisible(false);
      cargarCategorias();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const categoriasFiltradas = categorias.filter(cat =>
    cat.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    (cat.descripcion || '').toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="gestion-categorias">
      {!formVisible ? (
        <>
          <div className="gestion-header">
            <div className="header-info">
              <h2>🗂️ Configuración de Categorías</h2>
              <p>Administra las categorías de productos y su información</p>
            </div>
            <button className="add-btn" onClick={handleAdd}>➕ Nueva Categoría</button>
          </div>

          {error && (
            <div className="error-msg" style={{
              padding: '1rem',
              backgroundColor: '#fee',
              color: '#c33',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}>{error}</div>
          )}

          <div className="barra-busqueda">
            <input
              type="text"
              placeholder="🔍 Buscar por nombre o descripción..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input-busqueda"
            />
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Cargando categorías...</p>
            </div>
          ) : (
            <CategoriasList
              categorias={categoriasFiltradas}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </>
      ) : (
        <FormularioCategoria
          categoria={categoriaEdit}
          onSubmit={handleSubmit}
          onCancel={() => setFormVisible(false)}
        />
      )}
    </div>
  );
};

export default ConfigCategoria;
