import { Router } from 'express';
import { createNewUser } from '@/controllers/userController.js';

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/', createNewUser);

export default router;
