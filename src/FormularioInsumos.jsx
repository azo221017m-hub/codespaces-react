// Componente FormularioInsumos
import React, { useState } from 'react';
import './FormularioInsumos.css';

const FormularioInsumos = ({ insumo, onSubmit, onCancel }) => {
  const [form, setForm] = useState(insumo || {
    nombre: '',
    unidad_medida: '',
    stock_actual: '',
    stock_minimo: '',
    costo_promedio_ponderado: '',
    precio_venta: '',
    idinocuidad: '',
    id_cuentacontable: '',
    activo: 1,
    inventariable: 1,
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
    <form className="formulario-insumos" onSubmit={handleSubmit}>
      <h2>{insumo ? 'Editar Insumo' : 'Agregar Insumo'}</h2>
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
      <input name="unidad_medida" value={form.unidad_medida} onChange={handleChange} placeholder="Unidad de Medida" required />
      <input name="stock_actual" type="number" step="0.01" value={form.stock_actual} onChange={handleChange} placeholder="Stock Actual" required />
      <input name="stock_minimo" type="number" step="0.01" value={form.stock_minimo} onChange={handleChange} placeholder="Stock Mínimo" required />
      <input name="costo_promedio_ponderado" type="number" step="0.0001" value={form.costo_promedio_ponderado} onChange={handleChange} placeholder="Costo Promedio" required />
      <input name="precio_venta" type="number" step="0.01" value={form.precio_venta} onChange={handleChange} placeholder="Precio Venta" required />
      <input name="idinocuidad" value={form.idinocuidad} onChange={handleChange} placeholder="ID Inocuidad" />
      <input name="id_cuentacontable" value={form.id_cuentacontable} onChange={handleChange} placeholder="ID Cuenta Contable" />
      <label>
        <input name="activo" type="checkbox" checked={form.activo === 1} onChange={handleChange} /> Activo
      </label>
      <label>
        <input name="inventariable" type="checkbox" checked={form.inventariable === 1} onChange={handleChange} /> Inventariable
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

export default FormularioInsumos;
