// run-migration.js

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const runMigration = async () => {
  // Configuración de la base de datos desde .env
  const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_DATABASE,
  };

  const client = new Client(dbConfig);

  try {
    console.log('Conectando a la base de datos...');
    await client.connect();
    console.log('✅ Conexión exitosa.');

    console.log('Leyendo archivo de migración...');
    const sql = fs.readFileSync(path.join(__dirname, 'migrations', 'schema.sql'), 'utf8');

    console.log('Ejecutando migración...');
    await client.query(sql);
    console.log('✅ ¡Migración completada exitosamente! Las tablas han sido creadas.');

  } catch (err) {
    console.error('❌ ERROR DURANTE LA MIGRACIÓN:', err);
  } finally {
    await client.end();
    console.log('Conexión cerrada.');
  }
};

runMigration();