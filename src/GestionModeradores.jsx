import React, { useState, useEffect } from 'react';
import ListaModeradores from './ListaModeradores';
import FormularioModeradores from './FormularioModeradores';
import { getModeradores, createModerador, updateModerador, deleteModerador } from './api';
import './GestionModeradores.css';

const GestionModeradores = () => {
  const [moderadores, setModeradores] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchModeradores = async () => {
    const data = await getModeradores();
    setModeradores(data);
  };

  useEffect(() => {
    fetchModeradores();
  }, []);

  const handleEdit = (mod) => {
    setEditing(mod);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteModerador(id);
    fetchModeradores();
  };

  const handleSubmit = async (form) => {
    if (editing) {
      await updateModerador(editing.idmoderador, form);
    } else {
      await createModerador(form);
    }
    setShowForm(false);
    setEditing(null);
    fetchModeradores();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="gestion-moderadores">
      <button onClick={() => setShowForm(true)}>Nuevo Moderador</button>
      {showForm && (
        <FormularioModeradores
          onSubmit={handleSubmit}
          initialData={editing}
          onCancel={handleCancel}
        />
      )}
      <ListaModeradores
        moderadores={moderadores}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default GestionModeradores;
