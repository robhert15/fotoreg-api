import { Request, Response } from 'express';
import * as userService from '@/services/userService.js';

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error: any) {
    console.error(error);
    if (error.code === '23505') { // Error de violación de unicidad (ej. email duplicado)
      return res.status(409).json({ message: 'El correo electrónico ya existe.' });
    }
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

export const getAllUsersForCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const users = await userService.getUsersByCompany(parseInt(companyId));
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
