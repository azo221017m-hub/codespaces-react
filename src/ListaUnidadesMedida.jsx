import './ListaUnidadesMedida.css';

function ListaUnidadesMedida({ unidades, onEditar, onEliminar }) {
  if (unidades.length === 0) {
    return (
      <div className="lista-vacia">
        <span className="icono-vacio">📏</span>
        <p>No hay unidades de medida registradas</p>
        <p className="texto-secundario">Comienza agregando una nueva unidad de medida</p>
      </div>
    );
  }

  return (
    <div className="lista-unidades-medida">
      <div className="tabla-container">
        <table className="tabla-unidades">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Valor</th>
              <th>Unidad Mat. Prima</th>
              <th>Valor Convertido</th>
              <th>Negocio</th>
              <th>Fecha Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {unidades.map((unidad) => (
              <tr key={unidad.idUmCompra}>
                <td>
                  <div className="celda-nombre">
                    <span className="icono-unidad">📏</span>
                    <strong>{unidad.nombreUmCompra}</strong>
                  </div>
                </td>
                <td>
                  <span className="badge-valor">
                    {parseFloat(unidad.valor || 0).toFixed(3)}
                  </span>
                </td>
                <td>
                  <span className="texto-materia-prima">
                    {unidad.umMatPrima || '-'}
                  </span>
                </td>
                <td>
                  <span className="badge-convertido">
                    {parseFloat(unidad.valorConvertido || 0).toFixed(3)}
                  </span>
                </td>
                <td>
                  <span className="texto-negocio">
                    {unidad.negocioNombre || `ID: ${unidad.idnegocio}`}
                  </span>
                </td>
                <td className="texto-fecha">
                  {new Date(unidad.fechaRegistroauditoria).toLocaleDateString('es-MX', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </td>
                <td>
                  <div className="acciones">
                    <button
                      className="btn-accion btn-editar"
                      onClick={() => onEditar(unidad)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-accion btn-eliminar"
                      onClick={() => onEliminar(unidad.idUmCompra)}
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaUnidadesMedida;
