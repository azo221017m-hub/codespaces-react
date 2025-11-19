// Componente FormularioCuentaContable
import React, { useState } from 'react';
import './FormularioCuentaContable.css';

const naturalezas = ['COMPRA','GASTO'];

const FormularioCuentaContable = ({ cuenta, onSubmit, onCancel }) => {
  const [form, setForm] = useState(cuenta || {
    naturalezacuentacontable: '',
    nombrecuentacontable: '',
    tipocuentacontable: '',
    idnegocio: '',
    usuarioauditoria: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="formulario-cuenta-contable" onSubmit={handleSubmit}>
      <h2>{cuenta ? 'Editar Cuenta Contable' : 'Agregar Cuenta Contable'}</h2>
      <select name="naturalezacuentacontable" value={form.naturalezacuentacontable} onChange={handleChange} required>
        <option value="">Naturaleza</option>
        {naturalezas.map(nat => <option key={nat} value={nat}>{nat}</option>)}
      </select>
      <input name="nombrecuentacontable" value={form.nombrecuentacontable} onChange={handleChange} placeholder="Nombre" required />
      <input name="tipocuentacontable" value={form.tipocuentacontable} onChange={handleChange} placeholder="Tipo" />
      <input name="idnegocio" value={form.idnegocio} onChange={handleChange} placeholder="ID Negocio" />
      <input name="usuarioauditoria" value={form.usuarioauditoria} onChange={handleChange} placeholder="Usuario Auditoría" />
      <div className="acciones-formulario">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default FormularioCuentaContable;
