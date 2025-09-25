import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import pool from '@/config/db.js';
import { User } from '@/types/index.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleTokenAndLogin = async (idToken: string, companyName?: string): Promise<{ token: string; user: Partial<User> }> => {
  try {
    // 1. Verificar el token de Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.sub || !payload.email || !payload.name) {
      throw new Error('Token de Google inválido.');
    }

    const { sub: google_id, email, name } = payload;

    // 2. Buscar si el usuario ya existe
    let result = await pool.query('SELECT * FROM users WHERE google_id = $1', [google_id]);
    let user: User = result.rows[0];

    // 3. Si el usuario no existe, crearlo (junto con su compañía si es necesario)
    if (!user) {
      if (!companyName) {
        throw new Error('El nombre de la compañía es requerido para el primer registro.');
      }
      // Iniciar una transacción para asegurar que ambas creaciones sean exitosas
      const dbClient = await pool.connect();
      try {
        await dbClient.query('BEGIN');
        const companyResult = await dbClient.query('INSERT INTO companies (name) VALUES ($1) RETURNING *', [companyName]);
        const companyId = companyResult.rows[0].id;
        
        const userResult = await dbClient.query(
          'INSERT INTO users (company_id, google_id, email, name, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [companyId, google_id, email, name, 'admin']
        );
        user = userResult.rows[0];
        await dbClient.query('COMMIT');
      } catch (e) {
        await dbClient.query('ROLLBACK');
        throw e;
      } finally {
        dbClient.release();
      }
    }

    // 4. Crear nuestro propio token de sesión (JWT)
    const tokenPayload = {
      userId: user.id,
      companyId: user.company_id,
      role: user.role,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, { expiresIn: '30d' });
    
    // Omitimos datos sensibles antes de devolver el usuario
    const { pin, google_id: gid, ...safeUser } = user;

    return { token, user: safeUser };

  } catch (error) {
    console.error('Error en la autenticación con Google:', error);
    throw new Error('La autenticación con Google falló.');
  }
};
