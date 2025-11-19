// ==================== MODERADORES ====================
export const getModeradores = async () => {
  const response = await fetch(`${API_BASE_URL}/moderadores`);
  return handleResponse(response);
};

export const createModerador = async (moderador) => {
  const response = await fetch(`${API_BASE_URL}/moderadores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(moderador),
  });
  return handleResponse(response);
};

export const updateModerador = async (id, moderador) => {
  const response = await fetch(`${API_BASE_URL}/moderadores/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(moderador),
  });
  return handleResponse(response);
};

export const deleteModerador = async (id) => {
  const response = await fetch(`${API_BASE_URL}/moderadores/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};
// Configuración de la API
// Usar rutas relativas para aprovechar el proxy de Vite
const API_BASE_URL = '/api';

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

// ==================== UNIDADES DE MEDIDA ====================

export const obtenerUnidadesMedida = async () => {
  const response = await fetch(`${API_BASE_URL}/unidades-medida`);
  return handleResponse(response);
};

export const obtenerUnidadMedidaPorId = async (id) => {
  const response = await fetch(`${API_BASE_URL}/unidades-medida/${id}`);
  return handleResponse(response);
};

export const crearUnidadMedida = async (unidad) => {
  const response = await fetch(`${API_BASE_URL}/unidades-medida`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(unidad),
  });
  
  return handleResponse(response);
};

export const actualizarUnidadMedida = async (id, unidad) => {
  const response = await fetch(`${API_BASE_URL}/unidades-medida/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(unidad),
  });
  
  return handleResponse(response);
};

export const eliminarUnidadMedida = async (id) => {
  const response = await fetch(`${API_BASE_URL}/unidades-medida/${id}`, {
    method: 'DELETE',
  });

  return handleResponse(response);
};

// ==================== CATEGORÍAS ====================

export const obtenerCategorias = async () => {
  const response = await fetch(`${API_BASE_URL}/categorias`);
  return handleResponse(response);
};

export const crearCategoria = async (categoria) => {
  const response = await fetch(`${API_BASE_URL}/categorias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoria),
  });
  return handleResponse(response);
};

export const actualizarCategoria = async (id, categoria) => {
  const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoria),
  });
  return handleResponse(response);
};

export const eliminarCategoria = async (id) => {
  const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

// ==================== CLIENTES ====================
export const getClientes = async () => {
  const response = await fetch(`${API_BASE_URL}/clientes`);
  return handleResponse(response);
};

export const createCliente = async (cliente) => {
  const response = await fetch(`${API_BASE_URL}/clientes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cliente),
  });
  return handleResponse(response);
};

export const updateCliente = async (id, cliente) => {
  const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cliente),
  });
  return handleResponse(response);
};

export const deleteCliente = async (id) => {
  const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

// ==================== CUENTAS CONTABLES ====================
export const getCuentasContables = async () => {
  const response = await fetch(`${API_BASE_URL}/cuentas-contables`);
  return handleResponse(response);
};

export const createCuentaContable = async (cuenta) => {
  const response = await fetch(`${API_BASE_URL}/cuentas-contables`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cuenta),
  });
  return handleResponse(response);
};

export const updateCuentaContable = async (id, cuenta) => {
  const response = await fetch(`${API_BASE_URL}/cuentas-contables/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cuenta),
  });
  return handleResponse(response);
};

export const deleteCuentaContable = async (id) => {
  const response = await fetch(`${API_BASE_URL}/cuentas-contables/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

// ==================== DESCUENTOS ====================
export const getDescuentos = async () => {
  const response = await fetch(`${API_BASE_URL}/descuentos`);
  return handleResponse(response);
};

export const createDescuento = async (descuento) => {
  const response = await fetch(`${API_BASE_URL}/descuentos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(descuento),
  });
  return handleResponse(response);
};

export const updateDescuento = async (id, descuento) => {
  const response = await fetch(`${API_BASE_URL}/descuentos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(descuento),
  });
  return handleResponse(response);
};

export const deleteDescuento = async (id) => {
  const response = await fetch(`${API_BASE_URL}/descuentos/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

// ==================== INSUMOS ====================
export const getInsumos = async () => {
  const response = await fetch(`${API_BASE_URL}/insumos`);
  return handleResponse(response);
};

export const createInsumo = async (insumo) => {
  const response = await fetch(`${API_BASE_URL}/insumos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(insumo),
  });
  return handleResponse(response);
};

export const updateInsumo = async (id, insumo) => {
  const response = await fetch(`${API_BASE_URL}/insumos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(insumo),
  });
  return handleResponse(response);
};

export const deleteInsumo = async (id) => {
  const response = await fetch(`${API_BASE_URL}/insumos/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

// ==================== MESAS ====================
export const getMesas = async () => {
  const response = await fetch(`${API_BASE_URL}/mesas`);
  return handleResponse(response);
};

export const createMesa = async (mesa) => {
  const response = await fetch(`${API_BASE_URL}/mesas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mesa),
  });
  return handleResponse(response);
};

export const updateMesa = async (id, mesa) => {
  const response = await fetch(`${API_BASE_URL}/mesas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mesa),
  });
  return handleResponse(response);
};

export const deleteMesa = async (id) => {
  const response = await fetch(`${API_BASE_URL}/mesas/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

// ==================== SUBRECETAS ====================
export const getSubRecetas = async () => {
  const response = await fetch(`${API_BASE_URL}/subrecetas`);
  return handleResponse(response);
};

export const createSubReceta = async (subreceta) => {
  const response = await fetch(`${API_BASE_URL}/subrecetas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subreceta),
  });
  return handleResponse(response);
};

export const updateSubReceta = async (id, subreceta) => {
  const response = await fetch(`${API_BASE_URL}/subrecetas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subreceta),
  });
  return handleResponse(response);
};

export const deleteSubReceta = async (id) => {
  const response = await fetch(`${API_BASE_URL}/subrecetas/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

  // ==================== DETALLES SUBRECETAS ====================
  export const getDetallesSubRecetas = async () => {
    const response = await fetch(`${API_BASE_URL}/detallesubrecetas`);
    return handleResponse(response);
  };

  export const getDetalleSubRecetaPorId = async (id) => {
    const response = await fetch(`${API_BASE_URL}/detallesubrecetas/${id}`);
    return handleResponse(response);
  };

  export const createDetalleSubReceta = async (detalle) => {
    const response = await fetch(`${API_BASE_URL}/detallesubrecetas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(detalle),
    });
    return handleResponse(response);
  };

  export const updateDetalleSubReceta = async (id, detalle) => {
    const response = await fetch(`${API_BASE_URL}/detallesubrecetas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(detalle),
    });
    return handleResponse(response);
  };

  export const deleteDetalleSubReceta = async (id) => {
    const response = await fetch(`${API_BASE_URL}/detallesubrecetas/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  };
