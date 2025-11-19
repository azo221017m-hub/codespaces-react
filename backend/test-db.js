import { query } from './config/database.js';
import bcrypt from 'bcrypt';

async function testDB() {
  try {
    // Verificar usuarios existentes
    console.log('📋 Verificando usuarios en la base de datos...\n');
    const usuarios = await query('SELECT idUsuario, alias, nombre, estatus FROM tblposcrumenwebusuarios LIMIT 5');
    
    if (usuarios.length === 0) {
      console.log('⚠️  No hay usuarios en la base de datos');
      console.log('Creando usuario de prueba: crumen / Crum3n.\n');
      
      // Crear usuario de prueba
      const hashedPassword = await bcrypt.hash('Crum3n.', 10);
      await query(
        `INSERT INTO tblposcrumenwebusuarios (idNegocio, idRol, nombre, alias, password, estatus, usuarioauditoria)
         VALUES (1, 1, 'Carlos Rumen', 'crumen', ?, 1, 'system')`,
        [hashedPassword]
      );
      
      console.log('✅ Usuario creado exitosamente');
    } else {
      console.log('✅ Usuarios encontrados:');
      usuarios.forEach(u => {
        console.log(`   - ${u.alias} (${u.nombre}) - Estatus: ${u.estatus ? 'Activo' : 'Inactivo'}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testDB();
