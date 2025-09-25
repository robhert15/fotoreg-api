export interface Location {
  id: number;
  company_id: number;
  name: string;
  address: string | null;
  created_at: string;
}

export interface User {
  id: number;
  company_id: number;
  google_id?: string;
  email: string;
  name: string;
  pin?: string; // El PIN es opcional y no debería enviarse de vuelta
  role: 'admin' | 'operator';
  is_active: boolean;
  created_at: string;
}
