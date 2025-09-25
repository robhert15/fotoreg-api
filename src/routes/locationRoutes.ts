import { Router } from 'express';
import { createNewLocation, getAllLocationsForCompany } from '@/controllers/locationController.js';

// La opción `mergeParams: true` es crucial para que las rutas anidadas puedan acceder a los parámetros del padre (ej. :companyId)
const router = Router({ mergeParams: true });

router.post('/', createNewLocation);
router.get('/', getAllLocationsForCompany);

export default router;
