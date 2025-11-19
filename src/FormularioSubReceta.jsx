// Componente FormularioSubReceta
import React, { useState } from 'react';
import './FormularioSubReceta.css';

const FormularioSubReceta = ({ subreceta, onSubmit, onCancel }) => {
  const [form, setForm] = useState(subreceta || {
    nombreSubReceta: '',
    instruccionesSubr: '',
    archivoInstruccionesSubr: '',
    costoSubReceta: '',
    estatusSubr: 1,
    idnegocio: '',
    usuarioauditoria: '',
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked ? 1 : 0 : value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="formulario-subreceta" onSubmit={handleSubmit}>
      <h2>{subreceta ? 'Editar SubReceta' : 'Agregar SubReceta'}</h2>
      <input name="nombreSubReceta" value={form.nombreSubReceta} onChange={handleChange} placeholder="Nombre" required />
      <input name="archivoInstruccionesSubr" value={form.archivoInstruccionesSubr} onChange={handleChange} placeholder="Archivo de Instrucciones" />
      <textarea name="instruccionesSubr" value={form.instruccionesSubr} onChange={handleChange} placeholder="Instrucciones" />
      <input name="costoSubReceta" type="number" step="0.01" value={form.costoSubReceta} onChange={handleChange} placeholder="Costo" required />
      <label>
        <input name="estatusSubr" type="checkbox" checked={form.estatusSubr === 1} onChange={handleChange} /> Activo
      </label>
      <input name="idnegocio" value={form.idnegocio} onChange={handleChange} placeholder="ID Negocio" />
      <input name="usuarioauditoria" value={form.usuarioauditoria} onChange={handleChange} placeholder="Usuario Auditoría" />
      <div className="acciones-formulario">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default FormularioSubReceta;
