// Componente GestionDescuentos
import React, { useState, useEffect } from 'react';
import ListaDescuentos from './ListaDescuentos';
import FormularioDescuentos from './FormularioDescuentos';
import { getDescuentos, createDescuento, updateDescuento, deleteDescuento } from './api';
import './GestionDescuentos.css';

const GestionDescuentos = () => {
  const [descuentos, setDescuentos] = useState([]);
  const [descuentoEdit, setDescuentoEdit] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    cargarDescuentos();
  }, []);

  const cargarDescuentos = async () => {
    const data = await getDescuentos();
    setDescuentos(data);
  };

  const handleEdit = descuento => {
    setDescuentoEdit(descuento);
    setMostrarFormulario(true);
  };

  const handleDelete = async id => {
    await deleteDescuento(id);
    cargarDescuentos();
  };

  const handleSubmit = async form => {
    if (descuentoEdit) {
      await updateDescuento(descuentoEdit.id_descuento, form);
    } else {
      await createDescuento(form);
    }
    setMostrarFormulario(false);
    setDescuentoEdit(null);
    cargarDescuentos();
  };

  const handleCancel = () => {
    setMostrarFormulario(false);
    setDescuentoEdit(null);
  };

  return (
    <div className="gestion-descuentos">
      {mostrarFormulario ? (
        <FormularioDescuentos descuento={descuentoEdit} onSubmit={handleSubmit} onCancel={handleCancel} />
      ) : (
        <>
          <button onClick={() => setMostrarFormulario(true)}>Agregar Descuento</button>
          <ListaDescuentos descuentos={descuentos} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
};

export default GestionDescuentos;
