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
import categoriasRoutes from './routes/categorias.routes.js';
import clientesRoutes from './routes/clientes.routes.js'; // Nueva ruta para clientes
import cuentacontableRoutes from './routes/cuentacontable.routes.js'; // Nueva ruta para cuentas contables
import descuentosRoutes from './routes/descuentos.routes.js'; // Nueva ruta para descuentos
import insumosRoutes from './routes/insumos.routes.js'; // Nueva ruta para insumos
import mesasRoutes from './routes/mesas.routes.js'; // Nueva ruta para mesas
import detallesubrecetasRoutes from './routes/detallesubrecetas.routes.js'; // Nueva ruta para detalles subrecetas

// Configuración
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de CORS simplificada
const corsOptions = {
  origin: '*', // Permitir todos los orígenes temporalmente para depuración
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middlewares
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Manejar preflight requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${req.headers.origin || 'No origin'}`);
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
app.use('/api/categorias', categoriasRoutes);
app.use('/api/clientes', clientesRoutes); // Registrar la ruta de clientes
app.use('/api/cuentas-contables', cuentacontableRoutes); // Registrar la ruta de cuentas contables
app.use('/api/descuentos', descuentosRoutes); // Registrar la ruta de descuentos
app.use('/api/insumos', insumosRoutes); // Registrar la ruta de insumos
app.use('/api/mesas', mesasRoutes); // Registrar la ruta de mesas
app.use('/api/detallesubrecetas', detallesubrecetasRoutes); // Registrar la ruta de detalles subrecetas

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
