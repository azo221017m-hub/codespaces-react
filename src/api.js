// Configuración de la API
// En GitHub Codespaces, usa la URL pública del backend (puerto 5000)
// En desarrollo local, usa localhost
const API_BASE_URL = window.location.hostname.includes('app.github.dev')
  ? `${window.location.protocol}//${window.location.hostname.replace('-3000', '-5000')}/api`
  : 'http://localhost:5000/api';

console.log('🔗 API Base URL:', API_BASE_URL);

// Función helper para manejar respuestas
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || data.message || 'Error en la petición');
  }
  
  return data;
};

// ==================== USUARIOS ====================

export const loginUsuario = async (alias, password) => {
  const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ alias, password }),
  });
  
  return handleResponse(response);
};

export const obtenerUsuarios = async () => {
  const response = await fetch(`${API_BASE_URL}/usuarios`);
  return handleResponse(response);
};

export const obtenerUsuarioPorId = async (id) => {
  const response = await fetch(`${API_BASE_URL}/usuarios/${id}`);
  return handleResponse(response);
};

export const crearUsuario = async (usuario) => {
  const response = await fetch(`${API_BASE_URL}/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  });
  
  return handleResponse(response);
};

export const actualizarUsuario = async (id, usuario) => {
  const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  });
  
  return handleResponse(response);
};

export const eliminarUsuario = async (id) => {
  const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
    method: 'DELETE',
  });
  
  return handleResponse(response);
};

// ==================== NEGOCIOS ====================

export const obtenerNegocios = async () => {
  const response = await fetch(`${API_BASE_URL}/negocios`);
  return handleResponse(response);
};

export const obtenerNegocioPorId = async (id) => {
  const response = await fetch(`${API_BASE_URL}/negocios/${id}`);
  return handleResponse(response);
};

export const crearNegocio = async (negocio) => {
  const response = await fetch(`${API_BASE_URL}/negocios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(negocio),
  });
  
  return handleResponse(response);
};

export const actualizarNegocio = async (id, negocio) => {
  const response = await fetch(`${API_BASE_URL}/negocios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(negocio),
  });
  
  return handleResponse(response);
};

export const eliminarNegocio = async (id) => {
  const response = await fetch(`${API_BASE_URL}/negocios/${id}`, {
    method: 'DELETE',
  });
  
  return handleResponse(response);
};

// ==================== ROLES ====================

export const obtenerRoles = async () => {
  const response = await fetch(`${API_BASE_URL}/roles`);
  return handleResponse(response);
};

export const obtenerRolPorId = async (id) => {
  const response = await fetch(`${API_BASE_URL}/roles/${id}`);
  return handleResponse(response);
};

export const crearRol = async (rol) => {
  const response = await fetch(`${API_BASE_URL}/roles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rol),
  });
  
  return handleResponse(response);
};

export const actualizarRol = async (id, rol) => {
  const response = await fetch(`${API_BASE_URL}/roles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rol),
  });
  
  return handleResponse(response);
};

export const eliminarRol = async (id) => {
  const response = await fetch(`${API_BASE_URL}/roles/${id}`, {
    method: 'DELETE',
  });
  
  return handleResponse(response);
};
