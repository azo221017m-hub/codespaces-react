// Componente ListaSubReceta - muestra registros como cards modernas
import React from 'react';
import './ListaSubReceta.css';

const ListaSubReceta = ({ subrecetas, onEdit, onDelete }) => (
  <div className="lista-subreceta">
    <h2>SubRecetas</h2>
    <div className="cards-container">
      {subrecetas.map(subr => (
        <div className="card-subreceta" key={subr.idSubReceta}>
          <div className="card-header">
            <span className="card-nombre">{subr.nombreSubReceta}</span>
            <span className="card-costo">Costo: {subr.costoSubReceta}</span>
          </div>
          <div className="card-body">
            <span>Estatus: {subr.estatusSubr ? 'Activo' : 'Inactivo'}</span>
            <span>Archivo: {subr.archivoInstruccionesSubr}</span>
            <span>Instrucciones: {subr.instruccionesSubr ? 'Ver archivo' : 'Sin archivo'}</span>
          </div>
          <div className="card-footer">
            <span>Negocio: {subr.idnegocio}</span>
            <span>Usuario: {subr.usuarioauditoria}</span>
            <span>Registro: {subr.fechaRegistroauditoria}</span>
            <span>Modificación: {subr.fehamodificacionauditoria}</span>
          </div>
          <div className="card-actions">
            <button onClick={() => onEdit(subr)}>Editar</button>
            <button onClick={() => onDelete(subr.idSubReceta)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ListaSubReceta;
