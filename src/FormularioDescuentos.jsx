// Componente FormularioDescuentos
import React, { useState } from 'react';
import './FormularioDescuentos.css';

const tipos = ['Porcentaje','Monto fijo','Promoción'];
const autorizaciones = ['SI','NO'];

const FormularioDescuentos = ({ descuento, onSubmit, onCancel }) => {
  const [form, setForm] = useState(descuento || {
    nombre: '',
    tipodescuento: '',
    valor: '',
    estatusdescuento: '',
    requiereautorizacion: '',
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
    <form className="formulario-descuentos" onSubmit={handleSubmit}>
      <h2>{descuento ? 'Editar Descuento' : 'Agregar Descuento'}</h2>
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
      <select name="tipodescuento" value={form.tipodescuento} onChange={handleChange} required>
        <option value="">Tipo de Descuento</option>
        {tipos.map(tipo => <option key={tipo} value={tipo}>{tipo}</option>)}
      </select>
      <input name="valor" type="number" step="0.01" value={form.valor} onChange={handleChange} placeholder="Valor" required />
      <input name="estatusdescuento" value={form.estatusdescuento} onChange={handleChange} placeholder="Estatus" />
      <select name="requiereautorizacion" value={form.requiereautorizacion} onChange={handleChange} required>
        <option value="">¿Requiere Autorización?</option>
        {autorizaciones.map(a => <option key={a} value={a}>{a}</option>)}
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

export default FormularioDescuentos;
