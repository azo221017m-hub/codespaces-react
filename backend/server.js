import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { testConnection } from './config/database.js';

// Importar rutas
import negociosRoutes from './routes/negocios.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import rolesRoutes from './routes/roles.routes.js';
import unidadesMedidaRoutes from './routes/unidadesMedida.routes.js';

// Configuración
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: function(origin, callback) {
    // Permitir requests sin origin (como mobile apps o curl)
    if (!origin) return callback(null, true);
    
    // Permitir localhost y GitHub Codespaces
    const allowedOrigins = [
      'http://localhost:3000',
      /https:\/\/.*\.app\.github\.dev$/
    ];
    
    const isAllowed = allowedOrigins.some(pattern => 
      pattern instanceof RegExp ? pattern.test(origin) : pattern === origin
    );
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: '🚀 API Crumen funcionando correctamente',
    version: '1.0.0',
    database: 'MySQL Azure',
    timestamp: new Date().toISOString()
  });
});

// Ruta de salud del servidor
app.get('/health', async (req, res) => {
  const dbConnected = await testConnection();
  res.json({
    status: 'OK',
    database: dbConnected ? 'Conectada' : 'Desconectada',
    timestamp: new Date().toISOString()
  });
});

// Rutas de la API
app.use('/api/negocios', negociosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/unidades-medida', unidadesMedidaRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.path
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Iniciar servidor
const startServer = async () => {
  try {
    // Probar conexión a la base de datos
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.warn('⚠️ Servidor iniciado sin conexión a la base de datos');
    }

    app.listen(PORT, () => {
      console.log('='.repeat(50));
      console.log('🚀 Servidor iniciado correctamente');
      console.log(`📡 Puerto: ${PORT}`);
      console.log(`🌍 URL: http://localhost:${PORT}`);
      console.log(`🔧 Entorno: ${process.env.NODE_ENV || 'development'}`);
      console.log('='.repeat(50));
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();

export default app;
