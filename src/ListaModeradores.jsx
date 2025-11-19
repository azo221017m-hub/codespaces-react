import React from 'react';
import './ListaModeradores.css';

const ListaModeradores = ({ moderadores, onEdit, onDelete }) => (
  <div className="lista-moderadores">
    <h2>Moderadores</h2>
    <div className="cards-container">
      {moderadores.map((mod) => (
        <div className="card-moderador" key={mod.idmoderador}>
          <div className="card-header">
            <span className="card-nombre">{mod.nombremoderador}</span>
            <span className="card-estatus">{mod.estatus ? 'Activo' : 'Inactivo'}</span>
          </div>
          <div className="card-body">
            <span><b>ID Negocio:</b> {mod.idnegocio}</span>
            <span><b>Usuario auditoría:</b> {mod.usuarioauditoria}</span>
            <span><b>Fecha registro:</b> {mod.fechaRegistroauditoria}</span>
            <span><b>Fecha modificación:</b> {mod.fehamodificacionauditoria}</span>
          </div>
          <div className="card-actions">
            <button onClick={() => onEdit(mod)}>Editar</button>
            <button onClick={() => onDelete(mod.idmoderador)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ListaModeradores;
