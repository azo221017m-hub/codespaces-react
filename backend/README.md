# API Backend Crumen

Backend API REST para el sistema de gestión Crumen, conectado a MySQL en Azure.

## 🚀 Características

- **Express.js** - Framework web rápido y minimalista
- **MySQL2** - Cliente MySQL con soporte para promesas
- **Bcrypt** - Encriptación de contraseñas
- **CORS** - Habilitado para conexiones desde el frontend
- **Dotenv** - Gestión de variables de entorno
- **SSL** - Conexión segura a Azure MySQL

## 📋 Requisitos

- Node.js 14+ 
- MySQL 5.7+ (Azure MySQL)
- npm o yarn

## 🔧 Instalación

```bash
# Navegar al directorio del backend
cd backend

# Instalar dependencias
npm install
```

## ⚙️ Configuración

El archivo `.env` ya está configurado con las credenciales de Azure MySQL:

```env
DB_HOST=crumenprod01.mysql.database.azure.com
DB_USER=azavala
DB_PASSWORD=Z4vaLA$Ant
DB_NAME=bdcdttx
DB_PORT=3306
PORT=5000
DB_SSL=true
```

## 🏃 Ejecución

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor se iniciará en `http://localhost:5000`

## 📚 Endpoints de la API

### Negocios

- `GET /api/negocios` - Obtener todos los negocios
- `GET /api/negocios/:id` - Obtener un negocio por ID
- `POST /api/negocios` - Crear un nuevo negocio
- `PUT /api/negocios/:id` - Actualizar un negocio
- `DELETE /api/negocios/:id` - Eliminar un negocio

### Usuarios

- `POST /api/usuarios/login` - Login de usuario
- `GET /api/usuarios` - Obtener todos los usuarios
- `GET /api/usuarios/:id` - Obtener un usuario por ID
- `POST /api/usuarios` - Crear un nuevo usuario
- `PUT /api/usuarios/:id` - Actualizar un usuario
- `DELETE /api/usuarios/:id` - Eliminar un usuario

### Roles

- `GET /api/roles` - Obtener todos los roles
- `GET /api/roles/:id` - Obtener un rol por ID
- `POST /api/roles` - Crear un nuevo rol
- `PUT /api/roles/:id` - Actualizar un rol
- `DELETE /api/roles/:id` - Eliminar un rol

### Salud del Servidor

- `GET /` - Información del API
- `GET /health` - Estado del servidor y conexión a BD

## 📦 Estructura del Proyecto

```
backend/
├── config/
│   └── database.js       # Configuración de MySQL
├── controllers/
│   ├── negocios.controller.js
│   ├── usuarios.controller.js
│   └── roles.controller.js
├── routes/
│   ├── negocios.routes.js
│   ├── usuarios.routes.js
│   └── roles.routes.js
├── .env                  # Variables de entorno
├── .gitignore
├── package.json
├── server.js             # Punto de entrada
└── README.md
```

## 🔐 Seguridad

- Contraseñas encriptadas con bcrypt (10 rounds)
- Conexión SSL a Azure MySQL
- Variables sensibles en .env (no versionadas)
- Validación de datos en controladores

## 🗄️ Base de Datos

Tablas utilizadas:
- `tblposcrumenwebnegocio` - Información de negocios
- `tblposcrumenwebparametrosnegocio` - Parámetros de negocios
- `tblposcrumenwebusuarios` - Usuarios del sistema
- `tblposcrumenwebrolesdeusuario` - Roles y permisos

## 📝 Ejemplo de Uso

### Login

```bash
curl -X POST http://localhost:5000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{"alias": "crumen", "password": "Crum3n."}'
```

### Crear Negocio

```bash
curl -X POST http://localhost:5000/api/negocios \
  -H "Content-Type: application/json" \
  -d '{
    "numeronegocio": "001",
    "nombreNegocio": "Mi Negocio",
    "rfcnegocio": "ABC123456789",
    "estatusnegocio": 1,
    "usuarioauditoria": "admin"
  }'
```

## 🐛 Troubleshooting

### Error de conexión a MySQL

Verifica:
- Credenciales en `.env`
- Firewall de Azure permite tu IP
- Puerto 3306 está abierto
- SSL está habilitado

### Error de módulos

```bash
# Limpiar e instalar nuevamente
rm -rf node_modules package-lock.json
npm install
```

## 📄 Licencia

ISC
