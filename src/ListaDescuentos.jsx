// Componente ListaDescuentos - muestra registros como cards
import React from 'react';
import './ListaDescuentos.css';

const ListaDescuentos = ({ descuentos, onEdit, onDelete }) => (
  <div className="lista-descuentos">
    <h2>Descuentos</h2>
    <div className="cards-container">
      {descuentos.map(descuento => (
        <div className="card-descuento" key={descuento.id_descuento}>
          <div className="card-header">
            <span className="card-tipo">{descuento.tipodescuento}</span>
            <span className="card-valor">{descuento.valor}</span>
          </div>
          <h3 className="card-nombre">{descuento.nombre}</h3>
          <div className="card-footer">
            <span>Estatus: {descuento.estatusdescuento}</span>
            <span>Autorización: {descuento.requiereautorizacion}</span>
            <span>Negocio: {descuento.idnegocio}</span>
            <span>Usuario: {descuento.usuarioauditoria}</span>
            <span>Registro: {descuento.fechaRegistroauditoria}</span>
            <span>Modificación: {descuento.fehamodificacionauditoria}</span>
          </div>
          <div className="card-actions">
            <button onClick={() => onEdit(descuento)}>Editar</button>
            <button onClick={() => onDelete(descuento.id_descuento)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ListaDescuentos;
