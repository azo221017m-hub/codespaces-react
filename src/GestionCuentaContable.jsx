// Componente GestionCuentaContable
import React, { useState, useEffect } from 'react';
import ListaCuentaContable from './ListaCuentaContable';
import FormularioCuentaContable from './FormularioCuentaContable';
import { getCuentasContables, createCuentaContable, updateCuentaContable, deleteCuentaContable } from './api';
import './GestionCuentaContable.css';

const GestionCuentaContable = () => {
  const [cuentas, setCuentas] = useState([]);
  const [cuentaEdit, setCuentaEdit] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    cargarCuentas();
  }, []);

  const cargarCuentas = async () => {
    const data = await getCuentasContables();
    setCuentas(data);
  };

  const handleEdit = cuenta => {
    setCuentaEdit(cuenta);
    setMostrarFormulario(true);
  };

  const handleDelete = async id => {
    await deleteCuentaContable(id);
    cargarCuentas();
  };

  const handleSubmit = async form => {
    if (cuentaEdit) {
      await updateCuentaContable(cuentaEdit.id_cuentacontable, form);
    } else {
      await createCuentaContable(form);
    }
    setMostrarFormulario(false);
    setCuentaEdit(null);
    cargarCuentas();
  };

  const handleCancel = () => {
    setMostrarFormulario(false);
    setCuentaEdit(null);
  };

  return (
    <div className="gestion-cuenta-contable">
      {mostrarFormulario ? (
        <FormularioCuentaContable cuenta={cuentaEdit} onSubmit={handleSubmit} onCancel={handleCancel} />
      ) : (
        <>
          <button onClick={() => setMostrarFormulario(true)}>Agregar Cuenta Contable</button>
          <ListaCuentaContable cuentas={cuentas} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
};

export default GestionCuentaContable;
