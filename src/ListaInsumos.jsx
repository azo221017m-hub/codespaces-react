// Componente ListaInsumos - muestra registros como cards modernas
import React from 'react';
import './ListaInsumos.css';

const ListaInsumos = ({ insumos, onEdit, onDelete }) => (
  <div className="lista-insumos">
    <h2>Insumos</h2>
    <div className="cards-container">
      {insumos.map(insumo => (
        <div className="card-insumo" key={insumo.id_insumo}>
          <div className="card-header">
            <span className="card-nombre">{insumo.nombre}</span>
            <span className="card-unidad">{insumo.unidad_medida}</span>
          </div>
          <div className="card-body">
            <span>Stock actual: {insumo.stock_actual}</span>
            <span>Stock mínimo: {insumo.stock_minimo}</span>
            <span>Costo promedio: {insumo.costo_promedio_ponderado}</span>
            <span>Precio venta: {insumo.precio_venta}</span>
            <span>Inventariable: {insumo.inventariable ? 'Sí' : 'No'}</span>
            <span>Activo: {insumo.activo ? 'Sí' : 'No'}</span>
          </div>
          <div className="card-footer">
            <span>Negocio: {insumo.idnegocio}</span>
            <span>Usuario: {insumo.usuarioauditoria}</span>
            <span>Registro: {insumo.fechaRegistroauditoria}</span>
            <span>Modificación: {insumo.fehamodificacionauditoria}</span>
          </div>
          <div className="card-actions">
            <button onClick={() => onEdit(insumo)}>Editar</button>
            <button onClick={() => onDelete(insumo.id_insumo)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ListaInsumos;
