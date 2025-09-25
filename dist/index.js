import express from 'express';
import dotenv from 'dotenv';
import { testDbConnection } from './config/db.js';
import companyRoutes from '@/routes/companyRoutes.js';
import userRoutes from '@/routes/userRoutes.js';
import authRoutes from '@/routes/authRoutes.js'; // <-- AÑADIR
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('¡La API de FotoReg está funcionando!');
});
// Rutas de Compañías (y sus sub-rutas anidadas)
app.use('/api/companies', companyRoutes);
// Ruta de Usuarios (para acciones no anidadas como crear)
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); // <-- AÑADIR
const startServer = async () => {
    await testDbConnection();
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
};
startServer();
