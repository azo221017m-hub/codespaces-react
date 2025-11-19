// Componente FormularioClientes
// Diseño igual a FormularioUsuarios
import React, { useState } from 'react';
import './FormularioClientes.css';

const categorias = ['NUEVO','RECURRENTE','FRECUENTE','VIP','INACTIVO'];
const estatusSeguimiento = ['NINGUNO','EN_PROSPECCIÓN','EN_NEGOCIACIÓN','CERRADO','PERDIDO'];
const mediosContacto = ['WHATSAPP','LLAMADA','EMAIL','OTRO'];

const FormularioClientes = ({ cliente, onSubmit, onCancel }) => {
  const [form, setForm] = useState(cliente || {
    nombre: '', referencia: '', cumple: '', categoriacliente: '', satisfaccion: 0,
    comentarios: '', puntosfidelidad: 0, estatus_seguimiento: '', responsable_seguimiento: '',
    medio_contacto: '', observacionesseguimiento: '', fechaultimoseguimiento: '', telefono: '',
    email: '', direccion: '', estatus: 1
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
    <form className="formulario-clientes" onSubmit={handleSubmit}>
      <h2>{cliente ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
      <input name="referencia" value={form.referencia} onChange={handleChange} placeholder="Referencia" />
      <input name="cumple" type="date" value={form.cumple} onChange={handleChange} />
      <select name="categoriacliente" value={form.categoriacliente} onChange={handleChange} required>
        <option value="">Categoría</option>
        {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      <input name="satisfaccion" type="number" min="0" max="10" value={form.satisfaccion} onChange={handleChange} />
      <textarea name="comentarios" value={form.comentarios} onChange={handleChange} placeholder="Comentarios" />
      <input name="puntosfidelidad" type="number" value={form.puntosfidelidad} onChange={handleChange} />
      <select name="estatus_seguimiento" value={form.estatus_seguimiento} onChange={handleChange}>
        <option value="">Estatus Seguimiento</option>
        {estatusSeguimiento.map(est => <option key={est} value={est}>{est}</option>)}
      </select>
      <input name="responsable_seguimiento" value={form.responsable_seguimiento} onChange={handleChange} placeholder="Responsable" />
      <select name="medio_contacto" value={form.medio_contacto} onChange={handleChange}>
        <option value="">Medio de Contacto</option>
        {mediosContacto.map(med => <option key={med} value={med}>{med}</option>)}
      </select>
      <textarea name="observacionesseguimiento" value={form.observacionesseguimiento} onChange={handleChange} placeholder="Observaciones" />
      <input name="fechaultimoseguimiento" type="date" value={form.fechaultimoseguimiento} onChange={handleChange} />
      <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <textarea name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" />
      <input name="estatus" type="number" min="0" max="1" value={form.estatus} onChange={handleChange} />
      <div className="acciones-formulario">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default FormularioClientes;
