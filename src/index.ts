console.log('[index.ts] Módulo cargado.');
import express from 'express';
import dotenv from 'dotenv';
import { testDbConnection } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡La API de FotoReg está funcionando!');
});

const startServer = async () => {
  await testDbConnection(); // Primero prueba la conexión a la BD
  
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}` );
  });
};

startServer();
