import { Pool } from 'pg';
import dotenv from 'dotenv';

console.log('[db.ts] Módulo cargado.');

dotenv.config();
console.log('[db.ts] dotenv.config() ejecutado.');

console.log(`[db.ts] Cargando pool con: User=${process.env.DB_USER}, Host=${process.env.DB_HOST}, Port=${process.env.DB_PORT}`);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Función para probar la conexión
export const testDbConnection = async () => {
  console.log('[db.ts] Ejecutando testDbConnection...');
  try {
    await pool.query('SELECT NOW()');
    console.log('✅ Conexión con la base de datos establecida exitosamente.');
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Error al conectar con la base de datos:', error.message);
    } else {
      console.error('❌ Ocurrió un error desconocido al conectar con la base de datos:', error);
    }
    process.exit(1);
  }
};

export default pool;
