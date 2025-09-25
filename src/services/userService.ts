import pool from '@/config/db.js';
import bcrypt from 'bcrypt';
import { User } from '@/types/index.js';

const SALT_ROUNDS = 10;

export const createUser = async (userData: any): Promise<User> => {
  const { name, email, pin, role, company_id } = userData;
  
  // Hashear el PIN antes de guardarlo
  const hashedPin = await bcrypt.hash(pin, SALT_ROUNDS);
  
  const result = await pool.query(
    'INSERT INTO users (name, email, pin, role, company_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role, company_id, is_active, created_at',
    [name, email, hashedPin, role, company_id]
  );
  return result.rows[0];
};

export const getUsersByCompany = async (companyId: number): Promise<User[]> => {
  const result = await pool.query(
    'SELECT id, name, email, role, is_active, created_at FROM users WHERE company_id = $1 ORDER BY name ASC',
    [companyId]
  );
  return result.rows;
};
