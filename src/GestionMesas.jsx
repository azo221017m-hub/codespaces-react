// Componente GestionMesas
import React, { useState, useEffect } from 'react';
import ListaMesas from './ListaMesas';
import FormularioMesas from './FormularioMesas';
import { getMesas, createMesa, updateMesa, deleteMesa } from './api';
import './GestionMesas.css';

const GestionMesas = () => {
  const [mesas, setMesas] = useState([]);
  const [mesaEdit, setMesaEdit] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    cargarMesas();
  }, []);

  const cargarMesas = async () => {
    const data = await getMesas();
    setMesas(data);
  };

  const handleEdit = mesa => {
    setMesaEdit(mesa);
    setMostrarFormulario(true);
  };

  const handleDelete = async id => {
    await deleteMesa(id);
    cargarMesas();
  };

  const handleSubmit = async form => {
    if (mesaEdit) {
      await updateMesa(mesaEdit.idmesa, form);
    } else {
      await createMesa(form);
    }
    setMostrarFormulario(false);
    setMesaEdit(null);
    cargarMesas();
  };

  const handleCancel = () => {
    setMostrarFormulario(false);
    setMesaEdit(null);
  };

  return (
    <div className="gestion-mesas">
      {mostrarFormulario ? (
        <FormularioMesas mesa={mesaEdit} onSubmit={handleSubmit} onCancel={handleCancel} />
      ) : (
        <>
          <button onClick={() => setMostrarFormulario(true)}>Agregar Mesa</button>
          <ListaMesas mesas={mesas} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
};

export default GestionMesas;
