import { useState } from 'react';
import './TableroInicial.css';
import GestionNegocios from './GestionNegocios';
import GestionUsuarios from './GestionUsuarios';
import GestionRoles from './GestionRoles';
import GestionUnidadesMedida from './GestionUnidadesMedida';

function TableroInicial({ usuario, onLogout }) {
  const [menuAbierto, setMenuAbierto] = useState({
    configuracionNegocio: false
  });

  const [seccionActiva, setSeccionActiva] = useState('dashboard');

  const toggleSubmenu = (menu) => {
    setMenuAbierto(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const cambiarSeccion = (seccion) => {
    setSeccionActiva(seccion);
  };

  // Datos de ejemplo para los indicadores
  const indicadores = [
    { titulo: 'Ventas del Día', valor: '$12,450', cambio: '+15%', tipo: 'positivo' },
    { titulo: 'Gastos', valor: '$3,280', cambio: '-5%', tipo: 'negativo' },
    { titulo: 'Top Productos', valor: '23', cambio: '+8%', tipo: 'positivo' }
  ];

  // Datos de ejemplo para pedidos online
  const pedidosOnline = [
    { id: 1, cliente: 'Juan Pérez', total: '$85.50', estado: 'Pendiente', hora: '10:30 AM' },
    { id: 2, cliente: 'María García', total: '$120.00', estado: 'En Proceso', hora: '11:15 AM' },
    { id: 3, cliente: 'Carlos López', total: '$65.00', estado: 'Pendiente', hora: '11:45 AM' },
    { id: 4, cliente: 'Ana Martínez', total: '$95.75', estado: 'Completado', hora: '12:00 PM' }
  ];

  return (
    <div className="tablero-container">
      {/* Encabezado */}
      <header className="tablero-header">
        <div className="header-left">
          <img src="/Octocat.png" className="logo-negocio" alt="Logo" />
          <div className="info-negocio">
            <h1 className="nombre-negocio">Mi Negocio</h1>
            <p className="subtitulo-negocio">Sistema de Gestión</p>
          </div>
        </div>
        
        <div className="header-right">
          <div className="usuario-info" onClick={onLogout}>
            <div className="usuario-avatar">
              <span className="usuario-inicial">{usuario.usuario.charAt(0).toUpperCase()}</span>
            </div>
            <div className="usuario-detalles">
              <span className="usuario-nombre">{usuario.usuario}</span>
              <span className="usuario-perfil">{usuario.perfil}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="tablero-contenido">
        {/* Menú de Navegación Lateral */}
        <aside className="menu-navegacion">
          <nav>
            <div className="menu-item">
              <button 
                className={`menu-principal ${menuAbierto.configuracionNegocio ? 'activo' : ''}`}
                onClick={() => toggleSubmenu('configuracionNegocio')}
              >
                <span className="menu-icono">⚙️</span>
                <span>CONFIGURACIÓN NEGOCIO</span>
                <span className="menu-flecha">{menuAbierto.configuracionNegocio ? '▼' : '▶'}</span>
              </button>
              
              {menuAbierto.configuracionNegocio && (
                <ul className="submenu">
                  <li>
                    <button 
                      className={seccionActiva === 'negocios' ? 'activo' : ''}
                      onClick={() => cambiarSeccion('negocios')}
                    >
                      🏢 Negocios
                    </button>
                  </li>
                  <li>
                    <button 
                      className={seccionActiva === 'usuarios' ? 'activo' : ''}
                      onClick={() => cambiarSeccion('usuarios')}
                    >
                      👥 Usuarios
                    </button>
                  </li>
                  <li>
                    <button 
                      className={seccionActiva === 'roles' ? 'activo' : ''}
                      onClick={() => cambiarSeccion('roles')}
                    >
                      🔐 Roles de Usuario
                    </button>
                  </li>
                  <li>
                    <button 
                      className={seccionActiva === 'unidades' ? 'activo' : ''}
                      onClick={() => cambiarSeccion('unidades')}
                    >
                      📏 Unidad de Medida
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </aside>

        {/* Área Central con Indicadores */}
        <main className="area-central">
          <div className="indicadores-container">
            <h2 className="seccion-titulo">Indicadores Principales</h2>
            <div className="indicadores-grid">
              {indicadores.map((indicador, index) => (
                <div key={index} className="indicador-card">
                  <h3 className="indicador-titulo">{indicador.titulo}</h3>
                  <p className="indicador-valor">{indicador.valor}</p>
                  <span className={`indicador-cambio ${indicador.tipo}`}>
                    {indicador.cambio}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contenido dinámico según sección activa */}
          <div className="contenido-dinamico">
            {seccionActiva === 'dashboard' && (
              <div className="bienvenida">
                <h2>¡Bienvenido al Panel de Control!</h2>
                <p>Selecciona una opción del menú para comenzar</p>
              </div>
            )}
            {seccionActiva === 'negocios' && (
              <GestionNegocios usuario={usuario} />
            )}
            {seccionActiva === 'usuarios' && (
              <GestionUsuarios usuario={usuario} />
            )}
            {seccionActiva === 'roles' && (
              <GestionRoles usuario={usuario} />
            )}
            {seccionActiva === 'unidades' && (
              <div className="seccion-contenido">
                <h2>📏 Unidades de Medida</h2>
                <p>Define las unidades de medida para productos</p>
              </div>
            )}
          </div>
          {seccionActiva === 'unidades' && <GestionUnidadesMedida usuario={usuario} />}
        </main>

        {/* Panel lateral derecho - Pedidos Online */}
        <aside className="panel-derecho">
          <div className="pedidos-header">
            <h3>🛒 Pedidos Online</h3>
            <span className="pedidos-badge">{pedidosOnline.length}</span>
          </div>
          
          <div className="pedidos-lista">
            {pedidosOnline.map(pedido => (
              <div key={pedido.id} className="pedido-item">
                <div className="pedido-info">
                  <h4 className="pedido-cliente">{pedido.cliente}</h4>
                  <p className="pedido-hora">{pedido.hora}</p>
                </div>
                <div className="pedido-detalles">
                  <p className="pedido-total">{pedido.total}</p>
                  <span className={`pedido-estado ${pedido.estado.toLowerCase().replace(' ', '-')}`}>
                    {pedido.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default TableroInicial;
