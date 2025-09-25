import { Request, Response } from 'express';
import * as authService from '@/services/authService.js';

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { idToken, companyName } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: 'El token de Google es requerido.' });
    }
    const result = await authService.verifyGoogleTokenAndLogin(idToken, companyName);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
