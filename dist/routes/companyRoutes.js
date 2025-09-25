import { Router } from 'express';
import { createNewCompany } from '@/controllers/companyController.js';
import { getAllUsersForCompany } from '@/controllers/userController.js'; // <-- 1. IMPORTAR
import locationRoutes from './locationRoutes.js';
const router = Router();
// Rutas para /api/companies
router.post('/', createNewCompany);
// Rutas para sedes anidadas
router.use('/:companyId/locations', locationRoutes);
// 2. Anidar la ruta para obtener usuarios de una compañía
router.get('/:companyId/users', getAllUsersForCompany);
export default router;
