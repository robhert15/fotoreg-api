import pool from '../config/db.js';

export const createCompany = async (name: string) => {
  try {
    const result = await pool.query(
      'INSERT INTO companies (name) VALUES ($1) RETURNING *',
      [name]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error in createCompany service:', error);
    throw error;
  }
};
