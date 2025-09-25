import pool from '@/config/db.js';
export const createLocation = async (companyId, name, address) => {
    const result = await pool.query('INSERT INTO locations (company_id, name, address) VALUES ($1, $2, $3) RETURNING *', [companyId, name, address]);
    return result.rows[0];
};
export const getLocationsByCompany = async (companyId) => {
    const result = await pool.query('SELECT * FROM locations WHERE company_id = $1 ORDER BY name ASC', [companyId]);
    return result.rows;
};
