// Componente ListaMesas - muestra registros como cards modernas
import React from 'react';
import './ListaMesas.css';

const ListaMesas = ({ mesas, onEdit, onDelete }) => (
  <div className="lista-mesas">
    <h2>Mesas</h2>
    <div className="cards-container">
      {mesas.map(mesa => (
        <div className="card-mesa" key={mesa.idmesa}>
          <div className="card-header">
            <span className="card-nombre">{mesa.nombremesa}</span>
            <span className="card-numero">Mesa #{mesa.numeromesa}</span>
          </div>
          <div className="card-body">
            <span>Comensales: {mesa.cantcomensales}</span>
            <span>Estatus: {mesa.estatusmesa}</span>
            <span>Tiempo inicio: {mesa.tiempodeinicio}</span>
            <span>Tiempo actual: {mesa.tiempoactual}</span>
            <span>Estatus tiempo: {mesa.estatustiempo}</span>
          </div>
          <div className="card-footer">
            <span>Negocio: {mesa.idnegocio}</span>
            <span>Usuario: {mesa.usuarioauditoria}</span>
            <span>Registro: {mesa.fechaRegistroauditoria}</span>
            <span>Modificación: {mesa.fehamodificacionauditoria}</span>
          </div>
          <div className="card-actions">
            <button onClick={() => onEdit(mesa)}>Editar</button>
            <button onClick={() => onDelete(mesa.idmesa)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ListaMesas;
