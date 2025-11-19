// Componente ListaCuentaContable - muestra registros como cards
import React from 'react';
import './ListaCuentaContable.css';

const ListaCuentaContable = ({ cuentas, onEdit, onDelete }) => (
  <div className="lista-cuenta-contable">
    <h2>Cuentas Contables</h2>
    <div className="cards-container">
      {cuentas.map(cuenta => (
        <div className="card-cuenta" key={cuenta.id_cuentacontable}>
          <div className="card-header">
            <span className="card-naturaleza">{cuenta.naturalezacuentacontable}</span>
            <span className="card-tipo">{cuenta.tipocuentacontable}</span>
          </div>
          <h3 className="card-nombre">{cuenta.nombrecuentacontable}</h3>
          <div className="card-footer">
            <span>Negocio: {cuenta.idnegocio}</span>
            <span>Usuario: {cuenta.usuarioauditoria}</span>
            <span>Registro: {cuenta.fechaRegistroauditoria}</span>
            <span>Modificación: {cuenta.fechamodificacionauditoria}</span>
          </div>
          <div className="card-actions">
            <button onClick={() => onEdit(cuenta)}>Editar</button>
            <button onClick={() => onDelete(cuenta.id_cuentacontable)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ListaCuentaContable;
