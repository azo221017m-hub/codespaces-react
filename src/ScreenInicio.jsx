import { useState, useEffect } from 'react';
import './ScreenInicio.css';

function ScreenInicio() {
  const frases = [
    'Bienvenido a nuestra aplicación',
    'Descubre nuevas posibilidades',
    'La innovación comienza aquí',
    'Creando experiencias únicas',
    'Tu viaje digital empieza ahora'
  ];

  const [fraseActual, setFraseActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFraseActual((prev) => (prev + 1) % frases.length);
    }, 2500); // Cambia cada 2.5 segundos

    return () => clearInterval(intervalo);
  }, [frases.length]);

  return (
    <div className="screen-inicio">
      <div className="contenedor-logo">
        <img src="/Octocat.png" className="logo-inicio" alt="logo" />
      </div>
      <div className="contenedor-texto">
        <p className="texto-animado">{frases[fraseActual]}</p>
      </div>
    </div>
  );
}

export default ScreenInicio;
