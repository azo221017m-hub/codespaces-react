// Componente FormularioMesas
import React, { useState } from 'react';
import './FormularioMesas.css';

const estatusMesa = ['DISPONIBLE','OCUPADA','RESERVADA'];
const estatusTiempo = ['EN_CURSO','DEMORA','INACTIVA'];

const FormularioMesas = ({ mesa, onSubmit, onCancel }) => {
  const [form, setForm] = useState(mesa || {
    nombremesa: '',
    numeromesa: '',
    cantcomensales: '',
    estatusmesa: '',
    tiempodeinicio: '',
    tiempoactual: '',
    estatustiempo: '',
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
    <form className="formulario-mesas" onSubmit={handleSubmit}>
      <h2>{mesa ? 'Editar Mesa' : 'Agregar Mesa'}</h2>
      <input name="nombremesa" value={form.nombremesa} onChange={handleChange} placeholder="Nombre" required />
      <input name="numeromesa" type="number" value={form.numeromesa} onChange={handleChange} placeholder="Número de Mesa" required />
      <input name="cantcomensales" type="number" value={form.cantcomensales} onChange={handleChange} placeholder="Cantidad de Comensales" required />
      <select name="estatusmesa" value={form.estatusmesa} onChange={handleChange} required>
        <option value="">Estatus Mesa</option>
        {estatusMesa.map(e => <option key={e} value={e}>{e}</option>)}
      </select>
      <input name="tiempodeinicio" type="datetime-local" value={form.tiempodeinicio} onChange={handleChange} />
      <input name="tiempoactual" type="datetime-local" value={form.tiempoactual} onChange={handleChange} />
      <select name="estatustiempo" value={form.estatustiempo} onChange={handleChange} required>
        <option value="">Estatus Tiempo</option>
        {estatusTiempo.map(e => <option key={e} value={e}>{e}</option>)}
      </select>
      <input name="idnegocio" value={form.idnegocio} onChange={handleChange} placeholder="ID Negocio" />
      <input name="usuarioauditoria" value={form.usuarioauditoria} onChange={handleChange} placeholder="Usuario Auditoría" />
      <div className="acciones-formulario">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default FormularioMesas;
