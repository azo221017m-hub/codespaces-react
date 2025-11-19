// Componente GestionSubReceta
import React, { useState, useEffect } from 'react';
import ListaSubReceta from './ListaSubReceta';
import FormularioSubReceta from './FormularioSubReceta';
import { getSubRecetas, createSubReceta, updateSubReceta, deleteSubReceta } from './api';
import './GestionSubReceta.css';

const GestionSubReceta = () => {
  const [subrecetas, setSubRecetas] = useState([]);
  const [subrecetaEdit, setSubRecetaEdit] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    cargarSubRecetas();
  }, []);

  const cargarSubRecetas = async () => {
    const data = await getSubRecetas();
    setSubRecetas(data);
  };

  const handleEdit = subreceta => {
    setSubRecetaEdit(subreceta);
    setMostrarFormulario(true);
  };

  const handleDelete = async id => {
    await deleteSubReceta(id);
    cargarSubRecetas();
  };

  const handleSubmit = async form => {
    if (subrecetaEdit) {
      await updateSubReceta(subrecetaEdit.idSubReceta, form);
    } else {
      await createSubReceta(form);
    }
    setMostrarFormulario(false);
    setSubRecetaEdit(null);
    cargarSubRecetas();
  };

  const handleCancel = () => {
    setMostrarFormulario(false);
    setSubRecetaEdit(null);
  };

  return (
    <div className="gestion-subreceta">
      {mostrarFormulario ? (
        <FormularioSubReceta subreceta={subrecetaEdit} onSubmit={handleSubmit} onCancel={handleCancel} />
      ) : (
        <>
          <button onClick={() => setMostrarFormulario(true)}>Agregar SubReceta</button>
          <ListaSubReceta subrecetas={subrecetas} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
};

export default GestionSubReceta;
