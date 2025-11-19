// Componente ListaClientes
// Diseño igual a ListaUsuarios
import React from 'react';
import './ListaClientes.css';

const ListaClientes = ({ clientes, onEdit, onDelete }) => (
  <div className="lista-clientes">
    <h2>Lista de Clientes</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Referencia</th>
          <th>Cumpleaños</th>
          <th>Categoría</th>
          <th>Satisfacción</th>
          <th>Comentarios</th>
          <th>Puntos Fidelidad</th>
          <th>Estatus Seguimiento</th>
          <th>Responsable</th>
          <th>Medio Contacto</th>
          <th>Observaciones</th>
          <th>Último Seguimiento</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Dirección</th>
          <th>Estatus</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map(cliente => (
          <tr key={cliente.idCliente}>
            <td>{cliente.idCliente}</td>
            <td>{cliente.nombre}</td>
            <td>{cliente.referencia}</td>
            <td>{cliente.cumple}</td>
            <td>{cliente.categoriacliente}</td>
            <td>{cliente.satisfaccion}</td>
            <td>{cliente.comentarios}</td>
            <td>{cliente.puntosfidelidad}</td>
            <td>{cliente.estatus_seguimiento}</td>
            <td>{cliente.responsable_seguimiento}</td>
            <td>{cliente.medio_contacto}</td>
            <td>{cliente.observacionesseguimiento}</td>
            <td>{cliente.fechaultimoseguimiento}</td>
            <td>{cliente.telefono}</td>
            <td>{cliente.email}</td>
            <td>{cliente.direccion}</td>
            <td>{cliente.estatus}</td>
            <td>
              <button onClick={() => onEdit(cliente)}>Editar</button>
              <button onClick={() => onDelete(cliente.idCliente)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ListaClientes;
