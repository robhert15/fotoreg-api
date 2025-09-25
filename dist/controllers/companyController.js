import * as companyService from '../services/companyService.js';
export const createNewCompany = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'El nombre es requerido.' });
        }
        const newCompany = await companyService.createCompany(name);
        res.status(201).json(newCompany);
    }
    catch (error) {
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};
