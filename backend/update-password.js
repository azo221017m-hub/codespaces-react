import { query } from './config/database.js';
import bcrypt from 'bcrypt';

async function updatePassword() {
  try {
    const alias = 'crumen';
    const newPassword = 'Crum3n.';
    
    // Verificar si el usuario existe
    const usuarios = await query('SELECT idUsuario, alias, password FROM tblposcrumenwebusuarios WHERE alias = ?', [alias]);
    
    if (usuarios.length === 0) {
      console.log(`❌ Usuario "${alias}" no encontrado`);
      process.exit(1);
    }
    
    const usuario = usuarios[0];
    console.log(`📋 Usuario encontrado: ${usuario.alias}`);
    console.log(`🔐 Password actual (primeros 20 chars): ${usuario.password.substring(0, 20)}...`);
    
    // Verificar si ya está hasheado
    const isBcrypt = usuario.password.startsWith('$2b$') || usuario.password.startsWith('$2a$');
    
    if (isBcrypt) {
      console.log('✅ La contraseña ya está encriptada con bcrypt');
      
      // Probar si la contraseña actual funciona
      const match = await bcrypt.compare(newPassword, usuario.password);
      if (match) {
        console.log('✅ La contraseña actual es correcta: "Crum3n."');
      } else {
        console.log('⚠️  La contraseña encriptada no coincide con "Crum3n."');
        console.log('Actualizando contraseña...');
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await query('UPDATE tblposcrumenwebusuarios SET password = ? WHERE idUsuario = ?', [hashedPassword, usuario.idUsuario]);
        console.log('✅ Contraseña actualizada exitosamente');
      }
    } else {
      console.log('⚠️  La contraseña NO está encriptada con bcrypt');
      console.log('Encriptando contraseña...');
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await query('UPDATE tblposcrumenwebusuarios SET password = ? WHERE idUsuario = ?', [hashedPassword, usuario.idUsuario]);
      console.log('✅ Contraseña encriptada y actualizada exitosamente');
    }
    
    console.log('\n🎯 Puedes usar estas credenciales:');
    console.log(`   Usuario: ${alias}`);
    console.log(`   Contraseña: ${newPassword}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updatePassword();
