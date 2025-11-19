import { useState } from 'react';
import './Login.css';
import { loginUsuario } from './api';

function Login({ onLoginSuccess }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      // Llamar al API de login
      const response = await loginUsuario(usuario, contrasena);
      
      if (response.success) {
        // Login exitoso
        const userData = {
          idUsuario: response.data.idUsuario,
          usuario: response.data.alias,
          nombre: response.data.nombre,
          perfil: response.data.rolNombre || 'Usuario',
          idRol: response.data.idRol,
          idNegocio: response.data.idNegocio,
          negocio: response.data.negocioNombre,
          timestamp: new Date().toISOString()
        };
        onLoginSuccess(userData);
      } else {
        setError('Error en el inicio de sesión');
        setCargando(false);
      }
    } catch (err) {
      console.error('Error en login:', err);
      setError(err.message || 'Usuario o contraseña incorrectos');
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src="/Octocat.png" className="login-logo" alt="logo" />
          <h2>Iniciar Sesión</h2>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingrese su usuario"
              required
              disabled={cargando}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
              disabled={cargando}
              autoComplete="current-password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="login-button"
            disabled={cargando}
          >
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <div className="login-footer">
          <p className="hint-text">💡 Usuario: crumen | Contraseña: Crum3n.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
