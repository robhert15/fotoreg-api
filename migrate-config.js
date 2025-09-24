// migrate-config.js (Versión Definitiva)

require('dotenv').config();

module.exports = {
  // Le pasamos cada parámetro de conexión directamente
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_DATABASE,

  // Mantenemos la configuración de la herramienta
  dir: 'migrations',
  migrationsTable: 'pgmigrations',
};