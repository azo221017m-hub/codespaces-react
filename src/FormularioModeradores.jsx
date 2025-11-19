import React, { useState, useEffect } from 'react';
import './FormularioModeradores.css';

const FormularioModeradores = ({ onSubmit, initialData, onCancel }) => {
  const [form, setForm] = useState({
    nombremoderador: '',
    usuarioauditoria: '',
    idnegocio: '',
    estatus: 1,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nombremoderador: initialData.nombremoderador || '',
        usuarioauditoria: initialData.usuarioauditoria || '',
        idnegocio: initialData.idnegocio || '',
        estatus: initialData.estatus || 1,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="formulario-moderadores" onSubmit={handleSubmit}>
      <h2>{initialData ? 'Editar Moderador' : 'Nuevo Moderador'}</h2>
      <input
        type="text"
        name="nombremoderador"
        placeholder="Nombre del moderador"
        value={form.nombremoderador}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="usuarioauditoria"
        placeholder="Usuario auditoría"
        value={form.usuarioauditoria}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="idnegocio"
        placeholder="ID Negocio"
        value={form.idnegocio}
        onChange={handleChange}
        required
      />
      <select name="estatus" value={form.estatus} onChange={handleChange}>
        <option value={1}>Activo</option>
        <option value={0}>Inactivo</option>
      </select>
      <div className="acciones-formulario">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default FormularioModeradores;
