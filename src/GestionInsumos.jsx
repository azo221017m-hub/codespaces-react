// Componente GestionInsumos
import React, { useState, useEffect } from 'react';
import ListaInsumos from './ListaInsumos';
import FormularioInsumos from './FormularioInsumos';
import { getInsumos, createInsumo, updateInsumo, deleteInsumo } from './api';
import './GestionInsumos.css';

const GestionInsumos = () => {
  const [insumos, setInsumos] = useState([]);
  const [insumoEdit, setInsumoEdit] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    cargarInsumos();
  }, []);

  const cargarInsumos = async () => {
    const data = await getInsumos();
    setInsumos(data);
  };

  const handleEdit = insumo => {
    setInsumoEdit(insumo);
    setMostrarFormulario(true);
  };

  const handleDelete = async id => {
    await deleteInsumo(id);
    cargarInsumos();
  };

  const handleSubmit = async form => {
    if (insumoEdit) {
      await updateInsumo(insumoEdit.id_insumo, form);
    } else {
      await createInsumo(form);
    }
    setMostrarFormulario(false);
    setInsumoEdit(null);
    cargarInsumos();
  };

  const handleCancel = () => {
    setMostrarFormulario(false);
    setInsumoEdit(null);
  };

  return (
    <div className="gestion-insumos">
      {mostrarFormulario ? (
        <FormularioInsumos insumo={insumoEdit} onSubmit={handleSubmit} onCancel={handleCancel} />
      ) : (
        <>
          <button onClick={() => setMostrarFormulario(true)}>Agregar Insumo</button>
          <ListaInsumos insumos={insumos} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
};

export default GestionInsumos;
