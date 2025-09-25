import { Request, Response } from 'express';
import * as locationService from '@/services/locationService.js';

export const createNewLocation = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const { name, address } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'El nombre es requerido.' });
    }
    const newLocation = await locationService.createLocation(parseInt(companyId), name, address || '');
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

export const getAllLocationsForCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const locations = await locationService.getLocationsByCompany(parseInt(companyId));
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
