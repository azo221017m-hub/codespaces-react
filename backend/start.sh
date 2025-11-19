#!/bin/bash

# Detener procesos previos
pkill -f "node.*server.js" 2>/dev/null || true

# Esperar un momento
sleep 1

# Iniciar el servidor
cd /workspaces/codespaces-react/backend
echo "Iniciando servidor backend en puerto 5000..."
node server.js &

# Guardar el PID
echo $! > server.pid
echo "Servidor iniciado con PID: $(cat server.pid)"

# Esperar a que el servidor esté listo
sleep 3

# Verificar que esté corriendo
if curl -s http://localhost:5000/health > /dev/null 2>&1; then
    echo "✅ Servidor backend funcionando correctamente"
    curl http://localhost:5000/health
else
    echo "❌ Error: El servidor no responde"
fi
