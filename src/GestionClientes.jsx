// Componente GestionClientes
// Diseño igual a GestionUsuarios
import React, { useState, useEffect } from 'react';
import ListaClientes from './ListaClientes';
import FormularioClientes from './FormularioClientes';
import { getClientes, createCliente, updateCliente, deleteCliente } from './api';
import './GestionClientes.css';

const GestionClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteEdit, setClienteEdit] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    const data = await getClientes();
    setClientes(data);
  };

  const handleEdit = cliente => {
    setClienteEdit(cliente);
    setMostrarFormulario(true);
  };

  const handleDelete = async idCliente => {
    await deleteCliente(idCliente);
    cargarClientes();
  };

  const handleSubmit = async form => {
    if (clienteEdit) {
      await updateCliente(clienteEdit.idCliente, form);
    } else {
      await createCliente(form);
    }
    setMostrarFormulario(false);
    setClienteEdit(null);
    cargarClientes();
  };

  const handleCancel = () => {
    setMostrarFormulario(false);
    setClienteEdit(null);
  };

  return (
    <div className="gestion-clientes">
      {mostrarFormulario ? (
        <FormularioClientes cliente={clienteEdit} onSubmit={handleSubmit} onCancel={handleCancel} />
      ) : (
        <>
          <button onClick={() => setMostrarFormulario(true)}>Agregar Cliente</button>
          <ListaClientes clientes={clientes} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
};

export default GestionClientes;
