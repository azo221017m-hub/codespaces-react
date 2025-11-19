import React from 'react';
import './CategoriasList.css';

const CategoriasList = ({ categorias, onEdit, onDelete }) => {
  return (
    <div className="categorias-list-container">
      <h2>Categorías</h2>
      <div className="categorias-grid">
        {categorias.length === 0 ? (
          <p>No hay categorías registradas.</p>
        ) : (
          categorias.map(cat => (
            <div className="categoria-card" key={cat.idCategoria}>
              <div className="categoria-img">
                {cat.imagencategoria ? (
                  <img src={`data:image/jpeg;base64,${cat.imagencategoria}`} alt={cat.nombre} />
                ) : (
                  <div className="img-placeholder">Sin imagen</div>
                )}
              </div>
              <div className="categoria-info">
                <h3>{cat.nombre}</h3>
                <p>{cat.descripcion}</p>
                <span className={cat.estatus ? 'estatus-activo' : 'estatus-inactivo'}>
                  {cat.estatus ? 'Activo' : 'Inactivo'}
                </span>
                <div className="categoria-actions">
                  <button onClick={() => onEdit(cat)} className="edit-btn">Editar</button>
                  <button onClick={() => onDelete(cat.idCategoria)} className="delete-btn">Eliminar</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoriasList;
