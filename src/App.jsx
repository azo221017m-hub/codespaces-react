import { useState, useEffect } from 'react';
import './App.css';
import ScreenInicio from './ScreenInicio';
import Login from './Login';
import TableroInicial from './TableroInicial';

function App() {
  const [mostrarInicio, setMostrarInicio] = useState(true);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Mostrar pantalla de inicio por 5 segundos
    const timer = setTimeout(() => {
      setMostrarInicio(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUsuario(userData);
  };

  const handleLogout = () => {
    setUsuario(null);
  };

  if (mostrarInicio) {
    return <ScreenInicio />;
  }

  if (!usuario) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return <TableroInicial usuario={usuario} onLogout={handleLogout} />;
}

export default App;
